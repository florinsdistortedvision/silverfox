// ==UserScript==
// @name         Silverfox Home Button Fix
// @version      1.0
// @description  Adds a attribute to make working with CSS easier
// @author       florin
// ==/UserScript==

(function () {
  function updateHomeAttribute() {
    const navBar = document.getElementById('nav-bar');
    const homeButton = document.getElementById('home-button');

    if (navBar) {
      const isHomeInNavBar = homeButton && navBar.contains(homeButton);

      navBar.setAttribute('home', isHomeInNavBar ? 'true' : 'false');
    }
  }

  updateHomeAttribute();

  setInterval(updateHomeAttribute, 1000); // Adjust the interval as needed
})();
