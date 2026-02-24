import {Box} from 'grommet';
import SearchEngineItem from './SearchEngineItem';
import {useSearchEngineSettings} from './useSearchEngineSettings';

const SearchEngineList = () => {
  const {settings, order, loading, toggleEngine} =
    useSearchEngineSettings();

  if (loading) {
    return null;
  }

  return (
    <Box>
      {order.map((name) => (
        <SearchEngineItem
          key={name}
          name={name}
          status={settings[name]}
          toggle={() => toggleEngine(name)}
        />
      ))}
    </Box>
  );
};

export default SearchEngineList;
