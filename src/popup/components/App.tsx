import React from "react";
import SearchEngineList from "../features/searchEngines/SearchEngineList";
import { grommet, Grommet, Heading, Main } from "grommet";

const App: React.FunctionComponent = () => {
	return (
		<Grommet theme={grommet}>
			<Main>
				<Heading level={1} textAlign="center">
					Meta Search Config
				</Heading>
				<article>
					<Heading level={3}>
						Select the search engines you'd like to jump between!
					</Heading>
					<SearchEngineList />
				</article>
			</Main>
		</Grommet>
	);
};

export default App;
