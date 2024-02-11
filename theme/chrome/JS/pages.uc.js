// ==UserScript==
// @name           Silverfox About Pages
// @version        1.0
// @description    Creates custom about:x pages for Silverfox
// @authoer        florin, based on aminomancer's about:cfg 1.2.4 script
// @grant          none
// ==/UserScript==

const customAboutPages = {
    "flags": "chrome://userchrome/content/pages/flags/flags.xhtml",
    "bookmarks": "chrome://browser/content/places/bookmarksSidebar.xhtml",
    "history": "chrome://browser/content/places/historySidebar.xhtml",
    "silverfox": "chrome://userchrome/content/pages/about/about.xhtml",
    "privatebrowsing": "chrome://userchrome/content/pages/incognito/incognito.xhtml",
    "credits": "https://silverfox.neocities.org/components/redirector/redirect_credits",
    "home": "chrome://userchrome/content/pages/homepage/homepage.xhtml",
    "newtab": "chrome://userchrome/content/pages/homepage/homepage.xhtml",
    "intro": "https://silverfox.neocities.org/components/redirector/redirect_intro"
};

let { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
let { manager: Cm } = Components;
let registrar = Cm.QueryInterface(Ci.nsIComponentRegistrar);

function generateFreeCID() {
    let uuid = Components.ID(Services.uuid.generateUUID().toString());
    while (registrar.isCIDRegistered(uuid)) {
        uuid = Components.ID(Services.uuid.generateUUID().toString());
    }
    return uuid;
}

function createCustomAboutModule(url) {
    function CustomAboutPage() {}

    CustomAboutPage.prototype = {
        get uri() {
            return this._uri || (this._uri = Services.io.newURI(url));
        },
        newChannel(_uri, loadInfo) {
            const ch = Services.io.newChannelFromURIWithLoadInfo(this.uri, loadInfo);
            ch.owner = Services.scriptSecurityManager.getSystemPrincipal();
            return ch;
        },
        getURIFlags(_uri) {
            return Ci.nsIAboutModule.ALLOW_SCRIPT | Ci.nsIAboutModule.IS_SECURE_CHROME_UI;
        },
        getChromeURI(_uri) {
            return this.uri;
        },
        QueryInterface: ChromeUtils.generateQI(["nsIAboutModule"]),
    };

    return CustomAboutPage;
}

Object.entries(customAboutPages).forEach(([aboutPage, url]) => {
    let factory = {
        createInstance(aIID) {
            return new (createCustomAboutModule(url))().QueryInterface(aIID);
        },
        QueryInterface: ChromeUtils.generateQI(["nsIFactory"]),
    };

    registrar.registerFactory(
        generateFreeCID(),
        `about:${aboutPage}`,
        `@mozilla.org/network/protocol/about;1?what=${aboutPage}`,
        factory
    );
});
