document.addEventListener('DOMContentLoaded', function() {
    var isChromium = false; // default value

    try {
        isChromium = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefService)
            .getBranch("silverfox.")
            .getBoolPref("beChromium");
    } catch (e) {
        console.error("Error getting preference:", e);
    }

    updateContent(isChromium);
});

function updateContent(isChromium) {
    var chromeChromiumElement = document.querySelector('.becauseChromeChromum');

    while (chromeChromiumElement.firstChild) {
        chromeChromiumElement.removeChild(chromeChromiumElement.firstChild);
    }

    var newParagraph = document.createElement('p');

    if (isChromium) {
        newParagraph.innerHTML = "Because Chromium does not control how extensions handle your personal data, all extensions have been disabled for incognito windows. You can reenable them individually in the ";
    } else {
        newParagraph.innerHTML = "Because Google Chrome does not control how extensions handle your personal data, all extensions have been disabled for incognito windows. You can reenable them individually in the ";
    }

    var linkElement = document.createElement('a');
    linkElement.setAttribute('onclick', "BrowserOpenAddonsMgr('addons://list/extension');");
    linkElement.setAttribute('href', "about:addons");
    linkElement.textContent = "extensions manager.";

    newParagraph.appendChild(linkElement);

    chromeChromiumElement.appendChild(newParagraph);
}
