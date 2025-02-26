export enum Status {
  PendingApproval = 1,
  Approved,
  Rejected,
  InProgress,
  Completed,
  Published,
  Paused,
  Cancelled,
}
export enum CampaignStatus {
  Draft = "Draft",
  Live = "Live",
  Completed = "Completed",
  Closed = "Closed",
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
  country: string;
  jobTitle: string;
  company: string;
  followers: number;
  status: "approved" | "applied" | "not_fit" | "in_discussion" | "invited";
  ongoingSpend: number;
  paymentStatus: "paid" | "in_process" | "unpaid";
  impressions?: number;
  engagement?: number;
  averageImpressions: number;
  averageEngagement: number;
  submissionDate?: string;
  contentStatus?: string;
  postsCompleted?: number;
  totalPosts?: number;
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
  id: string;
  title: string;
  date: string;
  status: "in_review" | "approved" | "published";
  content: string;
  impressions: number | null;
  engagement: number | null;
  link?: string;
  contentItems: ContentItem[];
}

export interface ContentItem {
  id: string;
  type: "image" | "video" | "text";
  content: string;
  date: string;
  status: "draft" | "in_review" | "approved" | "published";
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isCreator: boolean;
}
