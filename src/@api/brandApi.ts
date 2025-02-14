import { apiController } from "./baseUrl";

export const getBrandDiscoverList = async ({
  userId,
  isInterested = false,
  searchQuery = "",
  sortBy = "largest_first",
  page = 1,
  limit = 10,
}: {
  userId: string;
  isInterested?: boolean;
  searchQuery?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await apiController.post(
      "/dashboard/creators/discover_brands",
      {
        user_id: userId,
        is_interested: isInterested,
        search_query: searchQuery,
        sort_by: sortBy,
        pagination: {
          page,
          limit,
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
