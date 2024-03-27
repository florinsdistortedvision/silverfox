function toggleFlag(flagName, prefName) {
    var prefValue = !getPreference(prefName);
    setPreference(prefName, prefValue);
    updateSwitchText(flagName);
    showRestartElement(true);
}

function getPreference(prefName) {
    if (typeof prefName !== 'string') {
        console.error('Preference name must be a string.');
        return null;
    }
    
    if (Services.prefs.prefHasUserValue(prefName)) {
        if (Services.prefs.getPrefType(prefName) === Ci.nsIPrefBranch.PREF_BOOL) {
            return Services.prefs.getBoolPref(prefName);
        } else if (Services.prefs.getPrefType(prefName) === Ci.nsIPrefBranch.PREF_INT) {
            return Services.prefs.getIntPref(prefName);
        }
    }
    
    return null;
}

function setPreference(prefName, value) {
    switch (typeof value) {
        case 'boolean':
            Services.prefs.setBoolPref(prefName, value);
            break;
        case 'number':
            Services.prefs.setIntPref(prefName, value);
            break;
        default:
            console.error('Unsupported preference value type.');
    }
}

function updateSwitchText(flagName) {
    var switchElement = document.querySelector(`.enableSwitch[data-flag="${flagName}"] a`);
    var prefValue = getPreference(getPrefName(flagName));
    switchElement.textContent = prefValue ? 'Disable' : 'Enable';
}

function getPrefName(flagName) {
    var flagToPrefMap = {
        'Be Chromium': 'silverfox.beChromium',
        'Be Chrome OS': 'silverfox.beChromeOS',
        'Standard Icons on System Theme': 'silverfox.disableSystemThemeIcons',
        'Restore Old Look': 'silverfox.preferOldLook',
        'Allow Homepage Images': 'silverfox.hasLocalImage',
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