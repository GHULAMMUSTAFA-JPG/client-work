import React, { useState } from "react";
import { MessageSquare, ExternalLink } from "lucide-react";
import Tooltip from "../Tooltip";
import { Creator } from "@/types";
import { useRouter } from "next/navigation";
import { ChatDrawer } from "../ChatDrawer";

interface CreatorProgressProps {
  creator: Creator;
  onViewDetails?: () => void;
  onMessageCreator?: (creatorId: string) => void;
  campaignId: string;
  activeTab: string;
}

export default function CreatorProgress({
  creator,
  onViewDetails,
  onMessageCreator,
  campaignId,
  activeTab,
}: CreatorProgressProps) {
  const router = useRouter();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const handleOpenChatModal = () => {
    const offcanvasElement = document.getElementById("creatorProfileDrawer");
    // if (offcanvasElement) {
    //   const offcanvas = Offcanvas.getInstance(offcanvasElement);
    //   if (offcanvas) {
    //     offcanvas.hide();
    //   }
    // }
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = (setSelectedIds: any) => {
    setSelectedIds({
      Message_ID: null,
      Recipient_ID: null,
      Sender_ID: null,
      Conversation_Id: null,
      Profile_Image: null,
      Name: null,
      index: null,
    });
    setIsChatModalOpen(false);
  };
  const getStageLabel = () => {
    if (creator.postsCompleted === creator.totalPosts) {
      return "Completed";
    }
    return "In Progress";
  };

  const handleViewDetails = () => {
    const firstPostId =
      creator.posts && creator.posts.length > 0
        ? creator.posts[0].id
        : undefined;
    router.push(
      `/campaign-details/${campaignId}?tab=${activeTab}&creator=${creator.id}${
        firstPostId ? `&post=${firstPostId}` : ""
      }`
    );
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border">
      <div className="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-4 tw-items-center">
        <div className="tw-col-span-3">
          <div
            className="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer"
            onClick={handleViewDetails}
          >
            <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
              {creator.profilePicture ? (
                <img
                  src={creator.profilePicture}
                  alt={creator.name}
                  className="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover"
                />
              ) : (
                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-gray-200 tw-flex tw-items-center tw-justify-center">
                  <span className="tw-text-gray-500 tw-text-lg">
                    {creator.name[0]}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="tw-font-medium tw-text-gray-900 ">
                {creator.name}
              </h3>
              {creator.jobTitle && (
                <p className="tw-text-sm tw-text-gray-500">
                  {creator.jobTitle} at {creator.company}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="tw-col-span-2">
          <div className="tw-text-sm tw-text-gray-500">Stage</div>
          <div className="tw-font-medium">{getStageLabel()}</div>
        </div>

        <div className="tw-col-span-1">
          <div className="tw-text-sm tw-text-gray-500">Posts</div>
          <div className="tw-font-medium">
            {creator.postsCompleted} / {creator.totalPosts}
          </div>
        </div>

        <div className="tw-col-span-2">
          <div className="tw-space-y-1">
            <div>
              <div className="tw-text-sm tw-text-gray-500">Engagement</div>
              <div className="tw-font-medium">{creator.averageEngagement}%</div>
            </div>
            <div>
              <div className="tw-text-sm tw-text-gray-500">Impressions</div>
              <div className="tw-font-medium">
                {creator.averageImpressions.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status - 2 cols */}
        <div className="tw-col-span-2">
          <div className="tw-text-sm tw-text-gray-500">Payment Status</div>
          <div
            className={`tw-font-medium ${
              creator.paymentStatus === "paid"
                ? "tw-text-green-600"
                : creator.paymentStatus === "in_process"
                ? "tw-text-orange-600"
                : "tw-text-gray-600"
            }`}
          >
            {creator.paymentStatus?.replace("_", " ")}
          </div>
        </div>

        <div className="tw-col-span-2 tw-flex tw-justify-end tw-space-x-2">
          <Tooltip content="Send message to creator">
            <button
              // onClick={() => onMessageCreator?.(creator.id)}
              className="tw-p-2 tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-100 tw-rounded-lg tw-transition-colors"
            >
              <MessageSquare
                onClick={handleOpenChatModal}
                className="tw-w-5 tw-h-5"
              />
            </button>
          </Tooltip>
          <Tooltip content="View creator details">
            <button
              onClick={handleViewDetails}
              className="tw-p-2 tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-100 tw-rounded-lg tw-transition-colors"
            >
              <ExternalLink className="tw-w-5 tw-h-5" />
            </button>
          </Tooltip>
        </div>
      </div>
      {/* <ChatModal
        open={isChatModalOpen}
        onClose={handleCloseChatModal}
        recipientId={creator.id}
      /> */}
      <ChatDrawer
        open={isChatModalOpen}
        onClose={handleCloseChatModal}
        recipientId={creator?.id}
      />
    </div>
  );
}
