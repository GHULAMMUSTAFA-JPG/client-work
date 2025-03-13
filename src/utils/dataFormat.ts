import { Status, Post, Campaign, Creator, CreatorStatus } from "@/types";
import { formatDate } from ".";

/**
 * Transforms post content versions into a standardized format
 */
export const transformPostContent = (post: any) => {
  return (
    post?.Content_Versions?.map((content: any) => ({
      id: content.Content_ID,
      date:
        formatDate(content.Submitted_At) || formatDate(post.Created_At, true),
      media: content.Media_Content || [],
      status: content.Status,
      title: content.Content_Title || post.Post_Title,
      description: content.Content_Text_Content || post.Post_Description,
      feedback: content.Feedback,
      livePostLink: post.Live_Link || undefined,
      postType: post.Category || "unknown",
      metrics: post.Impressions
        ? {
            impressions: post.Impressions.Impressions || 0,
            clicks: post.Impressions.Clicks || 0,
            engagementRate: post.Impressions.Engagement_Rate || 0,
            comments: post.Impressions.Comments || 0,
            shares: post.Impressions.Shares || 0,
          }
        : undefined,
      isDraft: content.Is_Draft,
    })) ?? []
  );
};

/**
 * Formats posts data for brand creator view
 */
export const formatBrandCreatorPosts = (posts: any[]): Post[] => {
  if (!posts || !Array.isArray(posts)) return [];

  return posts.map((post) => ({
    numberstatus: post.Status,
    dueDate: formatDate(post.Due_Date) || "",
    description: post.Post_Description || "",
    budget: post.Budget,
    submittedAt: formatDate(post.Created_At) || "",
    category: post.Category,
    id: post._id,
    title: post.Post_Title || "Untitled",
    date: formatDate(post.Submission_Date, true) || "",
    status: mapPostStatus(post.Status),
    content: post.Post_Description || "",
    impressions: post.Impressions?.Impressions || null,
    engagement: post.Impressions?.Engagement_Rate || null,
    link: post.Live_Link || undefined,
    contentItems: (post.Content_Versions || []).map((content: any) => ({
      id: content.Content_ID,
      type: determineContentType(content),
      content: content.Content_Text_Content || "",
      date: formatDate(content.Submitted_At, true) || "",
      status: mapPostStatus(content.Status),
      images: content.Media_Content || [],
    })),
  }));
};

/**
 * Maps numeric status to string status compatible with Post type
 */
const mapPostStatus = (
  status: number
): "in_review" | "approved" | "published" => {
  switch (status) {
    case Status.PendingApproval:
    case Status.InProgress:
    case Status.Rejected:
    case Status.Paused:
    case Status.Cancelled:
    case Status.Unpaid:
    case Status.PaymentProcessing:
      return "in_review";
    case Status.Approved:
    case Status.Completed:
    case Status.Paid:
    case Status.PostImpressionUploaded:
      return "approved";
    case Status.Published:
      return "published";
    default:
      return "in_review";
  }
};

/**
 * Maps numeric status to string status
 */
const mapStatus = (
  status: number
):
  | "in_review"
  | "approved"
  | "published"
  | "rejected"
  | "paused"
  | "cancelled"
  | "unpaid"
  | "paid"
  | "payment_processing"
  | "impression_uploaded" => {
  switch (status) {
    case Status.PendingApproval:
    case Status.InProgress:
      return "in_review";
    case Status.Approved:
    case Status.Completed:
      return "approved";
    case Status.Published:
      return "published";
    case Status.Rejected:
      return "rejected";
    case Status.Paused:
      return "paused";
    case Status.Cancelled:
      return "cancelled";
    case Status.Unpaid:
      return "unpaid";
    case Status.Paid:
      return "paid";
    case Status.PaymentProcessing:
      return "payment_processing";
    case Status.PostImpressionUploaded:
      return "impression_uploaded";
    default:
      return "in_review";
  }
};

/**
 * Determines content type based on media content
 */
const determineContentType = (content: any): "image" | "video" | "text" => {
  if (content.Media_Content?.length > 0) {
    const firstMedia = content.Media_Content[0].toLowerCase();
    if (firstMedia.includes(".jpg") || firstMedia.includes(".png"))
      return "image";
    if (firstMedia.includes(".mp4") || firstMedia.includes(".mov"))
      return "video";
  }
  return "text";
};

/**
 * Extracts creators from campaign progress data
 */
export const extractCreatorsFromCampaignProgress = (
  campaignProgress: any
): Creator[] => {
  if (!campaignProgress) return [];
  const allCreators: Creator[] = [];

  Object.entries(campaignProgress).forEach(([status, creators]) => {
    if (Array.isArray(creators)) {
      creators.forEach((creator: any) => {
        allCreators.push({
          id: creator._id,
          name: creator.Name,
          profilePicture: creator.Profile_Image || "",
          linkedInId: "",
          country: "",
          jobTitle: "",
          company: "",
          followers: 0,
          status: status as CreatorStatus,
          ongoingSpend: 0,
          paymentStatus: "unpaid",
          averageImpressions: 0,
          averageEngagement: 0,
          submissionDate: creator.Timestamp || "",
          contentStatus: "",
          postsCompleted: 0,
          totalPosts: 0,
        });
      });
    }
  });

  return allCreators;
};

/**
 * Formats campaign data from API response
 */
