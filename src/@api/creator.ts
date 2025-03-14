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

export const getCreatorUniqueFilters = async () => {
  return handleApiRequest("get", "/unique_filters/creators");
};

export const deleteCreatorFromList = async (params: {
  List_Id: string;
  Creator_Id: string;
}) => {
  return handleApiRequest(
    "delete",
    "/dashboard/buyers/remove_creator_from_list",
    {
      data: params,
    }
  );
};
