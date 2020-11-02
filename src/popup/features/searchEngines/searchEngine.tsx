import { FunctionalComponent, h } from "preact";

export interface Props {
	onClick?: (name: string) => void;
	enabled: boolean;
	name: string;
}
const SearchEngine = (props: Props): FunctionalComponent => {
	return <li>{props.name}</li>;
};

export default SearchEngine;
