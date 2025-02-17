"use client";

import React, { useState, useRef } from "react";
import {
  FileText,
  DollarSign,
  Image,
  Video,
  Calendar,
  Upload,
  Clock,
  Globe,
  Trash2,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { linkedInPostTypes } from "@/types/linkedin";
import { getStatusBadge } from "./utils";

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

const CONTENT_TYPES = [
  { id: "image", label: "Image", icon: Image },
  { id: "video", label: "Video", icon: Video },
  { id: "document", label: "Document", icon: FileText },
];

const sampleFiles: UploadedFile[] = [];
const sampleFeedback: FeedbackMessage[] = [];

export function CampaignDrawer({
  isOpen,
  onClose,
  title,
  payout,
  type,
  initialData,
}: DrawerProps) {
  const [selectedContentType, setSelectedContentType] = useState("image");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    type === "edit" ? sampleFiles : []
  );
  const [feedback, setFeedback] = useState("");
  const [feedbackMessages] = useState<FeedbackMessage[]>(sampleFeedback);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const rotateFile = (fileId: string) => {
    setUploadedFiles((files) =>
      files.map((file) =>
        file.id === fileId
          ? { ...file, rotation: ((file.rotation || 0) + 90) % 360 }
          : file
      )
    );
  };

  const adjustZoom = (fileId: string, delta: number) => {
    setUploadedFiles((files) =>
      files.map((file) =>
        file.id === fileId
          ? {
              ...file,
              zoom: Math.max(0.5, Math.min(2, (file.zoom || 1) + delta)),
            }
          : file
      )
    );
  };

  const renderFilePreview = (file: UploadedFile) => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="position-relative border rounded overflow-hidden">
          <div className="ratio ratio-16x9">
            <img
              src={file.url}
              alt={file.name}
              className="object-fit-cover"
              style={{
                transform: `rotate(${file.rotation}deg) scale(${file.zoom})`,
              }}
            />
          </div>
          <div className="position-absolute top-0 end-0 m-2 bg-white rounded shadow-sm p-1 d-none btn-group">
            <button
              onClick={() => rotateFile(file.id)}
              className="btn btn-sm btn-light"
            >
              <RotateCw className="small" />
            </button>
            <button
              onClick={() => adjustZoom(file.id, 0.1)}
              className="btn btn-sm btn-light"
            >
              <ZoomIn className="small" />
            </button>
            <button
              onClick={() => adjustZoom(file.id, -0.1)}
              className="btn btn-sm btn-light"
            >
              <ZoomOut className="small" />
            </button>
            <button
              onClick={() => removeFile(file.id)}
              className="btn btn-sm btn-light text-danger"
            >
              <Trash2 className="small" />
            </button>
          </div>
        </div>
      );
    }

    if (file.type === "application/pdf") {
      return (
        <div className="position-relative border rounded">
          <div className="ratio ratio-16x9">
            <iframe src={file.url} title={file.name} />
          </div>
          <button
            onClick={() => removeFile(file.id)}
            className="position-absolute top-0 end-0 m-2 btn btn-sm btn-light rounded-circle d-none"
          >
            <Trash2 className="small text-danger" />
          </button>
        </div>
      );
    }

    return (
      <div className="position-relative border rounded d-flex align-items-center justify-content-center bg-light ratio ratio-16x9">
        <FileText
          className="text-secondary"
          style={{ width: "2rem", height: "2rem" }}
        />
        <button
          onClick={() => removeFile(file.id)}
          className="position-absolute top-0 end-0 m-2 btn btn-sm btn-light rounded-circle d-none"
        >
          <Trash2 className="small text-danger" />
        </button>
      </div>
    );
  };

  const renderUploadedFiles = () => {
    if (uploadedFiles.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="h6 mb-3">Uploaded Files</h4>
        <div className="row g-4">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="col-6 position-relative">
              {renderFilePreview(file)}
              <p className="small text-muted text-truncate mt-1">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFeedbackSection = () => (
    <div className="mt-4">
      <h4 className="h6 mb-3">Feedback</h4>
      <div
        className="bg-light p-3 rounded mb-3"
        style={{ maxHeight: "240px", overflowY: "auto" }}
      >
        {feedbackMessages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex ${
              msg.sender === "brand"
                ? "justify-content-start"
                : "justify-content-end"
            } mb-3`}
          >
            <div
              className={`${
                msg.sender === "brand"
                  ? "bg-white border"
                  : "bg-primary text-white"
              } p-3 rounded`}
              style={{ maxWidth: "80%" }}
            >
              <p className="small mb-1">{msg.message}</p>
              <p
                className={`small mb-0 ${
                  msg.sender === "brand" ? "text-muted" : "text-light"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <textarea
          rows={3}
          className="form-control mb-2"
          placeholder="Type your message..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button className="btn btn-primary">Send Message</button>
      </div>
    </div>
  );

  const renderContentUpload = () => (
    <div className="mb-4">
      <div className="mb-4">
        <label htmlFor="contentType" className="form-label">
          Content Type
        </label>
        <select
          id="contentType"
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

      <div>
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

        {renderUploadedFiles()}
        {type === "edit" && renderFeedbackSection()}
      </div>
    </div>
  );

  const renderCampaignDetails = () => {
    if (!initialData || initialData.type !== "campaign") return null;

    return (
      <div>
        <div className="border-bottom pb-4 mb-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h3 className="h4">{initialData.campaignName}</h3>
            {getStatusBadge(initialData.status)}
          </div>

          <div className="d-flex gap-4 small text-muted">
            <div className="d-flex align-items-center">
              <Calendar
                className="me-1"
                style={{ width: "1rem", height: "1rem" }}
              />
              <span>Duration: {initialData.duration}</span>
            </div>
            <div className="d-flex align-items-center">
              <DollarSign
                className="me-1"
                style={{ width: "1rem", height: "1rem" }}
              />
              <span>Budget: {initialData.budget}</span>
            </div>
          </div>
        </div>

        {initialData.sections?.map((section, index) => (
          <div key={index} className="mb-4">
            <h4 className="h5 mb-3">{section.title}</h4>
            <div className="mb-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-3">
                  <dt className="small text-muted">{item.label}</dt>
                  {item.type === "link" ? (
                    <dd>
                      <a
                        href={`https://${item.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-decoration-none d-flex align-items-center"
                      >
                        <Globe
                          className="me-1"
                          style={{ width: "1rem", height: "1rem" }}
                        />
                        {item.value}
                      </a>
                    </dd>
                  ) : item.type === "tags" ? (
                    <dd className="d-flex flex-wrap gap-2">
                      {item.value.split(",").map((tag, tagIndex) => (
                        <span key={tagIndex} className="badge bg-primary">
                          {tag.trim()}
                        </span>
                      ))}
                    </dd>
                  ) : (
                    <dd>{item.value}</dd>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPostForm = () => (
    <div>
      <div className="mb-3">
        <label htmlFor="postType" className="form-label">
          Post Content Type
        </label>
        <select id="postType" className="form-select">
          {linkedInPostTypes.map((postType) => (
            <option key={postType.id} value={postType.id}>
              {postType.label} - {postType.description}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Budget (preset)</label>
        <div className="d-flex align-items-center">
          <DollarSign
            className="text-muted me-2"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <span className="h5 mb-0">{payout}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-right m-0 h-100">
        <div className="modal-content h-100 border-0">
          <div className="modal-header border-bottom">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body overflow-auto">
            {type === "details" && initialData?.type === "campaign" ? (
              renderCampaignDetails()
            ) : (
              <div>
                {type === "details" && initialData && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <h3 className="h4">{initialData.title}</h3>
                        {getStatusBadge(initialData.status)}
                      </div>

                      <div className="d-flex gap-4 small text-muted mb-3">
                        <div className="d-flex align-items-center">
                          <Calendar
                            className="me-1"
                            style={{ width: "1rem", height: "1rem" }}
                          />
                          <span>Submit by: {initialData.submittedDate}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Clock
                            className="me-1"
                            style={{ width: "1rem", height: "1rem" }}
                          />
                          <span>Go live: {initialData.goLiveDate}</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mb-4">
                        <DollarSign
                          className="text-muted me-2"
                          style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                        <span className="h5 mb-0">
                          Budget: ${initialData.budget}
                        </span>
                      </div>

                      <div>
                        <div className="mb-3">
                          <dt className="small text-muted">
                            Post Content Type
                          </dt>
                          <dd>
                            {linkedInPostTypes.find(
                              (t) => t.id === initialData.type
                            )?.label || initialData.type}
                          </dd>
                          <dd className="text-muted">
                            {
                              linkedInPostTypes.find(
                                (t) => t.id === initialData.type
                              )?.description
                            }
                          </dd>
                        </div>

                        <div className="mb-3">
                          <dt className="small text-muted">Description</dt>
                          <dd>{initialData.description}</dd>
                        </div>

                        {initialData.dueDate && (
                          <div className="mb-3">
                            <dt className="small text-muted">Due Date</dt>
                            <dd>{initialData.dueDate}</dd>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {(type === "content" || type === "edit") &&
                  renderContentUpload()}
                {type === "post" && renderPostForm()}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {type === "details" ? "Close" : "Cancel"}
            </button>
            {type !== "details" && (
              <button type="submit" className="btn btn-primary">
                {type === "post"
                  ? "Create Post"
                  : type === "edit"
                  ? "Save Changes"
                  : "Add Content"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
