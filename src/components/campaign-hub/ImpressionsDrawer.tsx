import React, { useState, useRef } from "react";
import {
  X,
  BarChart2,
  Eye,
  MousePointer,
  Heart,
  AlertCircle,
  ExternalLink,
  Edit2,
  Upload,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import {
  addCampaignPostImpressions,
  addCampaignLiveLink,
} from "@/@api/campaign";
import { uploadFile } from "@/@api/utils";
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
  onSubmit: () => void;
  linkedinPostUrl: string;
}

export function ImpressionsDrawer({
  isOpen,
  onClose,
  postId,
  campaignId,
  creatorId,
  onSubmit,
  linkedinPostUrl: initialLinkedinPostUrl,
}: ImpressionsDrawerProps) {
  const [impressionsData, setImpressionsData] = useState<ImpressionsData>({
    impressions: 0,
    clicks: 0,
    engagement: 0,
    comments: 0,
    shares: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [linkedinPostUrl, setLinkedinPostUrl] = useState<string>(
    initialLinkedinPostUrl || ""
  );
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string>("");
  const [isSavingUrl, setIsSavingUrl] = useState(false);
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [proofImagePreview, setProofImagePreview] = useState<string | null>(
    null
  );
  const [proofImageUrl, setProofImageUrl] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const [urlValidationAttempted, setUrlValidationAttempted] = useState(false);

  React.useEffect(() => {
    const isUrlInvalid =
      (isEditingUrl && (!linkedinPostUrl || linkedinPostUrl.trim() === "")) ||
      !!urlError;

    const areRequiredFieldsMissing = impressionsData.impressions <= 0;
    const isProofMissing = !proofImagePreview && !proofImageUrl;
    const isInvalid =
      isUrlInvalid || areRequiredFieldsMissing || isProofMissing;

    setIsFormValid(!isInvalid);
  }, [
    isEditingUrl,
    linkedinPostUrl,
    urlError,
    impressionsData.impressions,
    proofImagePreview,
    proofImageUrl,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitAttempted(true);

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (proofImage && !proofImageUrl) {
        setIsUploadingImage(true);
        try {
          const url = await uploadFile(proofImage, {
            campaignId,
            postId,
          });

          if (url) {
            setProofImageUrl(url);
          } else {
            setError("Failed to upload image. Please try again.");
            setIsSubmitting(false);
            setIsUploadingImage(false);
            return;
          }
        } catch (error) {
          setError("Error uploading image. Please try again.");
          console.error("Error uploading image:", error);
          setIsSubmitting(false);
          setIsUploadingImage(false);
          return;
        } finally {
          setIsUploadingImage(false);
        }
      }

      const payload = {
        campaign_id: campaignId,
        creator_id: creatorId,
        post_id: postId,
        impressions: impressionsData.impressions,
        clicks: impressionsData.clicks,
        engagement_rate: impressionsData.engagement,
        comments: impressionsData.comments,
        shares: impressionsData.shares,
        impressions_proof: proofImageUrl,
      };

      const response = await addCampaignPostImpressions(payload);

      if (response) {
        onSubmit();
      }
    } catch (error) {
      setError("Failed to update post metrics");
      console.error("Error updating post metrics:", error);
    } finally {
      setIsSubmitting(false);
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

  const toggleEditUrl = () => {
    if (isEditingUrl) {
      setLinkedinPostUrl(initialLinkedinPostUrl || "");
    }
    setIsEditingUrl(!isEditingUrl);
    setUrlError("");
  };

  const saveUrl = async () => {
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
      await addCampaignLiveLink({
        campaign_id: campaignId,
        creator_id: creatorId,
        post_id: postId,
        live_link: linkedinPostUrl,
      });

      setUrlError("");
      setIsEditingUrl(false);
      setUrlValidationAttempted(false);
    } catch (error) {
      setUrlError("Failed to update LinkedIn URL");
      console.error("Error updating LinkedIn URL:", error);
    } finally {
      setIsSavingUrl(false);
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
                <div className="tw-mb-6 tw-p-4 tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-200">
                  <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                    <h3 className="tw-text-sm tw-font-medium tw-text-gray-900">
                      LinkedIn Post
                    </h3>
                    <div className="tw-flex tw-items-center">
                      {isEditingUrl ? (
                        <>
                          <button
                            onClick={() => {
                              setLinkedinPostUrl(initialLinkedinPostUrl || "");
                              setIsEditingUrl(false);
                              setUrlError("");
                            }}
                            disabled={isSavingUrl}
                            className="tw-text-sm tw-text-red-600 hover:tw-text-red-700 tw-flex tw-items-center tw-mr-2 disabled:tw-opacity-50"
                          >
                            <X className="tw-w-4 tw-h-4 tw-mr-1" />
                            Cancel
                          </button>
                          <button
                            onClick={saveUrl}
                            disabled={isSavingUrl}
                            className="tw-text-sm tw-text-green-600 hover:tw-text-green-700 tw-flex tw-items-center tw-mr-2 disabled:tw-opacity-50"
                          >
                            {isSavingUrl ? (
                              <span>Saving...</span>
                            ) : (
                              <>
                                <Check className="tw-w-4 tw-h-4 tw-mr-1" />
                                Save
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={toggleEditUrl}
                          className="tw-text-sm tw-text-gray-600 hover:tw-text-gray-700 tw-flex tw-items-center"
                        >
                          <Edit2 className="tw-w-4 tw-h-4 tw-mr-1" />
                          Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {isEditingUrl ? (
                    <div className="tw-mb-4">
                      <input
                        type="url"
                        value={linkedinPostUrl}
                        onChange={(e) => setLinkedinPostUrl(e.target.value)}
                        placeholder="Enter LinkedIn post URL"
                        className={`tw-w-full tw-px-3 tw-py-2 tw-border ${
                          urlError && urlValidationAttempted
                            ? "tw-border-red-500"
                            : "tw-border-gray-300"
                        } tw-rounded-md focus:tw-ring-[#0A66C2] focus:tw-border-[#0A66C2]`}
                      />
                      {urlError && urlValidationAttempted && (
                        <p className="tw-mt-1 tw-text-sm tw-text-red-600">
                          {urlError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="tw-text-sm tw-mb-4">
                      {linkedinPostUrl || initialLinkedinPostUrl ? (
                        <Link
                          href={linkedinPostUrl || initialLinkedinPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tw-text-[#0A66C2] hover:tw-text-[#0A66C2]/80 tw-break-all tw-flex tw-items-center"
                        >
                          <span>
                            {linkedinPostUrl || initialLinkedinPostUrl}
                          </span>
                          <ExternalLink className="tw-h-4 tw-w-4 tw-ml-1 tw-flex-shrink-0" />
                        </Link>
                      ) : (
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <span className="tw-italic tw-text-gray-400">
                            No URL provided
                          </span>
                          <span className="tw-text-xs tw-text-gray-400">
                            (Click Edit to add one)
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="tw-mb-4 tw-p-3 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-md tw-text-red-600 tw-flex tw-items-start">
                    <AlertCircle className="tw-w-5 tw-h-5 tw-mr-2 tw-flex-shrink-0 tw-mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="tw-space-y-6">
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
                          <span>Clicks</span>
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
                        <div className="tw-flex tw-items-center tw-space-x-2">
                          <Heart className="tw-w-4 tw-h-4 tw-text-gray-400" />
                          <span>Engagement Rate (%)</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        value={impressionsData.engagement}
                        onChange={(e) =>
                          handleInputChange("engagement", e.target.value)
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
                        Shares
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
                          {isUploadingImage && (
                            <div className="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-70 tw-flex tw-items-center tw-justify-center">
                              <div className="tw-text-center">
                                <div className="tw-animate-spin tw-rounded-full tw-h-10 tw-w-10 tw-border-t-2 tw-border-b-2 tw-border-[#0A66C2] tw-mx-auto"></div>
                                <p className="tw-mt-2 tw-text-sm tw-text-gray-600">
                                  Uploading image...
                                </p>
                              </div>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={removeProofImage}
                            className="tw-absolute tw-top-2 tw-right-2 tw-bg-red-600 tw-text-white tw-rounded-full tw-p-1 hover:tw-bg-red-700"
                            disabled={isUploadingImage || isSubmitting}
                          >
                            <X className="tw-h-4 tw-w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="tw-mt-2 tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                            disabled={isUploadingImage || isSubmitting}
                          >
                            <Upload className="tw-h-4 tw-w-4 tw-mr-2" />
                            Replace Image
                          </button>
                          {error && error.includes("image") && (
                            <p className="tw-mt-2 tw-text-sm tw-text-red-600">
                              {error}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="tw-text-center">
                          <ImageIcon className="tw-mx-auto tw-h-12 tw-w-12 tw-text-gray-400" />
                          <div className="tw-mt-2">
                            <label
                              htmlFor="file-upload"
                              className={`tw-cursor-pointer tw-text-[#0A66C2] hover:tw-text-[#0A66C2]/80 ${
                                isSubmitting
                                  ? "tw-opacity-50 tw-pointer-events-none"
                                  : ""
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
                            Upload a screenshot of your LinkedIn analytics as
                            proof of impressions
                          </p>
                        </div>
                      )}
                    </div>
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

            <div className="tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
              <div className="tw-flex tw-flex-col">
                <div className="tw-flex tw-justify-end tw-space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-primary hover:tw-text-primary-dark tw-border tw-border-primary hover:tw-bg-primary/5 tw-rounded-md"
                    disabled={isSubmitting || isUploadingImage}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || isUploadingImage || !isFormValid}
                    className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-green-600 hover:tw-bg-green-700 tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-green-500 disabled:tw-opacity-70"
                  >
                    {isSubmitting
                      ? isUploadingImage
                        ? "Uploading Image..."
                        : "Updating..."
                      : "Update Metrics"}
                  </button>
                </div>

                {formSubmitAttempted &&
                  !isFormValid &&
                  !isSubmitting &&
                  !isUploadingImage && (
                    <p className="tw-text-xs tw-text-red-500 tw-mt-2 tw-text-center">
                      Please fill in all required fields marked with * and
                      complete any editing in progress
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
