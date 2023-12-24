// ==UserScript==
// @name         Silverfox Profile Pictures
// @version      1.0
// @description  Appends a list of values for silverfox.usepfp
// @author       florin
// ==/UserScript==

(function() {
  function applyCustomStyles() {
    const usePfpValue = Services.prefs.getCharPref("silverfox.usepfp");

    const allowedValues = [
      "alien",
      "blondepfp",
      "bluepfp",
      "burger",
      "businessmanpfp",
      "cat",
      "chickpfp",
      "chrome",
	  "chromium",
      "cooldudepfp",
      "cupcake",
      "custom",
      "dog",
      "drink",
      "flower",
      "football",
      "greenpfp",
      "happy",
      "horse",
      "lightbluepfp",
      "music",
      "ninja",
      "orangepfp",
      "pizza",
      "purplepfp",
      "redpfp",
      "weather",
      "whitepfp",
      "yellowpfp",
	  "animated",
      "off"
    ];

    if (allowedValues.includes(usePfpValue)) {
      document.querySelector('.titlebar-spacer:first-child').classList.add(`${usePfpValue}-pfp`);
    }
  }

  window.addEventListener('load', applyCustomStyles);
})();
