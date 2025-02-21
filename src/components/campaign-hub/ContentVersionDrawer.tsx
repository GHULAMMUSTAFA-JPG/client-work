import React from "react";
import {
  X,
  MessageSquare,
  Building2,
  User,
  Clock,
  ExternalLink,
  Eye,
  Heart,
  MousePointer,
  BarChart,
} from "lucide-react";

interface ContentVersion {
  id: string;
  date: string;
  imageUrl?: string;
  status: "approved" | "rejected" | "pending" | "draft";
  feedback?: string[];
  livePostLink?: string;
  postType: string;
  metrics?: {
    impressions: number;
    clicks: number;
    engagement: number;
    lastUpdated: string;
  };
}

interface ContentVersionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  version: ContentVersion;
}

export function ContentVersionDrawer({
  isOpen,
  onClose,
  version,
}: ContentVersionDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden">
      <div
        className="tw-absolute tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"
        onClick={onClose}
      />

      <div className="tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10">
        <div className="tw-w-screen tw-max-w-md">
          <div className="tw-flex tw-h-full tw-flex-col tw-bg-white tw-shadow-xl">
            {/* Header */}
            <div className="tw-px-6 tw-py-6 tw-border-b tw-border-gray-200">
              <div className="tw-flex tw-items-center tw-justify-between">
                <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                  Content Details
                </h2>
                <button
                  onClick={onClose}
                  className="tw-rounded-md tw-text-gray-400 hover:tw-text-gray-500"
                >
                  <X className="tw-h-6 tw-w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="tw-flex-1 tw-overflow-y-auto">
              <div className="tw-p-6 tw-space-y-6">
                {/* Content Preview */}
                <div>
                  <h3 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                    Content Preview
                  </h3>
                  <div className="tw-space-y-4">
                    {/* Example images - replace with actual content */}
                    <img
                      src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800"
                      alt="Content preview 1"
                      className="tw-w-full tw-rounded-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800"
                      alt="Content preview 2"
                      className="tw-w-full tw-rounded-lg"
                    />
                  </div>
                </div>

                {/* Buyer Information */}
                <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-space-y-4">
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <Building2 className="tw-w-5 tw-h-5 tw-text-gray-400" />
                    <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                      Modern Home Inc.
                    </span>
                  </div>
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <User className="tw-w-5 tw-h-5 tw-text-gray-400" />
                    <span className="tw-text-sm tw-text-gray-600">
                      John Doe (Campaign Manager)
                    </span>
                  </div>
                  <div className="tw-flex tw-items-center tw-space-x-2">
                    <Clock className="tw-w-5 tw-h-5 tw-text-gray-400" />
                    <span className="tw-text-sm tw-text-gray-600">
                      Submitted on {version.date}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                {version.metrics && (
                  <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200">
                    <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-4">
                      Performance Metrics
                    </h3>
                    <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                      <div className="tw-space-y-1">
                        <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                          <Eye className="tw-w-4 tw-h-4 tw-mr-1" />
                          Impressions
                        </div>
                        <p className="tw-text-lg tw-font-medium tw-text-gray-900">
                          {version.metrics.impressions.toLocaleString()}
                        </p>
                      </div>
                      <div className="tw-space-y-1">
                        <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                          <MousePointer className="tw-w-4 tw-h-4 tw-mr-1" />
                          Clicks
                        </div>
                        <p className="tw-text-lg tw-font-medium tw-text-gray-900">
                          {version.metrics.clicks.toLocaleString()}
                        </p>
                      </div>
                      <div className="tw-space-y-1">
                        <div className="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                          <Heart className="tw-w-4 tw-h-4 tw-mr-1" />
                          Engagement
                        </div>
                        <p className="tw-text-lg tw-font-medium tw-text-gray-900">
                          {version.metrics.engagement}%
                        </p>
                      </div>
                    </div>
                    <p className="tw-mt-4 tw-text-xs tw-text-gray-500">
                      Last updated: {version.metrics.lastUpdated}
                    </p>
                  </div>
                )}

                {/* Comments Section */}
                <div>
                  <h3 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-4">
                    Buyer Comments
                  </h3>
                  <div className="tw-space-y-4">
                    <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg">
                      <div className="tw-flex tw-items-start tw-space-x-3">
                        <div className="tw-flex-shrink-0">
                          <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-gray-300 tw-flex tw-items-center tw-justify-center">
                            <User className="tw-w-5 tw-h-5 tw-text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <div className="tw-flex tw-items-center tw-space-x-2">
                            <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                              John Doe
                            </span>
                            <span className="tw-text-xs tw-text-gray-500">
                              2 hours ago
                            </span>
                          </div>
                          <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
                            Great work on the composition! The lighting really
                            makes the product stand out.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg">
                      <div className="tw-flex tw-items-start tw-space-x-3">
                        <div className="tw-flex-shrink-0">
                          <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-gray-300 tw-flex tw-items-center tw-justify-center">
                            <User className="tw-w-5 tw-h-5 tw-text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <div className="tw-flex tw-items-center tw-space-x-2">
                            <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                              Sarah Smith
                            </span>
                            <span className="tw-text-xs tw-text-gray-500">
                              1 day ago
                            </span>
                          </div>
                          <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
                            The messaging aligns perfectly with our brand
                            guidelines. Ready for publishing!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Post Link */}
                {version.livePostLink && (
                  <div className="tw-bg-green-50 tw-p-4 tw-rounded-lg">
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <span className="tw-text-sm tw-font-medium tw-text-green-800">
                        Live Post
                      </span>
                      <a
                        href={version.livePostLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw-flex tw-items-center tw-text-sm tw-text-green-700 hover:tw-text-green-800"
                      >
                        View Post
                        <ExternalLink className="tw-w-4 tw-h-4 tw-ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
              <button
                onClick={onClose}
                className="tw-w-full tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
