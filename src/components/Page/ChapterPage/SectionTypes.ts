export const SECTION_TYPES: { name: string; description: string }[] = [
  {
    name: "overview",
    description: "Overview",
  },
  {
    name: "summary",
    description: "Summary",
  },
  {
    name: "themes_explored",
    description: "Themes Explored",
  },
  {
    name: "alternate_perspectives",
    description: "Alternate Perspectives",
  },
  {
    name: "critical_analysis",
    description: "Critical Analysis",
  },
  {
    name: "explain_to_a_child",
    description: "Explain to a child",
  },
  {
    name: "custom_managed",
    description: "Custom section with AI assistance",
  },
  {
    name: "custom",
    description: "Custom section managed manually",
  },
];

export const getSectionType = (type: string) => {
  return SECTION_TYPES.find((item) => item.name === type);
};
