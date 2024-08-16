export type BrowseHistoryType = {
  view: "home" | "category" | "note";
  metadataId?: string;
  metadataValue?: string | string[];
  pageHeading?: string;
  selectedNoteIds: string[];
};
