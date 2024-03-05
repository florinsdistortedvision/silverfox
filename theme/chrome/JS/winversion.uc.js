// ==UserScript==
// @name         Check Forced Win version and DWM status
// @version      1.1
// @description  Checks which values of xul.dll patch user uses to make working with CSS easier
// @author       florin
// @include      about:addons
// @include      about:flags
// @include      main
// ==/UserScript==

(function() {
    const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

    function setWindowsVersionAndDWMAttribute() {
        // Check Windows version
        let versionPref = Services.prefs.getIntPref("widget.ev-native-controls-patch.override-win-version");
        let rootElement = document.documentElement;

        if (versionPref === 8) {
            console.log("Windows 8 detected.");
            rootElement.setAttribute('win8', 'true');
            rootElement.removeAttribute('win7');
        } else if (versionPref === 0 || versionPref === 10) {
            console.log("Windows is not forced.");
            rootElement.removeAttribute('win7');
            rootElement.removeAttribute('win8');
        } else {
            console.log("Windows 7 detected.");
            rootElement.setAttribute('win7', 'true');
            rootElement.removeAttribute('win8');
        }

        // Check DWM status
        let dwmPref = Services.prefs.getBoolPref("widget.ev-native-controls-patch.force-dwm-report-off");

        if (dwmPref) {
            rootElement.setAttribute('dwm', 'off');
        } else {
            rootElement.removeAttribute('dwm');
        }
    }

    setWindowsVersionAndDWMAttribute();

    Services.obs.addObserver(setWindowsVersionAndDWMAttribute, "nsPref:changed", false);
    setInterval(setWindowsVersionAndDWMAttribute, 1000);

})();
