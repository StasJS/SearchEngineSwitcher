import { createSlice } from "@reduxjs/toolkit";
import {
	Bing,
	DuckDuckGo,
	Ecosia,
	Google,
	SearchEngineName
} from "../../../searchEngines";
import { ActionPayload } from "../../reduxTypings";

export interface SearchEngineStatus {
	enabled: boolean;
}

export type SearchEngineState = Record<SearchEngineName, SearchEngineStatus> & {
	order: Set<SearchEngineName>;
};

const initialState: SearchEngineState = {
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
	},
	order: new Set([Google, DuckDuckGo, Bing, Ecosia])
};

const searchEnginesSlice = createSlice({
	name: "searchEngines",
	initialState,
	reducers: {
		toggleSearchEngineEnablement(
			state,
			action: ActionPayload<SearchEngineName>
		) {
			state[action.payload].enabled = !state[action.payload].enabled;
		}
	}
});

export const { toggleSearchEngineEnablement } = searchEnginesSlice.actions;

export default searchEnginesSlice.reducer;
