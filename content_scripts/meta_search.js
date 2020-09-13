document.body.style.border = "5px solid red";

function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

function createSearchLink(id, href, imgUrl) {
    const anchor = document.createElement("a");
    anchor.id = id;
    anchor.href = href;
    const img = document.createElement("img");
    img.src = imgUrl;
    img.width = 32;
    img.height = 32;
    anchor.appendChild(img);
    return anchor;
}

function createFlexContainer() {
    const flexContainer = document.createElement("div");
    flexContainer.style.display = "flex";
    flexContainer.style.flexDirection = "row";
    return flexContainer;
}

// function createGridContainer() {
//     const gridContainer = document.createElement("div");
//     gridContainer.style.display = "grid";
//     gridContainer.style.gridTemplateColumns = "auto 1fr";
//     gridContainer.style.gridTemplateRows = "auto";
//     return gridContainer;
// }

function googleMetaSearch(metaSearchAnchors) {
    const searchForm = Array.from(document.forms).find(f => f.action.endsWith("/search"));
    const searchInput = Array.from(searchForm.getElementsByTagName("input")).find(i => i.name === "q");
    const searchAreaContainer = searchInput.parentElement.parentElement.parentElement;
    
    const searchAreaContainerWrapper = createFlexContainer();
    wrap(searchAreaContainer, searchAreaContainerWrapper);

    for (const anchor of metaSearchAnchors) {
        anchor.style.margin = "auto";
        anchor.style.padding = "4px 4px 0px 16px";
        searchAreaContainerWrapper.appendChild(anchor);
    }
}

function ecosiaMetaSearch(metaSearchAnchors) {
    const searchForm = Array.from(document.forms).find(f => f.action.endsWith("/search"));
    const searchInput = Array.from(searchForm.getElementsByTagName("input")).find(i => i.name === "q");
    const searchAreaContainer = searchInput.parentElement.parentElement;

    const searchAreaContainerWrapper = createFlexContainer();
    wrap(searchAreaContainer, searchAreaContainerWrapper);

    for (const anchor of metaSearchAnchors) {
        anchor.style.margin = "auto";
        anchor.style.padding = "4px 4px 0px 16px";
        searchAreaContainerWrapper.appendChild(anchor);
    }
}

function bingMetaSearch(metaSearchAnchors) {
    const searchForm = Array.from(document.forms).find(f => f.action.endsWith("/search"));
    const searchInput = Array.from(searchForm.getElementsByTagName("input")).find(i => i.name === "q");
    const searchAreaContainer = searchInput.parentElement.parentElement;

    const searchAreaContainerWrapper = createFlexContainer();
    wrap(searchAreaContainer, searchAreaContainerWrapper);
    const iconsContainer = createFlexContainer();
    searchAreaContainerWrapper.appendChild(iconsContainer);

    for (const anchor of metaSearchAnchors) {
        anchor.style.margin = "auto";
        anchor.style.padding = "4px 4px 0px 16px";
        iconsContainer.appendChild(anchor);
    }
}

function duckduckgoMetaSearch(metaSearchAnchors) {
    const searchForm = Array.from(document.forms).find(f => f.action.endsWith("/"));
    const searchInput = Array.from(searchForm.getElementsByTagName("input")).find(i => i.name === "q");
    const searchAreaContainer = searchInput.parentElement.parentElement.parentElement;

    searchAreaContainer.style.paddingRight = "unset";
    const searchAreaContainerWrapper = createFlexContainer();
    wrap(searchAreaContainer, searchAreaContainerWrapper);
    //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax
    searchAreaContainer.style.flex = "1 0 0";
    const iconsContainer = createFlexContainer();
    searchAreaContainerWrapper.appendChild(iconsContainer);

    for (const anchor of metaSearchAnchors) {
        anchor.style.margin = "auto";
        anchor.style.padding = "4px 4px 0px 16px";
        iconsContainer.appendChild(anchor);
    }
}

const domainConfig = {
    google: {
        baseUrl: "https://google.com/search?q=",
        iconUrl: "https://google.com/favicon.ico",
        id: "5f65cbf0-2b1c-4a0d-a9f1-1e2f31fcc23c",
        setupFunc: googleMetaSearch,
    },
    ecosia: {
        baseUrl: "https://ecosia.org/search?q=",
        iconUrl: "https://cdn.ecosia.org/assets/images/ico/favicon.ico",
        id: "719a2e5c-e819-4b30-934c-06bfed6c4e0d",
        setupFunc: ecosiaMetaSearch,
    },
    bing: {
        baseUrl: "https://www.bing.com/search?q=",
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Bing_favicon.svg",
        id: "f54d4772-369a-494b-b8c7-ae9495b9b516",
        setupFunc: bingMetaSearch,
    },
    duckduckgo: {
        baseUrl: "https://duckduckgo.com/search?q=",
        iconUrl: "https://duckduckgo.com/favicon.ico",
        id: "f3dfab76-5b65-4604-95ef-9e3cb7a8a59f",
        setupFunc: duckduckgoMetaSearch,
    },
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
try {
    if (urlParams.has("q")) {
        const searchString = urlParams.get("q");
        const hostName = window.location.hostname;
        const supportedDomains = Object.keys(domainConfig);
        const currentDomain = supportedDomains.find(d => hostName.match(d));
        if (currentDomain) {
            const currentConfig = domainConfig[currentDomain];
            const otherDomains = supportedDomains.filter(d => d !== currentDomain);
            const metaSearchAnchors = otherDomains.map(d => {
                const config = domainConfig[d];
                return createSearchLink(config.id, `${config.baseUrl}${searchString}`, config.iconUrl);
            });
            currentConfig.setupFunc(metaSearchAnchors);
        }
    }
}
catch (e) {
    console.error(e);
}


