import React from "react";
import {
  Users,
  FileText,
  TrendingUp,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { Campaign } from "@/types";
import Tooltip from "./Tooltip";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tooltip?: string;
  iconBgColor: string;
  iconColor: string;
}

function StatCard({
  icon,
  label,
  value,
  tooltip,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  const content = (
    <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-sm tw-border">
      <div className="tw-flex tw-items-center tw-gap-4">
        <div
          className={`tw-w-10 tw-h-10 tw-rounded-lg ${iconBgColor} tw-flex tw-items-center tw-justify-center`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
        <div className="tw-flex-1">
          <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-text-gray-600 tw-text-sm tw-font-medium">
              {label}
            </div>
            {tooltip && (
              <Tooltip content={tooltip}>
                <HelpCircle className="tw-w-4 tw-h-4 tw-text-gray-400" />
              </Tooltip>
            )}
          </div>
          <div className="tw-text-xl tw-font-semibold tw-mt-1">{value}</div>
        </div>
      </div>
    </div>
  );

  return content;
}

interface CampaignStatsProps {
  campaign: Campaign;
}

export default function CampaignStats({ campaign }: CampaignStatsProps) {
  const hasImpressions = campaign.creators.some((c) => c.impressions);
  const newApplications = campaign.creators.filter(
    (c) => c.status === "applied"
  ).length;
  const inCampaign = campaign.creators.filter(
    (c) => c.status === "approved"
  ).length;

  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-mb-8">
      <StatCard
        icon={<Users className="tw-w-5 tw-h-5" />}
        label="New Applications"
        value={newApplications}
        tooltip="Creators who have applied and are awaiting review"
        iconBgColor="tw-bg-blue-50"
        iconColor="tw-text-blue-600"
      />

      <StatCard
        icon={<FileText className="tw-w-5 tw-h-5" />}
        label="Active Creators"
        value={inCampaign}
        tooltip="Creators currently producing content for this campaign"
        iconBgColor="tw-bg-purple-50"
        iconColor="tw-text-purple-600"
      />

      {hasImpressions && (
        <StatCard
          icon={<TrendingUp className="tw-w-5 tw-h-5" />}
          label="Total Impressions"
          value={campaign.creators
            .reduce((sum, c) => sum + (c.impressions || 0), 0)
            .toLocaleString()}
          tooltip="Combined reach across all creator posts in this campaign"
          iconBgColor="tw-bg-indigo-50"
          iconColor="tw-text-indigo-600"
        />
      )}

      <StatCard
        icon={<DollarSign className="tw-w-5 tw-h-5" />}
        label="Forecasted Spend"
        value={`$${campaign.forecastedSpend.toLocaleString()}`}
        tooltip="Estimated total spend based on approved creators and agreed rates"
        iconBgColor="tw-bg-orange-50"
        iconColor="tw-text-orange-600"
      />
    </div>
  );
}
