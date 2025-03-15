import React, { useState, useEffect, useRef } from "react";
import { Eye, Save, Send, Edit, AlertCircle, Loader } from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import { Status } from "@/types";
import { PostViewer } from "../shared/PostViewer";
import CreatePostContent from "./CreatePostContent";
import { useAuth } from "@/contexts/AuthContext";
import { updateCampaignPostContent } from "@/@api/campaign";
import { isImageUrl } from "@/utils";

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
  isDraft: boolean;
}

interface ContentVersionsProps {
  versions: Version[];
  onAddContent: () => void;
  campaignId: string;
  creatorId: string;
  postId: string;
  canSubmit: boolean;
  onSubmit: () => void;
  postStatus: Status;
}

export function ContentVersions({
  versions,
  campaignId,
  creatorId,
  postId,
  canSubmit,
  onSubmit,
  postStatus,
}: ContentVersionsProps) {
  const [editingVersion, setEditingVersion] = useState<Version | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasContentChanges, setHasContentChanges] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const handleSaveDraftRef = useRef<() => void>(() => {});
  const handleSubmitRef = useRef<() => void>(() => {});
  const handlePreviewRef = useRef<() => void>(() => {});
  const { user } = useAuth();

  const firstVersion = versions && versions.length > 0 ? versions[0] : null;
  const isDraft = firstVersion?.isDraft || false;

  // Helper function to clean URLs by removing blob: prefix
  const cleanUrl = (url: string) => url.replace(/^blob:/, "");

  const processMedia = (mediaItems?: string[]) => {
    if (!mediaItems || mediaItems.length === 0)
      return { images: [], links: [] };

    const images: string[] = [];
    const links: string[] = [];

    mediaItems.forEach((item) => {
      if (item && isImageUrl(item)) {
        images.push(cleanUrl(item));
      } else if (item) {
        links.push(cleanUrl(item));
      }
    });

    return { images, links };
  };

  const mediaContent = processMedia(firstVersion?.media);

  const viewerPost = firstVersion
    ? {
        id: firstVersion.id,
        type: firstVersion.postType,
        status: (() => {
          switch (firstVersion.status) {
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
        submittedOn: firstVersion.date,
        author: {
          name: user?.name || "Content Creator",
          role: "Creator",
          avatar: user?.Profile_Image || "/assets/images/user1.jpg",
        },
        content: firstVersion.description || "",
        image:
          mediaContent.images.length > 0 ? mediaContent.images[0] : undefined,
        images:
          mediaContent.images.length > 1 ? mediaContent.images.slice(1) : [],
        links: mediaContent.links,
        timestamp: firstVersion.date,
        engagement: {
          likes: firstVersion.metrics?.impressions || 0,
          comments: firstVersion.metrics?.clicks || 0,
          shares: firstVersion.metrics?.engagement || 0,
        },
      }
    : null;

  const handleEditDraft = () => {
    if (!firstVersion) return;
    setError(null);
    setIsEditing(true);
  };

  const handleUpdateContent = (contentData: any) => {
    setIsEditing(false);
    setError(null);
    onSubmit();
  };

  const handleContentLoadingChange = (isLoading: boolean) => {
    setIsContentLoading(isLoading);
  };

  const handleContentChange = (hasChanges: boolean) => {
    setHasContentChanges(hasChanges);
  };

  const storePreviewHandler = (handler: () => void) => {
    handlePreviewRef.current = handler;
  };

  const storeSaveDraftHandler = (handler: () => void) => {
    handleSaveDraftRef.current = handler;
  };

  const storeSubmitHandler = (handler: () => void) => {
    handleSubmitRef.current = handler;
  };

  useEffect(() => {
    setEditingVersion(null);
    setIsEditing(false);
  }, [postId]);

  return (
    <div className="tw-p-6">
      <div className="tw-space-y-4">
        {error && (
          <div className="tw-p-4 tw-bg-red-50 tw-rounded-lg tw-mb-4">
            <div className="tw-flex tw-items-start">
              <AlertCircle className="tw-h-5 tw-w-5 tw-text-red-400 tw-mt-0.5 tw-mr-2" />
              <span className="tw-text-red-700">{error}</span>
            </div>
          </div>
        )}

        {viewerPost && !isEditing && !isDraft ? (
          <div>
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <h2 className="tw-text-xl tw-font-medium tw-text-gray-800">
                {isDraft ? "Draft Content" : "Content Preview"}
              </h2>
              {isDraft && (
                <div className="tw-flex tw-space-x-2">
                  <button
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                    onClick={handleEditDraft}
                  >
                    <Edit className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    Edit Draft
                  </button>
                  <button
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-transparent tw-rounded-md tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark"
                    onClick={() => {
                      if (!isContentLoading && firstVersion) {
                        const submitDirectly = async () => {
                          setIsContentLoading(true);
                          try {
                            await updateCampaignPostContent({
                              campaign_id: campaignId,
                              creator_id: creatorId,
                              content_id: firstVersion.id,
                              post_id: postId,
                              content_title:
                                firstVersion.title ||
                                firstVersion.description ||
                                "",
                              content_text_content:
                                firstVersion.description || "",
                              media_content: firstVersion.media || [],
                              google_drive_link: "",
                              is_draft: false,
                            });

                            onSubmit();
                          } catch (error) {
                            setError(
                              "Failed to submit content. Please try again."
                            );
                            console.error("Error submitting content:", error);
                          } finally {
                            setIsContentLoading(false);
                          }
                        };
                        submitDirectly();
                      }
                    }}
                  >
                    <Send className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="tw-flex tw-justify-center">
              <PostViewer post={viewerPost} preview={true} />
            </div>
          </div>
        ) : (isDraft && firstVersion) || (isEditing && firstVersion) ? (
          <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-100">
            <div className="tw-border-b tw-border-gray-200 tw-bg-gray-50 tw-rounded-t-lg">
              <div className="tw-px-6 tw-py-4 tw-flex tw-justify-between tw-items-center">
                <div>
                  <h2 className="tw-text-xl tw-font-medium tw-text-gray-800">
                    Edit Your Draft Content
                  </h2>
                  <p className="tw-text-sm tw-text-gray-600 tw-mt-1">
                    Make changes to your draft before submitting
                  </p>
                </div>
                <div className="tw-flex tw-space-x-3">
                  <button
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                    onClick={() => handlePreviewRef.current()}
                  >
                    <Eye className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    Preview
                  </button>
                  <button
                    className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium ${
                      !hasContentChanges || isContentLoading
                        ? "tw-text-gray-400 tw-bg-gray-100 tw-cursor-not-allowed"
                        : "tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                    }`}
                    onClick={() => {
                      if (hasContentChanges && !isContentLoading) {
                        handleSaveDraftRef.current();
                      }
                    }}
                    disabled={!hasContentChanges || isContentLoading}
                  >
                    {isContentLoading ? (
                      <Loader className="tw-w-4 tw-h-4 tw-mr-1.5 tw-animate-spin" />
                    ) : (
                      <Save className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    )}
                    {isContentLoading ? "Saving..." : "Save Draft"}
                  </button>
                  <button
                    className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-transparent tw-rounded-md tw-text-sm tw-font-medium ${
                      postStatus === Status.Approved
                        ? "tw-bg-primary hover:tw-bg-primary-dark tw-text-white"
                        : "tw-text-gray-400 tw-bg-gray-100 tw-cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (!isContentLoading && postStatus === Status.Approved) {
                        handleSubmitRef.current();
                      }
                    }}
                    disabled={postStatus !== Status.Approved}
                  >
                    {isContentLoading ? (
                      <Loader className="tw-w-4 tw-h-4 tw-mr-1.5 tw-animate-spin" />
                    ) : (
                      <Send className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    )}
                    {isContentLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>

            <div className="tw-py-10">
              <CreatePostContent
                campaignId={campaignId}
                creatorId={creatorId}
                postId={postId}
                contentId={firstVersion.id}
                initialContent={{
                  text: firstVersion.title || firstVersion.description || "",
                  links: mediaContent.links,
                  images: mediaContent.images,
                }}
                onSubmit={handleUpdateContent}
                canSubmit={canSubmit}
                onLoadingChange={handleContentLoadingChange}
                onContentChange={handleContentChange}
                onPreviewClick={storePreviewHandler}
                onSaveDraftClick={storeSaveDraftHandler}
                onSubmitClick={storeSubmitHandler}
              />
            </div>
          </div>
        ) : (
          <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-100">
            <div className="tw-border-b tw-border-gray-200 tw-bg-gray-50 tw-rounded-t-lg">
              <div className="tw-px-6 tw-py-4 tw-flex tw-justify-between tw-items-center">
                <div>
                  <h2 className="tw-text-xl tw-font-medium tw-text-gray-800">
                    Create Your First Content
                  </h2>
                  <p className="tw-text-sm tw-text-gray-600 tw-mt-1">
                    Start by creating compelling content for your campaign
                  </p>
                </div>
                <div className="tw-flex tw-space-x-3">
                  <button
                    className="tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                    onClick={() => handlePreviewRef.current()}
                  >
                    <Eye className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    Preview
                  </button>
                  <button
                    className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-gray-300 tw-rounded-md tw-text-sm tw-font-medium ${
                      isContentLoading
                        ? "tw-text-gray-400 tw-bg-gray-100 tw-cursor-not-allowed"
                        : "tw-text-gray-700 tw-bg-white hover:tw-bg-gray-50"
                    }`}
                    onClick={() => {
                      if (!isContentLoading) {
                        handleSaveDraftRef.current();
                      }
                    }}
                    disabled={isContentLoading}
                  >
                    {isContentLoading ? (
                      <Loader className="tw-w-4 tw-h-4 tw-mr-1.5 tw-animate-spin" />
                    ) : (
                      <Save className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    )}
                    {isContentLoading ? "Saving..." : "Save Draft"}
                  </button>
                  <button
                    className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-border tw-border-transparent tw-rounded-md tw-text-sm tw-font-medium tw-text-white ${
                      isContentLoading
                        ? "tw-bg-primary-light tw-cursor-not-allowed"
                        : "tw-bg-primary hover:tw-bg-primary-dark"
                    }`}
                    onClick={() => {
                      if (!isContentLoading) {
                        handleSubmitRef.current();
                      }
                    }}
                    disabled={isContentLoading}
                  >
                    {isContentLoading ? (
                      <Loader className="tw-w-4 tw-h-4 tw-mr-1.5 tw-animate-spin" />
                    ) : (
                      <Send className="tw-w-4 tw-h-4 tw-mr-1.5" />
                    )}
                    {isContentLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>

            <div className="tw-py-10">
              <CreatePostContent
                campaignId={campaignId}
                creatorId={creatorId}
                postId={postId}
                onSubmit={onSubmit}
                canSubmit={canSubmit}
                onLoadingChange={handleContentLoadingChange}
                onContentChange={handleContentChange}
                onPreviewClick={storePreviewHandler}
                onSaveDraftClick={storeSaveDraftHandler}
                onSubmitClick={storeSubmitHandler}
              />
            </div>
          </div>
        )}
      </div>

      <CampaignDrawer
        isOpen={!!editingVersion}
        onClose={() => setEditingVersion(null)}
        title="Edit Content"
        description="Update content details"
        type="edit"
        postType={editingVersion?.postType}
        initialData={editingVersion}
      />
    </div>
  );
}
