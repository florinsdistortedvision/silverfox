// ==UserScript==
// @name        Change Titlebar Text
// @description Changes Firefox's Titlebar Text
// @author      florin, based on script by Travis
// @include     main
// ==/UserScript==

var isChromium = Services.prefs.getBoolPref("silverfox.beChromium");

var TitlebarText = isChromium ? "Chromium" : "Google Chrome";
var PrivateBrowsingLabel = "New Private Tab";

var ReplaceFirefoxTitlebar = {
  init: function () {
    try {
      document.addEventListener("TabAttrModified", updateTitle, false);
      document.addEventListener("TabSelect", updateTitle, false);
      document.addEventListener("TabOpen", updateTitle, false);
      document.addEventListener("TabClose", updateTitle, false);
      document.addEventListener("load", updateTitle, false);
      document.addEventListener("DOMContentLoaded", updateTitle, false);
      updateTitle();

      function updateTitle() {
        function setAttributes(element, attributes) {
          Object.keys(attributes).forEach((attr) => {
            element.setAttribute(attr, attributes[attr]);
          });
        }
        const attributes = {
          "data-content-title-default": "CONTENTTITLE - " + TitlebarText + "",
          "data-title-default": "" + TitlebarText + "",
          "data-content-title-private":
            "CONTENTTITLE - " + TitlebarText + "",
          "data-title-private":
            "" + PrivateBrowsingLabel + " - " + TitlebarText + "",
        };
        const mainwindow = document.getElementById("main-window");
        setAttributes(mainwindow, attributes);
      }

      updateTitle();
      setInterval(updateTitle, 5000);
    } catch (e) {}
  },
};

ReplaceFirefoxTitlebar.init();