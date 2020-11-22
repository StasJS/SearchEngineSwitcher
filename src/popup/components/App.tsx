import React from "react";
import SearchEngineList from "../features/searchEngines/SearchEngineList";
import { Grommet } from "grommet";

const App: React.FunctionComponent = () => {
	return (
		<Grommet plain>
			<h1>React App</h1>
			<SearchEngineList />
		</Grommet>
	);
};

export default App;
