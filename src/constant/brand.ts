export const brandRegions = [
  { id: "us", label: "US" },
  { id: "europe", label: "Europe" },
  { id: "uk", label: "UK" },
  { id: "latam", label: "LatAm" },
  { id: "asia", label: "Asia" },
];

export const brandSizes = [
  { id: "small", label: "Small (<50 employees)" },
  { id: "medium", label: "Medium (51-1k)" },
  { id: "large", label: "Large (1k+ employees)" },
];

export const brandsCategories = [
  { id: "sales", label: "Sales" },
  { id: "marketing", label: "Marketing" },
  { id: "crm", label: "CRM" },
];

export enum SortOptions {
  LARGEST_FIRST = "largest_first",
  SMALLEST_FIRST = "smallest_first",
  POPULAR = "popular",
}
