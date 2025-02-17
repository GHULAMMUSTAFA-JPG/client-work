"use client";

import { useState } from "react";
import {
  MessageSquare,
  Edit,
  Plus,
  Link,
  ExternalLink,
  BarChart,
  RefreshCw,
  Eye,
  MousePointer,
  Heart,
  RotateCw,
  Trash2,
  AlertTriangle,
  Send,
  HelpCircle,
} from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import { getStatusBadge } from "./utils";
import Image from "next/image";

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

interface MetricTooltip {
  title: string;
  description: string;
}

interface ContentVersionsProps {
  versions: Version[];
  onAddContent: () => void;
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

  const Tooltip = ({ id, content }: { id: string; content: MetricTooltip }) => {
    if (activeTooltip !== id) return null;

    return (
      <div className="position-absolute top-0 start-50 translate-middle-x mt-n4 z-3">
        <div
          className="bg-dark text-white p-3 rounded shadow"
          style={{ width: "16rem" }}
        >
          <div className="position-relative">
            <div
              className="position-absolute start-50 translate-middle-x bottom-0 mb-n2 bg-dark"
              style={{
                width: "1rem",
                height: "1rem",
                transform: "rotate(45deg)",
              }}
            />
            <h4 className="fw-medium mb-1">{content.title}</h4>
            <p className="small text-light mb-0">{content.description}</p>
          </div>
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
      className="position-relative d-flex align-items-center gap-2"
      onMouseEnter={() => setActiveTooltip(tooltipId)}
      onMouseLeave={() => setActiveTooltip(null)}
    >
      <Icon
        className="text-secondary"
        style={{ width: "1rem", height: "1rem" }}
      />
      <span className="small text-secondary">
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
      <HelpCircle
        className="text-secondary cursor-help"
        style={{ width: "0.75rem", height: "0.75rem" }}
      />
      <Tooltip id={tooltipId} content={metricTooltips[tooltipId]} />
    </div>
  );

  const LivePostSection = ({ version }: { version: Version }) => {
    if (version.status !== "approved" || !version.livePostLink) return null;

    return (
      <div
        className="mt-4 p-4 bg-green-50 rounded-lg border border-primary rounded-3"
        style={{ backgroundColor: "#f0fdf4" }}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-5 h-5 text-green-600" />

              <a
                href={version.livePostLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium flex items-center"
              >
                View Published Post
              </a>
            </div>

            {version.metrics && (
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="h6 mb-0 d-flex align-items-center">
                    <BarChart
                      className="me-1"
                      style={{ width: "1rem", height: "1rem" }}
                    />
                    Performance Metrics
                  </h4>
                  <button
                    className="btn btn-link btn-sm p-0 d-flex align-items-center"
                    onClick={() => console.log("Refreshing metrics...")}
                  >
                    <RefreshCw
                      className="me-1"
                      style={{ width: "0.75rem", height: "0.75rem" }}
                    />
                    Refresh
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-4">
                    <MetricDisplay
                      icon={Eye}
                      value={version.metrics.impressions}
                      label="Impressions"
                      tooltipId="impressions"
                    />
                  </div>
                  <div className="col-4">
                    <MetricDisplay
                      icon={MousePointer}
                      value={version.metrics.clicks}
                      label="Clicks"
                      tooltipId="clicks"
                    />
                  </div>
                  <div className="col-4">
                    <MetricDisplay
                      icon={Heart}
                      value={`${version.metrics.engagement}%`}
                      label="Engagement"
                      tooltipId="engagement"
                    />
                  </div>
                </div>

                <p className="text-muted small mt-2 mb-0">
                  Last updated: {version.metrics.lastUpdated}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleResubmit = (versionId: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*,application/pdf";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("Resubmitting file:", file);
      }
    };
    input.click();
  };

  const handleFeedbackSubmit = (versionId: string) => {
    console.log("Submitting feedback for version:", versionId);
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <h2 className="h4 mb-0">Content Versions</h2>
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>
        <AddContentButton onClick={onAddContent} />
      </div>

      <div className="mb-4">
        {versions
          .filter(
            (version) =>
              statusFilter === "all" || version.status === statusFilter
          )
          .map((version) => (
            <div
              key={version.id}
              className={`card mb-3 ${
                version.status === "rejected" ? "border-danger" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-3">
                    {version.imageUrl && (
                      <div style={{ width: "96px", height: "64px" }}>
                        <img
                          src={version.imageUrl}
                          alt={`Version from ${version.date}`}
                          className="img-fluid rounded"
                          style={{
                            width: "96px",
                            height: "64px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="small fw-medium">
                          Version from {version.date}
                        </span>
                        {getStatusBadge(version.status)}
                      </div>
                    </div>
                  </div>

                  {version.status === "rejected" && (
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleResubmit(version.id)}
                        className="btn btn-primary btn-sm d-inline-flex align-items-center"
                      >
                        <RotateCw
                          className="me-1"
                          style={{ width: "1rem", height: "1rem" }}
                        />
                        Re-submit
                      </button>
                      <button
                        onClick={() => setEditingVersion(version)}
                        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                      >
                        <Edit
                          className="me-1"
                          style={{ width: "1rem", height: "1rem" }}
                        />
                        Edit
                      </button>
                      <button
                        onClick={() => setShowConfirmDelete(version.id)}
                        className="btn btn-outline-danger btn-sm d-inline-flex align-items-center"
                      >
                        <Trash2
                          className="me-1"
                          style={{ width: "1rem", height: "1rem" }}
                        />
                        Discard
                      </button>
                    </div>
                  )}
                </div>

                <LivePostSection version={version} />

                {version.feedback && version.feedback.length > 0 && (
                  <div className="mt-4">
                    <div
                      className={`p-3 rounded ${
                        version.status === "rejected" ? "bg-danger-subtle" : ""
                      }`}
                    >
                      <h6 className="mb-2">Feedback from Reviewer:</h6>
                      <div className="mb-3">
                        {version.feedback.map((message, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-start gap-2 mb-2"
                          >
                            {version.status === "rejected" ? (
                              <AlertTriangle
                                className="text-danger mt-1"
                                style={{ width: "1rem", height: "1rem" }}
                              />
                            ) : (
                              <MessageSquare
                                className="text-secondary mt-1"
                                style={{ width: "1rem", height: "1rem" }}
                              />
                            )}
                            <p className="mb-0 small">{message}</p>
                          </div>
                        ))}
                      </div>

                      {version.status === "rejected" && (
                        <div className="mt-3">
                          <div className="d-flex gap-2">
                            <textarea
                              value={feedbackResponse[version.id] || ""}
                              onChange={(e) =>
                                setFeedbackResponse({
                                  ...feedbackResponse,
                                  [version.id]: e.target.value,
                                })
                              }
                              placeholder="Respond to feedback..."
                              className="form-control form-control-sm"
                              style={{ minHeight: "80px" }}
                            />
                            <button
                              onClick={() => handleFeedbackSubmit(version.id)}
                              className="btn btn-primary"
                            >
                              <Send style={{ width: "1rem", height: "1rem" }} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {showConfirmDelete === version.id && (
                <div className="card-footer bg-danger-subtle border-danger-subtle">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 small text-danger">
                      Are you sure you want to discard this content? This action
                      cannot be undone.
                    </p>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => setShowConfirmDelete(null)}
                        className="btn btn-link btn-sm text-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          console.log("Discarding version:", version.id);
                          setShowConfirmDelete(null);
                        }}
                        className="btn btn-danger btn-sm"
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

      <CampaignDrawer
        isOpen={!!editingVersion}
        onClose={() => setEditingVersion(null)}
        title="Edit Content"
        description="Update content details"
        dueDate="Mar 31, 2024"
        payout="$300"
        type="edit"
        postType={editingVersion?.postType}
        initialData={
          editingVersion
            ? {
                ...editingVersion,
                submittedDate: editingVersion.date,
                goLiveDate: editingVersion.date,
                budget: "300",
                status: editingVersion.status,
                type: "post",
              }
            : undefined
        }
      />
    </div>
  );
}

function StatusFilter({
  value,
  onChange,
}: {
  value: Version["status"] | "all";
  onChange: (value: Version["status"] | "all") => void;
}) {
  const statusOptions = [
    { value: "all", label: "All Versions" },
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
    { value: "draft", label: "Draft" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="d-flex align-items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Version["status"] | "all")}
        className="form-select"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function AddContentButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary d-inline-flex align-items-center"
    >
      <Plus className="me-2" style={{ width: "1rem", height: "1rem" }} />
      Add Content
    </button>
  );
}
