import { apiController } from "./baseUrl";

export const createCampaignPost = async (payload: {
  campaign_id: string;
  creator_id: string;
  budget: number;
  content_type: string;
  title: string;
  description: string;
}) => {
  try {
    console.log("payload", payload);

    const response = await apiController.post(
      "/dashboard/campaigns/create_campaign_post",
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error creating campaign post:", error);
    return null;
  }
};

export const getCampaignPosts = async (
  creatorId: string,
  campaignId: string
) => {
  try {
    const response = await apiController.get(
      `/dashboard/campaigns/get_campaign_creator_posts?creator_id=${creatorId}&campaign_id=${campaignId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error getting campaign posts:", error);
    return null;
  }
};

export const createCampaignPostSubmission = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  submission_title: string;
  submission_text_content: string;
  media_content: File[];
}) => {
  try {
    const formData = new FormData();
    formData.append("campaign_id", payload.campaign_id);
    formData.append("creator_id", payload.creator_id);
    formData.append("post_id", payload.post_id);
    formData.append("submission_title", payload.submission_title);
    formData.append("submission_text_content", payload.submission_text_content);

    payload.media_content.forEach((file) => {
      formData.append("media_content", file);
    });

    const response = await apiController.post(
      "/dashboard/campaigns/create_campaign_post_submission",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating campaign post submission:", error);
    return null;
  }
};
