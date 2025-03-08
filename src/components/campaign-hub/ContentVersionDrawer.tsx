import React from "react";
import { X, ExternalLink } from "lucide-react";
import { Version } from "./ContentVersions";
import { PostViewer } from "../shared/PostViewer";
import { Status } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface ContentVersionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  version: Version;
}

export function ContentVersionDrawer({
  isOpen,
  onClose,
  version,
}: ContentVersionDrawerProps) {
  if (!isOpen) return null;

  // Transform Version data to ViewerPost format
  const viewerPost = {
    id: version.id,
    type: version.postType,
    status: (() => {
      switch (version.status) {
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
    submittedOn: version.date,
    author: {
      name: "Content Creator",
      role: "Creator",
      avatar: "/assets/images/user1.jpg",
    },
    content: version.description || "",
    image: version.media?.[0],
    timestamp: version.date,
    engagement: {
      likes: version.metrics?.impressions || 0,
      comments: version.metrics?.clicks || 0,
      shares: version.metrics?.engagement || 0,
    },
  };

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden">
      <div
        className="tw-absolute tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"
        onClick={onClose}
      />

      <div className="tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10">
        <div className="tw-w-screen tw-max-w-2xl">
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

            <div className="tw-flex-1 tw-overflow-y-auto">
              <div className="tw-p-6">
                <PostViewer post={viewerPost} preview={true} />

                {/* Feedback Section */}
                {version.feedback && (
                  <div className="tw-mt-6">
                    <h3 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-4">
                      Feedback
                    </h3>
                    <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg">
                      <p className="tw-text-sm tw-text-gray-600">
                        {version.feedback}
                      </p>
                    </div>
                  </div>
                )}

                {/* Live Post Link */}
                {version.livePostLink && (
                  <div className="tw-mt-6 tw-bg-green-50 tw-p-4 tw-rounded-lg">
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
