import React, { useState } from "react";
import { X, Calendar, Clock, AlertCircle, DollarSign } from "lucide-react";
import { linkedInPostTypes } from "@/types/linkedin";
import { createCampaignPost } from "@/@api/campaign";

interface CreatePostDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  creatorId: string;
  campaignStatus: string;
  onSubmit: () => void;
}

export function CreatePostDrawer({
  isOpen,
  onClose,
  campaignId,
  creatorId,
  campaignStatus,
  onSubmit,
}: CreatePostDrawerProps) {
  const [postType, setPostType] = useState("");
  const [budget, setBudget] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    let hasErrors = false;

    if (!postType) {
      errors.postType = "Please select a post type";
      hasErrors = true;
    }
    if (!budget) {
      errors.budget = "Please enter a proposed budget";
      hasErrors = true;
    }
    if (!dueDate) {
      errors.dueDate = "Please select a due date";
      hasErrors = true;
    }
    if (!description) {
      errors.description = "Please enter a post description";
      hasErrors = true;
    }

    setFieldErrors(errors);

    if (hasErrors) {
      setError("Please fill in all required fields");
      return;
    }

    setError("");
    const postData = {
      campaign_id: campaignId,
      creator_id: creatorId,
      budget: parseFloat(budget),
      category: postType,
      title: postType,
      description,
      submission_date: new Date().toISOString(),
      due_date: new Date(dueDate).toISOString(),
    };

    const response = await createCampaignPost(postData);

    if (!response) {
      setError("Failed to create post. Please try again.");
      return;
    }

    setPostType("");
    setBudget("");
    setDueDate("");
    setDescription("");
    setFieldErrors({});
    onClose();
    onSubmit();
  };

  const today = new Date().toISOString().split("T")[0];

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
                  Create New Post
                </h2>
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
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    Post Type <span className="tw-text-red-500">*</span>
                    {fieldErrors.postType && (
                      <span className="tw-ml-2 tw-text-red-600 tw-text-xs">
                        {fieldErrors.postType}
                      </span>
                    )}
                  </label>
                  <div className="tw-relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`tw-w-full tw-bg-white tw-px-4 tw-py-3 tw-text-left tw-border ${
                        fieldErrors.postType
                          ? "tw-border-red-500"
                          : "tw-border-gray-300"
                      } tw-rounded-lg tw-shadow-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary focus:tw-border-primary`}
                    >
                      {postType ? (
                        <span>
                          {
                            linkedInPostTypes.find(
                              (type) => type.label === postType
                            )?.label
                          }
                        </span>
                      ) : (
                        <span className="tw-text-gray-500">
                          Select LinkedIn post type...
                        </span>
                      )}
                    </button>

                    {isDropdownOpen && (
                      <div className="tw-absolute tw-z-10 tw-mt-1 tw-w-full tw-bg-white tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-200">
                        {linkedInPostTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setPostType(type.label);
                              setIsDropdownOpen(false);
                              setFieldErrors({ ...fieldErrors, postType: "" });
                            }}
                            className="tw-w-full tw-px-4 tw-py-3 tw-text-left hover:tw-bg-gray-50"
                          >
                            <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                              {type.label}
                            </div>
                            <div className="tw-text-xs tw-text-gray-500">
                              {type.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <DollarSign className="tw-w-4 tw-h-4 tw-text-gray-400" />
                      <span>
                        Proposed Budget{" "}
                        <span className="tw-text-red-500">*</span>
                      </span>
                      {fieldErrors.budget && (
                        <span className="tw-ml-2 tw-text-red-600 tw-text-xs">
                          {fieldErrors.budget}
                        </span>
                      )}
                    </div>
                  </label>
                  <div className="tw-mt-1 tw-relative tw-rounded-md tw-shadow-sm">
                    <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-3 tw-flex tw-items-center tw-pointer-events-none">
                      <span className="tw-text-gray-500 tw-sm:tw-text-sm">
                        $
                      </span>
                    </div>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                        setFieldErrors({ ...fieldErrors, budget: "" });
                      }}
                      className={`tw-w-full tw-pl-7 tw-pr-12 tw-py-2 tw-border ${
                        fieldErrors.budget
                          ? "tw-border-red-500"
                          : "tw-border-gray-300"
                      } tw-rounded-md focus:tw-ring-primary focus:tw-border-primary`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Campaign Status */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    Campaign Status
                  </label>
                  <div className="tw-mt-1">
                    <div className="tw-px-4 tw-py-2 tw-bg-blue-50 tw-text-blue-700 tw-rounded-md tw-border tw-border-blue-200">
                      {campaignStatus}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <Clock className="tw-w-4 tw-h-4 tw-text-gray-400" />
                      <span>Submission Date</span>
                    </div>
                  </label>
                  <div className="tw-mt-1">
                    <div className="tw-px-4 tw-py-2 tw-bg-gray-50 tw-text-gray-700 tw-rounded-md tw-border tw-border-gray-200">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {/* Due Date */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <Calendar className="tw-w-4 tw-h-4 tw-text-gray-400" />
                      <span>
                        Due Date <span className="tw-text-red-500">*</span>
                      </span>
                      {fieldErrors.dueDate && (
                        <span className="tw-ml-2 tw-text-red-600 tw-text-xs">
                          {fieldErrors.dueDate}
                        </span>
                      )}
                    </div>
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => {
                      setDueDate(e.target.value);
                      setFieldErrors({ ...fieldErrors, dueDate: "" });
                    }}
                    min={today}
                    className={`tw-w-full tw-px-3 tw-py-2 tw-border ${
                      fieldErrors.dueDate
                        ? "tw-border-red-500"
                        : "tw-border-gray-300"
                    } tw-rounded-md focus:tw-ring-primary focus:tw-border-primary`}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    Description <span className="tw-text-red-500">*</span>
                    {fieldErrors.description && (
                      <span className="tw-ml-2 tw-text-red-600 tw-text-xs">
                        {fieldErrors.description}
                      </span>
                    )}
                  </label>
                  <div className="tw-mt-1 tw-relative tw-rounded-md tw-shadow-sm">
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setFieldErrors({ ...fieldErrors, description: "" });
                      }}
                      rows={4}
                      className={`tw-w-full tw-pl-7 tw-pr-12 tw-py-2 tw-border ${
                        fieldErrors.description
                          ? "tw-border-red-500"
                          : "tw-border-gray-300"
                      } tw-rounded-md focus:tw-ring-primary focus:tw-border-primary`}
                      placeholder="Enter post description..."
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="tw-px-6 tw-py-4 tw-border-t tw-border-gray-200">
              <div className="tw-flex tw-justify-end tw-space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-bg-white tw-border tw-border-gray-300 tw-rounded-md hover:tw-bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-primary hover:tw-bg-primary-dark tw-rounded-md"
                >
                  Submit Proposal for Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
