import React, { useState } from "react";
import { Eye, AlertTriangle, Plus } from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import {
  getCampaignStatusStyles,
  getIcon,
  getStatusLabel,
  getStatusStyles,
} from "../shared/utils";
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
  selectedPostId: string | null;
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
          Start a New post
        </button>

        <div className="">
          {posts.map((post) => (
            <div key={post.id} className="tw-overflow-hidden">
              <button
                onClick={() => onPostSelect(post.id)}
                className={`post-selected-box ${
                  selectedPostId === post.id
                    ? "post-selected-box-active"
                    : "hover:post-selected-box"
                }`}
              >
                <div className="tw-flex tw-items-start tw-justify-between tw-mb-2">
                  <div className="tw-flex tw-space-x-3 tw-items-start">
                    <span className="icon-bg">{getIcon(post.type)}</span>
                    <div className="post_items">
                      <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 text-left">
                        {post.title}
                      </h3>
                      <div className="tw-flex tw-justify-between tw-items-center tw-flex-col">
                        <div className="fs-13 mt-1 fw-500 text-teal">
                          ${post.budget}
                        </div>
                        <div className="status-box">{campaignStatus}</div>
                      </div>
                    </div>
                  </div>
                  <span className="status-text-yellow">
                    {getStatusLabel(post.status)}
                  </span>
                </div>

                <div className="d-flex justify-content-between items-center">
                  <div className="d-flex items-center gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-mouse-pointer "
                      >
                        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                        <path d="m13 13 6 6"></path>
                      </svg>
                      <span className="fs-10">Click to select</span>
                    </div>
                  </div>
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

                {post.status === Status.InProgress && (
                  <div className="tw-mt-2 tw-p-2">
                    <div className="tw-flex">
                      <AlertTriangle className="" />
                      <p className="">
                        Updates required. Click to view feedback.
                      </p>
                    </div>
                  </div>
                )}
              </button>
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
