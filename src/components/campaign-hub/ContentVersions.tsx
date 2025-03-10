import React, { useState } from "react";
import { Eye, Save, Send } from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import { Status } from "@/types";
import { PostViewer } from "../shared/PostViewer";
import CreatePostContent from "./CreatePostContent";

interface PerformanceMetrics {
  impressions: number;
  clicks: number;
  engagement: number;
  lastUpdated: string;
}

export interface Version {
  id: string;
  date: string;
  media?: string[];
  status: Status;
  title: string;
  feedback: string;
  livePostLink?: string;
  postType: string;
  metrics?: PerformanceMetrics;
  description?: string;
}

interface ContentVersionsProps {
  versions: Version[];
  onAddContent: () => void;
  campaignId: string;
  creatorId: string;
  postId: string;
  canSubmit: boolean;
  onSubmit: () => void;
}

export function ContentVersions({
  versions,
  campaignId,
  creatorId,
  postId,
  canSubmit,
  onSubmit,
}: ContentVersionsProps) {
  const [editingVersion, setEditingVersion] = useState<Version | null>(null);
  const [isCreatePostDrawerOpen, setIsCreatePostDrawerOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const firstVersion = versions && versions.length > 0 ? versions[0] : null;

  const viewerPost = firstVersion
    ? {
        id: firstVersion.id,
        type: firstVersion.postType,
        status: (() => {
          switch (firstVersion.status) {
            case Status.Approved:
              return "approved";
            case Status.Rejected:
              return "rejected";
            case Status.Published:
              return "published";
            case Status.InProgress:
              return "draft";
            default:
              return "in-review";
          }
        })() as "approved" | "rejected" | "published" | "draft" | "in-review",
        submittedOn: firstVersion.date,
        author: {
          name: "Content Creator",
          role: "Creator",
          avatar: "/assets/images/user1.jpg",
        },
        content: firstVersion.description || "",
        image: firstVersion.media?.[0],
        timestamp: firstVersion.date,
        engagement: {
          likes: firstVersion.metrics?.impressions || 0,
          comments: firstVersion.metrics?.clicks || 0,
          shares: firstVersion.metrics?.engagement || 0,
        },
      }
    : null;

  const handleAddContent = () => {
    setIsCreatePostDrawerOpen(true);
  };

  return (
    <div className="tw-p-6">
      <div className="tw-space-y-4">
        {viewerPost ? (
          <div className="tw-flex tw-justify-center">
            <PostViewer post={viewerPost} preview={true} />
            {firstVersion && (
              <div className="tw-absolute tw-top-4 tw-right-4">
                <button
                  onClick={() => setSelectedVersion(firstVersion)}
                  className="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-text-sm tw-font-medium tw-rounded-md tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
                >
                  <Eye className="tw-w-4 tw-h-4 tw-mr-1" />
                  View Details
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-100">
            <div className="tw-border-b tw-border-gray-200 tw-bg-gray-50 tw-rounded-t-lg">
              <div className="tw-px-6 tw-py-4 tw-flex tw-justify-between tw-items-center">
                <div>
                  <h2 className="tw-text-xl tw-font-medium tw-text-gray-800">
                    Create Your First Content
                  </h2>
                  <p className="tw-text-sm tw-text-gray-600 tw-mt-1">
                    Start by creating compelling content for your campaign
                  </p>
                </div>
                <div className="tw-flex tw-space-x-3">
                  <button
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                    onClick={() =>
                      document.getElementById("previewBtn")?.click()
                    }
                  >
                    <Eye className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    Preview
                  </button>
                  <button
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                    onClick={() =>
                      document.getElementById("saveDraftBtn")?.click()
                    }
                  >
                    <Save className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    Save Draft
                  </button>
                  <button
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-transparent tw-rounded-md tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark"
                    onClick={() =>
                      document.getElementById("submitBtn")?.click()
                    }
                  >
                    <Send className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div className="tw-py-10">
              <CreatePostContent
                campaignId={campaignId}
                creatorId={creatorId}
                postId={postId}
                onSubmit={onSubmit}
                canSubmit={canSubmit}
              />
            </div>
          </div>
        )}
      </div>

      <CampaignDrawer
        isOpen={!!editingVersion}
        onClose={() => setEditingVersion(null)}
        title="Edit Content"
        description="Update content details"
        dueDate="Mar 31, 2024"
        type="edit"
        postType={editingVersion?.postType}
        initialData={editingVersion}
      />
    </div>
  );
}
