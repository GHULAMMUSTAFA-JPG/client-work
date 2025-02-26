import { apiController } from "./baseUrl";

const handleApiRequest = async <T>(
  method: "get" | "post" | "put",
  url: string,
  payloadOrParams?: object
): Promise<T | null> => {
  try {
    const response =
      method === "get"
        ? await apiController.get(url, { params: payloadOrParams })
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
  handleApiRequest(
    "get",
    "/creators/campaigns/campaign-creator-posts",
    params
  );

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
}) =>
  handleApiRequest("get", "/creators/campaigns/campaign-post-data", params);

export const getPostContentDetails = async (params: {
  campaign_id: string;
  creator_id: string;
  post_id: string;
  content_id: string;
}) => handleApiRequest("get", "/creators/campaigns/post-content-data", params);

export const getCampaignPostProposals = async (params: { buyer_id: string }) =>
  handleApiRequest(
    "get",
    "/brands/campaigns/campaigns-post-proposals",
    params
  );

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
