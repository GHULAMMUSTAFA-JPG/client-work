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
