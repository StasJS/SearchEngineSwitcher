import { createSelector } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { SearchEngineName } from "../../definitions/searchEngines";
import { RootState } from "../../rootReducer";
import SearchEngine from "./searchEngine";
import { SearchEngineStatus, toggleEnablement } from "./searchEnginesSlice";

interface Props {
	searchEngines: [SearchEngineName, SearchEngineStatus][];
	toggleEnablement: (name: SearchEngineName) => void;
}

const SearchEngineList: React.FunctionComponent<Props> = ({
	searchEngines,
	toggleEnablement
}) => (
	<ul>
		{searchEngines.map(
			([name, status]: [SearchEngineName, SearchEngineStatus]) => (
				<SearchEngine
					name={name}
					enabled={status.enabled}
					onClick={toggleEnablement}
				/>
			)
		)}
	</ul>
);

const keys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];

const selectSearchEngines = createSelector(
	(state: RootState) => state.searchEngines.settings,
	(searchEngines): [SearchEngineName, SearchEngineStatus][] => {
		return keys(searchEngines).map((se: SearchEngineName) => [
			se,
			searchEngines[se]
		]);
	}
);

const mapStateToProps = (state: RootState) => ({
	searchEngines: selectSearchEngines(state)
});

export default connect(mapStateToProps, { toggleEnablement })(SearchEngineList);
