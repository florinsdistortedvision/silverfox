//Silverfox auto-config

user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // Enable CSS
user_pref("browser.theme.dark-private-windows", false); // Disable dark mode for private/incognito
user_pref("browser.display.windows.non_native_menus", 0); // Minimize the occurrence of non-native menus
user_pref("browser.uidensity", -1); // Force set normal density
user_pref("browser.download.useDownloadDir", true); // Forces disabling ask where you save files, needed for Downloads Bar to show
user_pref("browser.newtabpage.activity-stream.showSponsored", false); // Disable "Sponsored stories" in Pocket section of new tab page
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false); // Disable the Pocket section of the new tab page
user_pref("widget.gtk.overlay-scrollbars.enabled", false); // 2012 Chrome on Linux didn't have these.
user_pref("nglayout.enable_drag_images", false); // Disable previews when dragging tabs
user_pref("browser.search.widget.inNavBar", false); // Disable the optional search bar
user_pref("browser.startup.homepage_override.mstone", "115.8.0"); // Prevent first run screen
user_pref("datareporting.policy.dataSubmissionPolicyAcceptedVersion", 2); // Prevent default privacy page
user_pref("datareporting.policy.dataSubmissionPolicyNotifiedTime", "10000000000000"); // Prevent default privacy page
