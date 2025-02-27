"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useParams, redirect, useSearchParams } from "next/navigation";
import { Edit } from "lucide-react";
import { Campaign, Creator, CreatorStatus } from "@/types";
import { CreatorDetailView } from "@/components/campaign-brand/CreatorDetailView";
import CampaignStats from "@/components/campaign-brand/CampaignStats";
import Tooltip from "@/components/campaign-brand/Tooltip";
import CreatorList from "@/components/campaign-brand/CreatorList";
import CampaignHeader from "@/components/campaign-brand/CampaignHeader";
import EditCreateCampaign, {
  CampaignFormData,
} from "@/components/campaign-brand/EditCreateCampaign";
import {
  createCreatorFromData,
  extractCampaignFormData,
  formatCampaignData,
} from "@/utils/dataFormat";
import { useAuth } from "@/contexts/AuthContext";
import {
  changeBrandCreatorStatus,
  getBrandCampaignActiveCreators,
  getBrandCampaignApplications,
} from "@/@api/campaign";
import CreatorProgress from "@/components/campaign-brand/CreatorProgress";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

type TabType = "invited" | "applied" | "in_campaign";

function CampaignDetailsContent() {
  const router = useRouter();
  const { campaign_id } = useParams();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TabType | null;
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || "invited");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [campaignFormData, setCampaignFormData] =
    useState<CampaignFormData | null>(null);
  const [campaignActiveCreatorsData, setCampaignActiveCreatorsData] =
    useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCampaign = async () => {
    if (!user?._id) return;
    const campaignId = Array.isArray(campaign_id)
      ? campaign_id[0]
      : campaign_id;

    if (!campaignId) {
      redirect("/campaign-details");
    }

    try {
      setIsLoading(true);
      const data = (await getBrandCampaignApplications(campaignId)) as any;
      const activeCreatorsData = await getBrandCampaignActiveCreators({
        campaign_id: "67b7312e4072311729976007",
        buyer_id: "67ad8ec04402ca116fc05f76",
      });

      if (data?.campaign) {
        setCampaign(formatCampaignData(data.campaign));
        setCampaignFormData(
          extractCampaignFormData(data.campaign) as CampaignFormData
        );
      }
      if (activeCreatorsData) setCampaignActiveCreatorsData(activeCreatorsData);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!campaign_id) {
      redirect("/campaign-details");
    }

    if (user) {
      fetchCampaign();
    }
  }, [campaign_id, refreshTrigger, user]);

  useEffect(() => {
    if (tabParam && ["invited", "applied", "in_campaign"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/campaign-details/${campaign_id}?tab=${tab}`, {
      scroll: false,
    });
  };

  const handleStatusChange = async (
    creatorId: string,
    newStatus: CreatorStatus
  ) => {
    await changeBrandCreatorStatus({
      campaign_id: campaign_id as string,
      creator_id: creatorId,
      status: newStatus,
    });

    setRefreshTrigger((prev) => prev + 1);
  };

  const handleMessageCreator = (creator_id: string) => {
    if (!creator_id) return;
    router.push(`/inbox?id=${creator_id}`);
  };

  const handleBack = () => {
    if (selectedCreator) {
      setSelectedCreator(null);
    }
  };

  const handleCampaignUpdateSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (isLoading) return <Loader />;

  if (!campaign) return null;

  if (selectedCreator) {
    return (
      <CreatorDetailView
        creator={selectedCreator}
        onBack={handleBack}
        posts={selectedCreator.posts || []}
      />
    );
  }

  const filteredCreators = campaign.creators.filter((creator) => {
    switch (activeTab) {
      case "invited":
        return creator.status === CreatorStatus.Invited;
      case "applied":
        return creator.status === CreatorStatus.Applied;
      case "in_campaign":
        return creator.status === CreatorStatus.Approved;
      default:
        return true;
    }
  });

  const tabs = [
    {
      id: "invited" as TabType,
      label: "Invited Creators",
      tooltip: "Creators who have been invited but haven't yet responded",
      count: campaign.creators.filter((c) => c.status === CreatorStatus.Invited)
        .length,
    },
    {
      id: "applied" as TabType,
      label: "Applications",
      tooltip: "Creators who have applied to join the campaign",
      count: campaign.creators.filter((c) => c.status === CreatorStatus.Applied)
        .length,
    },
    {
      id: "in_campaign" as TabType,
      label: "Active Creators",
      tooltip: "Creators currently participating in the campaign",
      count:
        campaignActiveCreatorsData?.Active_Creators?.length ||
        campaign.creators.filter((c) => c.status === CreatorStatus.Approved)
          .length,
    },
  ];

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <div className="tw-mx-auto tw-px-4 tw-p-8">
        <div className="tw-flex tw-justify-between tw-items-start tw-mb-8">
          <CampaignHeader campaign={campaign} />
          <button
            className="tw-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-rounded-lg hover:tw-bg-gray-50"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight2"
            aria-controls="offcanvasRight2"
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
                    onClick={() => handleTabChange(tab.id)}
                    className={`tw-whitespace-nowrap tw-py-4 tw-px-1 tw-border-b-2 tw-font-medium tw-text-sm ${
                      activeTab === tab.id
                        ? "tw-border-teal-500 tw-text-teal-600"
                        : "tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                </Tooltip>
              ))}
            </nav>
          </div>

          {activeTab === "in_campaign" ? (
            <div className="tw-space-y-6">
              {campaignActiveCreatorsData &&
              campaignActiveCreatorsData.Active_Creators
                ? campaignActiveCreatorsData.Active_Creators.map(
                    (creator: any) => {
                      const creatorData = createCreatorFromData(creator);
                      return (
                        <CreatorProgress
                          key={creator.Creator_ID}
                          creator={creatorData}
                          onViewDetails={() => setSelectedCreator(creatorData)}
                          onMessageCreator={() =>
                            handleMessageCreator(creator.Creator_ID)
                          }
                        />
                      );
                    }
                  )
                : filteredCreators.map((creator) => (
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
      <EditCreateCampaign
        initialData={campaignFormData as CampaignFormData}
        isEditMode={!!campaignFormData}
        onSuccess={handleCampaignUpdateSuccess}
      />
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CampaignDetailsContent />
    </Suspense>
  );
}

export default Page;
