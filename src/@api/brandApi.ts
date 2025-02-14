import { apiController } from "./baseUrl";

interface GetBrandDiscoverListParams {
  userId: string;
  isInterested?: boolean;
  searchQuery?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
  sales?: string[];
  size?: string[];
  regions?: string[];
}

export const getBrandDiscoverList = async (
  params: GetBrandDiscoverListParams
) => {
  try {
    const filters: {
      categories?: string[];
      size?: string[];
      location?: string[];
    } = {};

    if (params.sales?.length) filters.categories = params.sales;
    if (params.size?.length) filters.size = params.size;
    if (params.regions?.length) filters.location = params.regions;

    const response = await apiController.post(
      "/dashboard/creators/discover_brands",
      {
        user_id: params.userId,
        is_interested: params.isInterested,
        search_query: params.searchQuery,
        sort_by: params.sortBy,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
        pagination: {
          page: params.page,
          limit: params.limit,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching brand discover list:", error);
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
