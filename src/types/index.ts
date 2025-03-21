export enum Status {
  PendingApproval = 1,
  Approved = 2,
  Rejected = 3,
  InProgress = 4,
  Completed = 5,
  Published = 6,
  Paused = 7,
  Cancelled = 8,
  Unpaid = 9,
  Paid = 10,
  PaymentProcessing = 11,
  PostImpressionUploaded = 12,
}
export enum CampaignStatus {
  Draft = "Draft",
  Live = "Live",
  Completed = "Completed",
  Closed = "Closed",
  Paused = "Paused",
  Cancelled = "Cancelled",
}

export interface PaymentStatus {
  status: "completed" | "processing" | "pending_approval" | "issue";
  expectedDate?: string;
  issueDetails?: string;
  lastUpdated?: string;
}
export interface Creator {
  id: string;
  name: string;
  profilePicture?: string;
  linkedInId?: string;
  country?: string;
  jobTitle?: string;
  company?: string;
  followers?: number;
  status?: CreatorStatus;
  ongoingSpend?: number;
  paymentStatus?: "paid" | "in_process" | "unpaid";
  impressions?: number;
  engagement?: number;
  averageImpressions: number;
  averageEngagement: number;
  submissionDate?: string;
  contentStatus?: string;
  postsCompleted?: number;
  totalPosts?: number;
  posts?: Post[];
  liveLink?: string;
  embedLink?: string;
}

export interface Campaign {
  id: string;
  name: string;
  budget: number;
  totalSpend: number;
  forecastedSpend: number;
  startDate: string;
  status: "public" | "private";
  creators: Creator[];
  totalPosts?: number;
  totalCreators: number;
  activeCreators: number;
}

export interface Post {
  numberstatus: number;
  description: string;
  dueDate: any;
  id: string;
  title: string;
  date: string;
  status: "in_review" | "approved" | "published" | "rejected";
  content: string;
  impressions: number | null;
  link?: string;
  contentItems: ContentItem[];
  liveLink?: string;
  embedLink?: string;
  clicks?: number;
  comments?: number;
  reposts?: number;
  engagementRate?: number;
  reactions?: number;
  Budget?:number;
}

export interface ContentItem {
  id: string;
  type: "image" | "video" | "text";
  content: string;
  date: string;
  status: "draft" | "in_review" | "approved" | "published";
  images: string[];
  links: string[];
  embeddedLink?: string;
  liveLink?: string;
}

export enum CreatorStatus {
  Approved = "Approved",
  InDiscussion = "In Discussion",
  Invited = "Invited",
  Applied = "Applied",
  NotFit = "Not_Fit",
}
