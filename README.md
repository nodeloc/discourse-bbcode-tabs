# Discourse BBCode Tabs Plugin

This plugin adds support for tabbed content in Discourse posts using BBCode syntax. It allows users to create multiple tabs with different content that can be switched between without reloading the page.

## Features

- Create tabbed interfaces in posts using simple BBCode syntax
- Full markdown support inside tabs
- Tabs work with both light and dark themes
- Responsive design for mobile devices
- Keyboard navigation (arrow keys) between tabs
- Tab selection is remembered between page loads

## Installation

Follow the [plugin installation guide](https://meta.discourse.org/t/install-a-plugin/19157):

```bash
cd /var/discourse
git clone https://github.com/discourse/discourse-bbcode-tabs.git plugins/discourse-bbcode-tabs
./launcher rebuild app
```

## Settings

This plugin provides several site settings that can be configured in the Discourse admin interface under Plugins > BBCode Tabs:

- **bbcode_tabs_enabled**: Enable or disable the BBCode Tabs plugin (default: true)
- **bbcode_tabs_first_tab_active**: Automatically select the first tab by default (default: true)
- **bbcode_tabs_remember_selection**: Remember tab selection between page loads (default: true)

## Usage

You can add tabbed content to your posts using the following BBCode syntax:

```
[tabs]
[tab=Tab Title 1]
Content for tab 1
[/tab]
[tab=Tab Title 2]
Content for tab 2
[/tab]
[tab=Tab Title 3]
Content for tab 3
[/tab]
[/tabs]
```

The first tab will be selected by default.

## Examples

### Basic Example

```
[tabs]
[tab=一列]
在此填写你的文本，在此填写你的文本，在此填写你的文本，在此填写你的文本
[/tab]
[tab=二列]
在此填写你的文本，在此填写你的文本，在此填写你的文本，在此填写你的文本
[/tab]
[/tabs]
```

This will create two tabs labeled "一列" and "二列" with the specified content in each tab.

### Tabs with Rich Content

You can use any Discourse-supported markdown inside tabs:

```
[tabs]
[tab=Text]
Regular text with **bold** and *italic* formatting.

You can include paragraphs and [links](https://example.com).
[/tab]
[tab=List]
* Item 1
* Item 2
  * Nested item
* Item 3

1. Numbered item
2. Another numbered item
[/tab]
[tab=Code]
```python
def hello_world():
    print("Hello, world!")
```

You can include code blocks with syntax highlighting.
[/tab]
[tab=Image]
![Example Image](https://example.com/image.jpg)

Images can be included too!
[/tab]
[/tabs]
```

## Accessibility

The plugin includes accessibility features:
- Keyboard navigation with arrow keys
- Proper ARIA roles for tabs
- High contrast between selected and unselected tabs

## License

MIT
# discourse-bbcode-tabs
