import { createSelector } from "@reduxjs/toolkit";
import { Box } from "grommet";
import React from "react";
import { connect } from "react-redux";
import { SearchEngineName } from "../../../searchEngineConfig";
import { RootState } from "../../../rootReducer";
import { SearchEngineStatus, toggleEnablement } from "./searchEnginesSlice";
import SearchEngineItem from "./SearchEngineItem";

interface Props {
	searchEngines: [SearchEngineName, SearchEngineStatus][];
	toggleEnablement: (name: SearchEngineName) => void;
}

const SearchEngineList: React.FunctionComponent<Props> = ({
	searchEngines,
	toggleEnablement
}) => {
	return (
		<Box>
			{searchEngines.map(
				([name, status]: [SearchEngineName, SearchEngineStatus]) => {
					return (
						<SearchEngineItem
							name={name}
							status={status}
							toggle={() => toggleEnablement(name)}
						/>
					);
				}
			)}
		</Box>
	);
};

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
