import React, { useState, useRef, useEffect } from "react";
import {
  X,
  BarChart2,
  Eye,
  MousePointer,
  AlertCircle,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import {
  addCampaignPostImpressions,
  addCampaignLiveLink,
} from "@/@api/campaign";
import Link from "next/link";
import Image from "next/image";

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
  campaignId: string;
  creatorId: string;
  linkedinPostUrl: string;
  embeddedLink?: string;
  onSubmit: () => void;
  initialImpressions?: {
    impressions: number;
    clicks: number;
    engagement: number;
    comments: number;
    shares: number;
  };
}

export function ImpressionsDrawer({
  isOpen,
  onClose,
  postId,
  campaignId,
  creatorId,
  onSubmit,
  linkedinPostUrl: propLinkedinPostUrl,
  embeddedLink: propEmbeddedLink,
  initialImpressions,
}: ImpressionsDrawerProps) {
  const initialLinkedinPostUrlRef = useRef(propLinkedinPostUrl || "");
  const initialEmbeddedLinkRef = useRef(propEmbeddedLink || "");
  const [impressionsData, setImpressionsData] = useState<ImpressionsData>(
    initialImpressions || {
      impressions: 0,
      clicks: 0,
      engagement: 0,
      comments: 0,
      shares: 0,
    }
  );
  const [linkedinPostUrl, setLinkedinPostUrl] = useState<string>(
    propLinkedinPostUrl || ""
  );
  const [embeddedLink, setEmbeddedLink] = useState<string>(
    propEmbeddedLink || ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [isEditingEmbeddedLink, setIsEditingEmbeddedLink] = useState(false);
  const [urlError, setUrlError] = useState<string>("");
  const [embeddedLinkError, setEmbeddedLinkError] = useState<string>("");
  const [isSavingUrl, setIsSavingUrl] = useState(false);
  const [isSavingEmbeddedLink, setIsSavingEmbeddedLink] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const [urlValidationAttempted, setUrlValidationAttempted] = useState(false);
  const [embeddedLinkValidationAttempted, setEmbeddedLinkValidationAttempted] =
    useState(false);

  const [proofImage, setProofImage] = useState<File | null>(null);
  const [proofImagePreview, setProofImagePreview] = useState<string | null>(
    null
  );
  const [proofImageUrl, setProofImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLinkedinPostUrl(propLinkedinPostUrl || "");
      setEmbeddedLink(propEmbeddedLink || "");
      initialLinkedinPostUrlRef.current = propLinkedinPostUrl || "";
      initialEmbeddedLinkRef.current = propEmbeddedLink || "";
      setFormSubmitAttempted(false);
      setIsFormValid(true);
      setError("");
      setUrlError("");
      setEmbeddedLinkError("");
      setIsEditingUrl(false);
      setIsEditingEmbeddedLink(false);
      setUrlValidationAttempted(false);
      setEmbeddedLinkValidationAttempted(false);
      setImpressionsData(
        initialImpressions || {
          impressions: 0,
          clicks: 0,
          engagement: 0,
          comments: 0,
          shares: 0,
        }
      );
      setProofImage(null);
      setProofImagePreview(null);
      setProofImageUrl("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isOpen, propLinkedinPostUrl, propEmbeddedLink, initialImpressions]);

  useEffect(() => {
    const isUrlInvalid =
      (isEditingUrl && (!linkedinPostUrl || linkedinPostUrl.trim() === "")) ||
      !!urlError;

    const isEmbeddedLinkInvalid = isEditingEmbeddedLink && !!embeddedLinkError;

    const hasValuesChanged =
      impressionsData.impressions !== (initialImpressions?.impressions || 0) ||
      impressionsData.clicks !== (initialImpressions?.clicks || 0) ||
      impressionsData.engagement !== (initialImpressions?.engagement || 0) ||
      impressionsData.comments !== (initialImpressions?.comments || 0) ||
      impressionsData.shares !== (initialImpressions?.shares || 0);

    const areRequiredFieldsMissing = impressionsData.impressions <= 0;
    const isProofMissing = !proofImagePreview && !proofImageUrl;
    const isInvalid =
      isUrlInvalid ||
      isEmbeddedLinkInvalid ||
      areRequiredFieldsMissing ||
      isProofMissing ||
      !hasValuesChanged;

    setIsFormValid(!isInvalid);
  }, [
    isEditingUrl,
    linkedinPostUrl,
    urlError,
    isEditingEmbeddedLink,
    embeddedLinkError,
    impressionsData,
    proofImagePreview,
    proofImageUrl,
    initialImpressions,
  ]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof ImpressionsData, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value) || 0;
      setImpressionsData((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProofImageUrl("");
    }
  };

  const removeProofImage = () => {
    setProofImage(null);
    setProofImagePreview(null);
    setProofImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitAttempted(true);

    const hasValuesChanged =
      impressionsData.impressions !== (initialImpressions?.impressions || 0) ||
      impressionsData.clicks !== (initialImpressions?.clicks || 0) ||
      impressionsData.engagement !== (initialImpressions?.engagement || 0) ||
      impressionsData.comments !== (initialImpressions?.comments || 0) ||
      impressionsData.shares !== (initialImpressions?.shares || 0);

    if (!hasValuesChanged) {
      setError("Please update at least one metric value before submitting.");
      return;
    }

    if (!proofImagePreview && !proofImageUrl) {
      setError("Please upload a proof image of your LinkedIn analytics.");
      return;
    }

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        campaign_id: campaignId,
        creator_id: creatorId,
        post_id: postId,
        impressions: impressionsData.impressions,
        reactions: impressionsData.clicks,
        engagements: impressionsData.engagement,
        comments: impressionsData.comments,
        reposts: impressionsData.shares,
        impressions_proof: proofImage || proofImageUrl || "",
      };

      const response = await addCampaignPostImpressions(payload);

      if (response?.success) {
        setImpressionsData({
          impressions: 0,
          clicks: 0,
          engagement: 0,
          comments: 0,
          shares: 0,
        });
        setProofImage(null);
        setProofImagePreview(null);
        setProofImageUrl("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onSubmit();
      } else {
        setError(
          `${response?.message} ${
            Array.isArray(response?.discrepancies) &&
            response.discrepancies.length > 0
              ? response.discrepancies.join(", ")
              : ""
          }` ||
            "LinkedIn metrics verification failed. The screenshot does not contain any LinkedIn post analytics metrics that can be validated."
        );
      }
    } catch (error: any) {
      let errorMessage = "Failed to update post metrics. Please try again.";

      if (error?.response?.data) {
        const errorData = error.response.data;

        if (errorData.message) {
          errorMessage = errorData.message;

          if (errorData.details) {
            errorMessage += `\n\n${errorData.details}`;
          }

          if (errorData.discrepancies && errorData.discrepancies.length > 0) {
            errorMessage += `\n\n${errorData.discrepancies
              .map((d: string) => `• ${d}`)
              .join("\n")}`;
          }
        } else if (errorData.detail) {
          const errorDetails = errorData.detail;
          errorMessage = `Validation error: ${errorDetails
            .map((err: any) => `${err.msg} for ${err.loc[err.loc.length - 1]}`)
            .join(", ")}`;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      console.error("Error updating post metrics:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const savePostLinks = async () => {
    setUrlValidationAttempted(true);

    if (!linkedinPostUrl || linkedinPostUrl.trim() === "") {
      setUrlError("LinkedIn URL cannot be empty");
      return;
    }

    if (!linkedinPostUrl.includes("linkedin.com")) {
      setUrlError("Please enter a valid LinkedIn URL");
      return;
    }

    try {
      setIsSavingUrl(true);
      setIsSavingEmbeddedLink(true);

      await addCampaignLiveLink({
        campaign_id: campaignId,
        creator_id: creatorId,
        post_id: postId,
        live_link: linkedinPostUrl,
        embeded_link: embeddedLink,
      });

      initialLinkedinPostUrlRef.current = linkedinPostUrl;
      initialEmbeddedLinkRef.current = embeddedLink;

      setUrlError("");
      setEmbeddedLinkError("");
      setIsEditingUrl(false);
      setIsEditingEmbeddedLink(false);
      setUrlValidationAttempted(false);
      setEmbeddedLinkValidationAttempted(false);
    } catch (error) {
      setUrlError("Failed to update LinkedIn URL");
      console.error("Error updating LinkedIn URL:", error);
    } finally {
      setIsSavingUrl(false);
      setIsSavingEmbeddedLink(false);
    }
  };

  const renderLinkedInPostSection = () => {
    const hasChanges =
      linkedinPostUrl !== initialLinkedinPostUrlRef.current ||
      embeddedLink !== initialEmbeddedLinkRef.current;

    return (
      <div className="tw-mb-6 tw-p-4 tw-bg-white tw-rounded-lg tw-border tw-border-gray-200">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
          <h3 className="tw-text-sm tw-font-medium tw-text-gray-900">
            LinkedIn Post
          </h3>
          <button
            onClick={() => {
              setIsEditingUrl(true);
              setIsEditingEmbeddedLink(true);
              setLinkedinPostUrl(
                linkedinPostUrl || initialLinkedinPostUrlRef.current || ""
              );
              setEmbeddedLink(
                embeddedLink || initialEmbeddedLinkRef.current || ""
              );
            }}
            className="tw-text-sm tw-text-[#0A66C2] hover:tw-text-[#0A66C2]/80"
          >
            Edit
          </button>
        </div>

        {isEditingUrl || isEditingEmbeddedLink ? (
          <div className="tw-space-y-5">
            <div className="tw-bg-white tw-p-3 tw-rounded-md tw-border tw-border-gray-200">
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                <div className="tw-flex tw-items-center">
                  <LinkIcon className="tw-w-4 tw-h-4 tw-mr-2 tw-text-[#0A66C2]" />
                  LinkedIn Post URL
                </div>
              </label>
              <input
                type="url"
                value={linkedinPostUrl}
                onChange={(e) => setLinkedinPostUrl(e.target.value)}
                placeholder="Enter LinkedIn post URL"
                className={`tw-w-full tw-px-3 tw-py-2 tw-border ${
                  urlError && urlValidationAttempted
                    ? "tw-border-red-500 tw-ring-1 tw-ring-red-500"
                    : "tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-[#0A66C2]/40"
                } tw-rounded-md focus:tw-border-[#0A66C2] tw-transition-all tw-duration-200 tw-bg-gray-50 hover:tw-bg-white focus:tw-bg-white`}
              />
              {urlError && urlValidationAttempted && (
                <p className="tw-mt-1 tw-text-sm tw-text-red-600 tw-flex tw-items-center">
                  <AlertCircle className="tw-w-3 tw-h-3 tw-mr-1 tw-flex-shrink-0" />
                  {urlError}
                </p>
              )}
            </div>

            <div className="tw-bg-white tw-p-3 tw-rounded-md tw-border tw-border-gray-200">
              <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                <div className="tw-flex tw-items-center">
                  <ExternalLink className="tw-w-4 tw-h-4 tw-mr-2 tw-text-[#0A66C2]" />
                  Embedded Link
                </div>
              </label>
              <textarea
                value={embeddedLink}
                onChange={(e) => setEmbeddedLink(e.target.value)}
                placeholder="Enter embedded link URL"
                rows={3}
                className={`tw-w-full tw-px-3 tw-py-2 tw-border ${
                  embeddedLinkError && embeddedLinkValidationAttempted
                    ? "tw-border-red-500 tw-ring-1 tw-ring-red-500"
                    : "tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-[#0A66C2]/40"
                } tw-rounded-md focus:tw-border-[#0A66C2] tw-transition-all tw-duration-200 tw-bg-gray-50 hover:tw-bg-white focus:tw-bg-white tw-resize-none`}
              />
              {embeddedLinkError && embeddedLinkValidationAttempted && (
                <p className="tw-mt-1 tw-text-sm tw-text-red-600 tw-flex tw-items-center">
                  <AlertCircle className="tw-w-3 tw-h-3 tw-mr-1 tw-flex-shrink-0" />
                  {embeddedLinkError}
                </p>
              )}
            </div>

            <div className="tw-flex tw-justify-end tw-space-x-3 tw-mt-4">
              <button
                onClick={() => {
                  setLinkedinPostUrl(initialLinkedinPostUrlRef.current || "");
                  setEmbeddedLink(initialEmbeddedLinkRef.current || "");
                  setIsEditingUrl(false);
                  setIsEditingEmbeddedLink(false);
                  setUrlError("");
                  setEmbeddedLinkError("");
                }}
                disabled={isSavingUrl || isSavingEmbeddedLink}
                className="tw-text-sm tw-text-red-600 hover:tw-text-red-700 tw-flex tw-items-center disabled:tw-opacity-50 tw-transition-colors"
              >
                <X className="tw-w-4 tw-h-4 tw-mr-1" />
                Cancel
              </button>
              <button
                onClick={savePostLinks}
                disabled={
                  isSavingUrl ||
                  isSavingEmbeddedLink ||
                  !hasChanges ||
                  !!urlError ||
                  !!embeddedLinkError
                }
                className={`tw-text-sm tw-flex tw-items-center tw-transition-colors ${
                  !hasChanges || !!urlError || !!embeddedLinkError
                    ? "tw-text-gray-400 tw-cursor-not-allowed"
                    : "tw-text-green-600 hover:tw-text-green-700"
                } disabled:tw-opacity-50`}
              >
                {isSavingUrl || isSavingEmbeddedLink ? (
                  <span className="tw-flex tw-items-center">
                    <div className="tw-animate-spin tw-rounded-full tw-h-3 tw-w-3 tw-border-t-2 tw-border-b-2 tw-border-green-600 tw-mr-2"></div>
                    Saving...
                  </span>
                ) : (
                  <>
                    <Check className="tw-w-4 tw-h-4 tw-mr-1" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="tw-mt-2">
            <Link
              href={linkedinPostUrl || initialLinkedinPostUrlRef.current || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-flex tw-items-center tw-text-[#0A66C2] hover:tw-underline"
            >
              <Eye className="tw-h-4 tw-w-4 tw-mr-2" />
              View Post
              <ExternalLink className="tw-h-3.5 tw-w-3.5 tw-ml-1.5 tw-opacity-70" />
            </Link>
          </div>
        )}
      </div>
    );
  };

  const renderErrorMessage = () => {
    if (!error) return null;

    return (
      <div className="tw-mb-4 tw-p-3 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-md tw-text-red-600 tw-flex tw-items-start">
        <AlertCircle className="tw-w-5 tw-h-5 tw-mr-2 tw-flex-shrink-0 tw-mt-0.5" />
        <div>
          <p className="tw-font-medium">Error</p>
          <div className="tw-text-sm tw-whitespace-pre-line">{error}</div>
        </div>
      </div>
    );
  };

  const hasValuesChanged =
    impressionsData.impressions !== (initialImpressions?.impressions || 0) ||
    impressionsData.clicks !== (initialImpressions?.clicks || 0) ||
    impressionsData.engagement !== (initialImpressions?.engagement || 0) ||
    impressionsData.comments !== (initialImpressions?.comments || 0) ||
    impressionsData.shares !== (initialImpressions?.shares || 0);

  const renderProofImageUploader = () => (
    <div
      className={`tw-border-2 tw-border-dashed ${
        formSubmitAttempted &&
        !isFormValid &&
        !proofImagePreview &&
        !proofImageUrl
          ? "tw-border-red-300"
          : "tw-border-gray-300"
      } tw-rounded-lg tw-p-4`}
    >
      {proofImagePreview ? (
        <div className="tw-relative">
          <div className="tw-relative tw-w-full tw-h-64 tw-max-h-64 tw-flex tw-items-center tw-justify-center tw-bg-gray-50 tw-overflow-hidden">
            <Image
              src={proofImagePreview}
              alt="Proof of impressions"
              width={400}
              height={250}
              style={{ objectFit: "contain" }}
              className="tw-rounded-md tw-max-w-full tw-max-h-64"
            />
          </div>

          <button
            type="button"
            onClick={removeProofImage}
            className="tw-absolute tw-top-2 tw-right-2 tw-bg-red-600 tw-text-white tw-rounded-full tw-p-1 hover:tw-bg-red-700"
            disabled={isSubmitting}
          >
            <X className="tw-h-4 tw-w-4" />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="tw-mt-2 tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
            disabled={isSubmitting}
          >
            <Upload className="tw-h-4 tw-w-4 tw-mr-2" />
            Replace Image
          </button>
        </div>
      ) : (
        <div className="tw-text-center">
          <ImageIcon className="tw-mx-auto tw-h-12 tw-w-12 tw-text-gray-400" />
          <div className="tw-mt-2">
            <label
              htmlFor="file-upload"
              className={`tw-cursor-pointer tw-text-[#0A66C2] hover:tw-text-[#0A66C2]/80 ${
                isSubmitting ? "tw-opacity-50 tw-pointer-events-none" : ""
              }`}
            >
              <span>Upload a screenshot</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="tw-sr-only"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                disabled={isSubmitting}
              />
            </label>
            <p className="tw-text-xs tw-text-gray-500 tw-mt-1">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
          <p className="tw-text-xs tw-text-gray-500 tw-mt-2">
            Upload a screenshot of your LinkedIn analytics as proof of
            impressions
          </p>
        </div>
      )}
    </div>
  );

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

            {/* Content */}
            <div className="tw-flex-1 tw-overflow-y-auto">
              <div className="tw-p-6">
                {renderLinkedInPostSection()}

                <div className="tw-mb-6">
                  <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-2">
                    Reactions
                  </h3>
                  <div className="tw-h-px tw-bg-gray-200 tw-w-full"></div>
                </div>

                {renderErrorMessage()}

                <form
                  onSubmit={handleSubmit}
                  className="tw-space-y-6 tw-relative"
                >
                  {isSubmitting && (
                    <div className="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-70 tw-z-10 tw-flex tw-items-center tw-justify-center">
                      <div className="tw-flex tw-flex-col tw-items-center">
                        <div className="tw-animate-spin tw-rounded-full tw-h-10 tw-w-10 tw-border-t-2 tw-border-b-2 tw-border-[#0A66C2]"></div>
                        <p className="tw-mt-3 tw-text-sm tw-font-medium tw-text-gray-700">
                          Updating metrics...
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Metrics inputs */}
                  <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <Eye className="tw-w-4 tw-h-4 tw-text-gray-400" />
                          <span>
                            Impressions{" "}
                            <span className="tw-text-red-500">*</span>
                          </span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={impressionsData.impressions}
                        onChange={(e) =>
                          handleInputChange("impressions", e.target.value)
                        }
                        className={`tw-w-full tw-px-3 tw-py-2 tw-border ${
                          formSubmitAttempted &&
                          !isFormValid &&
                          impressionsData.impressions <= 0
                            ? "tw-border-red-500"
                            : "tw-border-gray-300"
                        } tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]`}
                        inputMode="decimal"
                      />
                      {formSubmitAttempted &&
                        !isFormValid &&
                        impressionsData.impressions <= 0 && (
                          <p className="tw-mt-1 tw-text-xs tw-text-red-600">
                            Impressions are required
                          </p>
                        )}
                    </div>

                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <MousePointer className="tw-w-4 tw-h-4 tw-text-gray-400" />
                          <span>Reactions</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={impressionsData.clicks}
                        onChange={(e) =>
                          handleInputChange("clicks", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        inputMode="decimal"
                      />
                    </div>

                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        Comments
                      </label>
                      <input
                        type="text"
                        value={impressionsData.comments}
                        onChange={(e) =>
                          handleInputChange("comments", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        inputMode="decimal"
                      />
                    </div>

                    <div className="tw-space-y-2">
                      <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                        Reposts
                      </label>
                      <input
                        type="text"
                        value={impressionsData.shares}
                        onChange={(e) =>
                          handleInputChange("shares", e.target.value)
                        }
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]"
                        inputMode="decimal"
                      />
                    </div>
                  </div>

                  <div className="tw-mt-6">
                    <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-mb-3">
                      Proof of Impressions{" "}
                      <span className="tw-text-red-500">*</span>
                    </h3>
                    {renderProofImageUploader()}
                  </div>

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
                          <li>• Upload a screenshot of analytics as proof</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
              <div className="tw-flex tw-flex-col">
                <div className="tw-flex tw-justify-end tw-space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSubmit();
                    }}
                    className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-primary hover:tw-text-primary-dark tw-border tw-border-primary hover:tw-bg-primary/5 tw-rounded-md"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid}
                    className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-green-600 hover:tw-bg-green-700 tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-green-500 disabled:tw-opacity-70 tw-min-w-[120px] tw-flex tw-items-center tw-justify-center"
                  >
                    {isSubmitting ? (
                      <span className="tw-flex tw-items-center">
                        <div className="tw-animate-spin tw-rounded-full tw-h-4 tw-w-4 tw-border-t-2 tw-border-b-2 tw-border-white tw-mr-2"></div>
                        Updating...
                      </span>
                    ) : (
                      "Update Metrics"
                    )}
                  </button>
                </div>

                {formSubmitAttempted && !isFormValid && !isSubmitting && (
                  <p className="tw-text-xs tw-text-red-500 tw-mt-2 tw-text-center">
                    {!proofImagePreview && !proofImageUrl
                      ? "Please upload a proof image of your LinkedIn analytics"
                      : impressionsData.impressions <= 0
                      ? "Please enter valid impressions"
                      : !hasValuesChanged
                      ? "Please update at least one metric value"
                      : "Please fill in all required fields marked with * and complete any editing in progress"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
