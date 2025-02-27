import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  FileText,
  BarChart3,
  MessageSquare,
  CheckCircle,
  DollarSign,
  X,
  Eye,
} from "lucide-react";
import { Creator, Post, ContentItem } from "@/types";
import Tooltip from "./Tooltip";
import { useRouter } from "next/navigation";

interface CreatorDetailViewProps {
  creator: Creator;
  onBack: () => void;
  posts: Post[];
}

export function CreatorDetailView({
  creator,
  onBack,
  posts,
}: CreatorDetailViewProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );
  const router = useRouter();

  const handleViewContent = (content: ContentItem) => {
    setSelectedContent(content);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedContent(null);
  };

  console.log(posts, selectedPost, selectedContent);
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

    // Assuming CTR is 60% of engagement rate for this example
    const clickThroughRate = avgEngagement * 0.6;

    return {
      totalImpressions,
      avgEngagement: avgEngagement.toFixed(1),
      clickThroughRate: clickThroughRate.toFixed(1),
    };
  }, [posts]);

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <div className="tw-mx-auto tw-px-4 tw-py-8">
        <button
          onClick={onBack}
          className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-800 tw-mb-6"
        >
          <ArrowLeft className="tw-w-4 tw-h-4 tw-mr-2" />
          Back to Campaign Overview
        </button>

        <div className="tw-grid tw-grid-cols-12 tw-gap-6">
          <div className="tw-col-span-3">
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
                        <button className="tw-px-4 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded-lg hover:tw-bg-green-700 tw-flex tw-items-center tw-gap-2">
                          <CheckCircle className="tw-w-4 tw-h-4" />
                          Approve
                        </button>
                      )}
                      {creator.paymentStatus !== "paid" && (
                        <button className="tw-px-4 tw-py-2 tw-bg-teal-600 tw-text-white tw-rounded-lg hover:tw-bg-teal-700 tw-flex tw-items-center tw-gap-2">
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
                          <Tooltip content="View content details">
                            <button
                              onClick={() => handleViewContent(item)}
                              className="tw-p-2 tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-100 tw-rounded-lg tw-transition-colors"
                            >
                              <Eye className="tw-w-4 tw-h-4" />
                            </button>
                          </Tooltip>
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
          <div className="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-1/3 tw-bg-white tw-shadow-xl">
            <div className="tw-p-6">
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
                <div>
                  <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                    Content
                  </h4>
                  <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg">
                    <p className="tw-text-sm tw-text-gray-600">
                      {selectedContent.content}
                    </p>
                  </div>
                  {selectedContent.type === "image" ? (
                    <div className="tw-mt-4">
                      <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                        Media
                      </h4>
                      <div className="tw-grid tw-gap-2">
                        {selectedContent.images?.map((image) => (
                          <img
                            key={image}
                            src={image}
                            alt="Content"
                            className="tw-w-full tw-rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
