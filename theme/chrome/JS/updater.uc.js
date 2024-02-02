window.addEventListener("load", function () {

// Current SF version
const currentSilverfoxVersion = "0.5.1";

  // Function to compare version numbers
function compareVersions(localVersion, remoteVersion) {
  const localParts = localVersion.split('.').map(Number);
  const remoteParts = remoteVersion.split('.').map(Number);

  const maxLength = Math.max(localParts.length, remoteParts.length);

  for (let i = 0; i < maxLength; i++) {
    const localPart = localParts[i] || 0;
    const remotePart = remoteParts[i] || 0;

    if (localPart < remotePart) {
      return -1; // Local version is older
    } else if (localPart > remotePart) {
      return 1; // Local version is newer
    }
}

  return 0; // Versions are equal
}

  // Grab latest version from the website    
  function checkSilverfoxVersion() {
    console.log("Checking Silverfox version");

    const remoteURL = "https://silverfox.neocities.org/components/JS/currentversion.txt?timestamp=" + Date.now();

    fetch(remoteURL)
      .then(response => response.text())
      .then(remoteVersion => {
        const isCurrent = compareVersions(currentSilverfoxVersion.trim(), remoteVersion.trim()) === 0;
        console.log("Is Silverfox up to date?", isCurrent);

        const hamburgerButton = document.getElementById("hamburger-button");
        hamburgerButton.setAttribute("current", isCurrent ? "true" : "false");
      })
      .catch(error => {
        console.error("Error checking Silverfox version:", error);
      });
  }

  // Add an attribute to the hamburger menu according to whether it's up to date or not, and add function to the menu list 
  const updateSilverfox = document.querySelector(".update-silverfox");
  if (updateSilverfox) {
    checkSilverfoxVersion();

    updateSilverfox.addEventListener("command", function () {
      const spaceHeyURL = "https://silverfox.neocities.org/components/update";
      const newTab = window.gBrowser.addTrustedTab(spaceHeyURL);
      window.gBrowser.selectedTab = newTab;

      checkSilverfoxVersion();
    });
  }

});
