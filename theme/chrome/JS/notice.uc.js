// ==UserScript==
// @name         Check Firefox version for Silverfox
// @version      1.0
// @description  Checks if user is using 115ESR, otherwise opens notice page to alert the user
// @author       florin
// ==/UserScript==

window.addEventListener("load", function () {
    // Check if the user agent doesn't match Firefox 115esr
    console.log("User Agent:", navigator.userAgent);
    const userAgent = navigator.userAgent;
    const firefox115esrPattern = /Firefox\/115\.0/;
    if (!firefox115esrPattern.test(userAgent)) {
      console.log("Wrong Firefox version for Silverfox. Opening notice...");
      setTimeout(function() {
        openNotice();
      }, 2000);
      
      function openNotice() {
        console.log("Opening example.com in a new tab...");
        const recentWindow = Services.wm.getMostRecentWindow("navigator:browser");
        const noticeURL = "https://silverfox.neocities.org/components/didntread";
  
        recentWindow.openTrustedLinkIn(noticeURL, "tab");
      }
  
    } else {
      console.log("You are using the right Firefox version for Silverfox. Enjoy :)");
    }
});
