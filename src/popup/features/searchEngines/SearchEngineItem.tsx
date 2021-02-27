import { CheckBox, Box, Text, Image } from "grommet";
import React from "react";
import config, { SearchEngineName } from "../../../searchEngineConfig";
import { SearchEngineStatus } from "./searchEnginesSlice";

interface Props {
	name: SearchEngineName;
	status: SearchEngineStatus;
	toggle: () => void;
}

const SearchEngineItem = ({ name, status, toggle }: Props): JSX.Element => {
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
					<Text>{config[name].displayName}</Text>
					<Image src={config[name].iconUrl.href} height={32} width={32} />
				</Box>
			}
			onChange={toggle}
		/>
	);
};

export default SearchEngineItem;
