"use client";
import React, { Suspense, useEffect, useState } from "react";
import { CampaignHeader } from "@/components/campaign-hub/CampaignHeader";
import { CampaignTabs } from "@/components/campaign-hub/CampaignTabs";
import { PostsList } from "@/components/campaign-hub/PostsList";
import { PostProgress } from "@/components/campaign-hub/PostProgress";
import { ContentVersions } from "@/components/campaign-hub/ContentVersions";
import { CampaignDrawer } from "@/components/campaign-hub/CampaignDrawer";
import { EarningsDrawer } from "@/components/campaign-hub/EarningsDrawer";
import { CreatePostDrawer } from "@/components/campaign-hub/CreatePostDrawer";
import { useAuth } from "@/contexts/AuthContext";
import { redirect, useSearchParams } from "next/navigation";
import { getCampaignCreatorPosts } from "@/@api/campaign";
import { CampaignStatus, Status } from "@/types";
import { formatDate } from "@/utils";
import { withAuthRole } from "@/utils/withAuthRole";

function CampaignHubContent() {
  const [activeTab, setActiveTab] = useState<Status | "all">("all");
  const [selectedPostId, setSelectedPostId] = useState("1");
  const [isNewPostDrawerOpen, setIsNewPostDrawerOpen] = useState(false);
  const [isNewContentDrawerOpen, setIsNewContentDrawerOpen] = useState(false);
  const [isEarningsDrawerOpen, setIsEarningsDrawerOpen] = useState(false);
  const [isCreatePostDrawerOpen, setIsCreatePostDrawerOpen] = useState(false);

  const [campaignData, setCampaignData] = useState<any>(null);
  const { user, setIsLoading } = useAuth();
  const searchParams = useSearchParams();
  const getCampaignPostsList = async (code: string) => {
    try {
      setIsLoading(true);
      const response = await getCampaignCreatorPosts({
        creator_id: user?.uuid as string,
        campaign_id: code,
      });
      setCampaignData(response);
    } catch (error) {
      console.error("Error fetching campaign posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const code = searchParams.get("id");
    if (!code) {
      redirect("/campaigns");
      return;
    }

    if (user) {
      getCampaignPostsList(code);
    }
  }, [searchParams, user]);

  const transformedTabs = (campaignData: any) => {
    const posts = campaignData?.Posts || [];

    return [
      {
        label: "All (Recent)",
        count: posts.length,
        status: "all",
      },
      {
        label: "Pending Feedback",
        count: posts.filter(
          (post: any) => post.Status === Status.PendingApproval
        ).length,
        status: Status.PendingApproval,
      },
      {
        label: "Approved To Publish",
        count: posts.filter((post: any) => post.Status === Status.Approved)
          .length,
        status: Status.Approved,
      },
      {
        label: "Upload Impressions",
        count: posts.filter((post: any) => post.Status === Status.InProgress)
          .length,
        status: Status.InProgress,
      },
      {
        label: "Completed",
        count: posts.filter((post: any) => post.Status === Status.Completed)
          .length,
        status: Status.Completed,
      },
    ];
  };

  const transformedPosts =
    campaignData?.Posts?.map((post: any) => ({
      id: post._id,
      category: post.Category || "unknown-category",
      title: post.Post_Title,
      status: post.Status ? post.Status : "unknown",
      budget: post.Budget || 0,
      mediaContent:
        post.Content_Versions?.flatMap(
          (content: any) => content.Media_Content
        ) || [],
      submittedAt: formatDate(
        post.Content_Versions?.[post.Content_Versions.length - 1]
          ?.Submitted_At || post.Created_At
      ),
    })) || [];

  const filteredPosts = transformedPosts.filter((post: any) => {
    if (activeTab === "all") return true;
    return post.status === activeTab;
  });

  const postStages = [
    {
      id: "1",
      label: "Draft Upload",
      description: "Upload your initial content draft for review",
      status: "completed" as const,
    },
    {
      id: "2",
      label: "See Feedback",
      description: "Review feedback from the brand team",
      status: "completed" as const,
    },
    {
      id: "3",
      label: "Approved",
      description: "Content has been approved by the brand",
      status: "completed" as const,
    },
    {
      id: "4",
      label: "Live Post Link",
      description: "Share the link to your published content",
      status: "completed" as const,
    },
    {
      id: "5",
      label: "Impression Upload",
      description: "Upload engagement metrics and impressions",
      status: "pending" as const,
    },
    {
      id: "6",
      label: "Payment",
      description: "Payment processing and completion",
      status: "inactive" as const,
    },
  ];

  const contentVersions = [
    {
      id: "1",
      date: "Mar 15, 2024",
      imageUrl:
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800",
      status: "approved",
      feedback: ["Great work! The lighting and composition are perfect."],
      livePostLink: "https://instagram.com/p/example",
      postType: "instagram-reel",
      metrics: {
        impressions: 15420,
        clicks: 892,
        engagement: 4.8,
        lastUpdated: "2024-03-15 10:30 AM",
      },
    },
    {
      id: "2",
      date: "Feb 28, 2024",
      imageUrl:
        "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800",
      status: "needs_updates",
      feedback: [
        "Please adjust the lighting and retake the shot.",
        "Product should be more prominent.",
      ],
      postType: "instagram-image",
    },
  ];

  const transactions = [
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

  console.log("campaignData", campaignData);
  const handleStageClick = (stageId: string) => {
    console.log(`Clicked stage: ${stageId}`);
  };

  const handleCreatePost = (postData: any) => {
    console.log("Creating new post:", postData);
    setIsCreatePostDrawerOpen(false);
  };

  const totalCampaignBudget = transformedPosts.reduce(
    (sum: number, post: any) => sum + post.budget,
    0
  );
  const receivedPayments = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingPayments = transactions
    .filter((t) => t.status !== "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      {campaignData && (
        <CampaignHeader
          onBack={() => window.history.back()}
          title={campaignData.Headline}
          budget={`${campaignData.Posts.reduce(
            (sum: number, post: any) => sum + post.Budget,
            0
          )}`}
          date={formatDate(campaignData.Created_At)}
          status={"Public"}
          objective={campaignData.Brief_Description}
          audience={campaignData.Target_Audience}
        />
      )}

      <CampaignTabs
        tabs={transformedTabs(campaignData) as any}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="tw-flex">
        <PostsList
          posts={filteredPosts}
          selectedPostId={selectedPostId}
          onPostSelect={setSelectedPostId}
          onCreatePost={() => setIsCreatePostDrawerOpen(true)}
          campaignStatus={CampaignStatus.Live}
        />

        <div className="tw-flex-1">
          <PostProgress
            postId={selectedPostId}
            stages={postStages}
            onStageClick={handleStageClick}
          />
          <ContentVersions
            versions={contentVersions as any}
            onAddContent={() => setIsNewContentDrawerOpen(true)}
          />
        </div>
      </div>

      <CampaignDrawer
        isOpen={isNewPostDrawerOpen}
        onClose={() => setIsNewPostDrawerOpen(false)}
        title="Create New Post"
        description="Create a new post for this campaign"
        dueDate="Mar 31, 2024"
        payout="$300"
        type="post"
      />

      <CampaignDrawer
        isOpen={isNewContentDrawerOpen}
        onClose={() => setIsNewContentDrawerOpen(false)}
        title="Add New Content"
        description="Upload new content for review"
        dueDate="Mar 31, 2024"
        payout="$300"
        type="content"
      />

      <EarningsDrawer
        isOpen={isEarningsDrawerOpen}
        onClose={() => setIsEarningsDrawerOpen(false)}
        campaignName="AI Social27"
        totalEarnings={totalCampaignBudget}
        pendingPayments={pendingPayments}
        receivedPayments={receivedPayments}
        nextPayoutDate="March 31, 2024"
        transactions={transactions}
      />

      <CreatePostDrawer
        isOpen={isCreatePostDrawerOpen}
        onClose={() => setIsCreatePostDrawerOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampaignHubContent />
    </Suspense>
  );
}

export default withAuthRole({
  Component: Page,
  allowedRoles: ["creator"],
});
