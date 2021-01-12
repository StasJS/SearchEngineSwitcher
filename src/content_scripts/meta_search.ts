/* eslint-disable no-console */
import config, {
	Bing,
	DuckDuckGo,
	Ecosia,
	Google,
	SearchEngineConfig,
	SearchEngineName
} from "../searchEngineConfig";
import { Store } from "webext-redux";
import { RootState } from "../rootReducer";

function assertExists<T extends HTMLElement>(
	element: T | null | undefined,
	errorMessage: string
): T {
	if (!element) {
		throw new Error(errorMessage);
	}
	return element;
}

function wrap(el: HTMLElement, wrapper: HTMLElement) {
	el.parentNode?.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}

function createSearchLink(
	id: string,
	href: string,
	imgUrl: URL
): HTMLAnchorElement {
	const anchor = document.createElement("a");
	anchor.id = id;
	anchor.href = href;
	const img = document.createElement("img");
	img.src = imgUrl.href;
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

function googleMetaSearch(metaSearchAnchors: HTMLAnchorElement[]) {
	const searchForm = assertExists(
		Array.from(document.forms).find((f) => f.action.endsWith("/search")),
		"Cannot find Google search form"
	);
	const searchInput = assertExists(
		Array.from(searchForm.getElementsByTagName("input")).find(
			(i) => i.name === "q"
		),
		"Cannot find Google search input"
	);
	const searchAreaContainer = assertExists(
		searchInput.parentElement?.parentElement?.parentElement,
		"Cannot find search input container"
	);

	const searchAreaContainerWrapper = createFlexContainer();
	wrap(searchAreaContainer, searchAreaContainerWrapper);

	for (const anchor of metaSearchAnchors) {
		anchor.style.margin = "auto";
		anchor.style.padding = "4px 4px 0px 16px";
		searchAreaContainerWrapper.appendChild(anchor);
	}
}

function ecosiaMetaSearch(metaSearchAnchors: HTMLAnchorElement[]) {
	const searchForm = assertExists(
		Array.from(document.forms).find((f) => f.action.endsWith("/search")),
		"Cannot find Ecosia search form"
	);
	const searchInput = assertExists(
		Array.from(searchForm.getElementsByTagName("input")).find(
			(i) => i.name === "q"
		),
		"Cannot find Ecosia search input"
	);
	const searchAreaContainer = assertExists(
		searchInput.parentElement?.parentElement,
		"Cannot find Ecosia search input container"
	);

	const searchAreaContainerWrapper = createFlexContainer();
	wrap(searchAreaContainer, searchAreaContainerWrapper);

	for (const anchor of metaSearchAnchors) {
		anchor.style.margin = "auto";
		anchor.style.padding = "4px 4px 0px 16px";
		searchAreaContainerWrapper.appendChild(anchor);
	}
}

function bingMetaSearch(metaSearchAnchors: HTMLAnchorElement[]) {
	const searchForm = assertExists(
		Array.from(document.forms).find((f) => f.action.endsWith("/search")),
		"Cannot find Bing search form"
	);
	const searchInput = assertExists(
		Array.from(searchForm.getElementsByTagName("input")).find(
			(i) => i.name === "q"
		),
		"Cannot find Bing search input"
	);
	const searchAreaContainer = assertExists(
		searchInput.parentElement?.parentElement,
		"Cannot find Bing search input container"
	);

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

function duckduckgoMetaSearch(metaSearchAnchors: HTMLAnchorElement[]) {
	const searchForm = assertExists(
		Array.from(document.forms).find((f) => f.action.endsWith("/")),
		"Cannot find DuckDuckGo search form"
	);
	const searchInput = assertExists(
		Array.from(searchForm.getElementsByTagName("input")).find(
			(i) => i.name === "q"
		),
		"Cannot find DuckDuckGo search input"
	);
	const searchAreaContainer = assertExists(
		searchInput.parentElement?.parentElement?.parentElement,
		"Cannot find DuckDuckGo search input container"
	);

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

function matchConfigOnHostName(
	searchEngineNames: SearchEngineName[],
	currentHostName: string
): [SearchEngineName, SearchEngineConfig] | null {
	const trimWWWprefix = (s: string) => s.replace(/^www\./, "");
	const match = Array.from(searchEngineNames).find(
		(s) =>
			trimWWWprefix(config[s].baseUrl.hostname) ===
			trimWWWprefix(currentHostName)
	);
	if (!match) {
		return null;
	}
	return [match, config[match]];
}

function injectHtml(
	searchEngine: SearchEngineName,
	anchors: HTMLAnchorElement[]
) {
	switch (searchEngine) {
		case Google:
			return googleMetaSearch(anchors);
		case Ecosia:
			return ecosiaMetaSearch(anchors);
		case DuckDuckGo:
			return duckduckgoMetaSearch(anchors);
		case Bing:
			return bingMetaSearch(anchors);
	}
}

const store = new Store<RootState>();
store.ready().then(() => {
	const searchEngines = store.getState().searchEngines;
	const activeSearchEngines = searchEngines.order.filter(
		(se) => searchEngines.settings[se].enabled
	);

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	try {
		if (urlParams.has("q")) {
			const searchString = urlParams.get("q");
			const match = matchConfigOnHostName(
				activeSearchEngines,
				window.location.hostname
			);
			if (match) {
				const [currentSearchEngine] = match;
				const otherNames = activeSearchEngines.filter(
					(se) => se !== currentSearchEngine
				);
				const metaSearchAnchors = otherNames.map((otherName) => {
					const otherConfig = config[otherName];
					return createSearchLink(
						otherConfig.id,
						`${otherConfig.baseUrl}${searchString}`,
						otherConfig.iconUrl
					);
				});
				injectHtml(currentSearchEngine, metaSearchAnchors);
			} else {
				console.error(`Could not match ${window.location.hostname} to config`);
			}
		} else {
			console.error("URL parameters does not contain 'q'");
		}
	} catch (e) {
		console.error(e);
	}
});
