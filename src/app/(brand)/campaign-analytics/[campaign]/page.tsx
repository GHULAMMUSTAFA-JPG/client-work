"use client";

import React, { Suspense } from "react";

import {
  campaignMetrics,
  topCreatorData,
  engagementData,
  creatorPerformanceData,
  allCreatorsData,
} from "../mockupData";
import CreatorsTable from "@/components/campaign-analytics/CreatorsTable";
import BudgetCard from "@/components/campaign-analytics/BudgetCard";
import PerformanceRadarChart from "@/components/campaign-analytics/PerformanceRadarChart";
import TopCreatorProfile from "@/components/campaign-analytics/TopCreatorProfile";
import EngagementChart from "@/components/campaign-analytics/EngagementChart";
import CampaignHeader from "@/components/campaign-analytics/CampaignHeader";
import Loader from "@/components/loader";
import { withAuthRole } from "@/utils/withAuthRole";

function CampaignDashboard() {
  const timeframe = "Last 30 Days";

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <CampaignHeader timeframe={timeframe} campaignMetrics={campaignMetrics} />

      <main className="tw-mx-auto tw-px-6 tw-py-8">
        <TopCreatorProfile creator={topCreatorData} />

        {/* Charts Grid */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6 tw-mb-8">
          <EngagementChart data={engagementData} />
          <PerformanceRadarChart data={creatorPerformanceData} />
        </div>

        <BudgetCard
          budget={campaignMetrics.budget}
          spent={campaignMetrics.spent}
        />

        <CreatorsTable creators={allCreatorsData as any} />
      </main>
    </div>
  );
}

function AuthPageWrapper() {
  return (
    <Suspense fallback={<Loader />}>
      <CampaignDashboard />
    </Suspense>
  );
}

export default withAuthRole({
  Component: AuthPageWrapper,
  allowedRoles: ["buyer"],
});
