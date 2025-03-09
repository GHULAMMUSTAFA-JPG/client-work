export interface TimeSeriesData {
  date: string;
  impressions: number;
  engagements: number;
  engagement_rate: number;
  clicks?: number;
  comments?: number;
  shares?: number;
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatMetrics = (campaignData: any) => ({
  budget: Number((campaignData.benchmarks?.avg_engagement_rate || 0) * 100),
  spent: campaignData.benchmarks?.avg_impressions || 0,
  avgEngagementRate: Number(
    (campaignData.benchmarks?.avg_engagement_rate || 0) * 100
  ),
  avgImpressions: campaignData.benchmarks?.avg_impressions || 0,
  impressions: {
    value: campaignData.performance_metrics?.total_impressions || 0,
    change: Number(
      (
        campaignData.benchmarks?.performance_vs_benchmark?.impressions_diff || 0
      ).toFixed(2)
    ),
  },
  engagement: {
    value: `${(
      (campaignData.performance_metrics?.engagement_rate || 0) * 100
    ).toFixed(2)}%`,
    change: Number(
      (
        (campaignData.benchmarks?.performance_vs_benchmark
          ?.engagement_rate_diff || 0) * 100
      ).toFixed(2)
    ),
  },
  trend: {
    value: `${(
      (campaignData.benchmarks?.avg_engagement_rate || 0) * 100
    ).toFixed(2)}%`,
    change: Number(
      (
        (campaignData.benchmarks?.performance_vs_benchmark
          ?.engagement_rate_diff || 0) * 100
      ).toFixed(2)
    ),
  },
  benchmarks: {
    engagementRateDiff: Number(
      (
        (campaignData.benchmarks?.performance_vs_benchmark
          ?.engagement_rate_diff || 0) * 100
      ).toFixed(2)
    ),
    impressionsDiff: Number(
      (
        campaignData.benchmarks?.performance_vs_benchmark?.impressions_diff || 0
      ).toFixed(2)
    ),
  },
  status: campaignData.campaign_progress?.campaign_status || "draft",
});

export const formatTopCreator = (topCreatorData: any) => ({
  name: topCreatorData.creator_name,
  image: topCreatorData.profile_image,
  category: "Content Creator",
  stats: {
    followers: topCreatorData.followers || 0,
    weeklyGrowth: Number(
      (
        topCreatorData.comparison?.vs_campaign_average
          ?.engagement_rate_diff_percentage || 0
      ).toFixed(2)
    ),
    engagement: Number(
      (topCreatorData.creator_metrics?.engagement_rate || 0) * 100
    ),
    performance: {
      current: Number(topCreatorData.s_score || 0),
      change: `${(
        topCreatorData.comparison?.vs_campaign_average
          ?.engagement_rate_diff_percentage || 0
      ).toFixed(2)}%`,
    },
  },
});

export const formatEngagementData = (campaignData: any) =>
  (campaignData.time_series_data || [])
    .map((data: any) => ({
      date: data.date ? formatDate(data.date) : "",
      impressions: data.impressions || 0,
      engagement: data.engagements || 0,
    }))
    .filter((data: any) => data.date);

export const formatPerformanceData = (campaignData: any) => [
  {
    subject: "Engagement Rate %",
    Current: Number(
      ((campaignData.performance_metrics?.engagement_rate || 0) * 100).toFixed(
        2
      )
    ),
    Target: Number(
      ((campaignData.benchmarks?.avg_engagement_rate || 0) * 100).toFixed(2)
    ),
    Average: Number(
      ((campaignData.benchmarks?.avg_engagement_rate || 0) * 100).toFixed(2)
    ),
  },
  {
    subject: "Impressions",
    Current: campaignData.performance_metrics?.total_impressions || 0,
    Target: campaignData.benchmarks?.avg_impressions || 0,
    Average: campaignData.performance_metrics?.average_impressions || 0,
  },
  {
    subject: "Engagements",
    Current: campaignData.performance_metrics?.total_engagements || 0,
    Target: campaignData.performance_metrics?.average_engagements || 0,
    Average: campaignData.performance_metrics?.average_engagements || 0,
  },
];

export const formatCreatorsData = (campaignData: any) =>
  (campaignData.creator_performances || []).map((creator: any) => ({
    id: creator.creator_id || "",
    name: creator.creator_name || "Unknown Creator",
    profilePicture: creator.profile_image || "",
    lastPost: creator.post_metrics?.[0]?.created_at
      ? formatDate(creator.post_metrics[0].created_at)
      : "-",
    impressions: creator.total_impressions || 0,
    engRate: Number(((creator.engagement_rate || 0) * 100).toFixed(2)),
    reactions: creator.total_engagements || 0,
    trend: Number(((creator.engagement_rate || 0) * 100).toFixed(2)),
  }));

export const formatTimeSeriesData = (data: TimeSeriesData[]) => {
  return data
    .map((item) => ({
      ...item,
      date: formatDate(item.date),
      engagement_rate: Number((item.engagement_rate * 100).toFixed(2)),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
