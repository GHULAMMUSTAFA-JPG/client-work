import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  FileText,
  BarChart3,
  MessageSquare,
  CheckCircle,
  DollarSign,
  X,
  Eye,
  ThumbsDown,
  User,
  Clock,
} from "lucide-react";
import { Creator, Post, ContentItem, Status } from "@/types";
import Tooltip from "../Tooltip";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { updatePostStatus, updatePostContentStatus } from "@/@api/campaign";
import { toast } from "react-toastify";
import { apiController } from "@/@api/baseUrl";
import CreatorsDropDown from "./CreatorsDropDown";
import CreatorProfileDrawer from "../CreatorProfileDrawer";
import { PostViewer } from "../shared/PostViewer";
import ChatModal from "../ChatModal";
import { isImageUrl } from "@/utils";
import { CampaignDrawer } from "../campaign-hub/CampaignDrawer";

interface CreatorDetailViewProps {
  creator: Creator;
  onBack: () => void;
  posts: Post[];
  campaignId: string;
  onUpdate: (currentPostId?: string) => void;
  creators: Creator[];
  selectedCreator: Creator | null;
  handelSelectedCreator: (creator: Creator) => void;
}

export function CreatorDetailView({
  creator,
  onBack,
  posts,
  campaignId,
  onUpdate,
  creators,
  selectedCreator,
  handelSelectedCreator,
}: CreatorDetailViewProps) {
  const initialPost = posts.length > 0 ? posts[0] : null;
  console.log("posts", posts);
  const initialContent =
    initialPost &&
    initialPost.contentItems &&
    initialPost.contentItems.length > 0
      ? initialPost.contentItems[0]
      : null;

  const [selectedPost, setSelectedPost] = useState<Post | null>(initialPost);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    initialContent
  );
  console.log("posts", posts);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
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
  console.log("viewingPost", viewingPost);

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
  useEffect(() => {
    const currentPostStillExists =
      selectedPost && posts.some((post) => post.id === selectedPost.id);

    if (!currentPostStillExists) {
      if (posts.length > 0) {
        setSelectedPost(posts[0]);
        setSelectedContent(posts[0].contentItems[0]);
      } else {
        setSelectedPost(null);
        setSelectedContent(null);
      }
    }
  }, [posts, selectedPost]);

  const handleProcessPaymentCheckout = async () => {
    try {
      const result = await apiController.post(
        `/payments/create-checkout-session`,
        { creator_id: creator.id, post_id: selectedPost?.id }
      );
      if (result.status === 200) {
        window.open(result.data.checkout_url, "_blank");
      }
    } catch (error) {
      toast.error("An error occurred while processing payment.");
    }
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setSelectedContent(post.contentItems[0]);

    const tab = searchParams.get("tab") || "in_campaign";
    const url = `/campaign-details/${campaignId}?tab=${tab}&creator=${creator.id}&post=${post.id}`;
    window.history.replaceState(null, "", url);
  };

  const metrics = useMemo(() => {
    const totalImpressions = posts.reduce(
      (sum, post) => sum + (post.impressions || 0),
      0
    );

    const engagementRates = posts
      .filter((post) => post.engagement !== null)
      .map((post) => post.engagement || 0);

    const avgEngagement =
      engagementRates.length > 0
        ? engagementRates.reduce((sum, rate) => sum + rate, 0) /
          engagementRates.length
        : 0;

    const clickThroughRate = avgEngagement * 0.6;

    return {
      totalImpressions,
      avgEngagement: avgEngagement.toFixed(1),
      clickThroughRate: clickThroughRate.toFixed(1),
    };
  }, [posts]);

  const handleApprovePost = async (postId: string) => {
    const currentPostId = selectedPost?.id;

    try {
      const result = await updatePostStatus({
        campaign_id: campaignId,
        creator_id: creator.id,
        post_id: postId,
        status: Status.Approved + "",
      });

      if (result) {
        toast.success("Post approved successfully");
        onUpdate(currentPostId);
      } else {
        toast.error("Failed to approve post. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while approving post.");
      console.error("Error approving post:", error);
    }
  };

  const handleApproveContent = async () => {
    if (!selectedPost?.contentItems[0]) return;
    try {
      const result = await updatePostContentStatus({
        campaign_id: campaignId,
        creator_id: creator.id,
        post_id: selectedPost.id,
        content_id: selectedPost.contentItems[0].id,
        status: Status.Approved + "",
      });

      if (result) {
        toast.success("Content approved successfully");
        onUpdate(selectedPost.id);
      } else {
        toast.error("Failed to approve content. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while approving content.");
      console.error("Error approving content:", error);
    }
  };

  const handleRejectContent = async (feedback?: string) => {
    if (!selectedPost?.contentItems[0]) return;
    try {
      const result = await updatePostContentStatus({
        campaign_id: campaignId,
        creator_id: creator.id,
        post_id: selectedPost.id,
        content_id: selectedPost.contentItems[0].id,
        status: Status.Rejected + "",
        feedback,
      });

      if (result) {
        toast.success("Content rejected successfully");
        onUpdate(selectedPost.id);
      } else {
        toast.error("Failed to reject content. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while rejecting content.");
      console.error("Error rejecting content:", error);
    }
  };

  const prepareImageForDisplay = useCallback((imageUrl?: string) => {
    if (!imageUrl) return undefined;
    return imageUrl;
  }, []);

  const processMedia = (mediaItems?: string[]) => {
    if (!mediaItems || mediaItems.length === 0)
      return { images: [], links: [] };

    const images: string[] = [];
    const links: string[] = [];

    mediaItems.forEach((item) => {
      if (item && isImageUrl(item)) {
        images.push(item);
      } else if (item) {
        links.push(item);
      }
    });

    return { images, links };
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <div className="tw-mx-auto tw-px-4 tw-py-8">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-6 tw-py-2 ">
          <button
            onClick={onBack}
            className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-800  "
          >
            <ArrowLeft className="tw-w-4 tw-h-4 tw-mr-2" />
            Back to Campaign Overview
          </button>

          <div
            className="tw-flex tw-items-center bg-white tw-p-2 tw-rounded-lg tw-shadow-sm tw-cursor-pointer tw-text-blue-600 hover:tw-text-gray-800"
            data-bs-toggle="offcanvas"
            data-bs-target="#creatorProfileDrawer"
          >
            {selectedCreator?.profilePicture ? (
              <img
                src={selectedCreator.profilePicture}
                alt={selectedCreator.name}
                className="tw-w-8 tw-h-8 tw-rounded-full tw-mr-2"
              />
            ) : (
              <User className="tw-w-8 tw-h-8 tw-mr-2" />
            )}
            View Creator Profile
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-12 tw-gap-6">
          <div className="tw-col-span-3">
            <CreatorsDropDown
              creators={creators}
              selectedCreator={selectedCreator}
              setSelectedCreator={handelSelectedCreator}
            />
            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-p-4">
              <h3 className="tw-font-medium tw-text-gray-900 tw-mb-4">
                Campaign Posts
              </h3>
              <div className="tw-space-y-3">
                {posts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handleSelectPost(post)}
                    className={`tw-w-full tw-p-3 tw-rounded-lg tw-text-left tw-transition-colors
                      ${
                        selectedPost?.id === post.id
                          ? "tw-bg-teal-50 tw-ring-1 tw-ring-teal-500"
                          : "hover:tw-bg-gray-50"
                      }
                    `}
                  >
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                      <FileText className="tw-w-4 tw-h-4 tw-text-gray-500" />
                      <span
                        className={`tw-text-xs tw-px-2 tw-py-1 tw-rounded-full
                        ${
                          post.status === "approved"
                            ? "tw-bg-green-100 tw-text-green-800"
                            : post.status === "in_review"
                            ? "tw-bg-yellow-100 tw-text-yellow-800"
                            : "tw-bg-teal-100 tw-text-teal-800"
                        }
                      `}
                      >
                        {post.status.replace("_", " ")}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "50px",
                      }}
                    >
                      <h4 className="tw-font-medium tw-text-sm tw-mb-1">
                        {post.title}
                      </h4>
                      <div className="status-box">
                        <button
                          onClick={() => setViewingPost(post)}
                          className="tw-w-full tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-1 tw-text-xs tw-text-gray-600 hover:tw-text-gray-900"
                        >
                          <Eye className="tw-w-3 tw-h-3 tw-mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                    <p className="tw-text-xs tw-text-gray-500">{post.date}</p>
                    {post.status !== "in_review" && (
                      <div className="tw-mt-2 tw-space-y-1">
                        <div className="tw-flex tw-items-center tw-text-xs tw-text-gray-600">
                          <BarChart3 className="tw-w-3 tw-h-3 tw-mr-1" />
                          {post.impressions?.toLocaleString()} impressions
                        </div>
                        <div className="tw-flex tw-items-center tw-text-xs tw-text-gray-600">
                          <MessageSquare className="tw-w-3 tw-h-3 tw-mr-1" />
                          {post.engagement}% engagement
                        </div>
                      </div>
                    )}
                  </button>
                ))}
                <CampaignDrawer
                  isOpen={!!viewingPost}
                  onClose={() => setViewingPost(null)}
                  title="Post Details"
                  description={viewingPost?.description || ""}
                  dueDate={viewingPost?.dueDate || ""}
                  type="details"
                  isPost={true}
                  initialData={{
                    ...viewingPost,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="tw-col-span-9">
            <div className="tw-flex tw-flex-col tw-items-center">
              <div className="tw-w-full tw-mb-6">
                <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-p-6">
                  <h3 className="tw-font-medium tw-text-gray-900 tw-mb-4">
                    Campaign Performance
                  </h3>
                  <div className="tw-grid tw-grid-cols-3 tw-gap-6">
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                      <div className="tw-text-sm tw-text-gray-500">
                        Total Impressions
                      </div>
                      <div className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                        {metrics.totalImpressions.toLocaleString()}
                      </div>
                      <div className="tw-text-sm tw-text-teal-600 tw-mt-1">
                        {posts.length > 0
                          ? `${posts.length} posts`
                          : "No posts yet"}
                      </div>
                    </div>
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                      <div className="tw-text-sm tw-text-gray-500">
                        Avg. Engagement Rate
                      </div>
                      <div className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                        {metrics.avgEngagement}%
                      </div>
                      <div className="tw-text-sm tw-text-teal-600 tw-mt-1">
                        {creator.averageEngagement
                          ? `${creator.averageEngagement}% creator avg.`
                          : "No data"}
                      </div>
                    </div>
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                      <div className="tw-text-sm tw-text-gray-500">
                        Click-through Rate
                      </div>
                      <div className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                        {metrics.clickThroughRate}%
                      </div>
                      <div className="tw-text-sm tw-text-teal-600 tw-mt-1">
                        Based on engagement
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPost && (
                <div className="tw-w-full tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-p-6">
                  <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                    <div>
                      <h3 className="tw-font-medium tw-text-gray-900">
                        {selectedPost.title}
                      </h3>
                      <p className="tw-text-sm tw-text-gray-500">
                        Submitted on {selectedPost.date}
                      </p>
                      <div className="tw-flex tw-items-center tw-mt-2 tw-space-x-2">
                        {selectedCreator?.profilePicture ? (
                          <img
                            src={selectedCreator?.profilePicture}
                            alt={selectedCreator?.name}
                            className="tw-w-6 tw-h-6 tw-rounded-full"
                          />
                        ) : (
                          <div className="tw-w-6 tw-h-6 tw-rounded-full tw-bg-gray-200 tw-flex tw-items-center tw-justify-center">
                            <span className="tw-text-gray-500 tw-text-xs">
                              {selectedCreator?.name
                                ? selectedCreator.name[0]
                                : ""}
                            </span>
                          </div>
                        )}
                        <p className="tw-text-sm tw-text-gray-600">
                          Created by{" "}
                          <span className="tw-font-medium">
                            {selectedCreator?.name}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-3">
                      <button
                        className="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-rounded-lg hover:tw-bg-gray-50 tw-flex tw-items-center tw-gap-2"
                        onClick={handleOpenChatModal}
                      >
                        <MessageSquare className="tw-w-4 tw-h-4" />
                        Message
                      </button>
                      {selectedPost.status === "in_review" && (
                        <button
                          className="tw-px-4 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded-lg hover:tw-bg-green-700 tw-flex tw-items-center tw-gap-2"
                          onClick={() => handleApprovePost(selectedPost.id)}
                        >
                          <CheckCircle className="tw-w-4 tw-h-4" />
                          Approve
                        </button>
                      )}

                      {selectedPost.numberstatus === 12 ? (
                        <button
                          onClick={() => handleProcessPaymentCheckout()}
                          className="tw-px-4 tw-py-2 tw-bg-teal-600 tw-text-white tw-rounded-lg hover:tw-bg-teal-700 tw-flex tw-items-center tw-gap-2"
                        >
                          <DollarSign className="tw-w-4 tw-h-4" />
                          Process Payment
                        </button>
                      ) : (
                        <button
                          disabled
                          className="tw-px-4 tw-py-2 tw-bg-teal-600 tw-text-white tw-rounded-lg hover:tw-bg-teal-700 tw-flex tw-items-center tw-gap-2 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                        >
                          <DollarSign className="tw-w-4 tw-h-4" />
                          {selectedPost.numberstatus === 10
                            ? "Payment Processed"
                            : "Process Payment"}
                        </button>
                      )}
                    </div>
                  </div>

                  {selectedContent &&
                    selectedContent.status === "in_review" && (
                      <div className="tw-flex tw-justify-end tw-gap-3 tw-mb-4">
                        <button
                          onClick={() => handleRejectContent()}
                          className="tw-px-4 tw-py-2 tw-bg-white tw-border tw-border-red-500 tw-text-red-600 tw-rounded-lg hover:tw-bg-red-50 tw-transition-colors"
                        >
                          <div className="tw-flex tw-items-center tw-gap-2">
                            <ThumbsDown className="tw-w-4 tw-h-4" />
                            <span>Reject Content</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleApproveContent()}
                          className="tw-px-4 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded-lg hover:tw-bg-green-700 tw-transition-colors"
                        >
                          <div className="tw-flex tw-items-center tw-gap-2">
                            <CheckCircle className="tw-w-4 tw-h-4" />
                            <span>Approve Content</span>
                          </div>
                        </button>
                      </div>
                    )}

                  {selectedContent && (
                    <div className="tw-flex tw-justify-center tw-w-full tw-overflow-x-hidden">
                      {(() => {
                        // Process media once outside the JSX
                        const mediaContent = processMedia(
                          selectedContent.images
                        );
                        const firstImage =
                          mediaContent.images.length > 0
                            ? prepareImageForDisplay(mediaContent.images[0])
                            : undefined;

                        const additionalImages =
                          mediaContent.images.length > 1
                            ? mediaContent.images
                                .slice(1)
                                .map((img) => prepareImageForDisplay(img) || "")
                            : [];

                        const allLinks = mediaContent.links.concat(
                          selectedContent.links || []
                        );

                        return (
                          <PostViewer
                            post={{
                              id: selectedContent.id,
                              type: selectedContent.type,
                              status:
                                selectedContent.status === "in_review"
                                  ? "in-review"
                                  : selectedContent.status,
                              submittedOn: selectedContent.date,
                              author: {
                                name: selectedCreator?.name || "",
                                role: selectedCreator?.jobTitle || "Creator",
                                avatar: selectedCreator?.profilePicture || "",
                              },
                              content: selectedContent.content || "",
                              image: firstImage,
                              images: additionalImages,
                              links: allLinks,
                              timestamp: selectedContent.date || "",
                              engagement: {
                                likes: 1230,
                                comments: 50,
                                shares: 10,
                              },
                            }}
                            preview={true}
                          />
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreatorProfileDrawer creatorId={selectedCreator?.id || ""} />
      <ChatModal
        open={isChatModalOpen}
        onClose={handleCloseChatModal}
        recipientId={creator.id}
      />
    </div>
  );
}
