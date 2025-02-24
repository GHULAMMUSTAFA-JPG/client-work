import React, { useState } from "react";
import {
  X,
  Upload,
  Link as LinkIcon,
  FileText,
  Building2,
  User,
  Clock,
  AlertCircle,
} from "lucide-react";
import { createCampaignPostContent } from "@/@api/campaign";
import { toast } from "react-toastify";

interface PostContentAddNewContentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contentData: any) => void;
  campaignId: string;
  creatorId: string;
  postId: string;
}

interface ContentType {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const contentTypes: ContentType[] = [
  {
    id: "local",
    label: "Upload Local File",
    description: "Upload images or PDFs from your device",
    icon: <Upload className="tw-w-5 tw-h-5" />,
  },
  {
    id: "drive",
    label: "Google Drive Link",
    description: "Share a public Google Drive link",
    icon: <LinkIcon className="tw-w-5 tw-h-5" />,
  },
  {
    id: "text",
    label: "Text Content",
    description: "Add text-based content directly",
    icon: <FileText className="tw-w-5 tw-h-5" />,
  },
];

export function PostContentAddNewContent({
  isOpen,
  onClose,
  onSubmit,
  campaignId,
  creatorId,
  postId,
}: PostContentAddNewContentProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type === "application/pdf"
      ) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please select an image or PDF file");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedType) {
      setError("Please select a content type");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    let mediaContent: string[] = [];

    if (selectedType === "drive" && driveLink) {
      mediaContent = [driveLink];
    } else if (selectedType === "local" && file) {
      mediaContent = [
        "https://cdn.synnc.us/brand/90a1f74c-2cec-464f-9e8d-10817c1227d1.jpeg",
      ];
    }

    const payload = {
      campaign_id: campaignId,
      creator_id: creatorId,
      post_id: postId,
      content_title: title,
      content_text_content: description,
      media_content: mediaContent,
    };

    const response = await createCampaignPostContent(payload);

    if (!response) {
      setError("Failed to create post. Please try again.");
      return;
    }

    onSubmit("");
    onClose();
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
            {/* Header */}
            <div className="tw-px-6 tw-py-6 tw-border-b tw-border-gray-200">
              <div className="tw-flex tw-items-center tw-justify-between">
                <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                  Add New Content
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
              <form onSubmit={handleSubmit} className="tw-p-6 tw-space-y-6">
                {/* Content Type Selection */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    Content Type
                  </label>
                  <div className="tw-relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="tw-w-full tw-bg-white tw-px-4 tw-py-3 tw-text-left tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary focus:tw-border-primary"
                    >
                      {selectedType ? (
                        <div className="tw-flex tw-items-center">
                          {
                            contentTypes.find(
                              (type) => type.id === selectedType
                            )?.icon
                          }
                          <span className="tw-ml-2">
                            {
                              contentTypes.find(
                                (type) => type.id === selectedType
                              )?.label
                            }
                          </span>
                        </div>
                      ) : (
                        <span className="tw-text-gray-500">
                          Select content type...
                        </span>
                      )}
                    </button>

                    {isDropdownOpen && (
                      <div className="tw-absolute tw-z-10 tw-mt-1 tw-w-full tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-200">
                        {contentTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setSelectedType(type.id);
                              setIsDropdownOpen(false);
                            }}
                            className="tw-w-full tw-px-4 tw-py-3 tw-text-left hover:tw-bg-gray-50 tw-flex tw-items-center tw-space-x-3"
                          >
                            {type.icon}
                            <div>
                              <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                                {type.label}
                              </div>
                              <div className="tw-text-xs tw-text-gray-500">
                                {type.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-primary focus:tw-border-primary"
                    placeholder="Enter content title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-primary focus:tw-border-primary"
                    placeholder="Enter content description"
                  />
                </div>

                {/* Content Upload Section */}
                {selectedType === "local" && (
                  <div>
                    <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                      Upload File
                    </label>
                    <div className="tw-mt-1 tw-flex tw-justify-center tw-px-6 tw-pt-5 tw-pb-6 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg">
                      <div className="tw-space-y-1 tw-text-center">
                        <Upload className="tw-mx-auto tw-h-12 tw-w-12 tw-text-gray-400" />
                        <div className="tw-flex tw-text-sm tw-text-gray-600">
                          <label className="tw-relative tw-cursor-pointer tw-bg-white tw-rounded-md tw-font-medium tw-text-primary hover:tw-text-primary-dark focus-within:tw-outline-none focus-within:tw-ring-2 focus-within:tw-ring-offset-2 focus-within:tw-ring-primary">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="tw-sr-only"
                              accept="image/*,.pdf"
                              onChange={handleFileSelect}
                            />
                          </label>
                          <p className="tw-pl-1">or drag and drop</p>
                        </div>
                        <p className="tw-text-xs tw-text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        {file && (
                          <p className="tw-text-sm tw-text-green-600">
                            Selected: {file.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Drive Link */}
                {selectedType === "drive" && (
                  <div>
                    <label
                      htmlFor="drive-link"
                      className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1"
                    >
                      Google Drive Link
                    </label>
                    <div className="tw-mt-1 tw-relative tw-rounded-md tw-shadow-sm">
                      <input
                        type="url"
                        id="drive-link"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-primary focus:tw-border-primary"
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                    <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
                      Make sure the link is set to "Anyone with the link can
                      view"
                    </p>
                  </div>
                )}

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
                      Last activity: 2 hours ago
                    </span>
                  </div>
                </div>
                {error && (
                  <div className="tw-p-4 tw-bg-red-50 tw-rounded-lg">
                    <div className="tw-flex">
                      <AlertCircle className="tw-h-5 tw-w-5 tw-text-red-400" />
                      <div className="tw-ml-3">
                        <h3 className="tw-text-sm tw-font-medium tw-text-red-800">
                          Error
                        </h3>
                        <div className="tw-mt-2 tw-text-sm tw-text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Footer */}
            <div className="tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
              <div className="tw-flex tw-justify-end tw-space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white tw-border tw-border-gray-300 tw-rounded-md hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark tw-rounded-md focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-primary"
                >
                  Add Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
