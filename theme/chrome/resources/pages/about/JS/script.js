document.addEventListener("DOMContentLoaded", function() {
    let isChromium = Services.prefs.getBoolPref("silverfox.beChromium", false);
    let isChromeOS = Services.prefs.getBoolPref("silverfox.beChromeOS", false);

    let chromeChromiumName = document.querySelector(".chromeChromiumName");
    let browserName = document.querySelector(".browserName");
    let silverfoxName = document.querySelector(".silverfoxBranding");
    let versionNumber = document.querySelector(".chromeVersion");
    let helpChromeButton = document.querySelector(".helpChrome");
    let isUptoDate = document.querySelector(".isUptoDate");
    let copyrightSection = document.querySelector(".copyrightSection");

    if (isChromium) {
        if (chromeChromiumName) chromeChromiumName.textContent = "Chromium";
        if (browserName) {
            browserName.textContent = "Chromium";
            browserName.setAttribute("chromium", "true");
            browserName.removeAttribute("chrome");
        }
        if (helpChromeButton) helpChromeButton.textContent = "Get help with using Chromium";
        if (versionNumber) versionNumber.textContent = "Version 24.0.1282.0 (159411)";
        if (isUptoDate) isUptoDate.textContent = "Chromium is up to date.";
        if (silverfoxName) silverfoxName.textContent = "Chromium (Silverfox)";
        if (copyrightSection) copyrightSection.textContent = "Copyright © 2006-2012 The Chromium Authors. © 2023-2024 florin. All Rights Reserved.";
    } else {
        if (browserName) {
            browserName.setAttribute("chrome", "true");
            browserName.removeAttribute("chromium");
        }
    }

    if (isChromeOS) {
        if (chromeChromiumName) chromeChromiumName.textContent = "Chrome OS";
        if (helpChromeButton) helpChromeButton.textContent = "Get help with using Chrome OS";
        if (isUptoDate) isUptoDate.textContent = "Chrome OS is up to date.";
    }
});
