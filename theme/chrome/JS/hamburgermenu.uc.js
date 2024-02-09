// ==UserScript==
// @name         Silverfox Hamburger Menu
// @version      1.1
// @description  Creates Hamburger Menu with its contents and functions
// @author       florin
// ==/UserScript==

window.addEventListener("load", function () {
  const tabsToolbar = document.getElementById("nav-bar");

  if (tabsToolbar) {
    const hamburgerButton = document.createElementNS(
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      "toolbarbutton"
    );

    hamburgerButton.setAttribute("id", "hamburger-button");
    hamburgerButton.setAttribute("class", "hamburger");
    hamburgerButton.setAttribute("removable", "false");
    hamburgerButton.setAttribute("cui-areatype", "toolbar");

    const hamburgerPopup = document.createElementNS(
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      "menupopup"
    );

    const submenuPopup10 = document.createElementNS(
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      "menupopup"
    );

    const menuSubMenu10 = document.createElementNS(
      "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
      "menu"
    );

    const hamburgerMenuItems = [
      { label: "Your Silverfox is outdated, update now", class: "update-silverfox" },
      { label: "New tab", class: "submenu-item1" },
      { label: "New window", class: "submenu-item2" },
      { label: "New incognito window", class: "submenu-item3" },
      { label: "Bookmarks", class: "submenu-item4" },
      { label: "Separator", separator: true },
      { label: "Relaunch Chrome in Windows 8 mode", class: "windows8-mode", now: isAprilFoolsDay() ? "true" : "false" },
      { label: "Separator", now: isAprilFoolsDay() ? "true" : "false", separator: true },
      { label: "SubMenu 5", class: "submenu-item5" },
      { label: "Separator", separator: true },
      { label: "SubMenu 6", class: "submenu-item6" },
      { label: "Separator", separator: true },
      { label: "Save page as...", class: "submenu-item7" },
      { label: "Find...	", class: "submenu-item8" },
      { label: "Print...", class: "submenu-item9" },
      {
        label: "Tools",
        class: "submenu-item10",
        submenu: true, // Indicate that it has a submenu
        submenuItems: [
          { label: "Silverfox Flags ", class: "submenu-item10-1" },
          { label: "Separator", separator: true },
          { label: "Extensions", class: "submenu-item10-2" },
          { label: "Task manager", class: "submenu-item10-3" },
          { label: "Clear browsing data...", class: "submenu-item10-4" },
          { label: "Separator", separator: true },
          { label: "Report an issue...", class: "submenu-item10-5" },
          { label: "Separator", separator: true },
          { label: "View source", class: "submenu-item10-6" },
          { label: "My profiles", class: "submenu-item10-7" },
        ],
      },
      { label: "Separator", separator: true },
      { label: "History", class: "submenu-item11" },
      { label: "Downloads", class: "submenu-item12" },
      { label: "Separator", separator: true },
      { label: "My Chrome account...", class: "submenu-item13" },
      { label: "Separator", separator: true },
      { label: "Settings", class: "submenu-item14" },
      { label: "About Google Chrome", class: "submenu-item15" },
      { label: "Help", class: "submenu-item16" },
      { label: "Separator", separator: true },
	  { label: "Exit", class: "submenu-item17" },
    ];
	
    let beChromium;

    // Try to retrieve the preference, use default if it fails
    try {
      beChromium = Services.prefs.getBoolPref("silverfox.beChromium");
    } catch (error) {
      beChromium = false; // Default to false if the preference is not set
    }

    // Update labels based on the preference value
    if (beChromium) {
      const submenuItem13 = hamburgerMenuItems.find(item => item.class === "submenu-item13");
      const submenuItem15 = hamburgerMenuItems.find(item => item.class === "submenu-item15");
      const windows8 = hamburgerMenuItems.find(item => item.class === "windows8-mode");

      if (submenuItem13) submenuItem13.label = "My Chromium account...";
      if (submenuItem15) submenuItem15.label = "About Chromium";
      if (windows8) windows8.label = "Relaunch Chromium in Windows 8 mode";
    } else {
      const submenuItem13 = hamburgerMenuItems.find(item => item.class === "submenu-item13");
      const submenuItem15 = hamburgerMenuItems.find(item => item.class === "submenu-item15");
      const windows8 = hamburgerMenuItems.find(item => item.class === "windows8-mode");

      if (submenuItem13) submenuItem13.label = "My Chrome account...";
      if (submenuItem15) submenuItem15.label = "About Google Chrome";
      if (windows8) windows8.label = "Relaunch Chrome in Windows 8 mode";
    }
    
    function isAprilFoolsDay() {
      const now = new Date();
      return now.getMonth() === 3 && now.getDate() === 1;
  }

  const windows8SeparatorIndex = hamburgerMenuItems.findIndex(item => item.class === "windows8-mode") + 1;
  if (windows8SeparatorIndex !== -1) {
      hamburgerMenuItems[windows8SeparatorIndex].now = isAprilFoolsDay() ? "true" : "false";
  }

    for (let i = 0; i < hamburgerMenuItems.length; i++) {
      const menuElement = hamburgerMenuItems[i].class === "submenu-item5"
        ? document.createElement("div") // Use div for SubMenu 5
        : hamburgerMenuItems[i].class === "submenu-item6"
        ? document.createElement("div") // Use div for SubMenu 6
        : hamburgerMenuItems[i].class === "submenu-item10"
        ? menuSubMenu10.cloneNode(true)
        : document.createElementNS(
            "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
            "menuitem"
          );
		  

      if (hamburgerMenuItems[i].separator) {
        const separator = document.createElementNS(
          "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
          "menuseparator"
        );
        separator.setAttribute("orient", "horizontal");
        separator.setAttribute("now", hamburgerMenuItems[i].now);
        hamburgerPopup.appendChild(separator);
      } else {
        menuElement.setAttribute("label", hamburgerMenuItems[i].label);
        menuElement.setAttribute("class", hamburgerMenuItems[i].class);

        if (hamburgerMenuItems[i].class === "submenu-item10" && hamburgerMenuItems[i].submenu) {
          const submenu = submenuPopup10.cloneNode(true);

          for (let j = 0; j < hamburgerMenuItems[i].submenuItems.length; j++) {
            if (hamburgerMenuItems[i].submenuItems[j].separator) {
              const separator = document.createElementNS(
                "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
                "menuseparator"
              );
              separator.setAttribute("orient", "horizontal");
              submenu.appendChild(separator);
            } else {
              const subItem = document.createElementNS(
                "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
                "menuitem"
              );
              subItem.setAttribute("label", hamburgerMenuItems[i].submenuItems[j].label);
              subItem.setAttribute("class", hamburgerMenuItems[i].submenuItems[j].class);
              submenu.appendChild(subItem);
            }
          }

          menuElement.appendChild(submenu);
        }

          if (hamburgerMenuItems[i].now) {
            menuElement.setAttribute("now", hamburgerMenuItems[i].now);
          }

        hamburgerPopup.appendChild(menuElement);
      }
    }

    hamburgerButton.appendChild(hamburgerPopup);

    hamburgerButton.addEventListener("click", function () {
      hamburgerPopup.openPopup(
        hamburgerButton,
        "after_start",
        0,
        0,
        true,
        false
      );
    });

    tabsToolbar.appendChild(hamburgerButton);
  }
  
const submenuItem5 = document.querySelector(".submenu-item5");
const submenuItem6 = document.querySelector(".submenu-item6");


const editbuttonInfo = [
  { label: "Cut", class: "cutButton", disabled: "true" },
  { label: "Copy", class: "copyButton", disabled: "true" },
  { label: "Paste", class: "pasteButton", disabled: "true" }
];

const zoombuttonInfo = [
  { label: "-", class: "minimizeButton" },
  { label: "100%", class: "zoomLevelButton" },
  { label: "+", class: "maximizeButton" },
  { label: "", class: "fullscreenButton" }
];

editbuttonInfo.forEach(info => {
  const button = document.createElementNS(
    "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
    "button"
  );

  button.setAttribute("class", info.class);
  button.setAttribute("disabled", info.disabled);

  const label = document.createElementNS(
    "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
    "label"
  );
  label.setAttribute("class", "button-text");
  label.textContent = info.label;

  button.appendChild(label);
  submenuItem5.appendChild(button);
});

zoombuttonInfo.forEach(info => {
  const button = document.createElementNS(
    "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
    "button"
  );

  button.setAttribute("class", info.class);

  const label = document.createElementNS(
    "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
    "label"
  );
  label.setAttribute("class", "button-text");
  label.textContent = info.label;

  button.appendChild(label);
  submenuItem6.appendChild(button);
});



  // Hamburger Menu functions
  
  const newTab = document.querySelector(".submenu-item1");
  const newWindow = document.querySelector(".submenu-item2");
  const newIncognitoWindow = document.querySelector(".submenu-item3");
  const bookmarksMenu = document.querySelector(".submenu-item4");
  const windows8 = this.document.querySelector(".windows8-mode")
  
  const cutButton = document.querySelector(".cutButton");
  const copyButton = document.querySelector(".copyButton");
  const pasteButton = document.querySelector(".pasteButton");
  
  const zoomOut = document.querySelector(".minimizeButton");
  const zoomLevel = document.querySelector(".zoomLevelButton");
  const zoomIn = document.querySelector(".maximizeButton");
  const fullScreen = document.querySelector(".fullscreenButton");
  
  const savePage = document.querySelector(".submenu-item7");
  const findMenu = document.querySelector(".submenu-item8");
  const printMenu = document.querySelector(".submenu-item9");
  
  const silverfoxFlags = document.querySelector(".submenu-item10-1");
  const extensionsMenu = document.querySelector(".submenu-item10-2");
  const taskManager = document.querySelector(".submenu-item10-3");
  const clearBrowsing = document.querySelector(".submenu-item10-4");
  const reportIssue = document.querySelector(".submenu-item10-5");
  const viewSource = document.querySelector(".submenu-item10-6");
  const aboutProfiles = document.querySelector(".submenu-item10-7");
  
  const historyMenu = document.querySelector(".submenu-item11");
  const downloadsMenu = document.querySelector(".submenu-item12");
  const signIn = document.querySelector(".submenu-item13");
  const settingsMenu = document.querySelector(".submenu-item14");
  const aboutChrome = document.querySelector(".submenu-item15");
  const helpMenu = document.querySelector(".submenu-item16");
  const exitMenu = document.querySelector(".submenu-item17");
   
    
if (newTab) {
  const openGoogleSearch = function (event) {
    BrowserOpenTab({ event });

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  newTab.addEventListener("command", openGoogleSearch);
}
    
if (newWindow) {
  const openGoogleSearch = function (event) {
    OpenBrowserWindow();

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  newWindow.addEventListener("command", openGoogleSearch);
}    
 

if (newIncognitoWindow) {
  const openGoogleSearch = function (event) {
    OpenBrowserWindow({private: true});

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  newIncognitoWindow.addEventListener("command", openGoogleSearch);
}  

if (bookmarksMenu) {
  const openSpaceHey = function (event) {
    const spaceHeyURL = "about:bookmarks";
    
    const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);

    window.gBrowser.selectedTab = newTab;
  };

  bookmarksMenu.addEventListener("command", openSpaceHey);
}

if (windows8) {
  const openSpaceHey = function (event) {
    const spaceHeyURL = "https://silverfox.neocities.org/components/win8";
    
    const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);

    window.gBrowser.selectedTab = newTab;
  };

  windows8.addEventListener("command", openSpaceHey);
}

if (cutButton) {
  const openGoogleSearch = function (event) {
    goDoCommand('cmd_cut');

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  cutButton.addEventListener("command", openGoogleSearch);
}

if (copyButton) {
  const openGoogleSearch = function (event) {
    copyContentsToClipboard();

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  copyButton.addEventListener("command", openGoogleSearch);
}

if (pasteButton) {
  const openGoogleSearch = function (event) {
    goDoCommand('cmd_paste');

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  pasteButton.addEventListener("command", openGoogleSearch);
}


if (zoomOut) {
  const openGoogleSearch = function (event) {
    FullZoom.reduce();

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  zoomOut.addEventListener("command", openGoogleSearch);
}


if (zoomIn) {
  const openGoogleSearch = function (event) {
    FullZoom.enlarge();

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  zoomIn.addEventListener("command", openGoogleSearch);
}

if (fullScreen) {
  const openGoogleSearch = function (event) {
    BrowserFullScreen();

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  fullScreen.addEventListener("command", openGoogleSearch);
}

if (savePage) {
  const openGoogleSearch = function (event) {
    saveBrowser(gBrowser.selectedBrowser);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  savePage.addEventListener("command", openGoogleSearch);
}

if (findMenu) {
  const openGoogleSearch = function (event) {
    gLazyFindCommand('onFindCommand');

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  findMenu.addEventListener("command", openGoogleSearch);
}

if (printMenu) {
  const openGoogleSearch = function (event) {
    PrintUtils.startPrintWindow(gBrowser.selectedBrowser.browsingContext);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  printMenu.addEventListener("command", openGoogleSearch);
}

if (silverfoxFlags) {
  const openSpaceHey = function (event) {
    const spaceHeyURL = "about:flags";
    
    const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);

    window.gBrowser.selectedTab = newTab;
  };

  silverfoxFlags.addEventListener("command", openSpaceHey);
}

if (extensionsMenu) {
  const openGoogleSearch = function (event) {
    gUnifiedExtensions.togglePanel(event);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  extensionsMenu.addEventListener("command", openGoogleSearch);
}

if (taskManager) {
  const openGoogleSearch = function (event) {
    switchToTabHavingURI('about:processes', true);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  taskManager.addEventListener("command", openGoogleSearch);
}

if (clearBrowsing) {
  const openGoogleSearch = function (event) {
    Sanitizer.showUI(window);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  clearBrowsing.addEventListener("command", openGoogleSearch);
}

if (reportIssue) {
  const openGoogleSearch = function (event) {
    openUILink(gSafeBrowsing.getReportURL('Phish'), event, {triggeringPrincipal: Services.scriptSecurityManager.createNullPrincipal({})});

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  reportIssue.addEventListener("command", openGoogleSearch);
}

if (viewSource) {
  const openGoogleSearch = function (event) {
    BrowserViewSource(window.gBrowser.selectedBrowser);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  viewSource.addEventListener("command", openGoogleSearch);
}

if (aboutProfiles) {
  const openGoogleSearch = function (event) {
    const window = event.target.ownerDocument.defaultView;
	switchToTabHavingURI('about:profiles', true);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  aboutProfiles.addEventListener("command", openGoogleSearch);
}

if (historyMenu) {
  const openSpaceHey = function (event) {
    const spaceHeyURL = "about:history";
    
    const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);

    window.gBrowser.selectedTab = newTab;
  };

  historyMenu.addEventListener("command", openSpaceHey);
}

if (downloadsMenu) {
  const openGoogleSearch = function (event) {
    const window = event.target.ownerDocument.defaultView;
	switchToTabHavingURI('about:downloads', true);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  downloadsMenu.addEventListener("command", openGoogleSearch);
}

if (signIn) {
  const openSpaceHey = function (event) {
    const spaceHeyURL = "https://accounts.firefox.com/?context=fx_desktop_v3&entrypoint=preferences&action=email&service=sync";
    
    const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);

    window.gBrowser.selectedTab = newTab;
  };

  signIn.addEventListener("command", openSpaceHey);
}


if (settingsMenu) {
  const openGoogleSearch = function (event) {
    const window = event.target.ownerDocument.defaultView;
	switchToTabHavingURI('about:preferences', true);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  settingsMenu.addEventListener("command", openGoogleSearch);
}

if (aboutChrome) {
  const openGoogleSearch = function (event) {
    const window = event.target.ownerDocument.defaultView;
	switchToTabHavingURI('about:silverfox', true);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  aboutChrome.addEventListener("command", openGoogleSearch);
}

if (helpMenu) {
  const openGoogleSearch = function (event) {
    openHelpLink('firefox-help');

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  helpMenu.addEventListener("command", openGoogleSearch);
}


if (exitMenu) {
  const openGoogleSearch = function (event) {
    goQuitApplication(event);

    const paste = readFromClipboard();

    if (paste) {
      const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);

      gBrowser.selectedTab = gBrowser.addTab(searchURL);
    }
  };

  exitMenu.addEventListener("command", openGoogleSearch);
} 

// Silverfox update checker
// Because some legacy Linux versions like old ass Ubuntu breaks when updater.uc.js is separate, this will now be combined into one
// Thanks linux.

  // Function to compare version numbers
  function compareVersions(localVersion, remoteVersion) {
    const localParts = localVersion.split('.').map(Number);
    const remoteParts = remoteVersion.split('.').map(Number);

    const maxLength = Math.max(localParts.length, remoteParts.length);

    for (let i = 0; i < maxLength; i++) {
        const localPart = localParts[i] || 0;
        const remotePart = remoteParts[i] || 0;

        if (localPart < remotePart) {
            return -1; // Local version is older
        } else if (localPart > remotePart) {
            return 1; // Local version is newer
        }
    }

    return 0; // Versions are equal
}

// Grab latest version from the local file
function checkSilverfoxVersion() {
    console.log("Checking Silverfox version");

    const localVersionFile = "chrome://userscripts/content/version.txt";
    const remoteURL = "https://silverfox.neocities.org/components/JS/currentversion.txt";

    // Fetch local version with timestamp to prevent caching
    fetch(localVersionFile + "?timestamp=" + Date.now())
        .then(response => response.text())
        .then(localVersion => {
            // Fetch remote version with timestamp to prevent caching
            fetch(remoteURL + "?timestamp=" + Date.now())
                .then(response => response.text())
                .then(remoteVersion => {
                    const isCurrent = compareVersions(localVersion.trim(), remoteVersion.trim()) === 0;
                    console.log("Is Silverfox up to date?", isCurrent);

                    const hamburgerButton = document.getElementById("hamburger-button");
                    hamburgerButton.setAttribute("current", isCurrent ? "true" : "false");
                })
                .catch(error => {
                    console.error("Error fetching remote Silverfox version:", error);
                });
        })
        .catch(error => {
            console.error("Error fetching local Silverfox version:", error);
        });
}

// Add an attribute to the hamburger menu according to whether it's up to date or not, and add function to the menu list 
const updateSilverfox = document.querySelector(".update-silverfox");
if (updateSilverfox) {
    checkSilverfoxVersion();

    updateSilverfox.addEventListener("command", function () {
        const spaceHeyURL = "https://silverfox.neocities.org/components/update";
        const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);
        window.gBrowser.selectedTab = newTab;

        checkSilverfoxVersion();
    });
}  
    
});
