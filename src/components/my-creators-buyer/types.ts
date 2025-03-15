// Types and interfaces for My Creators Buyer components

export interface Creator {
  _id: string;
  Name: string;
  Profile_Image?: string;
  Job_Title?: string;
  Country_Code?: string;
  Current_Company?: string;
  No_of_Followers?: number;
  No_of_Impressions?: number;
  No_of_Engagements?: number;
}

export interface List {
  _id: string;
  List_Name: string;
  List_Creators?: string[];
  Creator_IDs?: string[];
  Category?: string;
  Updated_At?: string;
  topCreators?: Creator[];
}

export interface Campaign {
  _id: string;
  Headline: string;
  Is_Ongoing: boolean;
  Time_Ago: string;
  Budget: number;
  Target_Audience?: string[];
  Creator_Insights: {
    Invited: number;
    Approved: number;
    In_Discussion: number;
  };
}

export interface FilterState {
  countries: string[];
  jobTitles: string[];
  companies: string[];
  companySizes: string[];
  followerRange: string;
  engagementRate: string;
  industry: string;
  language: string;
  verified: boolean;
}

export interface ActiveFilterState {
  countries: string[];
  jobTitles: string[];
  companies: string[];
  companySizes: string[];
  followerRange: string;
}

export const EMPTY_FILTERS: FilterState = {
  countries: [],
  jobTitles: [],
  companies: [],
  companySizes: [],
  followerRange: "",
  engagementRate: "",
  industry: "",
  language: "",
  verified: false,
};

export const EMPTY_ACTIVE_FILTERS: ActiveFilterState = {
  countries: [],
  jobTitles: [],
  companies: [],
  companySizes: [],
  followerRange: "",
};
