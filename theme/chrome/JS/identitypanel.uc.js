// ==UserScript==
// @name           Custom Chrome Identity Panel for Silverfox
// @description    Makes custom divs for each section of identity panel
// @author         florin
// @include        main
// ==/UserScript==

(function() {
    // Function to check if the elements are already added
    function elementsAlreadyAdded() {
        return document.querySelector('#identity-popup-multiView .siteInfo') !== null;
    }

    // Function to add divs when the multiView element is available
    function addDivsToMultiView() {
        if (!elementsAlreadyAdded()) {
            var multiView = document.getElementById('identity-popup-multiView');
            if (multiView) {
                var chromePage = document.createElement('div');
                chromePage.className = 'chromePage';
                chromePage.innerHTML = `
                    <div class="secureChrome">
                        <img class="chromeLogo" src="chrome://userchrome/content/pages/about/assets/chromelogo.png"></img>
                        <img class="chromiumLogo" src="chrome://userchrome/content/pages/about/assets/chromiumlogo.png"></img>
                        <p class="chromeView">You are viewing a secure Google Chrome page.</p>
                        <p class="chromiumView">You are viewing a secure Chromium page.</p>
                    </div>  
                `;
                multiView.appendChild(chromePage);

                var siteInfoDiv = document.createElement('div');
                siteInfoDiv.className = 'siteInfo';
                siteInfoDiv.innerHTML = `
                    <div class="firstThing">
                        <p>This website</p>
                        <img class="closepopup" src="chrome://userchrome/content/pages/homepage/assets/close.png"></img>
                    </div>
                    <div class="identityInfo">
                        <p class="identityVerified">Identity verified</p>
                        <p class="identityNotVerified">Identity not verified</p>
                    </div>
                `;
                multiView.appendChild(siteInfoDiv);

                var pagesTabDiv = document.createElement('div');
                pagesTabDiv.className = 'pagesTab';
                pagesTabDiv.innerHTML = `
                    <a class="permissionPage" active="true" href="#">Permissions</a>
                    <a class="connectionPage" href="#">Connection</a>
                    <p class="fakeBorder">a</p>
                `;
                multiView.appendChild(pagesTabDiv);

                var permsViewDiv = document.createElement('div');
                permsViewDiv.className = 'permsView';
                permsViewDiv.setAttribute('active', 'true');
                permsViewDiv.innerHTML = `
                    <div class="cookiesTab">
                        <p>Cookies and site data</p>
                        <a class="clearCookies" onclick="gIdentityHandler.clearSiteData(event);" href="#">Clear cookies and site data</a>
                    </div>
                    <div class="permissionsTab">
                        <p>Permissions</p>
                        <img src="chrome://userchromeassets/content/images/middlebar/permissionspane.png"></img>
                    </div>
                `;
                multiView.appendChild(permsViewDiv);

                var connectionViewDiv = document.createElement('div');
                connectionViewDiv.className = 'connectionView';
                connectionViewDiv.innerHTML = `
                    <div class="verifiedView">
                        <div class="keepMeSafe">
                            <img type="secure" src="chrome://userchromeassets/content/images/middlebar/secureinfo.png"></img>
                            <img type="notsecure" src="chrome://userchromeassets/content/images/middlebar/notsecureinfowarning.png"></img>
                            <img type="runaway" src="chrome://userchromeassets/content/images/middlebar/untrustedinfo.png"></img>
                            <p type="secure">The identity of this website has been verified.</p>
                            <p type="notsecure">The identity of this website has not been verified.</p>
                            <p type="runaway">This website has risk of malware.</p>
                        </div>
                        <a class="certificateInfo" onclick="gIdentityHandler.handleMoreInfoClick(event);" href="#">Certificate information</a>
                    </div>
                    <div class="infoView">
                        <div class="keepMeInfo">
                            <img src="chrome://userchromeassets/content/images/middlebar/siteinfo.png"></img>
                            <p>Site information</p>
                        </div>
                        <p class="visitedToday">You have visited this site today.</p>
                    </div>
                    <a class="whatMean" href="https://shorturl.at/ruvKM">What do these mean?</a>
                `;
                multiView.appendChild(connectionViewDiv);

                const connectionPage = document.querySelector('.connectionPage');
                const connectionView = document.querySelector('.permsView');

                const permissionsPage = document.querySelector('.permissionPage');
                const permissionView = document.querySelector('.connectionView');

                const clearCookies = document.querySelector('.clearCookies');
                const certInfo = document.querySelector('.certificateInfo');
                const whatMean = document.querySelector('.whatMean');

                permissionsPage.setAttribute('active', 'true');
                clearCookies.setAttribute('onclick', 'gIdentityHandler.clearSiteData(event);');
                certInfo.setAttribute('onclick', 'gIdentityHandler.handleMoreInfoClick(event);');
                whatMean.setAttribute('onclick', "window.location.href='https://shorturl.at/ruvKM';")

                connectionPage.onclick = function(event) {
                    event.preventDefault(); 
                    connectionPage.setAttribute('active', 'true');
                    permissionView.setAttribute('active', 'true');

                    permissionsPage.removeAttribute('active');
                    connectionView.removeAttribute('active');
                };

                permissionsPage.onclick = function(event) {
                    event.preventDefault();
                    permissionsPage.setAttribute('active', 'true');
                    connectionView.setAttribute('active', 'true');

                    connectionPage.removeAttribute('active');
                    permissionView.removeAttribute('active');
                };

            } else {
                setTimeout(addDivsToMultiView, 100);
            }
        }  
    }
    document.addEventListener("DOMContentLoaded", addDivsToMultiView);
})();

