import { combineReducers } from "@reduxjs/toolkit";
import searchEnginesReducer from "./popup/features/searchEngines/searchEnginesSlice";

const rootReducer = combineReducers({
	searchEngines: searchEnginesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
