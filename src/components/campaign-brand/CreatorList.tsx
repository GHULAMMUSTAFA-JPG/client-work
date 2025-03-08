import React from "react";
import {
  MessageSquare,
  CheckCircle,
  ThumbsDown,
  HelpCircle,
} from "lucide-react";
import { GB, US, CA } from "country-flag-icons/react/3x2";
import Tooltip from "../Tooltip";
import { Creator, CreatorStatus } from "@/types";

const CountryFlag = ({ country }: { country: string }) => {
  const flags: Record<string, React.ComponentType<{ className?: string }>> = {
    USA: US,
    GB: GB,
    Canada: CA,
  };

  const Flag = flags[country];
  return Flag ? <Flag className="tw-w-4 tw-h-4" /> : null;
};

interface CreatorListProps {
  creators: Creator[];
  onStatusChange: (creatorId: string, newStatus: CreatorStatus) => void;
  onMessageCreator: (creatorId: string) => void;
}

export default function CreatorList({
  creators,
  onStatusChange,
  onMessageCreator,
}: CreatorListProps) {
  const getStatusBadgeClass = (status: Creator["status"]) => {
    const baseClasses =
      "tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium";
    switch (status) {
      case CreatorStatus.Approved:
        return `${baseClasses} tw-bg-green-100 tw-text-green-800`;
      case CreatorStatus.Applied:
        return `${baseClasses} tw-bg-yellow-100 tw-text-yellow-800`;
      case CreatorStatus.NotFit:
        return `${baseClasses} tw-bg-red-100 tw-text-red-800`;
      case CreatorStatus.InDiscussion:
        return `${baseClasses} tw-bg-blue-100 tw-text-blue-800`;
      case CreatorStatus.Invited:
        return `${baseClasses} tw-bg-purple-100 tw-text-purple-800`;
      default:
        return `${baseClasses} tw-bg-gray-100 tw-text-gray-800`;
    }
  };

  const getDateLabel = (status: Creator["status"]) => {
    switch (status) {
      case CreatorStatus.Invited:
        return "INVITE DATE";
      case CreatorStatus.Applied:
        return "APPLIED DATE";
      default:
        return "SUBMISSION DATE";
    }
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-border tw-overflow-hidden">
      <div className="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-4 tw-bg-teal-600 tw-text-white">
        <div className="tw-col-span-3 tw-font-medium">CREATOR</div>
        <div className="tw-col-span-2 tw-font-medium">STATUS</div>
        <div className="tw-col-span-4 tw-font-medium">
          <div className="tw-flex tw-items-center tw-gap-2">
            METRICS
            <Tooltip content="Average impressions and engagement rate across all posts">
              <HelpCircle className="tw-w-4 tw-h-4" />
            </Tooltip>
          </div>
        </div>
        <div className="tw-col-span-2 tw-font-medium">
          {getDateLabel(creators[0]?.status || CreatorStatus.Applied)}
        </div>
        <div className="tw-col-span-1 tw-font-medium tw-text-right">
          ACTIONS
        </div>
      </div>

      <div className="tw-divide-y">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="tw-grid tw-grid-cols-12 tw-gap-4 tw-p-4 tw-items-center hover:tw-bg-gray-50 tw-transition-colors tw-duration-150"
          >
            <div className="tw-col-span-3">
              <div className="tw-flex tw-items-center tw-space-x-3">
                {creator.profilePicture ? (
                  <img
                    src={creator.profilePicture}
                    alt={creator.name}
                    className="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover"
                  />
                ) : (
                  <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-gray-200 tw-flex tw-items-center tw-justify-center">
                    <span className="tw-text-gray-500 tw-text-lg">
                      {creator.name[0]}
                    </span>
                  </div>
                )}
                <div>
                  <div className="tw-font-medium tw-flex tw-items-center tw-gap-2">
                    {creator.name}
                    {creator.country && (
                      <CountryFlag country={creator.country} />
                    )}
                  </div>
                  {creator.jobTitle && (
                    <div className="tw-text-sm tw-text-gray-500">
                      {creator.jobTitle} at {creator.company}
                    </div>
                  )}
                  {creator?.linkedInId && (
                    <a
                      href={`https://linkedin.com/in/${creator?.linkedInId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tw-text-sm tw-text-blue-600 hover:tw-underline tw-flex tw-items-center tw-mt-1"
                    >
                      <svg
                        className="tw-w-4 tw-h-4 tw-mr-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                      {creator?.followers?.toLocaleString()} followers
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="tw-col-span-2">
              <span className={getStatusBadgeClass(creator.status)}>
                {creator.status?.replace("_", " ")}
              </span>
            </div>

            <div className="tw-col-span-4">
              <div>
                <div className="tw-font-medium">
                  {creator.averageImpressions.toLocaleString()} avg. impressions
                </div>
                <div className="tw-text-sm tw-text-gray-500">
                  {creator.averageEngagement}% avg. engagement
                </div>
              </div>
            </div>

            <div className="tw-col-span-2 tw-text-gray-600">
              {creator.submissionDate
                ? new Date(creator.submissionDate).toLocaleDateString()
                : "-"}
            </div>

            <div className="tw-col-span-1 tw-flex tw-justify-end tw-space-x-2">
              <Tooltip content="Send a message to the creator">
                <button
                  onClick={() => onMessageCreator(creator.id)}
                  className="tw-p-2 tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-100 tw-rounded-lg tw-transition-colors tw-duration-150"
                >
                  <MessageSquare className="tw-w-5 tw-h-5" />
                </button>
              </Tooltip>

              {creator.status === CreatorStatus.Applied && (
                <>
                  <Tooltip content="Approve creator for the campaign">
                    <button
                      onClick={() =>
                        onStatusChange(creator.id, CreatorStatus.Approved)
                      }
                      className="tw-p-2 tw-text-green-600 hover:tw-text-green-700 hover:tw-bg-green-50 tw-rounded-lg tw-transition-colors tw-duration-150"
                    >
                      <CheckCircle className="tw-w-5 tw-h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Archive without notifying the creator">
                    <button
                      onClick={() =>
                        onStatusChange(creator.id, CreatorStatus.NotFit)
                      }
                      className="tw-p-2 tw-text-gray-600 hover:tw-text-gray-700 hover:tw-bg-gray-50 tw-rounded-lg tw-transition-colors tw-duration-150"
                    >
                      <ThumbsDown className="tw-w-5 tw-h-5" />
                    </button>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
