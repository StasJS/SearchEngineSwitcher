export interface SearchEngineConfig {
	baseUrl: URL;
	iconUrl: URL;
	id: string;
}

export const Google = "GOOGLE" as const;
export const Ecosia = "ECOSIA" as const;
export const Bing = "BING" as const;
export const DuckDuckGo = "DUCKDUCKGO" as const;

export type SearchEngineName =
	| typeof Google
	| typeof Ecosia
	| typeof Bing
	| typeof DuckDuckGo;

const config: Record<SearchEngineName, SearchEngineConfig> = {
	GOOGLE: {
		baseUrl: new URL("https://www.google.com/search?q="),
		iconUrl: new URL("https://google.com/favicon.ico"),
		id: "5f65cbf0-2b1c-4a0d-a9f1-1e2f31fcc23c"
	},
	ECOSIA: {
		baseUrl: new URL("https://www.ecosia.org/search?q="),
		iconUrl: new URL("https://cdn.ecosia.org/assets/images/ico/favicon.ico"),
		id: "719a2e5c-e819-4b30-934c-06bfed6c4e0d"
	},
	BING: {
		baseUrl: new URL("https://www.bing.com/search?q="),
		iconUrl: new URL(
			"https://upload.wikimedia.org/wikipedia/commons/0/07/Bing_favicon.svg"
		),
		id: "f54d4772-369a-494b-b8c7-ae9495b9b516"
	},
	DUCKDUCKGO: {
		baseUrl: new URL("https://www.duckduckgo.com/search?q="),
		iconUrl: new URL("https://duckduckgo.com/favicon.ico"),
		id: "f3dfab76-5b65-4604-95ef-9e3cb7a8a59f"
	}
};

export const searchEngineNames: ReadonlySet<SearchEngineName> = new Set(
	Object.keys(config) as SearchEngineName[]
);

export default config;
