import {useCallback, useEffect, useState} from 'react';
import {getStorage, setStorage} from '../../../utils/storage';
import type {SearchEngineName} from '../../../utils/searchEngineConfig';
import {defaultStorage, type SearchEngineStatus} from '../../../types/storage';

export interface SearchEngineSettings {
  settings: Record<SearchEngineName, SearchEngineStatus>;
  order: SearchEngineName[];
  loading: boolean;
}

export function useSearchEngineSettings(): SearchEngineSettings & {
  toggleEngine: (name: SearchEngineName) => void;
} {
  const [settings, setSettings] = useState<
    Record<SearchEngineName, SearchEngineStatus>
  >(defaultStorage.searchEngineSettings);
  const [order, setOrder] = useState<SearchEngineName[]>(defaultStorage.searchEngineOrder);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStorage(['searchEngineSettings', 'searchEngineOrder']).then((data) => {
      setSettings(data.searchEngineSettings);
      setOrder(data.searchEngineOrder);
      setLoading(false);
    });
  }, []);

  const toggleEngine = useCallback(
    (name: SearchEngineName) => {
      const updated = {
        ...settings,
        [name]: {enabled: !settings[name].enabled},
      };
      setSettings(updated);
      setStorage({searchEngineSettings: updated});
    },
    [settings]
  );

  return {settings, order, loading, toggleEngine};
}
