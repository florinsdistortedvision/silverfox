window.addEventListener("load", function () {

// Current SF version
const currentSilverfoxVersion = "0.5";

// Grab latest version from website    
function checkSilverfoxVersion() {
  console.log("Checking Silverfox version");

  const remoteURL = "https://silverfox.neocities.org/updater/currentversion.txt?timestamp=" + Date.now();

  fetch(remoteURL)
    .then(response => response.text())
    .then(remoteVersion => {
      const isCurrent = remoteVersion.trim() === currentSilverfoxVersion.trim();
      console.log("Is Silverfox up to date?", isCurrent);

      const hamburgerButton = document.getElementById("hamburger-button");
      hamburgerButton.setAttribute("current", isCurrent ? "true" : "false");
    })
    .catch(error => {
      console.error("Error checking Silverfox version:", error);
    });
}

// Add a attribute to hamburger menu according to if up to date or not, and add function to menulist 
const updateSilverfox = document.querySelector(".update-silverfox");
if (updateSilverfox) {
    checkSilverfoxVersion();
    
  updateSilverfox.addEventListener("command", function () {
    const spaceHeyURL = "https://silverfox.neocities.org/updater/letsupdate";
    const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);
    window.gBrowser.selectedTab = newTab;
      
    checkSilverfoxVersion();
  });
}    
    
});    