export const formatCampaignData = (apiData: any): Campaign => {
  if (!apiData) return {} as Campaign;

  return {
    id: apiData._id,
    name: apiData.Headline,
    budget: apiData.Budget,
    totalSpend: 0,
    forecastedSpend: 0,
    startDate: apiData.Start_Date ?? "N/A",
    status: apiData.Is_Public ? "public" : "private",
    totalPosts: 0,
    totalCreators:
      (apiData.Creator_Insights?.Approved || 0) +
      (apiData.Creator_Insights?.In_Discussion || 0) +
      (apiData.Creator_Insights?.Invited || 0) +
      (apiData.Creator_Insights?.Applied || 0) +
      (apiData.Creator_Insights?.Not_Fit || 0),
    activeCreators: apiData.Creator_Insights?.Approved || 0,
    creators: extractCreatorsFromCampaignProgress(
      apiData.Campaign_Progress || {}
    ),
  };
};

/**
 * Creates a creator object from API data
 */
export const createCreatorFromData = (creator: any): Creator => {
  if (!creator) return {} as Creator;

  const postsCompleted = creator.Posts
    ? creator.Posts.filter((post: any) => post.Status === 12 && post.Live_Link)
        .length
    : 0;
  const totalPosts = creator.Posts ? creator.Posts.length : 0;

  // Calculate average impressions
  let totalImpressions = 0;
  let postsWithImpressions = 0;

  if (creator.Posts) {
    creator.Posts.forEach((post: any) => {
      if (post.Impressions && post.Impressions.Impressions) {
        totalImpressions += post.Impressions.Impressions;
        postsWithImpressions++;
      }
    });
  }

  const averageImpressions =
    postsWithImpressions > 0
      ? Math.round(totalImpressions / postsWithImpressions)
      : 0;

  // Calculate average engagement
  let totalEngagement = 0;
  let postsWithEngagement = 0;

  if (creator.Posts) {
    creator.Posts.forEach((post: any) => {
      if (post.Impressions && post.Impressions.Engagement_Rate) {
        totalEngagement += post.Impressions.Engagement_Rate;
        postsWithEngagement++;
      }
    });
  }

  const averageEngagement =
    postsWithEngagement > 0
      ? parseFloat((totalEngagement / postsWithEngagement).toFixed(1))
      : 0;

  // Determine payment status based on post data
  let paymentStatus = "unpaid";
  if (creator.Posts && creator.Posts.length > 0) {
    const allPaid = creator.Posts.every(
      (post: any) => post.Payment_Status === "paid"
    );
    const somePaid = creator.Posts.some(
      (post: any) => post.Payment_Status === "paid"
    );

    if (allPaid) {
      paymentStatus = "paid";
    } else if (somePaid) {
      paymentStatus = "in_process";
    }
  }

  return {
    id: creator.Creator_ID,
    name: creator.Name,
    profilePicture: creator.Profile_Image || "",
    linkedInId: creator.LinkedIn_ID || "",
    country: creator.Country || "",
    jobTitle: creator.Job_Title || "",
    company: creator.Company || "",
    followers: creator.Followers || 0,
    status: CreatorStatus.Approved,
    ongoingSpend: creator.Posts
      ? creator.Posts.reduce(
          (sum: number, post: any) => sum + (post.Budget || 0),
          0
        )
      : 0,
    paymentStatus: paymentStatus as "unpaid" | "paid" | "in_process",
    averageImpressions: averageImpressions,
    averageEngagement: averageEngagement,
    postsCompleted: postsCompleted,
    totalPosts: totalPosts,
    contentStatus: postsCompleted === totalPosts ? "completed" : "in_progress",
    submissionDate:
      creator.Posts && creator.Posts.length > 0
        ? creator.Posts[0].Submission_Date
        : "",
    posts: formatBrandCreatorPosts(creator.Posts || []),
  };
};

/**
 * Extracts campaign form data from API response
 */
export const extractCampaignFormData = (data: any) => {
  if (!data) return {};

  return {
    campaignId: data?._id ?? "",
    isPublic: data?.Is_Public ?? false,
    headline: data?.Headline ?? "",
    budget: data?.Budget ?? 0,
    briefDescription: data?.Brief_Description ?? "",
    campaignDetails: data?.Campaign_Details ?? "",
    isOngoing: data?.Is_Ongoing ?? false,
    startDate: data?.Start_Date ?? "",
    endDate: data?.End_Date ?? "",
    targetAudience: data?.Target_Audience ?? [],
    mediaUrl: data?.Campaign_Media ?? "",
  };
};

export const getCurrentPostStage = (post: any): number => {
  const { Content_Versions = [], Live_Link, Impressions, Status } = post;
  console.log(Impressions);
  if (Status === 10) {
    return 6; // Return 6 instead of 7 to ensure proper stage coloring
  }
  if (Impressions) {
    console.log("impression found");
    return 6;
  }
  if (Live_Link) return 5;

  if (
    Content_Versions.length === 0 ||
    Content_Versions.every((content: any) => content.Is_Draft === true)
  ) {
    return 1;
  }
  if (
    Content_Versions.some((content: any) => content.Is_Draft == false) &&
    Content_Versions.some((content: any) => content.Status === 1)
  )
    return 2;

  if (Content_Versions.some((content: any) => content.Status === 2)) return 4;

  return 1;
};
