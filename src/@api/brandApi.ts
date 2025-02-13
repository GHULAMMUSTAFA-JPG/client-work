import { apiController } from "./baseUrl";

export const getBrandDiscoverList = async (email: string) => {
  try {
    const response = await apiController.post(
      "/dashboard/creators/discover_brands",
      {
        email,
        is_interested: false,
        filters: {},
        search_query: "string",
        sort_by: "largest_first",
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export const toggleBrandInterest = async (
  creatorId: string,
  brandId: string,
  addInterest: boolean
): Promise<boolean> => {
  try {
    const endpoint = addInterest
      ? "add_brand_to_creator_interest"
      : "remove_brand_from_creator_interest";

    const response = await apiController.post(
      `/dashboard/creators/${endpoint}`,
      {
        creator_id: creatorId,
        brand_id: brandId,
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error("Error toggling brand interest:", error);
    return false;
  }
};
