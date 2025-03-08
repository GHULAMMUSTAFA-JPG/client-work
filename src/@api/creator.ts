import { handleApiRequest } from "./utils";

export const getCreatorPayouts = async (creator_id: string) => {
  return handleApiRequest("get", `/creator/${creator_id}/payouts`);
};

export const discoverCreators = async (params: {
  email: string;
  company_names?: string;
  county_codes?: string;
  company_sizes?: string;
  followers_range?: string;
}) => {
  return handleApiRequest("get", "/dashboard/buyers/discover_creators", params);
};
