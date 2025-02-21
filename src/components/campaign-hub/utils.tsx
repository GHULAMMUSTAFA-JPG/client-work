import { CampaignStatus, Status } from "@/types";
import {
  Link as LinkIcon,
  FileText,
  Instagram,
  Atom as Tiktok,
  Youtube,
} from "lucide-react";

export const getStatusStyles = (status: Status) => {
  const baseStyles =
    "tw-inline-flex tw-items-center tw-px-2.5 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-medium";

  switch (status) {
    case Status.PendingApproval:
      return `${baseStyles} tw-bg-orange-100 tw-text-orange-800 tw-border tw-border-orange-200`;
    case Status.Approved:
      return `${baseStyles} tw-bg-green-100 tw-text-green-800 tw-border tw-border-green-200`;
    case Status.Rejected:
      return `${baseStyles} tw-bg-red-100 tw-text-red-800 tw-border tw-border-red-200`;
    case Status.InProgress:
      return `${baseStyles} tw-bg-yellow-100 tw-text-yellow-800 tw-border tw-border-yellow-200`;
    case Status.Completed:
      return `${baseStyles} tw-bg-gray-100 tw-text-gray-800 tw-border tw-border-gray-200`;
    case Status.Published:
      return `${baseStyles} tw-bg-blue-100 tw-text-blue-800 tw-border tw-border-blue-200`;
    case Status.Paused:
      return `${baseStyles} tw-bg-purple-100 tw-text-purple-800 tw-border tw-border-purple-200`;
    case Status.Cancelled:
      return `${baseStyles} tw-bg-gray-300 tw-text-gray-600 tw-border tw-border-gray-400`;
    default:
      return baseStyles;
  }
};

export const getCampaignStatusStyles = (status: CampaignStatus) => {
  const baseStyles =
    "tw-inline-flex tw-items-center tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-rounded";

  switch (status) {
    case CampaignStatus.Draft:
      return `${baseStyles} tw-bg-gray-100 tw-text-gray-800`;
    case CampaignStatus.Live:
      return `${baseStyles} tw-bg-blue-100 tw-text-blue-800`;
    case CampaignStatus.Completed:
      return `${baseStyles} tw-bg-green-100 tw-text-green-800`;
    case CampaignStatus.Closed:
      return `${baseStyles} tw-bg-gray-100 tw-text-gray-600`;
    default:
      return baseStyles;
  }
};

export const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.PendingApproval:
      return "Pending Feedback";
    case Status.Approved:
      return "Approved to Publish";
    case Status.Rejected:
      return "Rejected";
    case Status.InProgress:
      return "In Progress";
    case Status.Completed:
      return "Completed";
    case Status.Published:
      return "Published";
    case Status.Paused:
      return "Paused";
    case Status.Cancelled:
      return "Cancelled";
    default:
      return "Unknown Status";
  }
};

export const getIcon = (postType: string) => {
  switch (postType) {
    case "instagram-reel":
    case "instagram-image":
      return <Instagram className="tw-w-6 tw-h-6" />;
    case "tiktok":
      return <Tiktok className="tw-w-6 tw-h-6" />;
    case "youtube":
      return <Youtube className="tw-w-6 tw-h-6" />;
    default:
      return <FileText className="tw-w-6 tw-h-6" />;
  }
};
