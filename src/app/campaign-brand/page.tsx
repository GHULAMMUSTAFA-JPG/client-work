"use client";
import React, { useState } from "react";

import { Edit } from "lucide-react";
import { Campaign, Creator } from "@/types";
import { CampaignBrandView } from "@/components/campaign-brand/CampaignBrandView";
import { CreatorDetailView } from "@/components/campaign-brand/CreatorDetailView";
import CampaignStats from "@/components/campaign-brand/CampaignStats";
import Tooltip from "@/components/campaign-brand/Tooltip";
import CreatorProgress from "@/components/campaign-brand/CreatorProgress";
import CreatorList from "@/components/campaign-brand/CreatorList";
import CampaignHeader from "@/components/campaign-brand/CampaignHeader";
const sampleCampaign: Campaign = {
  id: "1",
  name: "AI Social27",
  budget: 100000,
  totalSpend: 0,
  forecastedSpend: 25000,
  startDate: "2025-02-09",
  status: "public",
  totalPosts: 3,
  totalCreators: 9,
  activeCreators: 3,
  creators: [
    // Invited Creators
    {
      id: "1",
      name: "Sarah Johnson",
      linkedInId: "sarah-johnson",
      country: "USA",
      jobTitle: "Tech Influencer",
      company: "TechTrends",
      followers: 5000,
      status: "invited",
      ongoingSpend: 0,
      paymentStatus: "unpaid",
      averageImpressions: 8000,
      averageEngagement: 5.2,
      submissionDate: "2025-02-15",
    },
    {
      id: "2",
      name: "Michael Chen",
      linkedInId: "michael-chen",
      country: "Canada",
      jobTitle: "Digital Strategist",
      company: "DigitalFirst",
      followers: 3500,
      status: "invited",
      ongoingSpend: 0,
      paymentStatus: "unpaid",
      averageImpressions: 6000,
      averageEngagement: 4.8,
      submissionDate: "2025-02-14",
    },
    {
      id: "3",
      name: "Emma Wilson",
      linkedInId: "emma-wilson",
      country: "GB",
      jobTitle: "Content Creator",
      company: "CreativeMinds",
      followers: 4200,
      status: "invited",
      ongoingSpend: 0,
      paymentStatus: "unpaid",
      averageImpressions: 7000,
      averageEngagement: 4.5,
      submissionDate: "2025-02-13",
    },

    // Applied Creators
    {
      id: "4",
      name: "John Doe",
      linkedInId: "john-doe",
      country: "USA",
      jobTitle: "Marketing Specialist",
      company: "ABC Corp",
      followers: 1500,
      status: "applied",
      ongoingSpend: 0,
      paymentStatus: "unpaid",
      averageImpressions: 5000,
      averageEngagement: 4,
      submissionDate: "2025-02-12",
    },
    {
      id: "5",
      name: "Lisa Brown",
      linkedInId: "lisa-brown",
      country: "Canada",
      jobTitle: "Social Media Manager",
      company: "SocialBoost",
      followers: 2800,
      status: "applied",
      ongoingSpend: 0,
      paymentStatus: "unpaid",
      averageImpressions: 5500,
      averageEngagement: 4.2,
      submissionDate: "2025-02-11",
    },
    {
      id: "6",
      name: "David Kim",
      linkedInId: "david-kim",
      country: "USA",
      jobTitle: "Growth Hacker",
      company: "GrowthLabs",
      followers: 1800,
      status: "applied",
      ongoingSpend: 0,
      paymentStatus: "unpaid",
      averageImpressions: 4800,
      averageEngagement: 3.9,
      submissionDate: "2025-02-10",
    },

    // In Campaign Creators
    {
      id: "7",
      name: "Jane Smith",
      linkedInId: "jane-smith",
      country: "Canada",
      jobTitle: "Content Strategist",
      company: "XYZ Ltd",
      followers: 2000,
      status: "approved",
      ongoingSpend: 5000,
      paymentStatus: "in_process",
      averageImpressions: 6000,
      averageEngagement: 5,
      postsCompleted: 2,
      totalPosts: 3,
      submissionDate: "2025-02-09",
    },
    {
      id: "8",
      name: "Alex Thompson",
      linkedInId: "alex-thompson",
      country: "GB",
      jobTitle: "Digital Marketing Lead",
      company: "MarketPro",
      followers: 3200,
      status: "approved",
      ongoingSpend: 4000,
      paymentStatus: "paid",
      averageImpressions: 7200,
      averageEngagement: 5.5,
      postsCompleted: 1,
      totalPosts: 3,
      submissionDate: "2025-02-08",
    },
    {
      id: "9",
      name: "Rachel Martinez",
      linkedInId: "rachel-martinez",
      country: "USA",
      jobTitle: "Brand Ambassador",
      company: "BrandBoost",
      followers: 2500,
      status: "approved",
      ongoingSpend: 3000,
      paymentStatus: "in_process",
      averageImpressions: 5800,
      averageEngagement: 4.7,
      postsCompleted: 1,
      totalPosts: 3,
      submissionDate: "2025-02-07",
    },
  ],
};

