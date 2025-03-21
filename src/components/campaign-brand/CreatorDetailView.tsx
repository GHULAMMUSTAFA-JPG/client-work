import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  FileText,
  BarChart3,
  MessageSquare,
  CheckCircle,
  DollarSign,
  Eye,
  ThumbsDown,
  User,
  MousePointer,
} from "lucide-react";
import { Creator, Post, ContentItem, Status } from "@/types";
import { useSearchParams } from "next/navigation";
import {
  updatePostStatus,
  updatePostContentStatus,
  processPaymentCheckout,
} from "@/@api/campaign";
import { toast } from "react-toastify";
import { apiController } from "@/@api/baseUrl";
import CreatorsDropDown from "./CreatorsDropDown";
import CreatorProfileDrawer from "../CreatorProfileDrawer";
import { PostViewer } from "../shared/PostViewer";
import { isImageUrl } from "@/utils";
import { CampaignDrawer } from "../campaign-hub/CampaignDrawer";
import { ChatDrawer } from "../ChatDrawer";

interface CreatorDetailViewProps {
  paid: any;
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
  paid,
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
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const searchParams = useSearchParams();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  console.log("paidchild", paid);
  const handleOpenChatModal = () => {
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
  useEffect(() => {
    const currentPostStillExists =
      selectedPost && posts.some((post) => post.id === selectedPost.id);

    if (!currentPostStillExists) {
      if (posts.length > 0) {
        setSelectedPost(posts[0]);
        console.log("setSelectedPost", selectedPost);
        setSelectedContent(posts[0].contentItems[0]);
      } else {
        setSelectedPost(null);
        setSelectedContent(null);
      }
    }
  }, [posts, selectedPost]);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    console.log("setSelectedPost", selectedPost);
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
      .filter((post) => post.engagementRate !== null)
      .map((post) => post.engagementRate || 0);

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

    const result = await updatePostStatus({
      campaign_id: campaignId,
      creator_id: creator.id,
      post_id: postId,
      status: Status.Approved + "",
    });

    if (result?.success) {
      toast.success("Post approved successfully");
      onUpdate(currentPostId);
    }
  };

