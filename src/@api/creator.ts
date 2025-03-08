import { handleApiRequest } from "./utils";

export const getCreatorPayouts = async (email: string) => {
  return handleApiRequest(
    "get",
    `/creators/campaigns/creator-payouts/${email}`
  );
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
