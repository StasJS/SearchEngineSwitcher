document.body.style.border = "5px solid red";

const googleBaseUrl = "https://google.com/";
const ecosiaBaseUrl = "https://ecosia.org/";
const ecosiaIconUrl = "https://cdn.ecosia.org/assets/images/ico/favicon.ico";

function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

function googleMetaSearch(searchString) {
    // const searchForm = Array.from(document.forms).find(f => f.action.endsWith("/search"));
    // if (!searchForm) {
    //     console.error(`Could not find search form on Google.com`);
    //     return;
    // }

    // const searchFormButtons = Array.from(searchForm.getElementsByTagName("button"));
    // const searchButton = searchFormButtons.find(b => b.getAttribute("aria-label") === "Google Search") || searchFormButtons.find(b => b.type === "submit");
    // if (!searchButton) {
    //     console.error(`Could not find search button anchor on Google.com`);
    //     return;
    // }

    var googleLogoElement = document.getElementById("logo");
    const logoContainer = googleLogoElement.parentElement;
    const searchAreaContainer = logoContainer.nextSibling;

    const anchor = document.createElement("a");
    anchor.id = "meta-search-ecosia";
    anchor.href = `${ecosiaBaseUrl}search?q=${searchString}`;
    anchor.style.margin = "auto";
    anchor.style.padding = "4px 4px 0px 16px";
    const img = document.createElement("img");
    img.src = `${ecosiaIconUrl}`;
    img.width = 34;
    img.height = 34;
    anchor.appendChild(img);
    const searchAreaContainerWrapper = document.createElement("div");
    searchAreaContainerWrapper.style.display = "flex";
    searchAreaContainerWrapper.style.flexDirection = "row";
    wrap(searchAreaContainer, searchAreaContainerWrapper);
    searchAreaContainerWrapper.appendChild(anchor);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
try {
    if (urlParams.has("q")) {
        const searchString = urlParams.get("q");
        const hostName = window.location.hostname;
        if (hostName.match("google")) {
            googleMetaSearch(searchString);
        }
        else if (hostName.match("duckduckgo")) {
    
        }
        else if (hostName.match("bing")) {
    
        }
        else if (hostName.match("ecosia")) {
    
        }
    }
}
catch (e) {
    console.error(e);
}


