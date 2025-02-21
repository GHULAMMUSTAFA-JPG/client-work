import React, { useState } from "react";
import {
  X,
  BarChart2,
  Eye,
  MousePointer,
  Heart,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface ImpressionsData {
  impressions: number;
  clicks: number;
  engagement: number;
  comments: number;
  shares: number;
}

interface ImpressionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  onSubmit: (data: ImpressionsData) => void;
}

export function ImpressionsDrawer({
  isOpen,
  onClose,
  postId,
  onSubmit,
}: ImpressionsDrawerProps) {
  const [impressionsData, setImpressionsData] = useState<ImpressionsData>({
    impressions: 0,
    clicks: 0,
    engagement: 0,
    comments: 0,
    shares: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(impressionsData);
  };

  const handleInputChange = (field: keyof ImpressionsData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setImpressionsData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden">
      <div
        className="tw-absolute tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"
        onClick={onClose}
      />

      <div className="tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10">
        <div className="tw-w-screen tw-max-w-md">
          <div className="tw-flex tw-h-full tw-flex-col tw-bg-white tw-shadow-xl">
            <div className="tw-px-6 tw-py-6 tw-border-b tw-border-gray-200">
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <BarChart2 className="tw-w-6 tw-h-6 tw-text-[#0A66C2]" />
                  <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                    Update Post Metrics
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="tw-rounded-md tw-text-gray-400 hover:tw-text-gray-500"
                >
                  <X className="tw-h-6 tw-w-6" />
                </button>
              </div>
            </div>

            <div className="tw-flex-1 tw-overflow-y-auto">
              <div className="tw-p-6">
                {/* Post Preview */}
                <div className="tw-mb-6 tw-p-4 tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-200">
                  <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                    <h3 className="tw-text-sm tw-font-medium tw-text-gray-900">
                      LinkedIn Post
                    </h3>
                    <a
                      href={`https://linkedin.com/post/${postId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tw-text-sm tw-text-[#0A66C2] hover:tw-text-[#0A66C2]/80 tw-flex tw-items-center"
                    >
                      View Post
                      <ExternalLink className="tw-w-4 tw-h-4 tw-ml-1" />
                    </a>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-text-gray-500">
                    <span>Post ID: {postId}</span>
                    <button
                      onClick={() => {
                        /* Refresh metrics */
                      }}
                      className="tw-flex tw-items-center tw-text-[#0A66C2] hover:tw-text-[#0A66C2]/80"
                    >
                      <RefreshCw className="tw-w-4 tw-h-4 tw-mr-1" />
                      Refresh Metrics
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="tw-space-y-6">
                  {/* Metrics Grid */}
                  <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <Eye className="tw-w-4 tw-h-4 tw-text-gray-400" />
                          <span>Impressions</span>
                        </div>
                      </label>
                      <input
                        type="number"
                        value={impressionsData.impressions}
                        onChange={(e) =>
                          handleInputChange("impressions", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        min="0"
                      />
                    </div>

                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <MousePointer className="tw-w-4 tw-h-4 tw-text-gray-400" />
                          <span>Clicks</span>
                        </div>
                      </label>
                      <input
                        type="number"
                        value={impressionsData.clicks}
                        onChange={(e) =>
                          handleInputChange("clicks", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        min="0"
                      />
                    </div>

                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <Heart className="tw-w-4 tw-h-4 tw-text-gray-400" />
                          <span>Engagement Rate (%)</span>
                        </div>
                      </label>
                      <input
                        type="number"
                        value={impressionsData.engagement}
                        onChange={(e) =>
                          handleInputChange("engagement", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>

                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        Comments
                      </label>
                      <input
                        type="number"
                        value={impressionsData.comments}
                        onChange={(e) =>
                          handleInputChange("comments", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        min="0"
                      />
                    </div>

                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        Shares
                      </label>
                      <input
                        type="number"
                        value={impressionsData.shares}
                        onChange={(e) =>
                          handleInputChange("shares", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Guidelines */}
                  <div className="tw-p-4 tw-bg-[#0A66C2]/5 tw-rounded-lg tw-border tw-border-[#0A66C2]/10">
                    <div className="tw-flex">
                      <AlertCircle className="tw-h-5 tw-w-5 tw-text-[#0A66C2] tw-mt-0.5 tw-mr-2" />
                      <div>
                        <h4 className="tw-text-sm tw-font-medium tw-text-[#0A66C2]">
                          Metrics Guidelines
                        </h4>
                        <ul className="tw-mt-2 tw-text-sm tw-text-gray-600 tw-space-y-1">
                          <li>• Update metrics at least once every 24 hours</li>
                          <li>
                            • Ensure all numbers are accurate and verifiable
                          </li>
                          <li>• Engagement rate is calculated automatically</li>
                          <li>
                            • Include both organic and paid metrics if
                            applicable
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
              <div className="tw-flex tw-justify-end tw-space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-primary hover:tw-text-primary-dark tw-border tw-border-primary hover:tw-bg-primary/5 tw-rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-green-600 hover:tw-bg-green-700 tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-green-500"
                >
                  Update Metrics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
