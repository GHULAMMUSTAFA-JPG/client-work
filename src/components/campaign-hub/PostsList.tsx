import React, { useState } from "react";
import { Eye, AlertTriangle, Plus } from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import {
  getCampaignStatusStyles,
  getIcon,
  getStatusLabel,
  getStatusStyles,
} from "./utils";
import { CampaignStatus, Status } from "@/types";

interface Post {
  id: string;
  type: "instagram-reel" | "instagram-image" | "tiktok" | "youtube";
  title: string;
  status: Status;
  budget: number;
  description?: string;
  submittedDate?: string;
  goLiveDate?: string;
  dueDate?: string;
  Created_At: string;
}

interface PostsListProps {
  posts: Post[];
  selectedPostId: string;
  campaignStatus: CampaignStatus;
  onPostSelect: (postId: string) => void;
  onCreatePost: () => void;
}

export function PostsList({
  posts,
  selectedPostId,
  onPostSelect,
  onCreatePost,
  campaignStatus,
}: PostsListProps) {
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  console.log("viewingPost", viewingPost);
  return (
    <div className="tw-w-96 tw-border-r tw-border-gray-200 tw-overflow-y-auto">
      <div className="tw-p-4">
        <button
          onClick={onCreatePost}
          className="tw-w-full tw-mb-4 tw-inline-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
        >
          <Plus className="tw-w-4 tw-h-4 tw-mr-2" />
          Create New Post
        </button>

        <div className="tw-space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="tw-rounded-lg tw-border tw-border-gray-200 tw-overflow-hidden tw-bg-white"
            >
              <button
                onClick={() => onPostSelect(post.id)}
                className={`tw-w-full tw-text-left tw-p-4 tw-transition-colors tw-duration-200 ${
                  selectedPostId === post.id
                    ? "tw-bg-blue-50 tw-border-primary"
                    : "hover:tw-bg-gray-50"
                }`}
              >
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                  <div className="tw-flex tw-items-center tw-space-x-3">
                    <span
                      className={`tw-flex-shrink-0 tw-p-2 tw-rounded-full ${
                        post.status === Status.InProgress
                          ? "tw-bg-orange-50"
                          : "tw-bg-gray-100"
                      }`}
                    >
                      {getIcon(post.type)}
                    </span>
                    <div>
                      <h3 className="tw-text-sm tw-font-medium tw-text-gray-900">
                        {post.title}
                      </h3>
                      <div className="tw-flex tw-items-center tw-mt-1">
                        <span className="tw-text-sm tw-font-medium tw-text-green-600">
                          ${post.budget}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={getStatusStyles(post.status)}>
                    {getStatusLabel(post.status)}
                  </span>
                </div>

                <div className="tw-mt-2">
                  <span className={getCampaignStatusStyles(campaignStatus)}>
                    {campaignStatus}
                  </span>
                </div>

                {post.status === Status.InProgress && (
                  <div className="tw-mt-2 tw-p-2 tw-bg-orange-50 tw-rounded-md">
                    <div className="tw-flex">
                      <AlertTriangle className="tw-w-4 tw-h-4 tw-text-orange-400 tw-mt-0.5 tw-mr-2 tw-flex-shrink-0" />
                      <p className="tw-text-xs tw-text-orange-700">
                        Updates required. Click to view feedback.
                      </p>
                    </div>
                  </div>
                )}
              </button>

              <div className="tw-px-4 tw-py-2 tw-bg-gray-50 tw-border-t tw-border-gray-200">
                <button
                  onClick={() => setViewingPost(post)}
                  className="tw-w-full tw-flex tw-items-center tw-justify-center tw-px-3 tw-py-1 tw-text-xs tw-text-gray-600 hover:tw-text-gray-900"
                >
                  <Eye className="tw-w-3 tw-h-3 tw-mr-1" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CampaignDrawer
        isOpen={!!viewingPost}
        onClose={() => setViewingPost(null)}
        title="Post Details"
        description={viewingPost?.description || ""}
        dueDate={viewingPost?.Created_At || ""}
        payout={`$${viewingPost?.budget || 0}`}
        type="details"
        isPost={true}
        initialData={{
          ...viewingPost,
          submittedDate: viewingPost?.submittedDate,
          goLiveDate: viewingPost?.goLiveDate,
          createdAt: viewingPost?.Created_At,
        }}
      />
    </div>
  );
}
