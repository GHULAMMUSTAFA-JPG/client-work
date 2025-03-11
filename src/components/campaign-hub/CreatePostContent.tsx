import React, { useState, useRef, useEffect } from "react";
import { Link as LinkIcon, Image, X, Upload, AlertCircle } from "lucide-react";
import axios from "axios";
import {
  createCampaignPostContent,
  updateCampaignPostContent,
} from "@/@api/campaign";
import { PostViewer } from "../shared/PostViewer";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/utils";

interface CreatePostContentProps {
  campaignId: string;
  creatorId: string;
  postId: string;
  contentId?: string;
  initialContent?: {
    text?: string;
    links?: string[];
    images?: string[];
  };
  onSubmit: (contentData: any) => void;
  canSubmit?: boolean;
  onLoadingChange?: (isLoading: boolean) => void;
  onContentChange?: (hasChanges: boolean) => void;
  onPreviewClick?: (handler: () => void) => void;
  onSaveDraftClick?: (handler: () => void) => void;
  onSubmitClick?: (handler: () => void) => void;
}

interface PostContent {
  text: string;
  links: string[];
  images: string[];
  info: string;
  googleDriveLink?: string;
}

export default function CreatePostContent({
  campaignId,
  creatorId,
  postId,
  contentId,
  initialContent,
  onSubmit,
  canSubmit = true,
  onLoadingChange,
  onContentChange,
  onPreviewClick,
  onSaveDraftClick,
  onSubmitClick,
}: CreatePostContentProps) {
  const [content, setContent] = useState<PostContent>({
    text: initialContent?.text || "",
    links: initialContent?.links || [],
    images: [],
    info: "",
    googleDriveLink: "",
  });

  const [newLink, setNewLink] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [remoteImages, setRemoteImages] = useState<string[]>([]);

  const [initialContentState, setInitialContentState] = useState<PostContent>({
    text: "",
    links: [],
    images: [],
    info: "",
  });

  const { user } = useAuth();

  useEffect(() => {
    if (initialContent) {
      const initialState = {
        text: initialContent.text || "",
        links: initialContent.links || [],
        images: initialContent.images || [],
        info: "",
      };
      setInitialContentState(initialState);

      if (initialContent.images && initialContent.images.length > 0) {
        setRemoteImages(initialContent.images);
        setContent((prev) => ({
          ...prev,
          images: initialContent.images || [],
        }));
      }
    }
  }, [initialContent]);

  useEffect(() => {
    const textChanged = contentId
      ? content.text !== initialContentState.text
      : content.text.trim() !== "";

    const linksChanged =
      JSON.stringify(content.links) !==
      JSON.stringify(initialContentState.links);
    const imagesChanged =
      JSON.stringify(content.images) !==
        JSON.stringify(initialContentState.images) || files.length > 0;

    setHasChanges(textChanged || linksChanged || imagesChanged);
  }, [content, initialContentState, files, contentId]);

  const isImageUrl = (url: string) => {
    return (
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) ||
      url.includes("/image") ||
      url.includes("/images") ||
      url.startsWith("data:image/")
    );
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddLink = () => {
    if (!newLink) return;

    if (content.links.includes(newLink)) {
      setError("This link has already been added");
      return;
    }

    setError("");

    if (isImageUrl(newLink)) {
      if (content.images.includes(newLink)) {
        setError("This image has already been added");
        setNewLink("");
        return;
      }

      setContent((prev) => ({
        ...prev,
        images: [...prev.images, newLink],
      }));
      setRemoteImages((prev) => [...prev, newLink]);
    } else {
      setContent((prev) => ({
        ...prev,
        links: [...prev.links, newLink],
      }));
    }

    setNewLink("");
  };

  const handleRemoveLink = (linkToRemove: string) => {
    setContent((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link !== linkToRemove),
    }));
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...content.images];
    updatedImages.splice(index, 1);

    setContent((prev) => ({
      ...prev,
      images: updatedImages,
    }));

    if (files.length > index) {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1);
      setFiles(updatedFiles);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles: File[] = [];
      const newImageUrls: string[] = [];
      let hasError = false;

      Array.from(selectedFiles).forEach((file) => {
        if (file.type.startsWith("image/")) {
          newFiles.push(file);
          const imageUrl = URL.createObjectURL(file);
          newImageUrls.push(imageUrl);
        } else {
          hasError = true;
        }
      });

      if (hasError) {
        setError("Some files were skipped. Only images are allowed.");
      } else {
        setError("");
      }

      if (newFiles.length > 0) {
        setHasChanges(true);
      }

      setFiles([...files, ...newFiles]);

      setContent((prev) => {
        const uniqueNewImages = newImageUrls.filter(
          (url) => !prev.images.includes(url)
        );
        return {
          ...prev,
          images: [...prev.images, ...uniqueNewImages],
        };
      });
    }
  };

  const uploadMedia = async (files: File[]): Promise<string[]> => {
    try {
      setIsUploading(true);
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file_request", file);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/upload_files`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response?.data?.file_urls;
      });

      const urls = await Promise.all(uploadPromises);
      return urls.filter((url) => url !== null);
    } catch (error) {
      console.error("Error uploading files:", error);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setContent({
      text: "",
      links: [],
      images: [],
      info: "",
      googleDriveLink: "",
    });
    setNewLink("");
    setFiles([]);
    setError("");
    setHasChanges(false);
  };

  const createContent = async (isDraft: boolean = false) => {
    if (!canSubmit) {
      setError(`Cannot ${isDraft ? "save" : "submit"} content at this time`);
      return;
    }

    if (isDraft) {
      if (
        content.text.trim() === "" &&
        content.images.length === 0 &&
        files.length === 0 &&
        (!content.googleDriveLink || content.googleDriveLink.trim() === "")
      ) {
        setError(
          "Please add at least a description, images, or a Google Drive link"
        );
        return;
      }
    } else {
      if (!content.text.trim()) {
        setError("Content description is required for submission");
        return;
      }
    }

    if (contentId && isDraft && !hasChanges) {
      setError("No changes to save");
      return;
    }

    setIsUploading(true);

    try {
      let mediaContent: string[] = [...content.images];

      if (files.length > 0) {
        const uploadedUrls = await uploadMedia(files);
        if (uploadedUrls.length === 0 && files.length > 0) {
          setError("Failed to upload files. Please try again.");
          setIsUploading(false);
          return;
        }

        const uniqueUploadedUrls = uploadedUrls.filter(
          (url) => !mediaContent.includes(url)
        );
        mediaContent = [...mediaContent, ...uniqueUploadedUrls];
      }

      const uniqueLinks = content.links.filter(
        (link) => !mediaContent.includes(link)
      );
      mediaContent = [...mediaContent, ...uniqueLinks];

      const isUpdate = !!contentId;

      if (isUpdate && !contentId) {
        setError("Content ID is required for updates");
        setIsUploading(false);
        return;
      }

      let response;

      if (isUpdate) {
        const contentText =
          content.text.trim() ||
          (content.images.length > 0 ? "Image content" : "") ||
          (content.googleDriveLink ? "Google Drive content" : "");

        const updatePayload = {
          campaign_id: campaignId,
          creator_id: creatorId,
          post_id: postId,
          content_id: contentId!,
          content_title: contentText,
          content_text_content: contentText,
          media_content: mediaContent,
          google_drive_link: content.googleDriveLink || "",
          is_draft: isDraft,
        };

        response = await updateCampaignPostContent(updatePayload);
      } else {
        const contentText =
          content.text.trim() ||
          (content.images.length > 0 ? "Image content" : "") ||
          (content.googleDriveLink ? "Google Drive content" : "");

        const createPayload = {
          campaign_id: campaignId,
          creator_id: creatorId,
          post_id: postId,
          content_title: contentText,
          content_text_content: contentText,
          media_content: mediaContent,
          google_drive_link: content.googleDriveLink || "",
          is_draft: isDraft,
        };

        response = await createCampaignPostContent(createPayload);
      }

      if (isDraft && !isUpdate) {
        localStorage.setItem(
          "contentDraft",
          JSON.stringify({
            content,
            campaignId,
            postId,
          })
        );
      }

      if (!response) {
        setError(
          `Failed to ${
            isDraft
              ? "save draft"
              : isUpdate
              ? "update content"
              : "create content"
          }. Please try again.`
        );
        setIsUploading(false);
        return;
      }

      resetForm();
      onSubmit(response);
    } catch (err: any) {
      console.error(
        `Error ${isDraft ? "saving draft" : "submitting content"}:`,
        err
      );

      const errorMessage =
        err.response?.data?.message ||
        `An error occurred while ${
          isDraft ? "saving" : "submitting"
        }. Please try again.`;

      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await createContent(false);
  };

  const handlePreviewOpen = () => {
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  useEffect(() => {
    if (onPreviewClick) {
      onPreviewClick(() => handlePreviewOpen());
    }
    if (onSaveDraftClick) {
      onSaveDraftClick(() => {
        if (
          content.text.trim() !== "" ||
          content.images.length > 0 ||
          files.length > 0 ||
          (content.googleDriveLink && content.googleDriveLink.trim() !== "")
        ) {
          if (!contentId || hasChanges) {
            createContent(true);
          } else {
            setError("No changes to save");
          }
        } else {
          setError(
            "Please add at least a description, images, or a Google Drive link"
          );
        }
      });
    }
    if (onSubmitClick) {
      onSubmitClick(() => handleSubmit());
    }
  }, [content, files, hasChanges, contentId]);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isUploading);
    }
  }, [isUploading, onLoadingChange]);

  useEffect(() => {
    if (onContentChange) {
      onContentChange(hasChanges);
    }
  }, [hasChanges, onContentChange]);

  useEffect(() => {
    if (files.length > 0) {
      setHasChanges(true);
    }
  }, [files]);

  const previewPost = {
    id: "preview",
    type: "Post",
    status: "draft" as
      | "draft"
      | "in-review"
      | "approved"
      | "rejected"
      | "published",
    submittedOn: new Date().toLocaleDateString(),
    author: {
      name: user?.name || "Content Creator",
      role: "Creator",
      avatar: user?.Profile_Image || "/assets/images/user1.jpg",
    },
    content: content.text,
    image: content.images.length > 0 ? content.images[0] : undefined,
    images: content.images.length > 1 ? content.images.slice(1) : [],
    links: content.links,
    timestamp: formatDate(new Date().toLocaleDateString()),
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
    },
  };

  const renderImagePreviews = () => {
    if (content.images.length === 0) return null;

    return (
      <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-3">
        {content.images.map((image, index) => {
          const isRemote = remoteImages.includes(image);
          return (
            <div
              key={index}
              className="tw-relative tw-group tw-rounded-lg tw-overflow-hidden tw-border tw-border-gray-200"
            >
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="tw-w-full tw-h-32 tw-object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/150?text=Image+Not+Available";
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (isRemote) {
                    setRemoteImages(
                      remoteImages.filter((img) => img !== image)
                    );
                    setContent((prev) => ({
                      ...prev,
                      images: prev.images.filter((img) => img !== image),
                    }));
                  } else {
                    handleRemoveImage(index);
                  }
                }}
                className="tw-absolute tw-top-2 tw-right-2 tw-bg-white tw-text-red-500 tw-p-1 tw-rounded-full tw-shadow-sm"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setContent((prevContent) => ({
      ...prevContent,
      text: newText,
    }));
  };

  return (
    <div className="tw-w-full tw-max-w-4xl tw-mx-auto">
      <form ref={formRef} onSubmit={handleSubmit}>
        {error && (
          <div className="tw-p-4 tw-bg-red-50 tw-rounded-lg tw-mb-4">
            <div className="tw-flex tw-items-start">
              <AlertCircle className="tw-h-5 tw-w-5 tw-text-red-400 tw-mt-0.5 tw-mr-2" />
              <span className="tw-text-red-700">{error}</span>
            </div>
          </div>
        )}

        <div className="tw-mb-6">
          <textarea
            value={content.text}
            onChange={handleTextChange}
            placeholder="Write your content description here..."
            className="tw-w-full tw-min-h-[280px] tw-p-4 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm focus:tw-ring-2 focus:tw-ring-primary focus:tw-border-primary focus:tw-outline-none"
          />
        </div>

        <div className="tw-mb-6">
          <div className="tw-flex tw-items-center tw-mb-2">
            <LinkIcon size={16} className="tw-text-primary tw-mr-2" />
            <label className="tw-text-sm tw-font-medium tw-text-gray-700">
              Google Drive Link
            </label>
          </div>
          <input
            type="url"
            value={content.googleDriveLink || ""}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                googleDriveLink: e.target.value,
              }))
            }
            placeholder="Add a Google Drive link with your content"
            className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg"
          />
        </div>

        <div className="tw-mb-6">
          <div className="tw-flex tw-items-center tw-mb-2">
            <LinkIcon size={16} className="tw-text-primary tw-mr-2" />
            <label className="tw-text-sm tw-font-medium tw-text-gray-700">
              Links
            </label>
          </div>

          <div className="tw-flex tw-gap-2 tw-mb-3">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Enter URL or Image URL"
              className="tw-flex-1 tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && newLink) {
                  e.preventDefault();
                  handleAddLink();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddLink}
              disabled={!newLink}
              className="tw-px-4 tw-py-2 tw-bg-primary tw-text-white tw-rounded-lg hover:tw-bg-primary-dark disabled:tw-opacity-50"
            >
              Add
            </button>
          </div>

          {content.links.length > 0 && (
            <div className="tw-space-y-2">
              {content.links.map((link, index) => (
                <div
                  key={index}
                  className="tw-flex tw-items-center tw-gap-2 tw-bg-gray-100 tw-p-2 tw-rounded-lg"
                >
                  <LinkIcon size={16} className="tw-text-gray-600" />
                  <span className="tw-flex-1 tw-text-sm tw-truncate">
                    {link}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(link)}
                    className="tw-text-gray-500 hover:tw-text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tw-mb-6">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <div className="tw-flex tw-items-center">
              <Image size={16} className="tw-text-primary tw-mr-2" />
              <label className="tw-text-sm tw-font-medium tw-text-gray-700">
                Images
              </label>
            </div>
          </div>

          <div className="tw-mb-4">
            <div
              className="tw-border tw-border-dashed tw-border-gray-300 tw-rounded-lg tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-gray-50 hover:tw-bg-gray-100 tw-cursor-pointer tw-min-h-[180px]"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={24} className="tw-text-gray-400 tw-mb-2" />
              <p className="tw-text-sm tw-text-gray-600">
                Upload images or click to browse
              </p>
              <p className="tw-text-xs tw-text-gray-500 tw-mt-1">
                You can also add image URLs in the links section above
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept="image/*"
                className="tw-hidden"
              />
            </div>
          </div>

          {renderImagePreviews()}
        </div>
      </form>

      {isPreviewOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-hidden">
          <div
            className="tw-absolute tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity"
            onClick={handlePreviewClose}
          />

          <div className="tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10">
            <div className="tw-w-screen tw-max-w-2xl">
              <div className="tw-flex tw-h-full tw-flex-col tw-bg-white tw-shadow-xl">
                <div className="tw-px-6 tw-py-6 tw-border-b tw-border-gray-200">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                      Content Preview
                    </h2>
                    <button
                      onClick={handlePreviewClose}
                      className="tw-rounded-md tw-text-gray-400 hover:tw-text-gray-500"
                    >
                      <X className="tw-h-6 tw-w-6" />
                    </button>
                  </div>
                </div>

                <div className="tw-flex-1 tw-overflow-y-auto tw-p-6">
                  <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mb-4">
                    <span className="tw-text-sm tw-text-gray-500">
                      This is a preview of how your content will appear
                    </span>
                  </div>

                  <div className="tw-flex tw-justify-center">
                    <PostViewer post={previewPost} preview={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
