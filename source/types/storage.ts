import {Google, DuckDuckGo, Bing, Ecosia, BraveSearch, Yandex} from '../utils/searchEngineConfig';
import type {SearchEngineName} from '../utils/searchEngineConfig';

export interface SearchEngineStatus {
  enabled: boolean;
}

export interface StorageSchema {
  searchEngineSettings: Record<SearchEngineName, SearchEngineStatus>;
  searchEngineOrder: SearchEngineName[];
}

export const defaultStorage: StorageSchema = {
  searchEngineSettings: {
    GOOGLE: {enabled: true},
    BING: {enabled: true},
    ECOSIA: {enabled: true},
    DUCKDUCKGO: {enabled: true},
    BRAVESEARCH: {enabled: true},
    YANDEX: {enabled: false},
  },
  searchEngineOrder: [Google, DuckDuckGo, Bing, Ecosia, BraveSearch, Yandex],
};
