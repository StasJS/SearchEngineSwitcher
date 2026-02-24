import {Anchor, Footer, grommet, Grommet, Heading, Main, Nav} from 'grommet';
import * as Icons from 'grommet-icons';
import useMediaPreference from './useMediaPreference';
import SearchEngineList from './features/searchEngines/SearchEngineList';

const App = () => {
  const mediaPreference = useMediaPreference();

  return (
    <Grommet theme={grommet} themeMode={mediaPreference || 'light'}>
      <Main pad="medium">
        <Heading level={2} textAlign="center">
          SearchEngineSwitcher Settings
        </Heading>
        <article>
          <Heading level={3}>
            Select the search engines you&apos;d like to be able to jump
            between!
          </Heading>
          <SearchEngineList />
        </article>
      </Main>
      <Footer border="top" pad="medium">
        <Nav direction="row" gap="large" border="between">
          <Anchor
            size="small"
            icon={<Icons.Github />}
            label="Check us out on Github"
            href="https://github.com/StasJS/SearchEngineSwitcher/"
          />
          <Anchor
            size="small"
            icon={<Icons.Grommet />}
            label="Made with Grommet"
            href="https://v2.grommet.io/"
          />
        </Nav>
      </Footer>
    </Grommet>
  );
};

export default App;
