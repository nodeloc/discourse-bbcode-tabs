# frozen_string_literal: true

# name: discourse-bbcode-tabs
# about: Adds BBCode [tabs][tab=...][/tab][/tabs] support to posts
# version: 0.1
# authors: GitHub Copilot
# url: https://github.com/discourse/discourse-bbcode-tabs
# transpile_js: true
# enabled_site_setting: bbcode_tabs_enabled

# Register assets
register_asset "stylesheets/common/discourse-bbcode-tabs.scss"
# Load the markdown processor extension
after_initialize do
  on(:markdown_engine_init) do |markdown|
    # This will load our markdown processor extension
    markdown.extensions << "discourse-bbcode-tabs"
  end
end
