"use client";

import React, { useState, useRef } from "react";
import {
  FileText,
  DollarSign,
  Image,
  Video,
  Calendar,
  Upload,
  Globe,
} from "lucide-react";
import { getStatusBadge } from "./utils";
import { createCampaignPost } from "@/@api/campaign";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  dueDate: string;
  payout: string;
  type: "post" | "content" | "edit" | "details";
  postType?: string;
  initialData?: InitialData;
  campaignId?: string;
  creatorId?: string;
}

interface InitialData {
  type: string;
  campaignName?: string;
  status: string;
  duration?: string;
  budget: string;
  title?: string;
  submittedDate?: string;
  goLiveDate?: string;
  description?: string;
  dueDate?: string;
  sections?: Section[];
}

interface Section {
  title: string;
  items: SectionItem[];
}

interface SectionItem {
  label: string;
  type: string;
  value: string;
}

interface UploadedFile {
  id: string;
  url: string;
  name: string;
  type: string;
  rotation?: number;
  zoom?: number;
}

interface FeedbackMessage {
  id: string;
  message: string;
  sender: "brand" | "user";
  timestamp: string;
}

interface PostFormData {
  campaign_id: string;
  creator_id: string;
  budget: number;
  content_type: string;
  title: string;
  description: string;
}

// Constants
const CONTENT_TYPES = [
  { id: "image", label: "Image", icon: Image },
  { id: "video", label: "Video", icon: Video },
  { id: "document", label: "Document", icon: FileText },
];

const sampleFiles: UploadedFile[] = [];
const sampleFeedback: FeedbackMessage[] = [];

function DetailsDrawer({
  title,
  onClose,
  initialData,
}: {
  title: string;
  onClose: () => void;
  initialData?: InitialData;
}) {
  if (!initialData) return null;

  return (
    <>
      <div className="modal-header border-bottom">
        <h5 className="modal-title h3">{title}</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body overflow-auto">
        <div>
          <div className="border-bottom pb-4 mb-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h3 className="h3">{initialData.campaignName}</h3>
              {getStatusBadge(initialData.status)}
            </div>

            <div className="d-flex gap-4 text-muted fs-6">
              <div className="d-flex align-items-center">
                <Calendar
                  className="me-1"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
                <span>Duration: {initialData.duration}</span>
              </div>
              <div className="d-flex align-items-center">
                <DollarSign
                  className="me-1"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
                <span>Budget: {initialData.budget}</span>
              </div>
            </div>
          </div>

          {initialData.sections?.map((section, index) => (
            <div key={index} className="mb-4">
              <h4 className="h4 mb-3">{section.title}</h4>
              <div className="mb-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-3">
                    <dt className="text-muted fs-5">{item.label}</dt>
                    {item.type === "link" ? (
                      <dd>
                        <a
                          href={`https://${item.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-decoration-none d-flex align-items-center fs-5"
                        >
                          <Globe
                            className="me-1"
                            style={{ width: "1.2rem", height: "1.2rem" }}
                          />
                          {item.value}
                        </a>
                      </dd>
                    ) : item.type === "tags" ? (
                      <dd className="d-flex flex-wrap gap-2">
                        {item.value.split(",").map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="badge bg-primary fs-5"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </dd>
                    ) : (
                      <dd className="fs-5">{item.value}</dd>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </>
  );
}

function ContentDrawer({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
  campaignId?: string;
  creatorId?: string;
}) {
  const [selectedContentType, setSelectedContentType] = useState("image");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      rotation: 0,
      zoom: 1,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <>
      <div className="modal-header border-bottom">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body overflow-auto">
        <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="content_type" className="form-label">
              Content Type
            </label>
            <select
              id="content_type"
              value={selectedContentType}
              onChange={(e) => setSelectedContentType(e.target.value)}
              className="form-select"
            >
              {CONTENT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="d-none"
            multiple
            accept={
              selectedContentType === "image"
                ? "image/*"
                : selectedContentType === "video"
                ? "video/*"
                : "*/*"
            }
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-outline-primary w-100 p-4 border-dashed"
          >
            <div className="text-center">
              <Upload
                className="mb-3"
                style={{ width: "3rem", height: "3rem" }}
              />
              <div className="mb-2">
                <span className="text-primary">Upload files</span>
                <span className="text-muted ms-1">or drag and drop</span>
              </div>
              <p className="small text-muted mb-0">
                {selectedContentType === "image"
                  ? "PNG, JPG, GIF up to 10MB"
                  : selectedContentType === "video"
                  ? "MP4, WebM up to 100MB"
                  : "PDF, DOC, DOCX up to 10MB"}
              </p>
            </div>
          </button>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          Add Content
        </button>
      </div>
    </>
  );
}

function EditDrawer({
  title,
  onClose,
  campaignId,
  creatorId,
}: {
  title: string;
  onClose: () => void;
  campaignId?: string;
  creatorId?: string;
}) {
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(sampleFiles);
  const [feedback, setFeedback] = useState("");
  const [feedbackMessages] = useState<FeedbackMessage[]>(sampleFeedback);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="modal-header border-bottom">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body overflow-auto">
        {/* Content upload section */}
        {/* Feedback section */}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </>
  );
}

function PostDrawer({
  title,
  onClose,
  campaignId,
  creatorId,
}: {
  title: string;
  onClose: () => void;
  campaignId?: string;
  creatorId?: string;
}) {
  const [formData, setFormData] = useState<PostFormData>({
    campaign_id: campaignId || "",
    creator_id: creatorId || "",
    budget: 0,
    content_type: "image",
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createCampaignPost(formData);
      onClose();
    } catch (error) {
      console.error("Error creating campaign post:", error);
    }
  };

  return (
    <>
      <div className="modal-header border-bottom">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body overflow-auto">
        <div>
          <div className="mb-3">
            <label htmlFor="content_type" className="form-label">
              Content Type
            </label>
            <select
              id="content_type"
              className="form-select"
              value={formData.content_type}
              onChange={handleInputChange}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="budget" className="form-label">
              Budget
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="text"
                className="form-control"
                id="budget"
                placeholder="Enter budget"
                value={formData.budget}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange({
                    ...e,
                    target: { ...e.target, value: numbersOnly, id: "budget" },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Create Post
        </button>
      </div>
    </>
  );
}

export function CampaignDrawer({
  isOpen,
  onClose,
  title,
  type,
  initialData,
  campaignId,
  creatorId,
}: DrawerProps) {
  if (!isOpen) return null;

  const renderDrawer = () => {
    switch (type) {
      case "details":
        return (
          <DetailsDrawer
            title={title}
            onClose={onClose}
            initialData={initialData}
          />
        );
      case "content":
        return (
          <ContentDrawer
            title={title}
            onClose={onClose}
            campaignId={campaignId}
            creatorId={creatorId}
          />
        );
      case "edit":
        return (
          <EditDrawer
            title={title}
            onClose={onClose}
            campaignId={campaignId}
            creatorId={creatorId}
          />
        );
      case "post":
        return (
          <PostDrawer
            title={title}
            onClose={onClose}
            campaignId={campaignId}
            creatorId={creatorId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-right m-0 h-100">
        <div className="modal-content h-100 border-0">{renderDrawer()}</div>
      </div>
    </div>
  );
}
