import React from "react";
import { SearchEngineName } from "../../definitions/searchEngines";

export interface Props {
	onClick?: (name: SearchEngineName) => void;
	enabled: boolean;
	name: string;
}
const SearchEngine: React.FunctionComponent<Props> = (props) => {
	return <li>{props.name}</li>;
};

export default SearchEngine;
