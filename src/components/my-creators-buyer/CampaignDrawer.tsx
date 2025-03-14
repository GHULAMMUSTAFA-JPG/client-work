import { X } from "lucide-react";
import { Campaign } from "./types";
import Tooltip from "@/components/Tooltip";

interface CampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  selectedCreatorId: string;
  onInviteCreator: (campaignId: string, creatorId: string) => void;
}

const CampaignDrawer = ({
  isOpen,
  onClose,
  campaigns,
  selectedCreatorId,
  onInviteCreator,
}: CampaignDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-40">
      <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-full md:tw-w-[80%] lg:tw-w-[560px] tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b">
          <div>
            <h2 className="tw-text-xl tw-font-semibold">Invite to Campaign</h2>
            <p className="tw-text-sm tw-text-gray-500 tw-mt-1 tw-flex tw-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.829"
                height="12.828"
                viewBox="0 0 12.829 12.828"
              >
                <path
                  id="Icon_feather-arrow-down-right"
                  data-name="Icon feather-arrow-down-right"
                  d="M7,7,17,17M17,7V17H7"
                  transform="translate(-5.586 -5.586)"
                  fill="none"
                  stroke="#1bb09d"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Choose a campaign to invite this creator and collaborate
              seamlessly
            </p>
          </div>
          <button
            onClick={onClose}
            className="tw-text-gray-400 hover:text-gray-600"
          >
            <X className="tw-h-6 tw-w-6" />
          </button>
        </div>

        <div className="tw-flex-1 tw-overflow-y-auto tw-bg-gray-50">
          <div className="tw-p-6">
            <div className="tw-space-y-4">
              {campaigns && campaigns.length > 0 ? (
                campaigns.map((campaign: Campaign, index: number) => (
                  <Tooltip key={index} content="Invite to campaign">
                    <div
                      className="tw-bg-white tw-border-gray-100 tw-border tw-rounded-mg py-4 px-3 tw-shadow-sm hover:tw-shadow-lg tw-round-md tw-cursor-pointer tw-transition-all"
                      onClick={() => {
                        onInviteCreator(campaign._id, selectedCreatorId);
                        onClose();
                      }}
                    >
                      <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                        <h3 className="tw-font-medium">{campaign?.Headline}</h3>
                        <span className="tw-text-xs tw-px-2 tw-py-1 tw-rounded-full tw-bg-green-100 tw-text-green-800">
                          {campaign?.Is_Ongoing ? "Ongoing" : "Fixed Duration"}
                        </span>
                      </div>

                      <div className="tw-space-y-2">
                        <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="tw-text-teal-600"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          <span>{campaign?.Time_Ago}</span>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="tw-text-blue-600"
                          >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                          <span>
                            Budget: ${campaign?.Budget?.toLocaleString()}
                          </span>
                        </div>

                        <div className="tw-flex tw-flex-wrap tw-gap-1 tw-mt-2 mb-3">
                          {campaign?.Target_Audience?.map(
                            (tag: string, i: number) => (
                              <span
                                key={i}
                                className="tw-px-2 tw-py-1 tw-text-xs tw-bg-gray-100 tw-rounded-full tw-text-gray-600"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>

                        <div className="tw-grid tw-grid-cols-3 tw-gap-2 tw-mt-3">
                          <div className="tw-text-center tw-p-2 tw-bg-gray-50 tw-rounded">
                            <div className="tw-text-sm tw-font-medium">
                              {campaign?.Creator_Insights?.Invited}
                            </div>
                            <div className="tw-text-xs tw-text-gray-500">
                              Invited
                            </div>
                          </div>
                          <div className="tw-text-center tw-p-2 tw-bg-gray-50 tw-rounded">
                            <div className="tw-text-sm tw-font-medium">
                              {campaign?.Creator_Insights?.Approved}
                            </div>
                            <div className="tw-text-xs tw-text-gray-500">
                              Approved
                            </div>
                          </div>
                          <div className="tw-text-center tw-p-2 tw-bg-gray-50 tw-rounded">
                            <div className="tw-text-sm tw-font-medium">
                              {campaign?.Creator_Insights?.In_Discussion}
                            </div>
                            <div className="tw-text-xs tw-text-gray-500">
                              In Discussion
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                ))
              ) : (
                <div className="tw-text-center tw-py-8 tw-text-gray-500">
                  <div className="tw-p-3 tw-bg-gray-100 tw-rounded-full tw-w-16 tw-h-16 tw-mx-auto tw-mb-4 tw-flex tw-items-center tw-justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="tw-text-gray-400"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <p className="tw-text-lg tw-font-medium">
                    No active campaigns
                  </p>
                  <p className="tw-mt-1 tw-text-sm">
                    Create a campaign first to invite creators
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDrawer;
