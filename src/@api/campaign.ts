import { apiController } from "./baseUrl";

export const createCampaignPost = async (payload: {
  campaign_id: string;
  creator_id: string;
  budget: number;
  category: string;
  title: string;
  description: string;
}) => {
  try {
    const response = await apiController.post(
      "/dashboard/campaigns/campaign-post",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error creating campaign post:", error);
    return null;
  }
};

export const createCampaignPostContent = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  content_title: string;
  content_text_content: string;
}) => {
  try {
    const response = await apiController.post(
      "/dashboard/campaigns/campaign-post-content",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error creating campaign post content:", error);
    return null;
  }
};

export const getCampaignCreatorPosts = async (params: {
  creator_id: string;
  campaign_id: string;
}) => {
  try {
    const response = await apiController.get(
      `/dashboard/campaigns/campaign-creator-posts`,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching campaign creator posts:", error);
    return null;
  }
};

export const getCampaignPostDetails = async (params: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
}) => {
  try {
    const response = await apiController.get(
      `/dashboard/campaigns/campaign-post-data`,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching campaign post details:", error);
    return null;
  }
};

export const getPostContentDetails = async (params: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  content_id: string;
}) => {
  try {
    const response = await apiController.get(
      `/dashboard/campaigns/post-content-data`,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching post content details:", error);
    return null;
  }
};
