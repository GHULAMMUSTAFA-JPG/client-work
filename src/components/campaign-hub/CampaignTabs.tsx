import { Status } from "@/types";
import React from "react";

interface Tab {
  label: string;
  count?: number;
  status?: Status | "all";
}

interface CampaignTabsProps {
  tabs: Tab[];
  activeTab: Status | "all";
  onTabChange: (tab: Status | "all") => void;
}

export function CampaignTabs({
  tabs,
  activeTab,
  onTabChange,
}: CampaignTabsProps) {
  const getTabStyles = (tab: Tab) => {
    const baseStyles =
      "tw-py-4 tw-px-4 tw-border-b-2 tw-font-medium tw-text-sm tw-whitespace-nowrap tw-transition-colors tw-duration-200";

    if (activeTab === tab.status) {
      switch (tab.status) {
        case Status.PendingApproval:
          return `${baseStyles} tw-border-orange-500 tw-text-orange-700 tw-bg-orange-50`;
        case Status.Approved:
          return `${baseStyles} tw-border-green-500 tw-text-green-700 tw-bg-green-50`;
        case Status.InProgress:
          return `${baseStyles} tw-border-yellow-500 tw-text-yellow-700 tw-bg-yellow-50`;
        case Status.Completed:
          return `${baseStyles} tw-border-blue-500 tw-text-blue-700 tw-bg-blue-50`;
        default:
          return `${baseStyles} tw-border-primary tw-text-primary tw-bg-blue-50`;
      }
    }

    return `${baseStyles} tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300`;
  };

  const getCountStyles = (tab: Tab) => {
    if (activeTab === tab.status) {
      switch (tab.status) {
        case Status.PendingApproval:
          return "tw-bg-orange-100 tw-text-orange-800";
        case Status.Approved:
          return "tw-bg-green-100 tw-text-green-800";
        case Status.InProgress:
          return "tw-bg-yellow-100 tw-text-yellow-800";
        case Status.Completed:
          return "tw-bg-blue-100 tw-text-blue-800";
        default:
          return "tw-bg-blue-100 tw-text-blue-900";
      }
    }
    return "tw-bg-gray-100 tw-text-gray-600";
  };
  return (
    <div className="tw-border-b tw-border-gray-200 tw-bg-white">
      <nav className="tw-flex tw-px-6 tw--mb-px">
        {tabs.map((tab: any) => (
          <button
            key={tab.status}
            onClick={() => onTabChange(tab.status)}
            className={getTabStyles(tab)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`tw-ml-2 tw-px-2 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-medium ${getCountStyles(
                  tab
                )}`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
