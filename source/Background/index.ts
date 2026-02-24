/**
 * Background Script (Service Worker in Chrome MV3)
 *
 * Seeds default search engine settings into storage on first install.
 */

import browser from 'webextension-polyfill';
import {getAllStorage} from '../utils/storage';

browser.runtime.onInstalled.addListener(async (): Promise<void> => {
  // Seed default settings into storage if not already present.
  // getAllStorage merges defaults with whatever is already stored.
  const settings = await getAllStorage();
  await browser.storage.local.set(settings as unknown as Record<string, unknown>);
  console.log('SearchEngineSwitcher installed — settings initialised');
});
