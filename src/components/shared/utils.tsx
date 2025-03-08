import { CampaignStatus, Status } from "@/types";

export const getStatusStyles = (status: Status) => {
  const baseStyles =
    "tw-inline-flex tw-items-center tw-px-2.5 tw-py-0.5 tw-rounded-full tw-text-xs tw-font-medium";

  switch (status) {
    case Status.PendingApproval:
      return `${baseStyles} tw-bg-orange-100 tw-text-orange-800 tw-border tw-border-orange-200`;
    case Status.Approved:
      return `${baseStyles} tw-bg-yellow-100 tw-text-yellow-800 tw-border tw-border-yellow-200`;
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

export const getCampaignStatusStyles = (status: Status | CampaignStatus) => {
  const baseStyles =
    "tw-inline-flex tw-items-center tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-rounded";

  switch (status) {
    case Status.Approved:
      return `${baseStyles} tw-bg-green-100 tw-text-green-800`;
    case Status.Rejected:
      return `${baseStyles} tw-bg-red-100 tw-text-red-800`;
    case Status.PendingApproval:
      return `${baseStyles} tw-bg-yellow-100 tw-text-yellow-800`;
    case Status.InProgress:
      return `${baseStyles} tw-bg-blue-100 tw-text-blue-800`;
    case Status.Completed:
      return `${baseStyles} tw-bg-purple-100 tw-text-purple-800`;
    case Status.Published:
      return `${baseStyles} tw-bg-indigo-100 tw-text-indigo-800`;
    case Status.Paused:
      return `${baseStyles} tw-bg-orange-100 tw-text-orange-800`;
    case Status.Cancelled:
      return `${baseStyles} tw-bg-gray-100 tw-text-gray-600`;
    default:
      return baseStyles;
  }
};

export const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.PendingApproval:
      return "Awaiting Approval";
    case Status.Approved:
      return "Pending Feedback";
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
    case Status.Unpaid:
      return "Unpaid";
    case Status.Paid:
      return "Paid";
    case Status.PaymentProcessing:
      return "Payment Processing";
    case Status.PostImpressionUploaded:
      return "Post Impression Uploaded";
    default:
      return "Unknown Status";
  }
};

export const getIcon = (postType: string) => {
  switch (postType) {
    case "text":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_iconhello"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "image":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "video":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "document":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "poll":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "article":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "newsletter":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "event":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    case "link":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="post_icon"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      );
  }
};
