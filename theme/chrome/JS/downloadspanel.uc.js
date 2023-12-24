// ==UserScript==
// @name         Silverfox Downloads Panel
// @version      1.0
// @description  Changes DownloadsPanel to a Div and creates a Close button
// @author       florin
// ==/UserScript==

(function() {
    'use strict';

    function convertToDiv(element) {
        var newDiv = document.createElement('div');

        for (var i = 0; i < element.attributes.length; i++) {
            var attr = element.attributes[i];
            newDiv.setAttribute(attr.name, attr.value);
        }

        while (element.firstChild) {
            newDiv.appendChild(element.firstChild);
        }

        element.parentNode.replaceChild(newDiv, element);

        return newDiv;
    }

    function addHideButton(targetDiv) {
        var hideButton = document.createElement('button');
        hideButton.textContent = '';

        hideButton.classList.add('downloads-hide-button-class');
        hideButton.id = 'downloadsHideButtonID';

        hideButton.addEventListener('click', function() {
            targetDiv.style.display = (targetDiv.style.display === 'none') ? '' : 'none';
        });

        targetDiv.appendChild(hideButton);
    }

    function toggleVisibilityBasedOnRichlistItems() {
        var richlistbox = document.getElementById('downloadsListBox');
        var newDiv = document.getElementById('downloadsPanel');

        if (richlistbox && newDiv) {
            var richlistitems = richlistbox.getElementsByClassName('download-state');
            newDiv.style.display = richlistitems.length > 0 ? '' : 'none';
        }
    }

    var downloadsPanel = document.getElementById('downloadsPanel');
    var downloadsPanelMultiView = document.getElementById('downloadsPanel-multiView');
    var downloadsPanelMainView = document.getElementById('downloadsPanel-mainView');
    var downloadsPanelBlockedSubview = document.getElementById('downloadsPanel-blockedSubview');

    if (downloadsPanel) {
        var newDiv = convertToDiv(downloadsPanel);
        addHideButton(newDiv);
    }

    if (downloadsPanelMultiView) {
        var newDiv = convertToDiv(downloadsPanelMultiView);
        addHideButton(newDiv);
    }

    if (downloadsPanelMainView) {
        var newDiv = convertToDiv(downloadsPanelMainView);
        addHideButton(newDiv);
    }

    if (downloadsPanelBlockedSubview) {
        var newDiv = convertToDiv(downloadsPanelBlockedSubview);
        addHideButton(newDiv);
    }

    var richlistbox = document.getElementById('downloadsListBox');

    if (richlistbox) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('download-state')) {
                        node.setAttribute('orient', 'horizontal-reverse');
                        toggleVisibilityBasedOnRichlistItems();
                    }
                });
            });
        });

        observer.observe(richlistbox, { childList: true });
    }

    toggleVisibilityBasedOnRichlistItems();
	
function openGoogleSearch(event) {
  event.preventDefault();

  const window = event.target.ownerDocument.defaultView;
  switchToTabHavingURI('about:downloads', true);

  const paste = readFromClipboard();

  if (paste) {
    const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(paste);
    gBrowser.selectedTab = gBrowser.addTab(searchURL);
  }
}

var downloadsHistoryButton = document.getElementById('downloadsHistory');

if (downloadsHistoryButton) {
  downloadsHistoryButton.addEventListener('click', openGoogleSearch);
}
})();
