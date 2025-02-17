export type PostType =
  | "instagram-reel"
  | "instagram-image"
  | "tiktok"
  | "youtube";
export type PostStatus = "pending" | "approved" | "rejected";
export type VersionStatus = PostStatus | "draft";

export interface Post {
  id: string;
  type: PostType;
  title: string;
  status: PostStatus;
  budget: number;
  description?: string;
  submittedDate?: string;
  goLiveDate?: string;
  dueDate?: string;
}

export interface Version {
  id: string;
  date: string;
  imageUrl?: string;
  status: VersionStatus;
  feedback?: string[];
  livePostLink?: string;
  postType: PostType;
}

export interface PostStage {
  id: string;
  label: string;
  value?: string | number;
  status: "completed" | "pending" | "inactive";
  icon?: React.ReactNode;
}

export interface PaymentStatus {
  status: "completed" | "processing" | "pending_approval" | "issue";
  expectedDate?: string;
  issueDetails?: string;
  lastUpdated?: string;
}
