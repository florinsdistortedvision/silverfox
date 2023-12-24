// ==UserScript==
// @name         Silverfox NavBar Border Fix
// @version      1.0
// @description  Adds a attribute to navbar to make working with CSS easier
// @author       florin
// ==/UserScript==

(function () {
  const navBar = document.getElementById('nav-bar');
  const placesToolbar = document.getElementById('PersonalToolbar');

  function updateAloneAttribute() {
    if (navBar && placesToolbar) {
      const isCollapsed = placesToolbar.collapsed;
      navBar.setAttribute('alone', isCollapsed.toString());
    }
  }

  placesToolbar.addEventListener('DOMAttrModified', updateAloneAttribute);
  placesToolbar.addEventListener('DOMSubtreeModified', updateAloneAttribute);

  updateAloneAttribute();

})();
