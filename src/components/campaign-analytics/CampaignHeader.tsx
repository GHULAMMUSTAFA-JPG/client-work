import { ArrowLeft, ArrowUpIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import MetricCard from "./MetricCard";

interface CampaignHeaderProps {
  timeframe: string;
  campaignMetrics: {
    status?: string;
    budget: number;
    spent: number;
    impressions: {
      value: number;
      change: number;
    };
    engagement: {
      value: string;
      change: number;
    };
    trend: {
      value: string;
      change: number;
    };
  };
}

const CampaignHeader = ({
  timeframe,
  campaignMetrics,
}: CampaignHeaderProps) => (
  <div className="tw-bg-white tw-border-b tw-border-gray-200">
    <div className="tw-mx-auto tw-px-6 tw-py-4">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <Link
          href="/campaign-analytics"
          className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-900"
        >
          <ArrowLeft className="tw-w-5 tw-h-5 tw-mr-2" />
          Back to All Campaigns
        </Link>
        <div className="tw-flex tw-items-center tw-space-x-4">
          <button className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg hover:tw-bg-gray-50">
            {timeframe}
            <ChevronDown className="tw-w-4 tw-h-4 tw-ml-2" />
          </button>
        </div>
      </div>

      <div className="tw-grid tw-grid-cols-6 tw-gap-6">
        <div className="tw-col-span-1">
          <div className="tw-flex tw-items-center tw-space-x-2">
            <span className="tw-inline-block tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full"></span>
            <span className="tw-text-sm tw-font-medium">
              {campaignMetrics.status}
            </span>
          </div>
        </div>

        <MetricCard
          label="Budget"
          value={`$${campaignMetrics.budget.toLocaleString()}`}
          change={0}
        />

        <MetricCard
          label="Spent"
          value={`$${campaignMetrics.spent.toLocaleString()}`}
          change={0}
        />

        <MetricCard
          label="Impressions"
          value={campaignMetrics.impressions.value.toLocaleString()}
          change={campaignMetrics.impressions.change}
          icon={<ArrowUpIcon className="tw-w-3 tw-h-3" />}
        />

        <MetricCard
          label="Engagement"
          value={campaignMetrics.engagement.value}
          change={campaignMetrics.engagement.change}
          icon={<ArrowUpIcon className="tw-w-3 tw-h-3" />}
        />

        <MetricCard
          label="Trend"
          value={campaignMetrics.trend.value}
          change={campaignMetrics.trend.change}
          icon={<ArrowUpIcon className="tw-w-3 tw-h-3" />}
        />
      </div>
    </div>
  </div>
);

export default CampaignHeader;
