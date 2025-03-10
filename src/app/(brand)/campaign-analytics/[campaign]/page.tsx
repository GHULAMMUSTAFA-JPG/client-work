"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  getCampaignAnalytics,
  getCampaignCreatorAnalytics,
  type CampaignAnalytics,
  type CampaignCreatorAnalytics,
} from "@/@api/analytics";
import {
  formatMetrics,
  formatTopCreator,
  formatEngagementData,
  formatPerformanceData,
  formatCreatorsData,
} from "@/utils/analyticsUtils";
import CreatorsTable from "@/components/campaign-analytics/CreatorsTable";
import PerformanceRadarChart from "@/components/campaign-analytics/PerformanceRadarChart";
import TopCreatorProfile from "@/components/campaign-analytics/TopCreatorProfile";
import EngagementChart from "@/components/campaign-analytics/EngagementChart";
import CampaignHeader from "@/components/campaign-analytics/CampaignHeader";
import Loader from "@/components/loader";
import { withAuthRole } from "@/utils/withAuthRole";

interface ApiResponse<T> {
  message: string;
  data: T;
}

type TimeRange = "last_7_days" | "last_30_days" | "last_90_days" | "last_year";

const timeframes: Record<TimeRange, string> = {
  last_7_days: "Last 7 Days",
  last_30_days: "Last 30 Days",
  last_90_days: "Last 90 Days",
  last_year: "Last Year",
};

function CampaignDashboard({ params }: { params: { campaign: string } }) {
  const [campaignData, setCampaignData] = useState<CampaignAnalytics | null>(
    null
  );
  const [topCreatorData, setTopCreatorData] =
    useState<CampaignCreatorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<TimeRange>("last_30_days");

  const fetchCampaignData = async (timeframe: TimeRange) => {
    setLoading(true);
    try {
      const response = (await getCampaignAnalytics(params.campaign, {
        time_range: timeframe,
      })) as unknown as ApiResponse<CampaignAnalytics>;

      if (!response?.data) return;
      setCampaignData(response.data);

      const topPerformerId =
        response.data.top_performers?.engagement_rate?.creator_id;
      if (topPerformerId) {
        const creatorResponse = (await getCampaignCreatorAnalytics(
          params.campaign,
          topPerformerId,
          { time_range: timeframe }
        )) as unknown as ApiResponse<CampaignCreatorAnalytics>;
        setTopCreatorData(creatorResponse?.data || null);
      }
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignData(selectedTimeframe);
  }, [params.campaign, selectedTimeframe]);

  if (loading || !campaignData) return <Loader />;

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <CampaignHeader
        timeframe={timeframes[selectedTimeframe as keyof typeof timeframes]}
        campaignMetrics={formatMetrics(campaignData)}
        onTimeframeChange={(value) => setSelectedTimeframe(value as TimeRange)}
        timeframeOptions={timeframes}
      />
      <main className="tw-mx-auto tw-px-6 tw-py-8">
        {topCreatorData && (
          <TopCreatorProfile creator={formatTopCreator(topCreatorData)} />
        )}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6 tw-mb-8">
          <EngagementChart data={formatEngagementData(campaignData)} />
          <PerformanceRadarChart data={formatPerformanceData(campaignData)} />
        </div>
        <CreatorsTable creators={formatCreatorsData(campaignData)} />
      </main>
    </div>
  );
}

const AuthPageWrapper = ({ params }: { params: { campaign: string } }) => (
  <Suspense fallback={<Loader />}>
    <CampaignDashboard params={params} />
  </Suspense>
);

export default withAuthRole({
  Component: AuthPageWrapper,
  allowedRoles: ["buyer"],
});
