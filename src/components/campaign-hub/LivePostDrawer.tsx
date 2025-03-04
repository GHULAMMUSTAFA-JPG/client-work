import React, { useState } from "react";
import { X, Link as LinkIcon, ExternalLink, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { addCampaignLiveLink } from "@/@api/campaign";

interface LivePostDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  campaignId: string;
  creatorId: string;
  postId: string;
}

export function LivePostDrawer({
  isOpen,
  onClose,
  onSubmit,
  campaignId,
  creatorId,
  postId,
}: LivePostDrawerProps) {
  const [postUrl, setPostUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!postUrl) {
      setError("Please enter a valid LinkedIn post URL");
      setIsSubmitting(false);
      return;
    }

    if (!postUrl.includes("linkedin.com")) {
      setError("Please enter a valid LinkedIn post URL");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await addCampaignLiveLink({
        campaign_id: campaignId,
        creator_id: creatorId,
        post_id: postId,
        live_link: postUrl,
      });

      if (response) {
        onSubmit();
        setPostUrl("");
        setError("");
      } else {
        setError("Failed to submit LinkedIn post URL");
      }
    } catch (error) {
      setError("An error occurred while submitting the post URL");
      console.error("Error submitting post URL:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                  <LinkIcon className="tw-w-6 tw-h-6 tw-text-[#0A66C2]" />
                  <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                    Add Live Post Link
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
              <form onSubmit={handleSubmit} className="tw-p-6 tw-space-y-6">
                <div>
                  <label
                    htmlFor="post-url"
                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                  >
                    LinkedIn Post URL
                  </label>
                  <div className="tw-mt-1 tw-relative tw-rounded-md tw-shadow-sm">
                    <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-3 tw-flex tw-items-center tw-pointer-events-none">
                      <LinkIcon className="tw-h-5 tw-w-5 tw-text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="post-url"
                      value={postUrl}
                      onChange={(e) => {
                        setPostUrl(e.target.value);
                        setError("");
                      }}
                      className={`tw-block tw-w-full tw-pl-10 tw-pr-12 tw-py-2 tw-border ${
                        error ? "tw-border-red-300" : "tw-border-gray-300"
                      } tw-rounded-md tw-focus:outline-none tw-focus:ring-[#0A66C2] tw-focus:border-[#0A66C2]`}
                      placeholder="https://www.linkedin.com/posts/..."
                    />
                    <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-pr-3 tw-flex tw-items-center">
                      <ExternalLink className="tw-h-5 tw-w-5 tw-text-gray-400" />
                    </div>
                  </div>
                  {error && (
                    <p className="tw-mt-2 tw-text-sm tw-text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                <div className="tw-bg-[#0A66C2]/5 tw-rounded-lg tw-p-4 tw-border tw-border-[#0A66C2]/10">
                  <div className="tw-flex">
                    <AlertCircle className="tw-h-5 tw-w-5 tw-text-[#0A66C2] tw-mt-0.5 tw-mr-2" />
                    <div>
                      <h4 className="tw-text-sm tw-font-medium tw-text-[#0A66C2]">
                        Important Note
                      </h4>
                      <p className="tw-mt-1 tw-text-sm tw-text-gray-600">
                        Please ensure your post is publicly visible and the URL
                        is correct. The link should be to a specific LinkedIn
                        post, not your profile or company page.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
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
                  disabled={isSubmitting}
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-green-600 hover:tw-bg-green-700 tw-rounded-md tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-offset-2 tw-focus:ring-green-500 disabled:tw-opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Post Link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
