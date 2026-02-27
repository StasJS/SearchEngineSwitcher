# AGENTS.md

## Project Overview

SearchEngineSwitcher is a cross-browser web extension (Chrome & Firefox) that lets users quickly switch between search engines by embedding clickable icons next to the search bar on supported search engine pages.

Supported search engines: **Google**, **DuckDuckGo**, **Ecosia**, **Bing**.

The extension uses Manifest V3, is built with Vite + React + TypeScript, and targets both Chrome and Firefox from a single codebase.

## Repository Structure

```
source/                         # All source code
├── manifest.json               # Browser extension manifest (uses __chrome__/__firefox__ prefixes for browser-specific keys)
├── Background/index.ts         # Background script / service worker — seeds default settings on install
├── ContentScript/index.ts      # Content script — detects the current search engine and injects links to the others
├── Popup/                      # Extension popup UI (React)
│   ├── popup.html              # Popup entry HTML
│   ├── index.tsx               # React root mount
│   ├── App.tsx                 # Main popup component (Grommet UI)
│   ├── useMediaPreference.ts   # Hook for dark/light mode detection
│   └── features/searchEngines/ # Search engine toggle list components + hook
├── types/storage.ts            # StorageSchema type and defaults
├── utils/
│   ├── searchEngineConfig.ts   # Search engine definitions (URLs, icons, IDs)
│   └── storage.ts              # Typed wrappers around browser.storage.local
└── public/assets/icons/        # Extension icons (favicon-*.png)

extension/                      # Build output (git-tracked for deployment)
├── chrome/                     # Chrome build artifacts
├── firefox/                    # Firefox build artifacts
├── chrome.zip                  # Production Chrome package
└── firefox.xpi                 # Production Firefox package

.github/workflows/build.yml     # CI: build on push/PR to main, deploy on version tags
```

## Tech Stack

- **Language:** TypeScript (strict, ESNext target)
- **UI Framework:** React 19 with Grommet component library and styled-components
- **Build Tool:** Vite 7 with custom plugins for IIFE content scripts, manifest generation, and zip packaging
- **Browser API:** `webextension-polyfill` for cross-browser compatibility
- **Linting:** ESLint 9 (flat config) with TypeScript, React, and Prettier plugins
- **Node version:** 20+ (see `.nvmrc` for exact version)

## Development

### Setup

```sh
npm install
```

### Dev (watch mode)

```sh
npm run dev:chrome    # Build Chrome extension with file watching
npm run dev:firefox   # Build Firefox extension with file watching
```

Then load the extension locally:
- **Chrome:** Load `extension/chrome` as an unpacked extension at `chrome://extensions`
- **Firefox:** Load `extension/firefox/manifest.json` as a temporary add-on at `about:debugging`

### Production Build

```sh
npm run build           # Builds both Chrome and Firefox
npm run build:chrome    # Chrome only → extension/chrome.zip
npm run build:firefox   # Firefox only → extension/firefox.xpi
```

### Linting

```sh
npm run lint        # Check for lint errors
npm run lint:fix    # Auto-fix lint errors
```

## Architecture Notes

### Content Script (IIFE)

The content script (`source/ContentScript/index.ts`) is built as an **IIFE** bundle via a custom Vite plugin (`buildIIFEScripts` in `vite.config.ts`) because Manifest V3 content scripts injected via the manifest cannot use ES module imports. This is separate from the main Vite build.

### Manifest Generation

The manifest at `source/manifest.json` uses `__chrome__` and `__firefox__` prefixes for browser-specific keys (e.g., `__chrome__service_worker`, `__firefox__scripts`). The `vite-plugin-wext-manifest` plugin strips these prefixes to produce the correct manifest for each target browser. The version is pulled from `package.json` automatically.

### Storage

Settings are stored in `browser.storage.local`. The schema is defined in `source/types/storage.ts` and consists of:
- `searchEngineSettings` — a record of each search engine's enabled/disabled status
- `searchEngineOrder` — the display order of search engines

The background script seeds defaults on first install. The typed `getStorage`/`setStorage` helpers in `source/utils/storage.ts` always merge with defaults to handle missing keys gracefully.

### Adding a New Search Engine

1. Add the new engine constant and config entry in `source/utils/searchEngineConfig.ts` (baseUrl, iconUrl, id, displayName).
2. Add the engine to `SearchEngineName` union type and the `defaultStorage` in `source/types/storage.ts`.
3. Add the engine's URL pattern to `host_permissions` and `content_scripts.matches` in `source/manifest.json`.
4. Implement an `embedHtmlOn<Engine>()` function in `source/ContentScript/index.ts` and wire it into `injectHtml()`.

### Popup UI

The popup uses React with Grommet and automatically respects the user's dark/light mode preference. The `useSearchEngineSettings` hook loads settings from storage and provides a `toggleEngine` callback that persists changes immediately.

## CI/CD

The GitHub Actions workflow (`.github/workflows/build.yml`):
- **On push/PR to `main`:** Builds both browser extensions and uploads them as artifacts.
- **On version tags (`v*.*.*`):** Also deploys the `extension/` directory to the `extension` branch via GitHub Pages.

## Code Style

- 2-space indentation, LF line endings (see `.editorconfig`)
- ESLint flat config with TypeScript, React, and Prettier rules
- `console` statements are allowed (`no-console: off`)
- Prefer named exports for types and constants; default exports for React components and config objects
