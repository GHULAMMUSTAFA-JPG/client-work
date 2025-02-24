export const postStages = [
  {
    id: 1,
    label: "Draft Upload",
    description: "Upload your initial content draft for review",
    status: "completed" as const,
  },
  {
    id: 2,
    label: "See Feedback",
    description: "Review feedback from the brand team",
    status: "completed" as const,
  },
  {
    id: 3,
    label: "Approved",
    description: "Content has been approved by the brand",
    status: "completed" as const,
  },
  {
    id: 4,
    label: "Live Post Link",
    description: "Share the link to your published content",
    status: "completed" as const,
  },
  {
    id: 5,
    label: "Impression Upload",
    description: "Upload engagement metrics and impressions",
    status: "pending" as const,
  },
  {
    id: 6,
    label: "Payment",
    description: "Payment processing and completion",
    status: "inactive" as const,
  },
];

export const transactions = [
  {
    id: "1",
    date: "Mar 15, 2024",
    campaignName: "AI Social27 - Instagram Reel",
    amount: 400,
    status: "completed" as const,
    postDetails: {
      title: "One (1) Instagram Reel",
      type: "instagram-reel",
      agreedAmount: 400,
      paidAmount: 400,
      status: "Completed",
    },
  },
  {
    id: "2",
    date: "Mar 15, 2024",
    campaignName: "AI Social27 - Instagram Image",
    amount: 300,
    status: "processing" as const,
    postDetails: {
      title: "One (1) Instagram Image",
      type: "instagram-image",
      agreedAmount: 300,
      paidAmount: 0,
      status: "Processing",
    },
  },
  {
    id: "3",
    date: "Mar 31, 2024",
    campaignName: "AI Social27 - TikTok Post",
    amount: 300,
    status: "pending" as const,
    postDetails: {
      title: "One (1) TikTok post",
      type: "tiktok",
      agreedAmount: 300,
      paidAmount: 0,
      status: "Pending",
    },
  },
];
