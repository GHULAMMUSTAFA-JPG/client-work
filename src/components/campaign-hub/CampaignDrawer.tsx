import React from "react";
import {
  X,
  Calendar,
  Clock,
  AlertTriangle,
  Link,
  Globe,
  Edit,
  Trash2,
} from "lucide-react";
import { getIcon, getStatusLabel, getStatusStyles } from "../shared/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  dueDate?: string;
  type: "post" | "content" | "edit" | "details";
  postType?: string;
  initialData?: any;
  isPost?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CampaignDrawer({
  isOpen,
  onClose,
  type,
  title,
  description,
  isPost,
  initialData,
  onEdit,
  onDelete,
}: DrawerProps) {
  if (!isOpen) return null;

  const renderStatusAndBudget = () => (
    <div className="tw-flex tw-items-center tw-justify-between">
      <span
        className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium tw-border ${getStatusStyles(
          initialData?.status
        )}`}
      >
        {getStatusLabel(initialData?.status)}
      </span>
      <div className="tw-flex tw-items-center tw-text-green-600">
        <span className="tw-text-lg tw-font-semibold">
          ${initialData?.budget}
        </span>
      </div>
    </div>
  );

  const renderImportantDates = () => {
    const dates = [
      {
        label: "Created Date",
        icon: Calendar,
        value:
          initialData?.createdAt || initialData?.submittedAt || "Not submitted",
      },
      {
        label: "Due Date",
        icon: Clock,
        value: initialData?.dueDate || "No due date",
      },
      initialData?.goLiveDate && {
        label: "Go Live Date",
        icon: Globe,
        value: initialData.goLiveDate,
      },
    ].filter(Boolean);

    return (
      <div className="tw-mb-6">
        <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
          Important Dates
        </h4>
        <div className="tw-space-y-3">
          {dates.map(({ label, icon: Icon, value }, index) => (
            <div
              key={index}
              className="tw-flex tw-items-center tw-justify-between tw-text-sm"
            >
              <div className="tw-flex tw-items-center tw-text-gray-500">
                <Icon className="tw-w-4 tw-h-4 tw-mr-2" />
                <span>{label}</span>
              </div>
              <span className="tw-font-medium tw-text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLivePostLink = () => {
    if (!initialData?.livePostLink) return null;
    return (
      <div className="tw-mb-6">
        <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
          Live Post
        </h4>
        <a
          href={initialData.livePostLink}
          target="_blank"
          rel="noopener noreferrer"
          className="tw-flex tw-items-center tw-space-x-2 tw-text-primary hover:tw-text-primary-dark"
        >
          <Link className="tw-w-4 tw-h-4" />
          <span className="tw-text-sm">View Live Post</span>
        </a>
      </div>
    );
  };

  const renderRequiredUpdates = () => {
    if (initialData?.status !== "needs_updates" || !initialData?.feedback)
      return null;

    return (
      <div className="tw-mb-6">
        <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
          Required Updates
        </h4>
        <div className="tw-p-4 tw-bg-orange-50 tw-rounded-lg">
          <div className="tw-flex tw-items-start tw-space-x-2">
            <AlertTriangle className="tw-w-5 tw-h-5 tw-text-orange-500 tw-mt-0.5" />
            <div className="tw-flex-1">
              {Array.isArray(initialData.feedback) ? (
                <ul className="tw-space-y-2">
                  {initialData.feedback.map((item: string, index: number) => (
                    <li key={index} className="tw-text-sm tw-text-orange-700">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="tw-text-sm tw-text-orange-700">
                  {initialData.feedback}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVersionStatus = () => {
    if (!initialData?.status) return null;

    return (
      <div className="tw-mb-6">
        <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
          Version Status
        </h4>
        <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
          <span
            className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium tw-border ${getStatusStyles(
              initialData.status
            )}`}
          >
            {getStatusLabel(initialData.status)}
          </span>
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
    if (!isPost) return null;

    return (
      <div className="tw-mb-6">
        <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
          Actions
        </h4>
        <div className="tw-flex tw-space-x-3">
          <button
            onClick={onEdit}
            className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-bg-blue-50 tw-text-blue-600 tw-rounded-md hover:tw-bg-blue-100"
          >
            <Edit className="tw-w-4 tw-h-4 tw-mr-2" />
            <span className="tw-text-sm tw-font-medium">Edit Post</span>
          </button>
          <button
            onClick={onDelete}
            className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-bg-red-50 tw-text-red-600 tw-rounded-md hover:tw-bg-red-100"
          >
            <Trash2 className="tw-w-4 tw-h-4 tw-mr-2" />
            <span className="tw-text-sm tw-font-medium">Delete Post</span>
          </button>
        </div>
      </div>
    );
  };

  return type === "details" ? (
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
                  <span className="tw-p-2 tw-rounded-full tw-bg-gray-100">
                    {getIcon(initialData?.type)}
                  </span>
                  <h2 className="tw-text-xl tw-font-semibold tw-text-gray-900">
                    {title}
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
              <div className="tw-px-6 tw-py-4">
                <div className="tw-mb-6">
                  <h3 className="tw-text-lg tw-font-medium tw-text-gray-900 tw-mb-2">
                    {initialData?.title}
                  </h3>
                  {renderStatusAndBudget()}
                  <p>{description}</p>
                </div>

                {renderImportantDates()}
                {renderVersionStatus()}

                {initialData?.category && (
                  <div>
                    <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
                      Category
                    </h4>
                    <p className="tw-text-gray-500 tw-pb-2">
                      {initialData.category}
                    </p>
                  </div>
                )}

                {isPost && (
                  <div className="tw-mb-6">
                    <h4 className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-3">
                      Post Instructions
                    </h4>
                    <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
                      <p className="tw-text-sm tw-text-gray-600">
                        {initialData?.description || "No instructions provided"}
                      </p>
                    </div>
                  </div>
                )}

                {renderLivePostLink()}
                {renderRequiredUpdates()}
                {renderActionButtons()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
