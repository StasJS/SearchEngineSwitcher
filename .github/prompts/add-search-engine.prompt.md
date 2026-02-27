# Add a new search engine

Add support for a new search engine to the SearchEngineSwitcher extension.

## Information needed before starting

Please provide the following before making any changes:

1. **Engine name** — display name (e.g. "Brave Search") and the constant name to use (e.g. `BraveSearch` / `"BRAVESEARCH"`)
2. **Search URL** — the base URL including the query parameter, e.g. `https://search.brave.com/search?q=`
3. **Icon URL** — a stable URL to a favicon/icon (SVG or PNG). Note which domain it is served from, as it may differ from the search domain and require an additional `web_accessible_resources` entry in the manifest.
4. **Form action suffix** — inspect the search results page and find what `document.forms[n].action` ends with (e.g. `/search`, `/`). Run `Array.from(document.forms).map(f => f.action)` in DevTools to find it.
5. **DOM depth** — the number of `.parentElement` calls needed from the `input[name="q"]` to reach the container element that should be wrapped. Run the following in DevTools on a results page to find it:
   ```js
   const input = document.querySelector('input[name="q"]');
   let el = input;
   for (let i = 0; i < 5; i++) {
     el = el?.parentElement;
     console.log(i + 1, el);
   }
   ```
6. **Does the page re-render the search bar after initial load?** — if yes, a `MutationObserver` is required to re-inject icons after they are removed. You can check by searching, watching DevTools Elements panel for mutations around the search input, or simply noticing that icons appear then disappear.
7. **Any special layout needs?** — e.g. does the search bar shrink when icons are added? Does the wrapper need `inline-flex` instead of `flex`? Does the icons container need `alignItems: center`?

## What will be changed

The following files require edits — do them all in one pass:

- `source/utils/searchEngineConfig.ts` — add exported constant, expand `SearchEngineName` union, add config entry
- `source/types/storage.ts` — import new constant, add to `searchEngineSettings` and `searchEngineOrder` in `defaultStorage`
- `source/manifest.json` — add URL pattern to `host_permissions`, `content_scripts.matches`, and `web_accessible_resources.matches` (if the icon is on a different domain, add that domain to `web_accessible_resources.matches` too)
- `source/ContentScript/index.ts` — import new constant, add `embedHtmlOn<Engine>` function, add `case` to `injectHtml`
- `source/Popup/features/searchEngines/useSearchEngineSettings.ts` — add new engine to the `useState` initial value (must stay in sync with `defaultStorage`)
- `README.md` — add the new engine to the supported search engines list

## MutationObserver guidance

Only add a `MutationObserver` if the page re-renders the search bar after load (question 6 above). If one is needed, use this pattern (see `embedHtmlOnBrave` or `embedHtmlOnEcosia` for reference):

```ts
const applyDOMChanges = () => {
  // ... find form, input, container
  if (searchAreaContainer.parentElement?.id !== 'searchengineswitcher-container') {
    // ... inject wrapper and icons
  }
};

const mutationObserver = new MutationObserver(() => {
  if (!document.getElementById('searchengineswitcher-container')) {
    applyDOMChanges();
  }
});

applyDOMChanges();
mutationObserver.observe(document.body, {childList: true, subtree: true});
```

If no observer is needed (Google, Bing, DDG pattern), inject directly without any guard or observer.

## After implementing

Run `npm run build` to verify both Chrome and Firefox builds succeed before committing.
