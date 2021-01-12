import React from "react";
import SearchEngineList from "../features/searchEngines/SearchEngineList";
import { Grommet } from "grommet";

const App: React.FunctionComponent = () => {
	return (
		<Grommet plain>
			<h1>Meta Search Config</h1>
			<div>
				<h3>Select the search engines you'd like to jump between</h3>
				<SearchEngineList />
			</div>
		</Grommet>
	);
};

export default App;
