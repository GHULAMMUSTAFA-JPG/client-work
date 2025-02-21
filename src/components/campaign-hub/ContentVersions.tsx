import React, { useState } from "react";
import {
  Edit,
  Plus,
  Link,
  RotateCw,
  Trash2,
  Upload,
  AlertTriangle,
  Send,
  Eye,
  MousePointer,
  Heart,
  HelpCircle,
  RefreshCw,
  ExternalLink,
  BarChart,
} from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import { CreatePostDrawer } from "./CreatePostDrawer";
import { ContentVersionDrawer } from "./ContentVersionDrawer";

interface PerformanceMetrics {
  impressions: number;
  clicks: number;
  engagement: number;
  lastUpdated: string;
}

interface Version {
  id: string;
  date: string;
  imageUrl?: string;
  status: "approved" | "rejected" | "pending" | "draft";
  feedback?: string[];
  livePostLink?: string;
  postType: string;
  metrics?: PerformanceMetrics;
}

interface ContentVersionsProps {
  versions: Version[];
  onAddContent: () => void;
}

interface MetricTooltip {
  title: string;
  description: string;
}

export function ContentVersions({
  versions,
  onAddContent,
}: ContentVersionsProps) {
  const [statusFilter, setStatusFilter] = useState<Version["status"] | "all">(
    "all"
  );
  const [editingVersion, setEditingVersion] = useState<Version | null>(null);
  const [feedbackResponse, setFeedbackResponse] = useState<{
    [key: string]: string;
  }>({});
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(
    null
  );
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isCreatePostDrawerOpen, setIsCreatePostDrawerOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const metricTooltips: { [key: string]: MetricTooltip } = {
    impressions: {
      title: "Impressions",
      description: "Total number of times your post has been viewed by users",
    },
    clicks: {
      title: "Clicks",
      description:
        "Number of times users have clicked on your post or its elements",
    },
    engagement: {
      title: "Engagement Rate",
      description:
        "Percentage of viewers who interacted with your post (likes, comments, shares)",
    },
  };

  const handleCreatePost = (postData: any) => {
    console.log("Creating new post:", postData);
    setIsCreatePostDrawerOpen(false);
  };

  const Tooltip = ({ id, content }: { id: string; content: MetricTooltip }) => {
    if (activeTooltip !== id) return null;

    return (
      <div className="tw-absolute tw-z-50 tw-w-64 tw-p-3 tw-bg-gray-900 tw-text-white tw-rounded-lg tw-shadow-lg -tw-top-20 tw-left-1/2 tw-transform -tw-translate-x-1/2">
        <div className="tw-absolute -tw-bottom-2 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-w-4 tw-h-4 tw-rotate-45 tw-bg-gray-900" />
        <div className="tw-relative">
          <h4 className="tw-font-medium tw-mb-1">{content.title}</h4>
          <p className="tw-text-sm tw-text-gray-300">{content.description}</p>
        </div>
      </div>
    );
  };

  const MetricDisplay = ({
    icon: Icon,
    value,
    label,
    tooltipId,
  }: {
    icon: any;
    value: number | string;
    label: string;
    tooltipId: string;
  }) => (
    <div
      className="tw-relative tw-flex tw-items-center tw-space-x-2"
      onMouseEnter={() => setActiveTooltip(tooltipId)}
      onMouseLeave={() => setActiveTooltip(null)}
    >
      <Icon className="tw-w-4 tw-h-4 tw-text-gray-500" />
      <span className="tw-text-sm tw-text-gray-700">
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
      <HelpCircle className="tw-w-3 tw-h-3 tw-text-gray-400 tw-cursor-help" />
      <Tooltip id={tooltipId} content={metricTooltips[tooltipId]} />
    </div>
  );

  const LivePostSection = ({ version }: { version: Version }) => {
    if (version.status !== "approved" || !version.livePostLink) return null;

    return (
      <div className="tw-mt-4 tw-p-4 tw-bg-green-50 tw-rounded-lg tw-border tw-border-green-200">
        <div className="tw-flex tw-items-start tw-justify-between">
          <div className="tw-space-y-3">
            <div className="tw-flex tw-items-center tw-space-x-3">
              <ExternalLink className="tw-w-5 tw-h-5 tw-text-green-600" />
              <a
                href={version.livePostLink}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-sm tw-font-medium tw-text-green-700 hover:tw-text-green-800 tw-flex tw-items-center"
              >
                View Published Post
                <ExternalLink className="tw-w-3 tw-h-3 tw-ml-1" />
              </a>
            </div>

            {version.metrics && (
              <div className="tw-space-y-2">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <h4 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-flex tw-items-center">
                    <BarChart className="tw-w-4 tw-h-4 tw-mr-1" />
                    Performance Metrics
                  </h4>
                  <button
                    className="tw-text-xs tw-text-primary hover:tw-text-primary-dark tw-flex tw-items-center"
                    onClick={() => console.log("Refreshing metrics...")}
                  >
                    <RefreshCw className="tw-w-3 tw-h-3 tw-mr-1" />
                    Refresh
                  </button>
                </div>

                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                  <MetricDisplay
                    icon={Eye}
                    value={version.metrics.impressions}
                    label="Impressions"
                    tooltipId="impressions"
                  />
                  <MetricDisplay
                    icon={MousePointer}
                    value={version.metrics.clicks}
                    label="Clicks"
                    tooltipId="clicks"
                  />
                  <MetricDisplay
                    icon={Heart}
                    value={`${version.metrics.engagement}%`}
                    label="Engagement"
                    tooltipId="engagement"
                  />
                </div>

                <p className="tw-text-xs tw-text-gray-500 tw-mt-2">
                  Last updated: {version.metrics.lastUpdated}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getStatusBadge = (status: Version["status"]) => {
    const styles = {
      approved: "tw-bg-green-100 tw-text-green-800",
      rejected: "tw-bg-red-100 tw-text-red-800",
      pending: "tw-bg-yellow-100 tw-text-yellow-800",
      draft: "tw-bg-gray-100 tw-text-gray-800",
    };

    return (
      <span
        className={`tw-inline-flex tw-items-center tw-px-2.5 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="tw-p-6">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
        <div className="tw-flex tw-items-center tw-space-x-4">
          <h2 className="tw-text-lg tw-font-semibold">Content Versions</h2>
          <div className="tw-flex tw-items-center tw-space-x-2">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Version["status"] | "all")
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
        {versions
          .filter(
            (version) =>
              statusFilter === "all" || version.status === statusFilter
          )
          .map((version) => (
            <div
              key={version.id}
              className={`tw-bg-white tw-rounded-lg tw-border ${
                version.status === "rejected"
                  ? "tw-border-red-200"
                  : "tw-border-gray-200"
              } tw-overflow-hidden`}
            >
              <div className="tw-p-4">
                <div className="tw-flex tw-items-start tw-justify-between tw-mb-4">
                  <div className="tw-flex tw-items-center tw-space-x-3">
                    {version.imageUrl && (
                      <div className="tw-flex-shrink-0 tw-h-16 tw-w-24">
                        <img
                          src={version.imageUrl}
                          alt={`Version from ${version.date}`}
                          className="tw-h-16 tw-w-24 tw-object-cover tw-rounded-md"
                        />
                      </div>
                    )}
                    <div>
                      <div className="tw-flex tw-items-center tw-space-x-2">
                        <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                          Version from {version.date}
                        </span>
                        {getStatusBadge(version.status)}
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
                    {version.status === "rejected" && (
                      <>
                        <button
                          onClick={() => setEditingVersion(version)}
                          className="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-text-sm tw-font-medium tw-rounded-md tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
                        >
                          <Edit className="tw-w-4 tw-h-4 tw-mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => setShowConfirmDelete(version.id)}
                          className="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-border tw-border-red-300 tw-text-sm tw-font-medium tw-rounded-md tw-text-red-700 tw-bg-white hover:tw-bg-red-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-red-500"
                        >
                          <Trash2 className="tw-w-4 tw-h-4 tw-mr-1" />
                          Discard
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <LivePostSection version={version} />
              </div>

              {showConfirmDelete === version.id && (
                <div className="tw-p-4 tw-bg-red-50 tw-border-t tw-border-red-100">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <p className="tw-text-sm tw-text-red-700">
                      Are you sure you want to discard this content? This action
                      cannot be undone.
                    </p>
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <button
                        onClick={() => setShowConfirmDelete(null)}
                        className="tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          console.log("Discarding version:", version.id);
                          setShowConfirmDelete(null);
                        }}
                        className="tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-white tw-bg-red-600 tw-rounded-md hover:tw-bg-red-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-red-500"
                      >
                        Confirm Discard
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      <CreatePostDrawer
        isOpen={isCreatePostDrawerOpen}
        onClose={() => setIsCreatePostDrawerOpen(false)}
        onSubmit={handleCreatePost}
      />

      <CampaignDrawer
        isOpen={!!editingVersion}
        onClose={() => setEditingVersion(null)}
        title="Edit Content"
        description="Update content details"
        dueDate="Mar 31, 2024"
        payout="$300"
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
