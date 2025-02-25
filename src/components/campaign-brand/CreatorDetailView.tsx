import React, { useState } from "react";
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

interface CreatorDetailViewProps {
  creator: Creator;
  onBack: () => void;
}

export function CreatorDetailView({ creator, onBack }: CreatorDetailViewProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );

  const posts: Post[] = [
    {
      id: "1",
      title: "Initial Campaign Post",
      date: "2025-02-15",
      status: "approved",
      content: `🚀 Excited to share my experience with the incredible AI-powered features that are revolutionizing how we work!`,
      impressions: 8500,
      engagement: 5.2,
      link: `https://linkedin.com/posts/${creator.linkedInId}-post-1`,
      contentItems: [
        {
          id: "1-1",
          type: "image",
          content:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995",
          date: "2025-02-14",
          status: "approved",
          messages: [
            {
              id: "m1",
              sender: "Brand Manager",
              message:
                "Great image choice! The lighting really makes the product stand out.",
              timestamp: "2025-02-14T10:30:00Z",
              isCreator: false,
            },
            {
              id: "m2",
              sender: creator.name,
              message: "Thanks! I tried to capture the essence of innovation.",
              timestamp: "2025-02-14T10:35:00Z",
              isCreator: true,
            },
          ],
        },
        {
          id: "1-2",
          type: "text",
          content: "Draft caption for the main post highlighting key features",
          date: "2025-02-13",
          status: "approved",
          messages: [
            {
              id: "m3",
              sender: "Content Reviewer",
              message: "Could you add more specific examples of the features?",
              timestamp: "2025-02-13T15:20:00Z",
              isCreator: false,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Product Feature Highlight",
      date: "2025-02-20",
      status: "in_review",
      content: `🎉 Deep diving into another game-changing feature today!`,
      impressions: 7800,
      engagement: 4.8,
      link: `https://linkedin.com/posts/${creator.linkedInId}-post-2`,
      contentItems: [
        {
          id: "2-1",
          type: "video",
          content: "product-demo.mp4",
          date: "2025-02-19",
          status: "in_review",
          messages: [
            {
              id: "m4",
              sender: "Brand Manager",
              message:
                "The demo flow looks great! Just a few minor tweaks needed.",
              timestamp: "2025-02-19T14:15:00Z",
              isCreator: false,
            },
          ],
        },
      ],
    },
  ];

  const handleViewContent = (content: ContentItem) => {
    setSelectedContent(content);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedContent(null);
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <div className=" tw-mx-auto tw-px-4 tw-py-8">
        <button
          onClick={onBack}
          className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-800 tw-mb-6"
        >
          <ArrowLeft className="tw-w-4 tw-h-4 tw-mr-2" />
          Back to Campaign Overview
        </button>

        <div className="tw-grid tw-grid-cols-12 tw-gap-6">
          {/* Left Sidebar - Posts List */}
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
                      {(16300).toLocaleString()}
                    </div>
                    <div className="tw-text-sm tw-text-teal-600 tw-mt-1">
                      +12% from previous
                    </div>
                  </div>
                  <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                    <div className="tw-text-sm tw-text-gray-500">
                      Avg. Engagement Rate
                    </div>
                    <div className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                      5.0%
                    </div>
                    <div className="tw-text-sm tw-text-teal-600 tw-mt-1">
                      +0.8% from previous
                    </div>
                  </div>
                  <div className="tw-bg-gray-50 tw-rounded-lg tw-p-4">
                    <div className="tw-text-sm tw-text-gray-500">
                      Click-through Rate
                    </div>
                    <div className="tw-text-2xl tw-font-semibold tw-text-gray-900">
                      3.2%
                    </div>
                    <div className="tw-text-sm tw-text-teal-600 tw-mt-1">
                      +0.5% from previous
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
                      <button className="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-rounded-lg hover:tw-bg-gray-50 tw-flex tw-items-center tw-gap-2">
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
                        <div className="tw-mt-2 tw-flex tw-items-center tw-text-xs tw-text-gray-500">
                          <MessageSquare className="tw-w-3 tw-h-3 tw-mr-1" />
                          {item.messages.length} messages
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

      {/* Content Details Drawer */}
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
                  {selectedContent.type === "image" ? (
                    <img
                      src={selectedContent.content}
                      alt="Content"
                      className="tw-w-full tw-rounded-lg"
                    />
                  ) : (
                    <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg">
                      <p className="tw-text-sm tw-text-gray-600">
                        {selectedContent.content}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                    Chat History
                  </h4>
                  <div className="tw-space-y-4">
                    {selectedContent.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`tw-flex ${
                          message.isCreator
                            ? "tw-justify-end"
                            : "tw-justify-start"
                        }`}
                      >
                        <div
                          className={`tw-max-w-[80%] tw-rounded-lg tw-p-3 ${
                            message.isCreator
                              ? "tw-bg-teal-50 tw-text-teal-900"
                              : "tw-bg-gray-100 tw-text-gray-900"
                          }`}
                        >
                          <div className="tw-text-xs tw-font-medium tw-mb-1">
                            {message.sender}
                          </div>
                          <p className="tw-text-sm">{message.message}</p>
                          <div className="tw-text-xs tw-text-gray-500 tw-mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
