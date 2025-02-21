import React, { useState } from "react";
import { X, Calendar, AlertCircle, DollarSign } from "lucide-react";
import { linkedInPostTypes } from "@/types/linkedin";

interface CreatePostDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

export function CreatePostDrawer({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostDrawerProps) {
  const [postType, setPostType] = useState("");
  const [budget, setBudget] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!postType) {
      setError("Please select a post type");
      return;
    }

    if (!budget) {
      setError("Please enter a proposed budget");
      return;
    }

    if (!dueDate) {
      setError("Please select a due date");
      return;
    }

    const postData = {
      type: postType,
      budget: parseFloat(budget),
      submissionDate: new Date().toISOString(),
      dueDate,
      instructions,
      campaignStatus: "Campaign Live",
    };

    onSubmit(postData);
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

            {/* Content */}
            <div className="tw-flex-1 tw-overflow-y-auto">
              <form onSubmit={handleSubmit} className="tw-p-6 tw-space-y-6">
                {/* Post Type Selection */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    Post Type
                  </label>
                  <div className="tw-relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="tw-w-full tw-bg-white tw-px-4 tw-py-3 tw-text-left tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary focus:tw-border-primary"
                    >
                      {postType ? (
                        <span>
                          {
                            linkedInPostTypes.find(
                              (type) => type.id === postType
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
                              setPostType(type.id);
                              setIsDropdownOpen(false);
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
                      <span>Proposed Budget</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="tw-w-full tw-pl-7 tw-pr-12 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-primary focus:tw-border-primary"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <Calendar className="tw-w-4 tw-h-4 tw-text-gray-400" />
                      <span>Due Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={today}
                    className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-primary focus:tw-border-primary"
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
                    Instructions Box
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={4}
                    className="tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-primary focus:tw-border-primary"
                    placeholder="Provide any special notes or instructions for the brand..."
                  />
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
