import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	Bing,
	DuckDuckGo,
	Ecosia,
	Google,
	SearchEngineName
} from "../../../searchEngineConfig";

export interface SearchEngineStatus {
	enabled: boolean;
}

export type SearchEngineState = {
	settings: Record<SearchEngineName, SearchEngineStatus>;
	order: Array<SearchEngineName>;
};

const initialState: SearchEngineState = {
	settings: {
		GOOGLE: {
			enabled: true
		},
		BING: {
			enabled: true
		},
		ECOSIA: {
			enabled: true
		},
		DUCKDUCKGO: {
			enabled: true
		}
	},
	order: [Google, DuckDuckGo, Bing, Ecosia]
};

const searchEnginesSlice = createSlice({
	name: "searchEngines",
	initialState,
	reducers: {
		toggleEnablement(state, action: PayloadAction<SearchEngineName>) {
			state.settings[action.payload].enabled = !state.settings[action.payload]
				.enabled;
		}
	}
});

export const { toggleEnablement } = searchEnginesSlice.actions;

export default searchEnginesSlice.reducer;