  const handleApproveContent = async () => {
    if (!selectedPost?.contentItems[0]) return;

    const result = await updatePostContentStatus({
      campaign_id: campaignId,
      creator_id: creator.id,
      post_id: selectedPost.id,
      content_id: selectedPost.contentItems[0].id,
      status: Status.Approved + "",
    });

    if (result?.success) {
      onUpdate(selectedPost.id);
    }
  };
  const handleRejectContent = async (feedback?: string) => {
    if (!selectedPost?.contentItems[0]) return;

    const result = await updatePostContentStatus({
      campaign_id: campaignId,
      creator_id: creator.id,
      post_id: selectedPost.id,
      content_id: selectedPost.contentItems[0].id,
      status: Status.Rejected + "",
      feedback,
    });

    if (result.success) {
      toast.success("Content rejected successfully");
      onUpdate(selectedPost.id);
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
  const handleProcessPaymentCheckout = async () => {
    setIsProcessingPayment(true);
    const result = await processPaymentCheckout({
      creator_id: creator.id,
      post_id: selectedPost?.id!,
    });
    if (result?.success && result?.data?.checkout_url) {
      window.open(result?.data?.checkout_url, "_self");
    }
    setIsProcessingPayment(false);
  };

  const renderEmbedContent = useMemo(() => {
    if (!selectedPost?.embedLink) return null;
    return (
      <div className="tw-flex-1 tw-max-w-3xl">
        <div className="tw-flex tw-justify-center">
          <div
            dangerouslySetInnerHTML={{
              __html: selectedPost.embedLink,
            }}
          />
        </div>
      </div>
    );
  }, [selectedPost?.embedLink]);

  const Metrics = () => {
    if (!selectedPost) return null;

    return (
      <div className="tw-w-60 tw-mr-6">
        <div className="tw-mt-3 tw-p-4 tw-rounded tw-border tw-bg-white tw-shadow-sm">
          <h4 className="tw-font-medium tw-text-sm tw-mb-3 tw-text-gray-700">
            Post Performance
          </h4>
          {selectedPost?.impressions !== null && (
            <div className="tw-flex tw-items-center tw-mb-3">
              <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mr-3">
                <Eye className="tw-w-4 tw-h-4 tw-text-blue-500" />
              </div>
              <div className="tw-flex-1">
                <div className="tw-text-xs tw-text-gray-500">Impressions</div>
                <div className="tw-font-semibold tw-text-gray-800">
                  {selectedPost.impressions?.toLocaleString() || 0}
                </div>
              </div>
            </div>
          )}

          {selectedPost?.reactions && (
            <div className="tw-flex tw-items-center tw-mb-3">
              <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-purple-50 tw-flex tw-items-center tw-justify-center tw-mr-3">
                <MousePointer className="tw-w-4 tw-h-4 tw-text-purple-500" />
              </div>
              <div className="tw-flex-1">
                <div className="tw-text-xs tw-text-gray-500">Reactions</div>
                <div className="tw-font-semibold tw-text-gray-800">
                  {selectedPost.reactions.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {selectedPost?.comments !== null &&
            selectedPost?.comments !== undefined && (
              <div className="tw-flex tw-items-center tw-mb-3">
                <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-orange-50 tw-flex tw-items-center tw-justify-center tw-mr-3">
                  <MessageSquare className="tw-w-4 tw-h-4 tw-text-orange-500" />
                </div>
                <div className="tw-flex-1">
                  <div className="tw-text-xs tw-text-gray-500">Comments</div>
                  <div className="tw-font-semibold tw-text-gray-800">
                    {selectedPost.comments.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

          {selectedPost?.reposts !== null &&
            selectedPost?.reposts !== undefined && (
              <div className="tw-flex tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-pink-50 tw-flex tw-items-center tw-justify-center tw-mr-3">
                  <svg
                    className="tw-w-4 tw-h-4 tw-text-pink-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="tw-flex-1">
                  <div className="tw-text-xs tw-text-gray-500">Reposts</div>
                  <div className="tw-font-semibold tw-text-gray-800">
                    {selectedPost.reposts.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    if (!selectedContent) return null;

    if (selectedPost?.embedLink) {
      return (
        <div className="tw-flex tw-w-full">
          {selectedContent.status !== "in_review" && <Metrics />}
          {renderEmbedContent}
        </div>
      );
    }

    const mediaContent = processMedia(selectedContent.images || []);
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
    const allLinks = mediaContent.links
      .concat(selectedContent.links || [])
      .map((link) => link.replace(/^blob:/, ""));

    return (
      <div className="tw-flex tw-w-full">
        <Metrics />
        <div className="tw-flex-1">
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
        </div>
      </div>
    );
  };

  return (
    <div>
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
              className="tw-flex tw-items-center bg-white tw-p-2 tw-rounded tw-shadow-sm tw-cursor-pointer tw-text-blue-600 hover:tw-text-gray-800"
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
          {paid == 0 && (
            <div className=" tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-4 tw-mb-6 tw-border-l-4 tw-border-green-500">
              <div className="tw-flex tw-items-center tw-gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-info tw-w-5 tw-h-5 tw-text-red-500 tw-flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <div className="tw-text-sm tw-text-red-600">
                  <span>Unfortunately, we couldn't process your payment.</span>
                </div>
              </div>
            </div>
          )}
          {paid == 1 && (
            <div className=" tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-4 tw-mb-6 tw-border-l-4 tw-border-green-500">
              <div className="tw-flex tw-items-center tw-gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-info tw-w-5 tw-h-5 tw-text-blue-500 tw-flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                <div className="tw-text-sm tw-text-blue-600">
                  <span>Your payment has been processed successfully.</span>
                </div>
              </div>
            </div>
          )}
          <div className="tw-grid tw-grid-cols-12 tw-gap-6">
            <div className="tw-col-span-3">
              <CreatorsDropDown
                creators={creators}
                selectedCreator={selectedCreator}
                setSelectedCreator={handelSelectedCreator}
              />
              <div className="tw-bg-white tw-rounded tw-shadow-sm tw-border tw-p-4">
                <h3 className="tw-font-medium tw-text-gray-900 tw-mb-4">
                  Campaign Posts
                </h3>
                <div className="tw-space-y-3">
                  {posts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleSelectPost(post)}
                      className={`tw-w-full tw-p-3 tw-rounded tw-text-left tw-transition-colors
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
              
                      </div>
                      <p className="tw-text-xs tw-text-gray-500">{post.date}</p>
                     
                      {post.status !== "in_review" && ( 
                        <div className="tw-flex tw-items-center tw-justify-between">
                        <div className="tw-mt-2 tw-space-y-1">
                          <div className="tw-flex tw-items-center tw-text-xs tw-text-gray-600">
                            <BarChart3 className="tw-w-3 tw-h-3 tw-mr-1" />
                            {post.impressions?.toLocaleString()} impressions
                          </div>
                        </div>
                        <div className="status-box00">
                          <button
                            onClick={() => setViewingPost(post)}
                            className="tw-w-full tw-bg-teal-500 tw-rounded tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-2 tw-text-xs tw-text-white"
                          >
                            <Eye className="tw-w-3 tw-h-3 tw-mr-1" />
                            View Details
                          </button>
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
                  <div className="tw-bg-white tw-rounded tw-shadow-sm tw-border tw-p-6">
                    <h3 className="tw-font-medium tw-text-gray-900 tw-mb-4">
                      Campaign Performance
                    </h3>
                    <div className="tw-grid tw-grid-cols-3 tw-gap-6">
                      <div className="tw-bg-gray-50 tw-rounded tw-p-4">
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
                      <div className="tw-bg-gray-50 tw-rounded tw-p-4">
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
                      <div className="tw-bg-gray-50 tw-rounded tw-p-4">
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
                  <div className="tw-w-full tw-bg-white tw-rounded tw-shadow-sm tw-border tw-p-6">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                      <div>
                        <h3 className="tw-font-medium tw-text-gray-900">
                          {selectedPost.title}
                        </h3>
                        <p className="tw-text-sm tw-text-gray-500">
                          Go Live Date: {selectedPost.dueDate}
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
                          className="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-rounded hover:tw-bg-gray-50 tw-flex tw-items-center tw-gap-2"
                          onClick={handleOpenChatModal}
                        >
                          <MessageSquare className="tw-w-4 tw-h-4" />
                          Message
                        </button>
                        {selectedPost.status === "in_review" && (
                          <button
                            className="tw-px-4 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded hover:tw-bg-green-700 tw-flex tw-items-center tw-gap-2"
                            onClick={() => handleApprovePost(selectedPost.id)}
                          >
                            <CheckCircle className="tw-w-4 tw-h-4" />
                            Approve
                          </button>
                        )}

                        {selectedPost.numberstatus ===
                        Status.PostImpressionUploaded ? (
                          <button
                          onClick={() => handleProcessPaymentCheckout()}
                          disabled={isProcessingPayment}
                          className="tw-px-4 tw-py-2 tw-bg-teal-600 tw-text-white tw-rounded hover:tw-bg-teal-700 tw-flex tw-items-center tw-gap-1 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                        >
                          <DollarSign className="tw-w-4 tw-h-4" /><span></span>
                          {isProcessingPayment
                            ? "Processing..."
                            : "Process Payment"}
                        </button>
                        ) : (
                          <div className="tw-px-4 tw-py-2 tw-text-black tw-flex tw-items-center tw-gap-1 fw-500 fs-15">
                            <DollarSign className="tw-w-4 tw-h-4" />
                            <span>5000</span>
                            <span className="tw-bg-teal-50 tw-rounded-lg  tw-text-black tw-px-4 tw-py-2 fw-400 tw-ml-3 fs-12">
                              {selectedPost.numberstatus === 10
                                ? "Payment Processed"
                                : "Process Payment"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedContent &&
                      selectedContent.status === "in_review" && (
                        <div className="tw-flex tw-justify-end tw-gap-3 tw-mb-4">
                          <button
                            onClick={() => handleRejectContent()}
                            className="tw-px-4 tw-py-2 tw-bg-white tw-border tw-border-red-500 tw-text-red-600 tw-rounded hover:tw-bg-red-50 tw-transition-colors"
                          >
                            <div className="tw-flex tw-items-center tw-gap-2">
                              <ThumbsDown className="tw-w-4 tw-h-4" />
                              <span>Reject Content</span>
                            </div>
                          </button>
                          <button
                            onClick={() => handleApproveContent()}
                            className="tw-px-4 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded hover:tw-bg-green-700 tw-transition-colors"
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
                        {renderMainContent()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <CreatorProfileDrawer creatorId={selectedCreator?.id || ""} />
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
    </div>
  );
}
