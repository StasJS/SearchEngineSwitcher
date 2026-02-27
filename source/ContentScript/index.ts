/* eslint-disable no-console */
import config, {
  type SearchEngineConfig,
  type SearchEngineName,
  Google,
  Ecosia,
  DuckDuckGo,
  Bing,
  BraveSearch,
} from '../utils/searchEngineConfig';
import {getStorage} from '../utils/storage';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function assertExists<T extends HTMLElement>(
  element: T | null | undefined,
  errorMessage: string
): T {
  if (!element) {
    throw new Error(errorMessage);
  }
  return element;
}

function wrap(intendedChild: HTMLElement, newParent: HTMLElement) {
  intendedChild.parentNode?.insertBefore(newParent, intendedChild);
  newParent.appendChild(intendedChild);
}

function createSearchLink(
  id: string,
  href: string,
  title: string,
  imgUrl: URL
): HTMLAnchorElement {
  const anchor = document.createElement('a');
  anchor.id = id;
  anchor.href = href;
  anchor.title = title;
  const img = document.createElement('img');
  img.src = imgUrl.href;
  img.width = 32;
  img.height = 32;
  anchor.appendChild(img);
  return anchor;
}

function createFlexContainer() {
  const flexContainer = document.createElement('div');
  flexContainer.style.display = 'flex';
  flexContainer.style.flexDirection = 'row';
  return flexContainer;
}

function findSearchInput(
  form: HTMLFormElement
): HTMLInputElement | HTMLTextAreaElement | undefined {
  return (
    form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      'input[name="q"], textarea[name="q"]'
    ) ?? undefined
  );
}

// ---------------------------------------------------------------------------
// Per-engine DOM injection
// ---------------------------------------------------------------------------

function embedHtmlOnGoogle(searchLinks: HTMLAnchorElement[]) {
  const searchForm = assertExists(
    Array.from(document.forms).find((f) => f.action.endsWith('/search')),
    'Cannot find Google search form'
  );
  const searchInput = assertExists(
    findSearchInput(searchForm),
    'Cannot find Google search input'
  );
  const searchAreaContainer = assertExists(
    searchInput.parentElement?.parentElement?.parentElement,
    'Cannot find search input container'
  );

  const searchAreaContainerWrapper = createFlexContainer();
  searchAreaContainerWrapper.id = 'searchengineswitcher-container';
  wrap(searchAreaContainer, searchAreaContainerWrapper);

  for (const anchor of searchLinks) {
    anchor.style.margin = 'auto';
    anchor.style.padding = '4px 4px 0px 16px';
    searchAreaContainerWrapper.appendChild(anchor);
  }
}

function embedHtmlOnEcosia(searchLinks: HTMLAnchorElement[]) {
  const getSearchForm = () =>
    Array.from(document.forms).find((f) => f.action.endsWith('/search'));

  const applyDOMChanges = () => {
    const searchForm = assertExists(
      getSearchForm(),
      'Cannot find Ecosia search form'
    );
    const searchInput = assertExists(
      findSearchInput(searchForm),
      'Cannot find Ecosia search input'
    );
    const searchAreaContainer = assertExists(
      searchInput.parentElement?.parentElement,
      'Cannot find Ecosia search input container'
    );

    if (searchAreaContainer.parentElement?.id !== 'searchengineswitcher-container') {
      const searchAreaContainerWrapper = document.createElement('div');
      searchAreaContainerWrapper.style.display = 'inline-flex';
      searchAreaContainerWrapper.style.alignItems = 'center';
      searchAreaContainerWrapper.style.width = '100%';
      searchAreaContainerWrapper.id = 'searchengineswitcher-container';
      wrap(searchAreaContainer, searchAreaContainerWrapper);

      // Prevent the search bar from shrinking to accommodate icons
      searchAreaContainer.style.flexShrink = '0';
      searchAreaContainer.style.flexGrow = '1';

      for (const anchor of searchLinks) {
        anchor.style.margin = 'auto';
        anchor.style.padding = '4px 4px 0px 16px';
        anchor.style.flexShrink = '0';
        searchAreaContainerWrapper.appendChild(anchor);
      }
    }
  };

  const mutationObserver = new MutationObserver(() => {
    if (!document.getElementById('searchengineswitcher-container')) {
      applyDOMChanges();
    }
  });

  applyDOMChanges();
  mutationObserver.observe(document.body, {childList: true, subtree: true});
}

function embedHtmlOnBing(searchLinks: HTMLAnchorElement[]) {
  const searchForm = assertExists(
    Array.from(document.forms).find((f) => f.action.endsWith('/search')),
    'Cannot find Bing search form'
  );
  const searchInput = assertExists(
    findSearchInput(searchForm),
    'Cannot find Bing search input'
  );
  const searchAreaContainer = assertExists(
    searchInput.parentElement?.parentElement,
    'Cannot find Bing search input container'
  );

  const searchAreaContainerWrapper = createFlexContainer();
  searchAreaContainerWrapper.id = 'searchengineswitcher-container';
  wrap(searchAreaContainer, searchAreaContainerWrapper);

  const iconsContainer = createFlexContainer();
  searchAreaContainerWrapper.appendChild(iconsContainer);

  for (const anchor of searchLinks) {
    anchor.style.margin = 'auto';
    anchor.style.padding = '4px 4px 0px 16px';
    iconsContainer.appendChild(anchor);
  }
}

