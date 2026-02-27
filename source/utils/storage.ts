import browser from 'webextension-polyfill';
import {StorageSchema, defaultStorage} from '../types/storage';

export async function getStorage<K extends keyof StorageSchema>(
  keys: K[]
): Promise<Pick<StorageSchema, K>> {
  const result = await browser.storage.local.get(keys);

  const output = {} as Pick<StorageSchema, K>;
  for (const key of keys) {
    output[key] = (result[key] as StorageSchema[K]) ?? defaultStorage[key];
  }

  return output;
}

export async function setStorage<K extends keyof StorageSchema>(
  items: Pick<StorageSchema, K>
): Promise<void> {
  await browser.storage.local.set(items);
}

export async function getAllStorage(): Promise<StorageSchema> {
  const result = await browser.storage.local.get(null);

  // Deep-merge searchEngineSettings so new engines added in later versions
  // are picked up by existing users (whose stored value would otherwise
  // completely override the defaults via a shallow spread).
  const searchEngineSettings: StorageSchema['searchEngineSettings'] = {
    ...defaultStorage.searchEngineSettings,
    ...(result.searchEngineSettings as StorageSchema['searchEngineSettings'] | undefined),
  };

  // Append any engines present in the defaults but missing from the stored
  // order (i.e. engines added in a newer version of the extension).
  const storedOrder = result.searchEngineOrder as StorageSchema['searchEngineOrder'] | undefined;
  const newEngines = defaultStorage.searchEngineOrder.filter(
    (e) => !storedOrder?.includes(e)
  );
  const searchEngineOrder: StorageSchema['searchEngineOrder'] = storedOrder
    ? [...storedOrder, ...newEngines]
    : defaultStorage.searchEngineOrder;

  return {searchEngineSettings, searchEngineOrder};
}
