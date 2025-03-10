"use client";
import React, { Suspense, useState, useEffect } from "react";
import {
  Search,
  Plus,
  TrendingUp,
  Users,
  Eye,
  Share2,
  DollarSign,
} from "lucide-react";
import { getBuyerAnalytics } from "@/@api/analytics";
import type {
  BuyerAnalytics,
  TimeSeriesData,
  DateRange,
} from "@/@api/analytics";
import Loader from "@/components/loader";
import { withAuthRole } from "@/utils/withAuthRole";
import { useAuth } from "@/contexts/AuthContext";
import EditCreateCampaign from "@/components/shared/EditCreateCampaign";
import SummaryCard from "@/components/brand-anayltics/SummaryCard";
import PerformanceChart from "@/components/shared/PerformanceChart";
import CampaignsTable from "@/components/brand-anayltics/CampaignsTable";
import { formatTimeSeriesData } from "@/utils/analyticsUtils";

function AllCampaigns() {
  const [timeframe, setTimeframe] = useState<DateRange>({
    time_range: "last_30_days",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<BuyerAnalytics | null>(
    null
  );
  const [chartData, setChartData] = useState<TimeSeriesData[]>([]);
  const { user } = useAuth();

  const fetchAnalytics = async () => {
    if (!user?._id) return;

    setIsLoading(true);
    try {
      const data = await getBuyerAnalytics(user._id, timeframe);
      setAnalyticsData(data);

      if (data?.time_series_data) {
        setChartData(formatTimeSeriesData(data.time_series_data));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [user, timeframe]);
  console.log(analyticsData, "analyticsData");

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <header className="tw-bg-white tw-border-b tw-border-gray-200 tw-px-6 tw-py-4">
        <div className="tw-mx-auto">
          <h1 className="tw-text-2xl tw-font-bold">Campaign Management</h1>
        </div>
      </header>

      <main className="tw-mx-auto tw-px-6 tw-py-8">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
          <div className="tw-relative">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="tw-pl-10 tw-pr-4 tw-py-2 tw-border tw-border-gray-200 tw-rounded-lg tw-w-64"
            />
            <Search className="tw-w-5 tw-h-5 tw-text-gray-400 tw-absolute tw-left-3 tw-top-2.5" />
          </div>
          <div className="tw-flex tw-items-center tw-gap-4">
            <div className="tw-relative">
              <select
                value={timeframe.time_range}
                onChange={(e) =>
                  setTimeframe({
                    time_range: e.target.value as DateRange["time_range"],
                  })
                }
                className="tw-border tw-border-gray-200 tw-rounded-lg tw-px-3 tw-py-2"
                disabled={isLoading}
              >
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="last_year">Last Year</option>
              </select>
              {isLoading && <Loader />}
            </div>

            <button
              className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-gray-900 tw-text-white tw-rounded-lg hover:tw-bg-gray-800"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight2"
            >
              <Plus className="tw-w-4 tw-h-4 tw-mr-2" />
              New Campaign
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="tw-flex tw-justify-center tw-items-center tw-min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-mb-8">
              <SummaryCard
                title="Total Campaigns"
                value={analyticsData?.total_campaigns || 0}
                icon={<Share2 className="tw-w-6 tw-h-6 tw-text-blue-500" />}
                iconBgColor="tw-bg-blue-50"
                iconColor="tw-text-blue-500"
                subtitle={
                  <div className="tw-flex tw-items-center">
                    <div className="tw-flex tw-items-center tw-text-green-500">
                      <TrendingUp className="tw-w-4 tw-h-4 tw-mr-1" />
                      Active: {analyticsData?.active_campaigns || 0}
                    </div>
                    <span className="tw-mx-2 tw-text-gray-300">|</span>
                    <span>
                      Completed: {analyticsData?.completed_campaigns || 0}
                    </span>
                  </div>
                }
                subtitleValue=""
              />

              <SummaryCard
                title="Total Creators"
                value={analyticsData?.total_creators || 0}
                icon={<Users className="tw-w-6 tw-h-6 tw-text-green-500" />}
                iconBgColor="tw-bg-green-50"
                iconColor="tw-text-green-500"
                subtitle="Average engagement rate"
                subtitleValue={`${(
                  analyticsData?.overall_engagement_rate || 0
                ).toFixed(2)}%`}
              />

              <SummaryCard
                title="Total Impressions"
                value={(analyticsData?.total_impressions || 0).toLocaleString()}
                icon={<Eye className="tw-w-6 tw-h-6 tw-text-purple-500" />}
                iconBgColor="tw-bg-purple-50"
                iconColor="tw-text-purple-500"
                subtitle="Total engagements"
                subtitleValue={(
                  analyticsData?.total_engagements || 0
                ).toLocaleString()}
              />

              <SummaryCard
                title="Total Budget"
                value={`$${(
                  analyticsData?.total_budget || 0
                ).toLocaleString()}`}
                icon={
                  <DollarSign className="tw-w-6 tw-h-6 tw-text-amber-500" />
                }
                iconBgColor="tw-bg-amber-50"
                iconColor="tw-text-amber-500"
                subtitle="Average per campaign"
                subtitleValue={`$${(
                  (analyticsData?.total_budget || 0) /
                  (analyticsData?.total_campaigns || 1)
                ).toLocaleString()}`}
              />
            </div>

            <PerformanceChart
              series={[
                {
                  dataKey: "impressions",
                  name: "Impressions",
                  color: "#3b82f6",
                  yAxisId: "left",
                  showDot: true,
                },
                {
                  dataKey: "engagements",
                  name: "Engagements",
                  color: "#10b981",
                  yAxisId: "left",
                  showDot: true,
                },
                {
                  dataKey: "engagement_rate",
                  name: "Engagement Rate",
                  color: "#f59e0b",
                  yAxisId: "right",
                  showDot: true,
                },
              ]}
              chartData={chartData}
            />

            <CampaignsTable campaignMetrics={analyticsData?.campaign_metrics} />
          </>
        )}
      </main>
      <EditCreateCampaign
        isEditMode={false}
        onSuccess={() => {
          fetchAnalytics();
        }}
      />
    </div>
  );
}

function AuthPageWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <AllCampaigns />
    </Suspense>
  );
}

export default withAuthRole({
  Component: AuthPageWrapper,
  allowedRoles: ["buyer"],
});
