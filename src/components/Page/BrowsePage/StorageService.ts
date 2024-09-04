import { BrowseHistoryType } from "./types/BrowseHistoryType";

const LOCAL_STORAGE_KEY = "NEURALWEB_BROWSEHISTORY";

export const writeBrowseHistory = (browsehistory: BrowseHistoryType[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(browsehistory));
};

export const readBrowseHistory = (): BrowseHistoryType[] => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return [];
};
