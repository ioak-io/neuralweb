export const SECTION_TYPES: {
  name: string;
  description: string;
  isSummaryDependent: boolean;
  isThemesDependent: boolean;
}[] = [
  {
    name: "summary",
    description: "Summary",
    isSummaryDependent: false,
    isThemesDependent: false,
  },
  {
    name: "themes",
    description: "Key themes and ideas",
    isSummaryDependent: true,
    isThemesDependent: false,
  },
  {
    name: "alternate_takes",
    description: "Alternate perspectives",
    isSummaryDependent: false,
    isThemesDependent: true,
  },
  {
    name: "purpose",
    description: "Thematic Significance",
    isSummaryDependent: false,
    isThemesDependent: true,
  },
  // {
  //   name: "explain_to_child",
  //   description: "Explain to a child",
  // },
  // {
  //   name: "critical_analysis",
  //   description: "Critical Analysis",
  // },
  // {
  //   name: "custom_managed",
  //   description: "Custom section with AI assistance",
  // },
  // {
  //   name: "custom",
  //   description: "Custom section managed manually",
  // },
];

export const getSectionType = (type: string) => {
  return SECTION_TYPES.find((item) => item.name === type);
};
