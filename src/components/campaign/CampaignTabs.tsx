import React from "react";

interface Tab {
  id: string;
  label: string;
  count?: number;
  status?: "needs_updates" | "approved" | "live" | "archived" | "rejected";
}

interface CampaignTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function CampaignTabs({
  tabs,
  activeTab,
  onTabChange,
}: CampaignTabsProps) {
  const getTabStyles = (tab: Tab) => {
    return `campaign-tab ${activeTab === tab.id ? "active" : "inactive"} ${
      tab.status || "default"
    }`;
  };

  const getBadgeStyles = (tab: Tab) => {
    return `campaign-badge ${activeTab === tab.id ? "active" : "inactive"} ${
      tab.status || "default"
    }`;
  };

  return (
    <div className="border-bottom bg-white">
      <ul className="nav nav-tabs d-flex px-3">
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item">
            <button
              onClick={() => onTabChange(tab.id)}
              className={getTabStyles(tab)}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ms-2 ${getBadgeStyles(tab)}`}>
                  {tab.count}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
