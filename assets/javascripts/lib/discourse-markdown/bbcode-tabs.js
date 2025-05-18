// Keep a counter to create unique IDs for each tab group
let tabGroupCounter = 0;

/**
 * Processes the tabs BBCode and converts it to HTML
 */
function processTabsAndContent(state, openInfo, content) {
  // Get a unique ID for this tab group
  const tabGroupId = tabGroupCounter++;
  
  // Create the opening div for the tabs container
  const tabsOpenToken = state.push("html_raw", "", 0);
  tabsOpenToken.content = '<div class="tabs"><div class="tabs-title">';
  
  // Extract each tab with its title and content using regex
  const tabRegex = /\[tab=([^\]]*)\]([\s\S]*?)(?=\[tab=|\[\/tab\]|\[\/tabs\]|$)/g;
  let match;
  let tabIndex = 1;
  const tabs = [];
  
  // Find all tabs in the content
  while ((match = tabRegex.exec(content)) !== null) {
    if (match[1] && match[2]) {
      tabs.push({
        title: match[1].trim(),
        content: match[2].trim(),
        index: tabIndex++
      });
    }
  }
  
  // Get site settings for tab behavior
  const siteSettings = state.md.options.discourse?.siteSettings;
  const firstTabActive = siteSettings?.bbcode_tabs_first_tab_active !== false;
  
  // Process each tab
  for (const tab of tabs) {
    const tabId = `tab-${tabGroupId}-${tab.index}`;
    const isChecked = firstTabActive && tab.index === 1 ? ' checked="checked"' : '';
    // 在这里去掉所有引号和实体引号
    const labelText = tab.title.replace(/["']/g, '').replace(/&quot;|&apos;|&#39;/g, '');
    const tabOpenToken = state.push("html_raw", "", 0);
    tabOpenToken.content = `<div class="tab"><input type="radio" name="tab-group-${tabGroupId}" ${isChecked} id="${tabId}"><label for="${tabId}">${labelText}</label><div class="content">`;
    
    // This is a key improvement - instead of embedding the content directly in HTML,
    // we're letting Discourse process the content as markdown
    const env = {};
    const tokens = [];
    state.md.block.parse(tab.content, state.md, env, tokens);
    
    for (let i = 0; i < tokens.length; i++) {
      state.tokens.push(tokens[i]);
    }
    
    // Close the tab's HTML
    const tabCloseToken = state.push("html_raw", "", 0);
    tabCloseToken.content = '</div></div>';
  }
  
  // Close the tabs container
  const tabsCloseToken = state.push("html_raw", "", 0);
  tabsCloseToken.content = '</div></div>';
  
  return true;
}

// Define the BBCode rule for [tabs]...[/tabs]
const tabsRule = {
  tag: "tabs",
  replace: processTabsAndContent
};

export function setup(helper) {
  // Add CSS classes to the allowList
  helper.allowList([
    "div.tabs",
    "div.tabs-title", 
    "div.tab",
    "div.content",
    "input[type=radio]",
    "input[name=tab-group-*]",
    "input[checked=checked]",
    "input[id=tab-*]",
    "label[for=tab-*]"
  ]);
  
  // Register the BBCode feature with Discourse
  helper.registerOptions((opts, siteSettings) => {
    // Ensure siteSettings are passed to the markdown instance
    opts.discourse = opts.discourse || {};
    opts.discourse.siteSettings = siteSettings;

    // Enable the feature
    opts.features["discourse-bbcode-tabs"] = true;
  });

  // Register our plugin with the markdown processor
  helper.registerPlugin((md) => {
    // Reset the counter for each post
    tabGroupCounter = 0;
    
    // Add the tabs rule to the BBCode ruler
    md.block.bbcode.ruler.push("tabs", tabsRule);
  });
}
