import React, { useState } from "react";
import { Plus, Eye } from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import { ContentVersionDrawer } from "./ContentVersionDrawer";
import { Status } from "@/types"; // Ensure the correct Status enum is imported
import { getCampaignStatusStyles } from "./utils";
import { PostContentAddNewContent } from "./PostContentAddNewContent";
import EmptyState from "../EmptyState";

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

// **Mapping dropdown values to the Status enum**
const statusFilterMap: Record<string, Status> = {
  approved: Status.Approved,
  pending: Status.PendingApproval,
  draft: Status.InProgress,
  rejected: Status.Rejected,
};

export function ContentVersions({
  versions,
  campaignId,
  creatorId,
  postId,
  canSubmit,
  onSubmit,
}: ContentVersionsProps) {
  const [statusFilter, setStatusFilter] = useState<
    "all" | keyof typeof statusFilterMap
  >("all");

  const [editingVersion, setEditingVersion] = useState<Version | null>(null);
  const [isCreatePostDrawerOpen, setIsCreatePostDrawerOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const filteredVersions =
    versions?.filter((version) =>
      statusFilter === "all"
        ? true
        : version.status === statusFilterMap[statusFilter]
    ) || [];

  return (
    <div className="tw-p-6">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div className="tw-flex tw-items-center tw-space-x-4">
          <h2 className="tw-text-lg tw-font-semibold">Content Versions</h2>
          <div className="tw-flex tw-items-center tw-space-x-2">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "all" | keyof typeof statusFilterMap
                )
              }
              className="tw-block tw-pl-3 tw-pr-10 tw-py-2 tw-text-base tw-border-gray-300 focus:tw-outline-none focus:tw-ring-primary focus:tw-border-primary tw-sm:text-sm tw-rounded-md"
            >
              <option value="all">All Versions</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => setIsCreatePostDrawerOpen(true)}
          className="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
        >
          <Plus className="tw-w-4 tw-h-4 tw-mr-2" />
          Add Content
        </button>
      </div>

      <div className="tw-space-y-4">
        {filteredVersions.map((version) => (
          <div
            key={version.id}
            className={`tw-bg-white tw-rounded-lg tw-border ${
              version.status === Status.Rejected
                ? "tw-border-red-200"
                : "tw-border-gray-200"
            } tw-overflow-hidden`}
          >
            <div className="tw-p-4">
              <div className="tw-flex tw-items-start tw-justify-between tw-mb-4">
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <div className="tw-flex-shrink-0 tw-h-16 tw-w-24">
                    {version.media?.length ? (
                      <img
                        src={version.media[0]}
                        alt={`Version from ${version.date}`}
                        className="tw-h-16 tw-w-24 tw-object-cover tw-rounded-md"
                      />
                    ) : (
                      <div className="tw-h-16 tw-w-24 tw-bg-gray-300 tw-rounded-md"></div>
                    )}
                  </div>

                  <div>
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                        {version.title}
                      </span>
                      <span className={getCampaignStatusStyles(version.status)}>
                        {Status[version.status]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="tw-flex tw-items-center tw-space-x-2">
                  <button
                    onClick={() => setSelectedVersion(version)}
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-text-sm tw-font-medium tw-rounded-md tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
                  >
                    <Eye className="tw-w-4 tw-h-4 tw-mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!filteredVersions.length && (
        <EmptyState
          title="No Content Available"
          description="Add new  Content to view its content versions."
        />
      )}
      <PostContentAddNewContent
        isOpen={isCreatePostDrawerOpen}
        onClose={() => setIsCreatePostDrawerOpen(false)}
        onSubmit={() => onSubmit()}
        campaignId={campaignId}
        creatorId={creatorId}
        postId={postId}
        canSubmit={canSubmit}
      />

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

      {selectedVersion && (
        <ContentVersionDrawer
          isOpen={!!selectedVersion}
          onClose={() => setSelectedVersion(null)}
          version={selectedVersion}
        />
      )}
    </div>
  );
}
