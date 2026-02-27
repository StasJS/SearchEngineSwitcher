export interface SearchEngineConfig {
	baseUrl: URL;
	iconUrl: URL;
	id: string;
	displayName: string;
	queryParam: string;
}

export const Google = "GOOGLE" as const;
export const Ecosia = "ECOSIA" as const;
export const Bing = "BING" as const;
export const DuckDuckGo = "DUCKDUCKGO" as const;
export const BraveSearch = "BRAVESEARCH" as const;
export const Yandex = "YANDEX" as const;

export type SearchEngineName = typeof Google | typeof Ecosia | typeof Bing | typeof DuckDuckGo | typeof BraveSearch | typeof Yandex;

const config: Record<SearchEngineName, SearchEngineConfig> = {
	GOOGLE: {
		baseUrl: new URL("https://www.google.com/search?q="),
		iconUrl: new URL("https://google.com/favicon.ico"),
		id: "5f65cbf0-2b1c-4a0d-a9f1-1e2f31fcc23c",
		displayName: "Google",
		queryParam: "q",
	},
	ECOSIA: {
		baseUrl: new URL("https://www.ecosia.org/search?q="),
		iconUrl: new URL("https://cdn.ecosia.org/assets/images/ico/favicon.ico"),
		id: "719a2e5c-e819-4b30-934c-06bfed6c4e0d",
		displayName: "Ecosia",
		queryParam: "q",
	},
	BING: {
		baseUrl: new URL("https://www.bing.com/search?q="),
		iconUrl: new URL("https://upload.wikimedia.org/wikipedia/commons/0/07/Bing_favicon.svg"),
		id: "f54d4772-369a-494b-b8c7-ae9495b9b516",
		displayName: "Bing",
		queryParam: "q",
	},
	DUCKDUCKGO: {
		baseUrl: new URL("https://www.duckduckgo.com/?q="),
		iconUrl: new URL("https://duckduckgo.com/favicon.ico"),
		id: "f3dfab76-5b65-4604-95ef-9e3cb7a8a59f",
		displayName: "DuckDuckGo",
		queryParam: "q",
	},
	BRAVESEARCH: {
		baseUrl: new URL("https://search.brave.com/search?q="),
		iconUrl: new URL("https://brave.com/static-assets/images/brave-logo-sans-text.svg"),
		id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
		displayName: "Brave Search",
		queryParam: "q",
	},
	YANDEX: {
		baseUrl: new URL("https://yandex.com/search/?text="),
		iconUrl: new URL("https://yandex.com/favicon.ico"),
		id: "b2c3d4e5-f6a7-8901-bcde-f0123456789a",
		displayName: "Yandex",
		queryParam: "text",
	},
};

export const searchEngineNames: ReadonlySet<SearchEngineName> = new Set(Object.keys(config) as SearchEngineName[]);

export default config;
