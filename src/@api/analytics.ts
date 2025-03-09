import { handleApiRequest } from "./utils";

export interface CampaignProgress {
  total_approved_creators: number;
  campaign_status: string;
  approved_count: number;
  invited_count: number;
  in_discussion_count: number;
  applied_count: number;
  not_fit_count: number;
}

export interface PerformanceMetrics {
  total_impressions: number;
  total_engagements: number;
  average_impressions: number;
  average_engagements: number;
  engagement_rate: number;
}

export interface TimeSeriesData {
  date: string;
  impressions: number;
  engagements: number;
  engagement_rate: number;
  clicks?: number;
  comments?: number;
  shares?: number;
}

export interface PostMetric {
  post_id: string;
  created_at: string;
  impressions: number;
  engagements: number;
  engagement_rate: number;
}

export interface CreatorPerformance {
  creator_id: string;
  creator_name: string;
  profile_image: string;
  total_impressions: number;
  total_engagements: number;
  posts_count: number;
  s_score: number;
  followers: number;
  post_metrics: PostMetric[];
  engagement_rate: number;
  top_performer: boolean;
  top_performer_categories: string[];
}

export interface TopPerformer {
  creator_id: string;
  creator_name: string;
  profile_image: string;
  value: number;
}

export interface Benchmarks {
  avg_engagement_rate: number;
  avg_impressions: number;
  performance_vs_benchmark: {
    engagement_rate_diff: number;
    impressions_diff: number;
  };
}

export interface CampaignAnalytics {
  campaign_id: string;
  campaign_headline: string;
  campaign_description: string;
  start_date: string;
  end_date: string;
  campaign_progress: CampaignProgress;
  performance_metrics: PerformanceMetrics;
  time_series_data: TimeSeriesData[];
  creator_performances: CreatorPerformance[];
  audience_demographics: Record<string, unknown>[];
  benchmarks: Benchmarks;
  top_performers: {
    impressions: TopPerformer;
    engagements: TopPerformer;
    engagement_rate: TopPerformer;
  };
}

export interface Post {
  post_id: { $oid: string };
  post_title: string;
  post_description: string;
  live_link: string;
  impressions?: number;
  clicks?: number;
  engagements?: number;
  comments?: number;
  shares?: number;
  created_at: string;
  submission_date: string;
}

export interface CreatorMetrics {
  total_impressions: number;
  total_engagements: number;
  engagement_rate: number;
  posts_count: number;
}

export interface Comparison {
  contribution_to_campaign: {
    impressions_percentage: number;
    engagements_percentage: number;
  };
  vs_campaign_average: {
    impressions_diff: number;
    impressions_diff_percentage: number;
    engagements_diff: number;
    engagements_diff_percentage: number;
    engagement_rate_diff: number;
    engagement_rate_diff_percentage: number;
  };
}

export interface CampaignCreatorAnalytics {
  campaign_id: string;
  campaign_headline: string;
  creator_id: string;
  creator_name: string;
  profile_image: string;
  s_score: number;
  followers: number;
  creator_metrics: CreatorMetrics;
  time_series_data: TimeSeriesData[];
  posts: Post[];
  comparison: Comparison;
  audience_demographics: Record<string, unknown>[];
}

export interface CampaignMetric {
  campaign_id: string;
  campaign_headline: string;
  start_date: string | Date;
  end_date: string | Date;
  status: string;
  total_creators: number;
  total_posts: number;
  total_impressions: number;
  total_engagements: number;
  engagement_rate: number;
  budget: number;
}

export interface BuyerAnalytics {
  buyer_id: string;
  company_name: string;
  company_logo: string;
  total_campaigns: number;
  active_campaigns: number;
  completed_campaigns: number;
  total_creators: number;
  total_impressions: number;
  total_engagements: number;
  overall_engagement_rate: number;
  total_budget: number;
  campaign_metrics: CampaignMetric[];
  time_series_data: TimeSeriesData[];
}

export interface BuyerAnalyticsResponse {
  message: string;
  data: BuyerAnalytics;
}

export interface DateRange {
  start_date?: string;
  end_date?: string;
  time_range:
    | "last_7_days"
    | "last_30_days"
    | "last_90_days"
    | "last_year"
    | "custom";
}

export const getCampaignAnalytics = async (
  campaignId: string,
  dateRange: DateRange
): Promise<CampaignAnalytics | null> => {
  return handleApiRequest<CampaignAnalytics>(
    "post",
    "/analytics/campaign-analytics",
    {
      campaign_id: campaignId,
      date_range: dateRange,
    }
  );
};

export const getCampaignCreatorAnalytics = async (
  campaignId: string,
  creatorId: string,
  dateRange: DateRange
): Promise<CampaignCreatorAnalytics | null> => {
  return handleApiRequest<CampaignCreatorAnalytics>(
    "post",
    "/analytics/campaign-creator-analytics",
    {
      campaign_id: campaignId,
      creator_id: creatorId,
      date_range: dateRange,
    }
  );
};

export const getBuyerAnalytics = async (
  buyerId: string,
  dateRange: DateRange
): Promise<BuyerAnalytics | null> => {
  const response = await handleApiRequest<BuyerAnalyticsResponse>(
    "post",
    "/analytics/buyer-analytics",
    {
      buyer_id: buyerId,
      date_range: dateRange,
    }
  );
  return response?.data || null;
};
