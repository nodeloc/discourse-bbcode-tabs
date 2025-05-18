import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-bbcode-tabs",
  
  initialize() {
    withPluginApi("0.8.7", api => {
      // Add a decorator to enhance tabs functionality after post rendering
      api.decorateCooked($elem => {
        const $tabs = $elem.find(".tabs");
        if ($tabs.length === 0) {
          return;
        }

        // Add some additional functionality for tabs if needed
        $tabs.each((_, tabContainer) => {
          const $tabContainer = $(tabContainer);
          
          // Add accessibility attributes
          const $tabTitles = $tabContainer.find(".tab label");
          $tabTitles.attr("role", "tab");
          
          const $tabContents = $tabContainer.find(".tab .content");
          $tabContents.attr("role", "tabpanel");
          
          // Add keyboard navigation
          $tabContainer.find(".tab input").on("keydown", function(e) {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              
              const $allTabs = $tabContainer.find(".tab input");
              const currentIndex = $allTabs.index(this);
              let nextIndex;
              
              if (e.key === "ArrowLeft") {
                nextIndex = (currentIndex - 1 + $allTabs.length) % $allTabs.length;
              } else {
                nextIndex = (currentIndex + 1) % $allTabs.length;
              }
              
              $allTabs.eq(nextIndex).prop("checked", true).focus();
            }
          });
          
          // Store the selected tab in local storage to persist selection, if enabled in site settings
          const rememberSelection = api.siteSettings && api.siteSettings.bbcode_tabs_remember_selection !== false;
          if (rememberSelection) {
            const tabGroupId = $tabContainer.find(".tab input").first().attr("name");
            if (tabGroupId) {
              // Restore the previously selected tab
              const storedTabId = localStorage.getItem(`discourse-tabs-${tabGroupId}`);
              if (storedTabId) {
                const $storedTab = $tabContainer.find(`#${storedTabId}`);
                if ($storedTab.length) {
                  $storedTab.prop("checked", true);
                }
              }
              
              // Save the selected tab
              $tabContainer.find(".tab input").on("change", function() {
                if (this.checked) {
                  localStorage.setItem(`discourse-tabs-${tabGroupId}`, this.id);
                }
              });
            }
          }
        });
      }, { id: "discourse-bbcode-tabs" });
    });
  }
};
