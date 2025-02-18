import React, { useState } from "react";
import {
  Check,
  MessageSquare,
  Link as LinkIcon,
  Upload,
  DollarSign,
  HelpCircle,
  FileText,
} from "lucide-react";
import { createCampaignPostSubmission } from "@/@api/campaign";

interface PostStage {
  id: string;
  label: string;
  description: string;
  value?: string | number;
  status: "completed" | "pending" | "inactive";
  icon?: React.ReactNode;
}

interface PostProgressProps {
  postId: string;
  stages: PostStage[];
  onStageClick?: (stageId: string) => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ImpressionUploadModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    submission_title: "",
    submission_text_content: "",
    media_content: [] as File[],
  });
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        media_content: [...prev.media_content, ...Array.from(files)],
      }));
    }
  };

  const handleSubmit = async () => {
    if (formData.media_content.length === 0) return;

    try {
      const response = await createCampaignPostSubmission({
        campaign_id: "CAMPAIGN_ID", // Replace with actual campaign ID
        creator_id: "CREATOR_ID", // Replace with actual creator ID
        post_id: "POST_ID", // Replace with actual post ID
        submission_title: formData.submission_title,
        submission_text_content: formData.submission_text_content,
        media_content: formData.media_content,
      });

      if (response) {
        setSuccessMessage(
          "✅ Your impressions have been submitted and are under review."
        );
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
          setFormData({
            submission_title: "",
            submission_text_content: "",
            media_content: [],
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting impressions:", error);
    }
  };

  return (
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload Impressions</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {successMessage ? (
              <div className="text-center py-3">
                <p className="text-success">{successMessage}</p>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label">Submission Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.submission_title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        submission_title: e.target.value,
                      }))
                    }
                    placeholder="Enter submission title"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={formData.submission_text_content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        submission_text_content: e.target.value,
                      }))
                    }
                    placeholder="Enter submission description"
                    rows={3}
                  />
                </div>

                <div className="mb-3">
                  <p className="text-muted small mb-2">
                    Please upload your campaign impressions data in one of the
                    following formats:
                  </p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {["JPG", "PNG", "PDF", "CSV"].map((format) => (
                      <span
                        key={format}
                        className="badge bg-light text-secondary"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-2 border-dashed rounded p-4 mb-3 text-center">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".jpg,.jpeg,.png,.pdf,.csv"
                    className="d-none"
                    id="file-upload"
                    multiple
                  />
                  <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    <FileText className="mx-auto mb-2" size={48} />
                    <p className="mb-1 text-muted">
                      {formData.media_content.length > 0
                        ? `${formData.media_content.length} files selected`
                        : "Click to upload or drag and drop"}
                    </p>
                    <small className="text-muted">Up to 10MB per file</small>
                  </label>
                </div>

                {formData.media_content.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-2">Selected Files:</p>
                    {formData.media_content.map((file, index) => (
                      <div key={index} className="small text-muted">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className={`btn ${
                formData.media_content.length > 0
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={handleSubmit}
              disabled={formData.media_content.length === 0}
            >
              Submit Impressions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostProgress({
  postId,
  stages,
  onStageClick,
}: PostProgressProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStageIcon = (stage: PostStage) => {
    if (stage.icon) return stage.icon;

    const icons = {
      "Draft Upload": <Upload className="w-4 h-4" />,
      "See Feedback": <MessageSquare className="w-4 h-4" />,
      Approved: <Check className="w-4 h-4" />,
      "Live Post Link": <LinkIcon className="w-4 h-4" />,
      "Impression Upload": <Upload className="w-4 h-4" />,
      Payment: <DollarSign className="w-4 h-4" />,
    };

    return (
      icons[stage.label as keyof typeof icons] || (
        <div
          className="rounded-circle bg-secondary"
          style={{ width: "0.5rem", height: "0.5rem" }}
        />
      )
    );
  };

  const getStageColor = (stage: PostStage, isHovered: boolean) => {
    const currentStageIndex = stages.findIndex((s) => s.status === "pending");
    const stageIndex = stages.findIndex((s) => s.id === stage.id);
    const isNextStage = stageIndex === currentStageIndex;
    const isPreviousStageCompleted =
      stageIndex > 0 ? stages[stageIndex - 1].status === "completed" : true;

    switch (stage.status) {
      case "completed":
        return {
          bg: "bg-primary",
          border: "border-primary",
          text: "text-white",
          line: "bg-primary",
        };
      case "pending":
        if (isNextStage && isPreviousStageCompleted) {
          return {
            bg: "bg-success",
            border: "border-primary",
            text: "text-white",
            line: "bg-black",
          };
        }
        return {
          bg: "bg-secondary",
          border: "border-secondary",
          text: "text-secondary",
          line: "bg-secondary",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-secondary",
          text: "text-muted",
          line: "bg-secondary",
        };
    }
  };

  const isStageClickable = (stage: PostStage, index: number) => {
    const previousStage = index > 0 ? stages[index - 1] : null;
    return (
      stage.status === "pending" &&
      (!previousStage || previousStage.status === "completed")
    );
  };

  const handleStageClick = (stage: PostStage, index: number) => {
    if (!isStageClickable(stage, index)) {
      const previousStage = stages[index - 1];
      if (previousStage && previousStage.status !== "completed") {
        setShowTooltip(
          `You must complete "${previousStage.label}" before proceeding to this step.`
        );
        setTimeout(() => setShowTooltip(null), 3000);
      }
      return;
    }

    onStageClick?.(stage.id);
  };

  const currentStageIndex = stages.findIndex(
    (stage) => stage.status === "pending"
  );
  const progress =
    ((currentStageIndex === -1 ? stages.length : currentStageIndex) /
      stages.length) *
    100;

  const isLivePostSubmitted = stages[3]?.status === "completed";
  const isImpressionStage = stages[4]?.label === "Impression Upload";

  return (
    <div className="p-4 border-bottom">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="h4 mb-0">Post Progress</h2>
        <div className="d-flex align-items-center text-muted small">
          <HelpCircle className="me-2" size={16} />
          <span>Hover over steps for details</span>
        </div>
      </div>

      <div className="position-relative">
        <div className="d-flex justify-content-between position-relative">
          {stages.map((stage, index) => {
            const colors = getStageColor(stage, hoveredStage === stage.id);
            const isClickable = isStageClickable(stage, index);
            const stageNumber = index + 1;

            return (
              <div
                key={stage.id}
                className="d-flex flex-column align-items-center position-relative"
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <button
                  onClick={() => handleStageClick(stage, index)}
                  className={`btn ${colors.bg} rounded-circle border-2 ${
                    colors.border
                  } ${isClickable ? "" : "disabled"}`}
                  style={{ width: "40px", height: "40px", padding: 0 }}
                  disabled={!isClickable}
                >
                  <span className={`${colors.text} fw-medium`}>
                    {stageNumber}
                  </span>
                </button>

                <div className="mt-3 text-center">
                  <div className="d-flex align-items-center gap-2">
                    {getStageIcon(stage)}
                    <span className={`small fw-medium text-muted`}>
                      {stage.label}
                    </span>
                  </div>
                  {stage.value && (
                    <span className="small text-muted d-block mt-1">
                      {typeof stage.value === "number"
                        ? stage.value.toLocaleString()
                        : stage.value}
                    </span>
                  )}
                </div>

                {hoveredStage === stage.id && (
                  <div
                    className="position-absolute bottom-100 start-50 translate-middle-x mb-3 bg-dark text-white rounded p-2"
                    style={{ width: "250px", zIndex: 1000 }}
                  >
                    <div
                      className="position-absolute top-100 start-50 translate-middle-x"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid #212529",
                      }}
                    ></div>
                    <p className="fw-medium mb-1">{stage.label}</p>
                    <p className="small text-white-50 mb-0">
                      {stage.description}
                    </p>
                  </div>
                )}

                {showTooltip && !isClickable && hoveredStage === stage.id && (
                  <div
                    className="position-absolute bottom-100 start-50 translate-middle-x mb-3 bg-danger text-white rounded p-2"
                    style={{ width: "250px", zIndex: 1000 }}
                  >
                    <div
                      className="position-absolute top-100 start-50 translate-middle-x"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid #dc3545",
                      }}
                    ></div>
                    <p className="small mb-0">{showTooltip}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="mt-4 w-100 bg-secondary rounded-pill"
          style={{ height: "0.5rem" }}
        >
          <div
            className="bg-primary h-100 rounded-pill transition"
            style={{
              width: `${
                (stages.filter((s) => s.status === "completed").length /
                  stages.length) *
                100
              }%`,
              transition: "width 0.5s",
            }}
          />
        </div>
        {isImpressionStage && (
          <div className="mt-4 text-center">
            <div className="position-relative d-inline-block">
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!isLivePostSubmitted}
                className={`btn ${
                  isLivePostSubmitted ? "btn-primary" : "btn-secondary"
                }`}
                onMouseEnter={() =>
                  !isLivePostSubmitted &&
                  setShowTooltip(
                    "You must submit the Live Post Link before uploading impressions"
                  )
                }
                onMouseLeave={() => setShowTooltip(null)}
              >
                <Upload className="me-2" size={16} />
                Submit Impressions
              </button>

              {showTooltip && !isLivePostSubmitted && (
                <div
                  className="position-absolute bottom-100 start-50 translate-middle-x mb-2 bg-dark text-white rounded p-2"
                  style={{ width: "250px" }}
                >
                  <div
                    className="position-absolute top-100 start-50 translate-middle-x"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "8px solid #212529",
                    }}
                  ></div>
                  <p className="small mb-0">{showTooltip}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ImpressionUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
