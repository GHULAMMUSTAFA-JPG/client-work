import React from "react";
import { ArrowLeft, Edit, Globe, Lock } from "lucide-react";
import { Campaign } from "@/types";
import Tooltip from "./Tooltip";
import Link from "next/link";

interface CampaignHeaderProps {
  campaign: Campaign;
}

export default function CampaignHeader({ campaign }: CampaignHeaderProps) {
  const statusInfo = {
    public: {
      icon: Globe,
      tooltip: "This campaign is open for all creators to apply",
      class: "tw-bg-emerald-100 tw-text-emerald-700",
    },
    private: {
      icon: Lock,
      tooltip: "This campaign is invitation-only",
      class: "tw-bg-purple-100 tw-text-purple-700",
    },
  };

  const StatusIcon = statusInfo[campaign.status].icon;

  return (
    <div className="tw-mb-8">
      <Link
        href="/campaign-details"
        className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-800 tw-mb-4"
      >
        <ArrowLeft className="tw-w-4 tw-h-4 tw-mr-2" />
        All Campaigns
      </Link>

      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <div className="tw-flex tw-items-center tw-gap-3">
            <h1 className="tw-text-2xl tw-font-bold">{campaign.name}</h1>
            <Tooltip content={statusInfo[campaign.status].tooltip}>
              <span
                className={`tw-px-3 tw-py-1 ${
                  statusInfo[campaign.status].class
                } tw-rounded-full tw-text-sm tw-flex tw-items-center tw-gap-1`}
              >
                <StatusIcon className="tw-w-4 tw-h-4" />
                <span className="tw-capitalize">{campaign.status}</span>
              </span>
            </Tooltip>
          </div>
          <div className="tw-text-gray-500 tw-mt-1">
            Campaign starts {new Date(campaign.startDate).toLocaleDateString()}{" "}
            • Budget: ${campaign.budget.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
