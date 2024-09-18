export const SECTION_TYPES: { name: string; description: string }[] = [
  {
    name: "summary",
    description: "Summary",
  },
  // {
  //   name: "central_insights",
  //   description: "Central insights",
  // },
  // {
  //   name: "mini_essay",
  //   description: "Mini essay",
  // },
  // {
  //   name: "themes",
  //   description: "Themes",
  // },
  {
    name: "further_references",
    description: "Further references",
  },
  {
    name: "explain_to_child",
    description: "Explain to a child",
  },
  // {
  //   name: "shortform",
  //   description: "Short form (experimental)",
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
