import { h } from "preact";
import { SearchEngineName } from "../../../searchEngines";
import SearchEngine from "./searchEngine";
import { SearchEngineStatus } from "./searchEnginesSlice";

export interface Props {
	searchEngines: [[SearchEngineName, SearchEngineStatus]];
	toggleEnablement: (name: SearchEngineName) => void;
}
const SearchEngineList = (props: Props) => {
	<ul>{props.searchEngines.map([name, enabled] => {
        return <SearchEngine props={ name, enabled, onClick: toggleEnablement } />;
    })}</ul>;
};
