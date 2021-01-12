import { createSelector } from "@reduxjs/toolkit";
import { Box, CheckBox } from "grommet";
import React from "react";
import { connect } from "react-redux";
import config, {
	Bing,
	DuckDuckGo,
	Ecosia,
	Google,
	SearchEngineName
} from "../../../searchEngineConfig";
import { RootState } from "../../../rootReducer";
import { SearchEngineStatus, toggleEnablement } from "./searchEnginesSlice";

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
						<CheckBox
							checked={status.enabled}
							key={name}
							label={
								<Box
									direction="row"
									gap="medium"
									justify="between"
									align="center"
									pad="small"
								>
									{displayName(name)}
									<img src={config[name].iconUrl.href} height={32} width={32} />
								</Box>
							}
							onChange={() => toggleEnablement(name)}
						/>
					);
				}
			)}
		</Box>
	);
};

const displayName = (name: SearchEngineName): string => {
	switch (name) {
		case Bing:
			return "Bing";
		case Google:
			return "Google";
		case DuckDuckGo:
			return "DuckDuckGo";
		case Ecosia:
			return "Ecosia";
		default:
			return null as never;
	}
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
