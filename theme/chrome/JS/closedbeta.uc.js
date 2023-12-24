document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  const openBeta = function (event) {
    event.preventDefault();

    const URL = "https://silverfox.neocities.org/closedbeta";
    const newTab = window.gBrowser.addTrustedTab(URL);
    window.gBrowser.selectedTab = newTab;
  };

  const addButton = () => {
    const placesToolbar = document.getElementById("PlacesToolbarItems");

    if (placesToolbar) {
      const existingBookmarkItems = placesToolbar.getElementsByClassName("silverfox-bookmark");

      if (existingBookmarkItems.length === 0) {
        const silverfoxBookmark = document.createElement("toolbarbutton");
        silverfoxBookmark.setAttribute("class", "silverfox-bookmark");
        silverfoxBookmark.setAttribute("id", "silverfox-bookmark");
        silverfoxBookmark.setAttribute("value", "Silverfox Beta");

        placesToolbar.insertBefore(silverfoxBookmark, placesToolbar.firstChild);
        silverfoxBookmark.addEventListener("mouseup", openBeta);
        observer.disconnect();
      }
    }
  };

  const observer = new MutationObserver(addButton);
  observer.observe(document.body, { childList: true, subtree: true });
});
