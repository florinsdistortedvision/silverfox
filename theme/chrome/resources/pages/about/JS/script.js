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
        if (browserName) {
            browserName.textContent = "Chromium";
            browserName.setAttribute("chromium", "true");
            browserName.removeAttribute("chrome");
        }
        if (silverfoxName) silverfoxName.textContent = "Chromium (Silverfox)";
        if (copyrightSection) copyrightSection.textContent = "Copyright © 2006-2012 The Chromium Authors. © 2023-2024 florin. All Rights Reserved.";
    } else {
        if (browserName) {
            browserName.setAttribute("chrome", "true");
            browserName.removeAttribute("chromium");
        }
    }
    if (isChromeOS) {
        if (isChromium) {
            if (chromeChromiumName) chromeChromiumName.textContent = "Chromium OS";
            if (helpChromeButton) helpChromeButton.textContent = "Get help with using Chromium OS";
            if (isUptoDate) isUptoDate.textContent = "Chromium OS is up to date.";
            if (versionNumber) versionNumber.textContent = "37.0.2062.119 (Platform version: 5978.80.0/5978.81.0)";
        } else {
            if (chromeChromiumName) chromeChromiumName.textContent = "Chrome OS";
            if (helpChromeButton) helpChromeButton.textContent = "Get help with using Chrome OS";
            if (isUptoDate) isUptoDate.textContent = "Chrome OS is up to date.";
            if (versionNumber) versionNumber.textContent = "37.0.2062.119 (Platform version: 5978.80.0/5978.81.0)";
        }
    } else {
        if (isChromium) {
            if (chromeChromiumName) chromeChromiumName.textContent = "Chromium";
            if (helpChromeButton) helpChromeButton.textContent = "Get help with using Chromium";
            if (isUptoDate) isUptoDate.textContent = "Chromium is up to date.";
            if (versionNumber) versionNumber.textContent = "Version 24.0.1282.0 (159411)";
        }
    }
});
