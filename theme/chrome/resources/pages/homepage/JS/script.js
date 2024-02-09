// Custom Chrome homepage for Silverfox

// Because Firefox doesn't host thumbnails anymore (I think?) I've decided to use this API for them
// It's a free API with only 1k requests per month, so if this runs out for you feel free to make a account and use your own API key
// https://thumbnail.ws/  - (Note: this API is not associated with Silverfox)
// Thankfully it does cache at least :P

function getThumbnail(url) {
  // Replace this with your API key if you decide to change it
  const apiKey = 'ab0bba8d567ead999d113ba2fb732254e7311a76d49b';
  const width = 322;
  const encodedUrl = encodeURIComponent(url);

  return `https://api.thumbnail.ws/api/${apiKey}/thumbnail/get?url=${encodedUrl}&width=${width}`;
}

// This function will get the 8 top sites and their URL, favicon and the thumbnail via above API
function getTopSites() {
  const { PlacesUtils } = Components.utils.import("resource://gre/modules/PlacesUtils.jsm", {});
  
  const options = PlacesUtils.history.getNewQueryOptions();
  options.sortingMode = options.SORT_BY_VISITCOUNT_DESCENDING;
  options.maxResults = 8;

  const query = PlacesUtils.history.getNewQuery();
  query.searchTerms = "";

  const result = PlacesUtils.history.executeQuery(query, options);
  const rootNode = result.root;

  const topSites = [];
  rootNode.containerOpen = true;
  for (let i = 0; i < rootNode.childCount && i < 8; i++) {
    const node = rootNode.getChild(i);
    const url = node.uri;
    const title = node.title;
    const favicon = node.icon;
    const thumbnail = getThumbnail(url);

    topSites.push({ url, title, favicon, thumbnail });
  }
  rootNode.containerOpen = false;

  return topSites;
}

function updateRecentSites(topSites) {
  const recentRows = document.querySelectorAll('.recentRow');

  for (let i = 0; i < recentRows.length && i < topSites.length; i++) {
    const recentRow = recentRows[i];
    const site = topSites[i];

    const favicon = recentRow.querySelector('.faviCon');
    favicon.src = site.favicon;

    const siteURL = recentRow.querySelector('.recentURL');
    siteURL.textContent = site.url;

    const siteThumb = recentRow.querySelector('.siteThumb');
    siteThumb.src = site.thumbnail;

    siteThumb.addEventListener('click', () => {
      navigateToUrl(site.url);
    });

    const removeThis = recentRow.querySelector('.removeThis');
    removeThis.addEventListener('click', () => {
      clearRow(recentRow);
    });
  }
}

function navigateToUrl(url) {
  window.location.href = url;
}

// This function will change those Chrome specific text/images to Chromium depending on pref status
function checkChromiumPreference() {
  const welcomeText = document.querySelector('.welcomeChrome');
  const webStoreImage = document.querySelector('.appImage[type="store"]');
  const logoCornerImage = document.querySelector('.logoCorner');

  const beChromium = Services.prefs.getBoolPref('silverfox.beChromium', false);
 
  if (beChromium) {
    welcomeText.textContent = 'Welcome to Chromium';
    webStoreImage.src = 'chrome://userchrome/content/pages/homepage/assets/addons_app_chromium.png';
    logoCornerImage.src = 'chrome://userchrome/content/pages/homepage/assets/chromiumlogo.png';
  }
}

function clearRow(row) {
  row.innerHTML = getOriginalRowContent();
}

// This will make the "blank" site look if X is pressed
function getOriginalRowContent() {
  return `
    <div type="blankEntry" class="recentThumbnail">
        <div class="removeThis">
            <img class="closeIcon" type="blankClose" src=""></img>
        </div>
        <div class="sitePreview">
            <img class="siteThumb" type="blankSite" src="chrome://userchrome/content/pages/homepage/assets/thumb.png"></img> 
        </div>
        <div class="siteFavicon">
            <img class="faviCon"></img> 
        </div>
        <div class="siteURL">
            <p class="recentURL"></p>
        </div>
    </div>`;
}

// Page switching
function setupPageSwitching() {
  const mostVisitedLink = document.querySelector('.mostVisited');
  mostVisitedLink.addEventListener('click', () => {
    switchToRecentView();
  });

  const appsViewLink = document.querySelector('.appsView');
  appsViewLink.addEventListener('click', () => {
    switchToAppsView();
  });
}

function switchToRecentView() {
  const mainPage = document.querySelector('.mainPage');
  const appsPage = document.querySelector('.appsPage');
  const nextPage = document.querySelector('.switchPage[type="next"]');
  const previousPage = document.querySelector('.switchPage[type="previous"]');
  const mostVisitedLink = document.querySelector('.mostVisited');
  const appsViewLink = document.querySelector('.appsView');

  mainPage.removeAttribute('apps');
  nextPage.removeAttribute('apps');
  mostVisitedLink.removeAttribute('apps');

  appsPage.setAttribute('recent', 'true');
  previousPage.setAttribute('apps', 'true');
  appsViewLink.setAttribute('initial', 'true');
}

function switchToAppsView() {
  const mainPage = document.querySelector('.mainPage');
  const appsPage = document.querySelector('.appsPage');
  const nextPage = document.querySelector('.switchPage[type="next"]');
  const previousPage = document.querySelector('.switchPage[type="previous"]');
  const mostVisitedLink = document.querySelector('.mostVisited');
  const appsViewLink = document.querySelector('.appsView');

  appsPage.removeAttribute('recent');
  appsPage.removeAttribute('initial');
  previousPage.removeAttribute('initial');
  previousPage.removeAttribute('apps');
  appsViewLink.removeAttribute('initial');

  mainPage.setAttribute('apps', 'true');
  nextPage.setAttribute('apps', 'true');
  mostVisitedLink.setAttribute('apps', 'true');
}


// Load everything during page load
window.addEventListener('DOMContentLoaded', () => {
  setupPageSwitching();
  const topSites = getTopSites();
  updateRecentSites(topSites);
  checkChromiumPreference();
});