function App() {
  const [campaign, setCampaign] = useState<Campaign>(sampleCampaign);
  const [activeTab, setActiveTab] = useState<
    "invited" | "applied" | "in_campaign"
  >("invited");
  const [view, setView] = useState<"creator" | "brand">("creator");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const handleStatusChange = (
    creatorId: string,
    newStatus: Creator["status"]
  ) => {
    setCampaign((prev) => ({
      ...prev,
      creators: prev.creators.map((creator) =>
        creator.id === creatorId ? { ...creator, status: newStatus } : creator
      ),
    }));
  };

  const handleMessageCreator = (creatorId: string) => {
    console.log("Message creator:", creatorId);
  };

  const handleBack = () => {
    if (selectedCreator) {
      setSelectedCreator(null);
    } else {
      console.log("Navigate back");
    }
  };

  const handleViewToggle = () => {
    setView((prev) => (prev === "creator" ? "brand" : "creator"));
  };

  if (view === "brand") {
    return (
      <CampaignBrandView
        campaign={campaign}
        onBack={() => setView("creator")}
      />
    );
  }

  if (selectedCreator) {
    return <CreatorDetailView creator={selectedCreator} onBack={handleBack} />;
  }

  const filteredCreators = campaign.creators.filter((creator) => {
    switch (activeTab) {
      case "invited":
        return creator.status === "invited";
      case "applied":
        return creator.status === "applied";
      case "in_campaign":
        return creator.status === "approved";
      default:
        return true;
    }
  });

  const tabs = [
    {
      id: "invited" as const,
      label: "Invited Creators",
      tooltip: "Creators who have been invited but haven't yet responded",
      count: campaign.creators.filter((c) => c.status === "invited").length,
    },
    {
      id: "applied" as const,
      label: "Applications",
      tooltip: "Creators who have applied to join the campaign",
      count: campaign.creators.filter((c) => c.status === "applied").length,
    },
    {
      id: "in_campaign" as const,
      label: "Active Creators",
      tooltip: "Creators currently participating in the campaign",
      count: campaign.creators.filter((c) => c.status === "approved").length,
    },
  ];

  return (
    <div className="  tw-min-h-screen tw-bg-gray-50">
      <div className=" tw-mx-auto tw-px-4 tw-p-8">
        <div className="tw-flex tw-justify-between tw-items-start tw-mb-8">
          <CampaignHeader campaign={campaign} onBack={handleBack} />
          <button
            onClick={handleViewToggle}
            className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-rounded-lg hover:tw-bg-gray-50"
          >
            <Edit className="tw-w-4 tw-h-4 tw-mr-2" />
            Edit Campaign
          </button>
        </div>

        <CampaignStats campaign={campaign} />

        <div className="tw-space-y-6">
          <div className="tw-border-b tw-border-gray-200">
            <nav className="tw--mb-px tw-flex tw-space-x-8">
              {tabs.map((tab) => (
                <Tooltip key={tab.id} content={tab.tooltip}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                  tw-whitespace-nowrap tw-py-4 tw-px-1 tw-border-b-2 tw-font-medium tw-text-sm
                  ${
                    activeTab === tab.id
                      ? "tw-border-teal-500 tw-text-teal-600"
                      : "tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300"
                  }
                `}
                  >
                    {tab.label} ({tab.count})
                  </button>
                </Tooltip>
              ))}
            </nav>
          </div>

          {activeTab === "in_campaign" ? (
            <div className="tw-space-y-6">
              {filteredCreators.map((creator) => (
                <CreatorProgress
                  key={creator.id}
                  creator={creator}
                  onViewDetails={() => setSelectedCreator(creator)}
                  onMessageCreator={() => handleMessageCreator(creator.id)}
                />
              ))}
            </div>
          ) : (
            <CreatorList
              creators={filteredCreators}
              onStatusChange={handleStatusChange}
              onMessageCreator={handleMessageCreator}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
