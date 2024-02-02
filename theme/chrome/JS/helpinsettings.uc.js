// ==UserScript==
// @name            New Help Menu in Settings
// @version         1.0
// @description     Adds a new help menu to about:preferences
// @author          florin
// @include         about:preferences
// @include         about:preferences#home
// @include         about:preferences#general
// @include         about:preferences#search
// @include         about:preferences#privacy
// @include         about:preferences#sync
// ==/UserScript==


document.addEventListener("DOMContentLoaded", function() {
(function() {
    try {
      let categoriesBox = document.getElementById("categories");
  
      if (categoriesBox) {
        let newItem = document.createElement("richlistitem");
        newItem.setAttribute("id", "custom-help");
        newItem.setAttribute("class", "category");
        newItem.setAttribute("value", "custom-pane");
        newItem.setAttribute("align", "center");
  
        let img = document.createElement("image");
        img.setAttribute("class", "category-icon");
        newItem.appendChild(img);
  
        let label = document.createElement("label");
        label.setAttribute("class", "category-name");
        label.setAttribute("flex", "1");
        label.textContent = "Help";
        newItem.appendChild(label);
  
        categoriesBox.appendChild(newItem);
  
        newItem.addEventListener("click", function() {
          window.location.href = "chrome://userchrome/content/pages/about/about.xhtml";
        });
      }
    } catch (e) {
      console.error("Error in userChrome.js:", e);
    }
  })();

});