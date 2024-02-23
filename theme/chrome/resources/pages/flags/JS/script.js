function toggleFlag(flagName, prefName) {
    var prefValue = getPreference(prefName);
    setPreference(prefName, !prefValue);
    updateSwitchText(flagName);
    showRestartElement(true);
}

function getPreference(prefName) {
    try {
        return Services.prefs.getBoolPref(prefName);
    } catch (e) {
        return false;
    }
}

function setPreference(prefName, value) {
    Services.prefs.setBoolPref(prefName, value);
}

function updateSwitchText(flagName) {
    var switchElement = document.querySelector(`.enableSwitch[data-flag="${flagName}"] a`);
    var prefValue = getPreference(getPrefName(flagName));
    switchElement.textContent = prefValue ? 'Disable' : 'Enable';
}

function getPrefName(flagName) {
    var flagToPrefMap = {
        'Be Chromium': 'silverfox.beChromium',
        'Icons on System Theme': 'silverfox.systemThemeIcons',
        'Be Chrome OS': 'silverfox.beChromeOS',
        'Enable Aero Glass': 'silverfox.hasAeroGlass',
        'Restore Old Look': 'silverfox.preferOldLook',
        'Icons on System Theme': 'silverfox.systemThemeIcons',
        'Allow Homepage Images': 'silverfox.hasLocalImage',
        'Enable Profile Pictures': 'silverfox.usepfp',
        'Force Windows Styling': 'silverfox.forceWindowsStyling'
    };
    return flagToPrefMap[flagName];
}

function showRestartElement(show) {
    document.querySelector('.restartFirefox').style.display = show ? 'block' : 'none';
}

function setUsePfpPreference() {
    var dropdown = document.querySelector('.ddOptions');
    var selectedOption = dropdown.options[dropdown.selectedIndex].value;
    Services.prefs.setCharPref('silverfox.usepfp', selectedOption); 
    showRestartElement(true);
}
