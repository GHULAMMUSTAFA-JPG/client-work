import { Campaign, Creator, CreatorStatus } from "@/types";
import React, { useState } from "react";
import CampaignHeader from "./CampaignHeader";
import CampaignStats from "./CampaignStats";
import CreatorProgress from "./CreatorProgress";
import { CreatorDetailView } from "./CreatorDetailView";

interface CampaignBrandViewProps {
  campaign: Campaign;
  onBack: () => void;
  onMessageCreator: (creatorId: string) => void;
}

export function CampaignBrandView({
  campaign,
  onBack,
  onMessageCreator,
}: CampaignBrandViewProps) {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const activeCreators = campaign.creators.filter(
    (creator) => creator.status === CreatorStatus.Approved
  );

  if (selectedCreator) {
    return (
      <CreatorDetailView
        creator={selectedCreator}
        onBack={() => setSelectedCreator(null)}
        posts={selectedCreator.posts || []}
      />
    );
  }

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <div className=" tw-mx-auto tw-px-4 tw-py-8">
        <CampaignHeader campaign={campaign} />

        <CampaignStats campaign={campaign} />

        <div className="tw-mt-8">
          <h2 className="tw-text-lg tw-font-medium tw-mb-4">
            Active Creators Progress
          </h2>
          <div className="tw-space-y-6">
            {activeCreators.map((creator) => (
              <CreatorProgress
                key={creator.id}
                creator={creator}
                onViewDetails={() => setSelectedCreator(creator)}
                onMessageCreator={onMessageCreator}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
