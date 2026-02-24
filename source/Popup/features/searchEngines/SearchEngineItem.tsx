import {CheckBox, Box, Text, Image} from 'grommet';
import config from '../../../utils/searchEngineConfig';
import type {SearchEngineName} from '../../../utils/searchEngineConfig';
import type {SearchEngineStatus} from '../../../types/storage';

interface Props {
  name: SearchEngineName;
  status: SearchEngineStatus;
  toggle: () => void;
}

const SearchEngineItem = ({name, status, toggle}: Props) => {
  return (
    <CheckBox
      checked={status.enabled}
      label={
        <Box direction="row" gap="medium" justify="between" align="center" pad="small">
          <Text>{config[name].displayName}</Text>
          <Image src={config[name].iconUrl.href} height={32} width={32} />
        </Box>
      }
      onChange={toggle}
    />
  );
};

export default SearchEngineItem;
