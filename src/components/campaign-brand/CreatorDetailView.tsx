import React, { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";
import { Creator, Post, ContentItem, Status } from "@/types";
import Tooltip from "../Tooltip";
import { useRouter } from "next/navigation";
import { updatePostStatus, updatePostContentStatus } from "@/@api/campaign";
import { toast } from "react-toastify";
import { apiController } from "@/@api/baseUrl";
import CreatorsDropDown from "./CreatorsDropDown";
import CreatorProfileDrawer from "../CreatorProfileDrawer";

interface CreatorDetailViewProps {
  creator: Creator;
  onBack: () => void;
  posts: Post[];
  campaignId: string;
  onUpdate: () => void;
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
  const [selectedPost, setSelectedPost] = useState<Post | null>(posts[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );

  useEffect(() => {
    setSelectedPost(posts[0]);
  }, [posts]);

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
  const router = useRouter();

  const handleViewContent = (content: ContentItem) => {
    setSelectedContent(content);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedContent(null);
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
    await updatePostStatus({
      campaign_id: campaignId,
      creator_id: creator.id,
      post_id: postId,
      status: Status.Approved + "",
    });
    onUpdate();
  };

  const handleApproveContent = async (contentId: string) => {
    if (!selectedPost) return;
    try {
      const result = await updatePostContentStatus({
        campaign_id: campaignId,
        creator_id: creator.id,
        post_id: selectedPost.id,
        content_id: contentId,
        status: Status.Approved + "",
      });

      if (!result) {
        toast.error("Failed to approve content. Please try again.");
      }
      onUpdate();
    } catch (error) {
      toast.error("An error occurred while approving content.");
      console.error("Error approving content:", error);
    }
  };

  const handleRejectContent = async (contentId: string, feedback?: string) => {
    if (!selectedPost) return;
    try {
      const result = await updatePostContentStatus({
        campaign_id: campaignId,
        creator_id: creator.id,
        post_id: selectedPost.id,
        content_id: contentId,
        status: Status.Rejected + "",
        feedback,
      });

      if (!result) {
        toast.error("Failed to reject content. Please try again.");
      }
      onUpdate();
    } catch (error) {
      toast.error("An error occurred while rejecting content.");
      console.error("Error rejecting content:", error);
    }
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
            className="tw-flex tw-items-center tw-text-blue-600 hover:tw-text-blue-700"
            data-bs-toggle="offcanvas"
            data-bs-target="#creatorProfileDrawer"
          >
            <User className="tw-w-4 tw-h-4 tw-mr-2" />
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
                    onClick={() => setSelectedPost(post)}
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
                    <h4 className="tw-font-medium tw-text-sm tw-mb-1">
                      {post.title}
                    </h4>
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
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="tw-col-span-9">
            <div className="tw-space-y-6">
              {/* Campaign Performance */}
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

              {/* Selected Post Content */}
              {selectedPost && (
                <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-p-6">
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
                        onClick={() => router.push(`/inbox?id=${creator.id}`)}
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

                      {selectedPost.numberstatus === 10 ? (
                        <button
                          disabled
                          className="tw-px-4 tw-py-2 tw-bg-teal-600 tw-text-white tw-rounded-lg hover:tw-bg-teal-700 tw-flex tw-items-center tw-gap-2 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                        >
                          <DollarSign className="tw-w-4 tw-h-4" />
                          Payment Processed
                        </button>
                      ) : (
                        <button
                          onClick={() => handleProcessPaymentCheckout()}
                          className="tw-px-4 tw-py-2 tw-bg-teal-600 tw-text-white tw-rounded-lg hover:tw-bg-teal-700 tw-flex tw-items-center tw-gap-2"
                        >
                          <DollarSign className="tw-w-4 tw-h-4" />
                          Process Payment
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content Items */}
                  <div className="tw-space-y-4">
                    <h4 className="tw-font-medium tw-text-gray-700">
                      Content Items
                    </h4>
                    {selectedPost.contentItems.map((item) => (
                      <div
                        key={item.id}
                        className="tw-border tw-rounded-lg tw-p-4"
                      >
                        <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                          <div className="tw-flex tw-items-center tw-gap-2">
                            <span className="tw-capitalize tw-text-sm tw-font-medium">
                              {item.type}
                            </span>
                            <span
                              className={`tw-text-xs tw-px-2 tw-py-1 tw-rounded-full
                              ${
                                item.status === "approved"
                                  ? "tw-bg-green-100 tw-text-green-800"
                                  : item.status === "in_review"
                                  ? "tw-bg-yellow-100 tw-text-yellow-800"
                                  : "tw-bg-gray-100 tw-text-gray-800"
                              }
                            `}
                            >
                              {item.status.replace("_", " ")}
                            </span>
                          </div>
                          <div className="tw-flex tw-items-center tw-gap-2">
                            {item.status === "in_review" && (
                              <>
                                <button
                                  onClick={() => handleApproveContent(item.id)}
                                  className="tw-p-2 tw-text-green-600 hover:tw-text-green-800 hover:tw-bg-green-50 tw-rounded-lg tw-transition-colors"
                                  title="Approve content"
                                >
                                  <CheckCircle className="tw-w-4 tw-h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectContent(item.id)}
                                  className="tw-p-2 tw-text-red-600 hover:tw-text-red-800 hover:tw-bg-red-50 tw-rounded-lg tw-transition-colors"
                                  title="Reject content"
                                >
                                  <ThumbsDown className="tw-w-4 tw-h-4" />
                                </button>
                              </>
                            )}
                            <Tooltip content="View content details">
                              <button
                                onClick={() => handleViewContent(item)}
                                className="tw-p-2 tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-100 tw-rounded-lg tw-transition-colors"
                              >
                                <Eye className="tw-w-4 tw-h-4" />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                        <div className="tw-text-sm tw-text-gray-600 tw-truncate">
                          {item.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isDrawerOpen && selectedContent && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-50">
          <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-1/3 tw-bg-white tw-shadow-xl tw-flex tw-flex-col">
            <div className="tw-p-6 tw-flex-1 tw-overflow-y-auto">
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                <h3 className="tw-text-lg tw-font-medium">Content Details</h3>
                <button
                  onClick={handleCloseDrawer}
                  className="tw-p-2 tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-100 tw-rounded-lg tw-transition-colors"
                >
                  <X className="tw-w-5 tw-h-5" />
                </button>
              </div>

              <div className="tw-space-y-6">
                <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg">
                  <div className="tw-mb-4">
                    <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                      Type
                    </h4>
                    <p className="tw-text-sm tw-text-gray-600 tw-capitalize">
                      {selectedContent.type}
                    </p>
                  </div>

                  <div className="tw-mb-4">
                    <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                      Status
                    </h4>
                    <span
                      className={`tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium ${
                        selectedContent.status === "approved"
                          ? "tw-bg-green-100 tw-text-green-800"
                          : selectedContent.status === "in_review"
                          ? "tw-bg-yellow-100 tw-text-yellow-800"
                          : "tw-bg-gray-100 tw-text-gray-800"
                      }`}
                    >
                      {selectedContent.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="tw-mb-4">
                    <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                      Submitted on
                    </h4>
                    <p className="tw-text-sm tw-text-gray-600">
                      {selectedContent.date}
                    </p>
                  </div>

                  {selectedContent.content && (
                    <div className="tw-mb-4">
                      <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                        Content
                      </h4>
                      <p className="tw-text-sm tw-text-gray-600">
                        {selectedContent.content}
                      </p>
                    </div>
                  )}
                </div>

                {selectedContent.type === "image" &&
                  selectedContent.images &&
                  selectedContent.images.length > 0 && (
                    <div>
                      <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                        Media
                      </h4>
                      <div className="tw-grid tw-grid-cols-1 tw-gap-2">
                        {selectedContent.images.map((image, index) => (
                          <div
                            key={index}
                            className="tw-border tw-rounded-lg tw-overflow-hidden"
                          >
                            <img
                              src={image}
                              alt={`Content image ${index + 1}`}
                              className="tw-w-full tw-h-auto"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {selectedContent.status === "in_review" && (
              <div className="tw-p-4 tw-border-t tw-bg-gray-50 tw-flex tw-justify-end tw-gap-3">
                <button
                  onClick={() => {
                    router.push(`/inbox?id=${creator.id}`);
                  }}
                  className="tw-px-4 tw-py-2 tw-bg-white tw-border tw-border-blue-500 tw-text-blue-600 tw-rounded-lg hover:tw-bg-blue-50 tw-transition-colors"
                >
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <MessageSquare className="tw-w-4 tw-h-4" />
                    <span>Provide Feedback</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    handleRejectContent(selectedContent.id);
                    handleCloseDrawer();
                  }}
                  className="tw-px-4 tw-py-2 tw-bg-white tw-border tw-border-red-500 tw-text-red-600 tw-rounded-lg hover:tw-bg-red-50 tw-transition-colors"
                >
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <ThumbsDown className="tw-w-4 tw-h-4" />
                    <span>Reject</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    handleApproveContent(selectedContent.id);
                    handleCloseDrawer();
                  }}
                  className="tw-px-4 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded-lg hover:tw-bg-green-700 tw-transition-colors"
                >
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <CheckCircle className="tw-w-4 tw-h-4" />
                    <span>Approve</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <CreatorProfileDrawer creatorId={selectedCreator?.id || ""} />
    </div>
  );
}
