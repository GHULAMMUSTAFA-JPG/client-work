import { Status } from "@/types";
import { apiController } from "./baseUrl";

const handleApiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  payloadOrParams?: object
): Promise<T | null> => {
  try {
    const response =
      method === "get"
        ? await apiController.get(url, { params: payloadOrParams })
        : method === "delete"
        ? await apiController.delete(url, { data: payloadOrParams })
        : await apiController[method](url, payloadOrParams);

    return response.data;
  } catch (error) {
    console.error(`API Error (${method.toUpperCase()} ${url}):`, error);
    return null;
  }
};

export const createCampaignPost = async (payload: {
  campaign_id: string;
  creator_id: string;
  budget: number;
  category: string;
  title: string;
  description: string;
  submission_date: string;
  due_date: string;
}) => handleApiRequest("post", "/creators/campaigns/campaign-post", payload);

export const updatePostProposalStatus = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  status: string;
}) =>
  handleApiRequest("put", "/brands/campaigns/post-proposal-status", payload);

export const createCampaignPostContent = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  content_title: string;
  content_text_content: string;
  media_content: string[];
}) =>
  handleApiRequest(
    "post",
    "/creators/campaigns/campaign-post-content",
    payload
  );

export const updatePostContentStatus = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  content_id: string;
  status: string;
  feedback?: string;
}) =>
  handleApiRequest(
    "put",
    "/brands/campaigns/update-post-cotent-status",
    payload
  );

export const addCampaignLiveLink = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  live_link: string;
}) =>
  handleApiRequest("put", "/creators/campaigns/campaign-live-link", payload);

export const addCampaignPostImpressions = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  impressions: number;
  clicks: number;
  engagement_rate: number;
  comments: number;
  shares: number;
}) =>
  handleApiRequest(
    "put",
    "/creators/campaigns/campaign-post-impressions",
    payload
  );

export const getCampaignCreatorPosts = async (params: {
  creator_id: string;
  campaign_id: string;
}) =>
  handleApiRequest("get", "/creators/campaigns/campaign-creator-posts", params);

export const getCampaignActiveCreatorsOverview = async (params: {
  campaign_id: string;
  buyer_id: string;
}) =>
  handleApiRequest(
    "get",
    "/brands/campaigns/campaign-active-creators-overview",
    params
  );

export const getCampaignPostDetails = async (params: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
}) => handleApiRequest("get", "/creators/campaigns/campaign-post-data", params);

export const getPostContentDetails = async (params: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  content_id: string;
}) => handleApiRequest("get", "/creators/campaigns/post-content-data", params);

export const getCampaignPostProposals = async (params: { buyer_id: string }) =>
  handleApiRequest("get", "/brands/campaigns/campaigns-post-proposals", params);

export const getPostProposalDetails = async (params: {
  buyer_id: string;
  campaign_id: string;
  creator_id: string;
  post_id: string;
}) =>
  handleApiRequest("get", "/brands/campaigns/post-proposal-details", params);

export const getStripeLoginLink = async (user_id: string) => {
  return handleApiRequest<{ object: string; created: number; url: string }>(
    "get",
    `/payments/${user_id}/generate-customer-portal`
  );
};

export const getBrandCampaignById = async (
  campaign_id: string,
  buyer_id?: string
) => {
  return handleApiRequest<{ object: string; created: number; url: string }>(
    "get",
    `brands/campaigns/campaign-active-creators-overview?campaign_id=${campaign_id}&buyer_id=${buyer_id}`
  );
};

export const getBrandCampaignList = async (email: string) => {
  return handleApiRequest<{ object: string; created: number; url: string }>(
    "get",
    `/dashboard/campaigns/get_buyer_campaigns/${email}`
  );
};

export const getCampaignBuyerView = async (campaign_id: string) => {
  return handleApiRequest(
    "get",
    `/brands/campaigns/campaign-buyer-view/${campaign_id}`
  );
};

export const getBrandCampaignApplications = async (campaign_id: string) => {
  return handleApiRequest(
    "get",
    `/brands/campaigns/campaign-buyer-view/${campaign_id}`
  );
};

export const getBrandCampaignActiveCreators = async (params: {
  campaign_id: string;
  buyer_id: string;
}) => {
  return handleApiRequest(
    "get",
    "/brands/campaigns/campaign-active-creators-overview",
    params
  );
};

export const getBrandCampaignPosts = async (params: {
  campaign_id: string;
  creator_id: string;
}) => {
  return handleApiRequest(
    "get",
    "/brands/campaigns/campaign-creator-posts",
    params
  );
};

export const getBrandCampaignPostDetails = async (params: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
}) => {
  return handleApiRequest(
    "get",
    "/brands/campaigns/campaign-post-data",
    params
  );
};

export const getBrandCampaignPostContent = async (params: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  content_id: string;
}) => {
  return handleApiRequest("get", "/brands/campaigns/post-content-data", params);
};

export const deleteBrandCampaign = async (campaign_id: string) => {
  return handleApiRequest(
    "delete",
    `/dashboard/campaigns/delete_campaign/${campaign_id}`
  );
};

export const changeBrandCreatorStatus = async (payload: {
  campaign_id: string;
  creator_id: string;
  status: string;
}) => {
  return handleApiRequest(
    "post",
    `/dashboard/campaigns/change_creator_status`,
    payload
  );
};

export const updateBrandCampaign = async (payload: object) => {
  return handleApiRequest(
    "put",
    `/dashboard/campaigns/update_campaign`,
    payload
  );
};

export const createBrandCampaign = async (payload: object) => {
  return handleApiRequest(
    "post",
    "/dashboard/campaigns/create_campaign",
    payload
  );
};

export const updatePostStatus = async (payload: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  status: string;
}) => {
  return handleApiRequest(
    "put",
    "/brands/campaigns/post-proposal-status",
    payload
  );
};
