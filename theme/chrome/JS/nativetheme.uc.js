// ==UserScript==
// @name         Silverfox Native Theme attribute
// @version      1.0
// @description  Adds native="true" attribute to root to make working with native theme easier
// @author       florin
// ==/UserScript==

window.addEventListener("load", function () {
    const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

    function addNativeAttribute() {
      document.documentElement.setAttribute('native', 'true');
    }
  
    function removeNativeAttribute() {
      document.documentElement.removeAttribute('native');
    }
  
    function monitorPreference() {
      if (Services.prefs.getCharPref("extensions.activeThemeID") === 'default-theme@mozilla.org') {
        addNativeAttribute();
      } else {
        removeNativeAttribute();
      }
    }
  
    monitorPreference();
  
    setInterval(monitorPreference, 1000);
  });
  