function embedHtmlOnBrave(searchLinks: HTMLAnchorElement[]) {
  const getSearchForm = () =>
    Array.from(document.forms).find((f) => f.action.endsWith('/search'));

  const applyDOMChanges = () => {
    const searchForm = assertExists(
      getSearchForm(),
      'Cannot find Brave Search form'
    );
    const searchInput = assertExists(
      findSearchInput(searchForm),
      'Cannot find Brave Search input'
    );
    const searchAreaContainer = assertExists(
      searchInput.parentElement?.parentElement,
      'Cannot find Brave Search input container'
    );

    if (searchAreaContainer.parentElement?.id !== 'searchengineswitcher-container') {
      const searchAreaContainerWrapper = createFlexContainer();
      searchAreaContainerWrapper.id = 'searchengineswitcher-container';
      wrap(searchAreaContainer, searchAreaContainerWrapper);

      const iconsContainer = createFlexContainer();
      iconsContainer.style.alignItems = 'center';
      searchAreaContainerWrapper.appendChild(iconsContainer);

      for (const anchor of searchLinks) {
        anchor.style.margin = 'auto';
        anchor.style.padding = '4px 4px 0px 16px';
        iconsContainer.appendChild(anchor);
      }
    }
  };

  const mutationObserver = new MutationObserver(() => {
    if (!document.getElementById('searchengineswitcher-container')) {
      applyDOMChanges();
    }
  });

  applyDOMChanges();
  mutationObserver.observe(document.body, {childList: true, subtree: true});
}

function embedHtmlOnDDG(searchLinks: HTMLAnchorElement[]) {
  const searchForm = assertExists(
    Array.from(document.forms).find((f) => f.action.endsWith('/')),
    'Cannot find DuckDuckGo search form'
  );
  const searchInput = assertExists(
    findSearchInput(searchForm),
    'Cannot find DuckDuckGo search input'
  );
  const searchAreaContainer = assertExists(
    searchInput.parentElement?.parentElement?.parentElement,
    'Cannot find DuckDuckGo search input container'
  );

  searchAreaContainer.style.paddingRight = 'unset';
  const searchAreaContainerWrapper = createFlexContainer();
  searchAreaContainerWrapper.id = 'searchengineswitcher-container';
  wrap(searchAreaContainer, searchAreaContainerWrapper);
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax
  searchAreaContainer.style.flex = '1 0 0';

  const iconsContainer = createFlexContainer();
  searchAreaContainerWrapper.appendChild(iconsContainer);

  for (const anchor of searchLinks) {
    anchor.style.margin = 'auto';
    anchor.style.padding = '4px 4px 0px 16px';
    iconsContainer.appendChild(anchor);
  }
}

// ---------------------------------------------------------------------------
// Matching & routing
// ---------------------------------------------------------------------------

function matchConfigOnHostName(
  searchEngineNames: SearchEngineName[],
  currentHostName: string
): [SearchEngineName, SearchEngineConfig] | null {
  const trimWWWprefix = (s: string) => s.replace(/^www\./, '');
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
  searchLinks: HTMLAnchorElement[]
) {
  switch (searchEngine) {
    case Google:
      return embedHtmlOnGoogle(searchLinks);
    case Ecosia:
      return embedHtmlOnEcosia(searchLinks);
    case DuckDuckGo:
      return embedHtmlOnDDG(searchLinks);
    case Bing:
      return embedHtmlOnBing(searchLinks);
    case BraveSearch:
      return embedHtmlOnBrave(searchLinks);
  }
}

// ---------------------------------------------------------------------------
// Entry point — read settings from storage and inject links
// ---------------------------------------------------------------------------

async function main() {
  const {searchEngineSettings, searchEngineOrder} = await getStorage([
    'searchEngineSettings',
    'searchEngineOrder',
  ]);

  const activeSearchEngines = searchEngineOrder.filter(
    (se) => searchEngineSettings[se].enabled
  );

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  try {
    if (urlParams.has('q')) {
      const searchString = urlParams.get('q') || '';
      const match = matchConfigOnHostName(
        activeSearchEngines,
        window.location.hostname
      );
      if (match) {
        const [currentSearchEngine] = match;
        const otherNames = activeSearchEngines.filter(
          (se) => se !== currentSearchEngine
        );
        const searchLinks = otherNames.map((otherName) => {
          const otherConfig = config[otherName];
          return createSearchLink(
            otherConfig.id,
            `${otherConfig.baseUrl}${searchString}`,
            `Search '${searchString}' on ${otherConfig.displayName}`,
            otherConfig.iconUrl
          );
        });
        injectHtml(currentSearchEngine, searchLinks);
      } else {
        console.error(
          `Could not match ${window.location.hostname} to config`
        );
      }
    } else {
      console.error("URL parameters does not contain 'q'");
    }
  } catch (e) {
    console.error(e);
  }
}

main();
