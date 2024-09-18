export const SECTION_TYPES: { name: string; description: string }[] = [
  {
    name: "summary",
    description: "Summary",
  },
  {
    name: "alternate_takes",
    description: "Alternate perspectives",
  },
  {
    name: "explain_to_child",
    description: "Explain to a child",
  },
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
