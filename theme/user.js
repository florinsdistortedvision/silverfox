//Silverfox auto-config

user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // Enable CSS
user_pref("browser.theme.dark-private-windows", false); // Disable dark mode for private/incognito
user_pref("browser.display.windows.non_native_menus", 0); // Minimize the occurrence of non-native menus
user_pref("ui.prefersReducedMotion", 1); // Needed for New Tab button to stick to tabs
user_pref("browser.tabs.inTitlebar", 1); // Force disable titlebar
user_pref("browser.uidensity", -1); // Force set normal density
user_pref("browser.download.useDownloadDir", true); // Forces disabling ask where you save files, needed for Downloads Bar to show
user_pref("browser.newtabpage.activity-stream.showSponsored", false); // Disable "Sponsored stories" in Pocket section of new tab page
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false); // Disable the Pocket section of the new tab page
user_pref("widget.gtk.native-context-menus", true); // LINUX ONLY - force native GTK3 context menus where possible for more authenticity