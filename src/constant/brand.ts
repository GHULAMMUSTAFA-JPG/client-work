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

export const CREATOR_FILTER_OPTIONS = {
  countryOptions: [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "pk", label: "Pakistan" },
    { value: "ae", label: "UAE" },
  ],
  jobTitleOptions: [
    { value: "ceo", label: "CEO" },
    { value: "founder", label: "Founder" },
    { value: "engineer", label: "Software Engineer" },
    { value: "marketing", label: "Marketing Director" },
  ],
  companyOptions: [
    { value: "funavry", label: "Funavry Technologies" },
    { value: "social27", label: "Social27 Inc" },
    { value: "synnc", label: "Synnc Digital" },
  ],
  companySizeOptions: [
    { value: "0-50", label: "0 - 50 employees" },
    { value: "51-1000", label: "51 - 1,000 employees" },
    { value: "1000+", label: "1,000+ employees" },
  ],
  followerRangeOptions: [
    { value: "", label: "Select range" },
    { value: "0-1000", label: "0 - 1,000" },
    { value: "1000-10000", label: "1,000 - 10,000" },
    { value: "10000-50000", label: "10,000 - 50,000" },
    { value: "50000+", label: "50,000+" },
  ],
};
