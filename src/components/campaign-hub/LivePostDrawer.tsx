import React, { useState, useEffect } from "react";
import {
  X,
  Link as LinkIcon,
  ExternalLink,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { addCampaignLiveLink } from "@/@api/campaign";
import { isValidEmbedCode, isValidLinkedInUrl } from "@/utils";

interface LivePostDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  campaignId: string;
  creatorId: string;
  postId: string;
  initialPostUrl?: string;
  initialEmbedLink?: string;
}

export function LivePostDrawer({
  isOpen,
  onClose,
  onSubmit,
  campaignId,
  creatorId,
  postId,
  initialPostUrl = "",
  initialEmbedLink = "",
}: LivePostDrawerProps) {
  const [postUrl, setPostUrl] = useState(initialPostUrl);
  const [embedLink, setEmbedLink] = useState(initialEmbedLink);
  const [error, setError] = useState("");
  const [embedError, setEmbedError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update state when initial values change or drawer opens
  useEffect(() => {
    if (isOpen) {
      setPostUrl(initialPostUrl);
      setEmbedLink(initialEmbedLink);
      setError("");
      setEmbedError("");
    }
  }, [isOpen, initialPostUrl, initialEmbedLink]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setEmbedError("");
    if (!isValidLinkedInUrl(postUrl)) {
      setError(
        "Please enter a valid LinkedIn post URL (must be a direct link to a post)"
      );
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmbedCode(embedLink)) {
      setEmbedError(
        "Please enter a valid LinkedIn embed code containing an iframe with the correct format"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await addCampaignLiveLink({
        campaign_id: campaignId,
        creator_id: creatorId,
        post_id: postId,
        live_link: postUrl,
        embeded_link: embedLink,
      });

      if (response) {
        onSubmit();
        setError("");
        setEmbedError("");
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

            <div className="tw-flex-1 tw-overflow-y-auto ">
              <form onSubmit={handleSubmit} className="tw-p-6 tw-space-y-6">
                <div>
                  <label
                    htmlFor="post-url"
                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                  >
                    LinkedIn Post URL
                    <div className="tw-relative tw-ml-2 tw-group tw-inline-block 0">
                      <HelpCircle className="tw-h-4 tw-w-4 tw-text-gray-400 hover:tw-text-gray-600 tw-cursor-help" />
                      <div className="tw-hidden group-hover:tw-block tw-absolute tw-z-50 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-top-full  tw-w-64 tw-p-2 tw-bg-gray-800 tw-text-white tw-text-xs tw-rounded tw-shadow-lg">
                        <p>
                          Click three dots (…), select 'Copy link to post,' then
                          paste it here.
                        </p>
                        <div className="tw-absolute tw-left-1/2 tw-transform tw--translate-x-1/2 tw-top-full tw--mt-1 tw-border-4 tw-border-transparent tw-border-t-gray-800"></div>
                      </div>
                    </div>
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
                  {postUrl && !isValidLinkedInUrl(postUrl) && !error && (
                    <p className="tw-mt-2 tw-text-sm tw-text-amber-600">
                      URL must be a direct link to a LinkedIn post
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="embed-link"
                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1 tw-flex tw-items-center"
                  >
                    LinkedIn Post Embed Code
                    <div className="tw-relative tw-ml-2 tw-group tw-inline-block">
                      <HelpCircle className="tw-h-4 tw-w-4 tw-text-gray-400 hover:tw-text-gray-600 tw-cursor-help" />
                      <div className="tw-hidden group-hover:tw-block tw-absolute tw-z-50 tw-left-1/2 tw-transform tw--translate-x-1/2 tw-bottom-full tw-mb-2 tw-w-64 tw-p-2 tw-bg-gray-800 tw-text-white tw-text-xs tw-rounded tw-shadow-lg">
                        <p>
                          Click three dots (…), select 'Embed this post,' copy
                          the entire iframe code, and paste it here. The code
                          should look like:
                          <code className="tw-block tw-mt-1 tw-text-xs tw-bg-gray-700 tw-p-1 tw-rounded">
                            &lt;iframe
                            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:..."
                            height="399" width="504"
                            frameborder="0"&gt;&lt;/iframe&gt;
                          </code>
                        </p>
                        <div className="tw-absolute tw-left-1/2 tw-transform tw--translate-x-1/2 tw-top-full tw--mt-1 tw-border-4 tw-border-transparent tw-border-t-gray-800"></div>
                      </div>
                    </div>
                  </label>
                  <textarea
                    id="embedCode"
                    value={embedLink}
                    onChange={(e) => {
                      setEmbedLink(e.target.value);
                      setEmbedError("");
                    }}
                    placeholder='<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:1234567890" height="399" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
                    className={`tw-w-full tw-h-24 tw-px-4 tw-py-2 tw-border ${
                      embedError ? "tw-border-red-300" : "tw-border-gray-300"
                    } tw-rounded-lg tw-focus:tw-ring-2 tw-focus:tw-ring-blue-500 tw-focus:tw-border-transparent tw-resize-none tw-font-mono tw-text-sm`}
                  />
                  {embedError && (
                    <p className="tw-mt-2 tw-text-sm tw-text-red-600">
                      {embedError}
                    </p>
                  )}
                  {embedLink && !isValidEmbedCode(embedLink) && !embedError && (
                    <p className="tw-mt-2 tw-text-sm tw-text-amber-600">
                      Embed code must contain a LinkedIn iframe with src,
                      height, and width attributes
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
                  disabled={
                    isSubmitting ||
                    !isValidLinkedInUrl(postUrl) ||
                    !isValidEmbedCode(embedLink)
                  }
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
