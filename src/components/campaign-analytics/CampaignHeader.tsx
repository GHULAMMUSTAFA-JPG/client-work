import { ArrowLeft, ArrowUpIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import MetricCard from "./MetricCard";

interface CampaignHeaderProps {
  timeframe: string;
  campaignMetrics: {
    status?: string;
    budget: number;
    spent: number;
    avgEngagementRate: number;
    avgImpressions: number;
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
    benchmarks: {
      engagementRateDiff: number;
      impressionsDiff: number;
    };
  };
  onTimeframeChange: (value: string) => void;
  timeframeOptions: Record<string, string>;
}

interface Metric {
  label: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  isStatus?: boolean;
}

const CampaignHeader = ({
  timeframe,
  campaignMetrics,
  onTimeframeChange,
  timeframeOptions,
}: CampaignHeaderProps) => {
  const metrics: Metric[] = [
    {
      label: "Status",
      value: campaignMetrics.status || "-",
      isStatus: true,
    },
    {
      label: "Avg Engagement Rate",
      value: `${campaignMetrics.avgEngagementRate.toFixed(2)}%`,
      change: campaignMetrics.benchmarks.engagementRateDiff,
    },
    {
      label: "Avg Impressions",
      value: campaignMetrics.avgImpressions.toLocaleString(),
      change: campaignMetrics.benchmarks.impressionsDiff,
    },
    {
      label: "Impressions",
      value: campaignMetrics.impressions.value.toLocaleString(),
      change: campaignMetrics.impressions.change,
      icon: <ArrowUpIcon className="tw-w-3 tw-h-3" />,
    },
    {
      label: "Engagement",
      value: campaignMetrics.engagement.value,
      change: campaignMetrics.engagement.change,
      icon: <ArrowUpIcon className="tw-w-3 tw-h-3" />,
    },
    {
      label: "Trend",
      value: campaignMetrics.trend.value,
      change: campaignMetrics.trend.change,
      icon: <ArrowUpIcon className="tw-w-3 tw-h-3" />,
    },
  ];

  return (
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
          <select
            className="tw-px-4 tw-py-2 tw-bg-white tw-border tw-border-gray-300 tw-rounded-lg hover:tw-bg-gray-50"
            onChange={(e) => onTimeframeChange(e.target.value)}
            value={Object.keys(timeframeOptions).find(
              (key) => timeframeOptions[key] === timeframe
            )}
          >
            {Object.entries(timeframeOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="tw-grid tw-grid-cols-6 tw-gap-6">
          {metrics.map((metric, index) =>
            metric.isStatus ? (
              <div key={index} className="tw-col-span-1">
                <div className="tw-flex tw-items-center tw-space-x-2">
                  <span className="tw-inline-block tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full" />
                  <span className="tw-text-sm tw-font-medium">
                    {metric.value}
                  </span>
                </div>
              </div>
            ) : (
              <MetricCard
                key={index}
                label={metric.label}
                value={metric.value}
                change={metric.change || 0}
                icon={metric.icon}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;
