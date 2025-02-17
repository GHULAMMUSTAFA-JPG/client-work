"use client";
import React, { useState, useEffect, Suspense } from "react";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { CampaignTabs } from "@/components/campaign/CampaignTabs";
import { PostsList } from "@/components/campaign/PostsList";
import { PostProgress } from "@/components/campaign/PostProgress";
import { ContentVersions } from "@/components/campaign/ContentVersions";
import { CampaignDrawer } from "@/components/campaign/CampaignDrawer";
import { LinkedInPostType } from "@/types/linkedin";
import { useAuth } from "@/contexts/AuthContext";
import {
  getCreatorsCampaignSubmissions,
  addCampaignPostSubmission,
  handleFileUpload,
} from "@/@api";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { EarningsDrawer } from "@/components/campaign/EarningsDrawer";

function CampaignHubContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPostId, setSelectedPostId] = useState("1");
  const [isNewPostDrawerOpen, setIsNewPostDrawerOpen] = useState(false);
  const [isNewContentDrawerOpen, setIsNewContentDrawerOpen] = useState(false);
  const [campaignData, setCampaignData] = useState<any>(null);
  const [isEarningsDrawerOpen, setIsEarningsDrawerOpen] = useState(false);

  const { user, setIsLoading } = useAuth();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage] = useState(10);

  const transactions = [
    {
      id: "1",
      date: "Mar 15, 2024",
      campaignName: "AI Social27 - Instagram Reel",
      amount: 400,
      status: "completed" as const,
    },
    {
      id: "2",
      date: "Mar 15, 2024",
      campaignName: "AI Social27 - Instagram Image",
      amount: 300,
      status: "processing" as const,
    },
    {
      id: "3",
      date: "Mar 31, 2024",
      campaignName: "AI Social27 - TikTok Post",
      amount: 300,
      status: "pending" as const,
    },
  ];

  const getSubmissionCampaigns = async (code: string, page: number) => {
    try {
      setIsLoading(true);
      const response = await getCreatorsCampaignSubmissions(
        {
          email: user?.email,
          campaign_id: code,
          page,
          limit: postsPerPage,
        },
        setCampaignData,
        setIsLoading
      );

      setCampaignData(response.data);
      setTotalPages(Math.ceil(response.total / postsPerPage));
    } catch (error) {
      toast.error("Failed to fetch campaign submissions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const code = searchParams.get("id");
    if (code) {
      getSubmissionCampaigns(code, currentPage);
    }
  }, [searchParams, user?.email, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const transformedTabs = (campaignData: any) => {
    const posts = campaignData?.campaign?.Posts || [];

    return [
      {
        id: "all",
        label: "All (Recent)",
        count: posts.length,
      },
      {
        id: "pending",
        label: "Content Submissions Ongoing",
        count: posts.filter(
          (post: any) => post.Status.toLowerCase() === "pending approval"
        ).length,
        status: "needs_updates" as const,
      },
      {
        id: "approved",
        label: "Approved & Ready to Publish",
        count: posts.filter(
          (post: any) => post.Status.toLowerCase() === "approved"
        ).length,
        status: "approved" as const,
      },
      {
        id: "live",
        label: "Live & Tracking Impressions",
        count: posts.filter((post: any) => post.Status.toLowerCase() === "live")
          .length,
        status: "live" as const,
      },
      {
        id: "rejected",
        label: "Rejected",
        count:
          campaignData?.campaign?.Posts?.filter(
            (post: any) => post.Status.toLowerCase() === "rejected"
          ).length || 0,
      },
      {
        id: "archived",
        label: "Archived",
        count: posts.filter(
          (post: any) => post.Status.toLowerCase() === "archived"
        ).length,
        status: "archived" as const,
      },
    ];
  };
  const transformedPosts =
    campaignData?.campaign?.Posts?.map((post: any) => ({
      id: post.Post_ID,
      type: post.Post_Type || "instagram-image",
      title: post.Post_Title,
      status: post.Status.toLowerCase(),
      budget: post.Budget || 0,
      mediaContent: post.Media_Content,
      submittedAt: post.Submitted_At,
    })) || [];

  const filteredPosts = transformedPosts.filter((post: any) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending_approval")
      return post.status === "pending approval";
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

  const handleViewEarnings = () => {
    setIsEarningsDrawerOpen(true);
  };

  return (
    <div className="min-vh-100">
      {campaignData && (
        <CampaignHeader
          onBack={() => window.history.back()}
          title={campaignData.campaign.Headline}
          budget={`$${campaignData.campaign.Budget}`}
          date={campaignData.campaign.Created_At}
          status={campaignData.campaign.Status || "Public"}
          objective={campaignData.campaign.Objective}
          audience={campaignData.campaign.Target_Audience}
          platform={campaignData.campaign.Platform}
          website={campaignData.campaign.Website}
          paymentStatus={{
            status: "processing",
            lastUpdated: "2024-03-15 09:00 AM",
            expectedDate: "2024-03-31",
          }}
          paymentBreakdown={{
            totalBudget: 1200,
            earnings: 700,
            platformFee: 50,
            netAmount: 650,
          }}
          onViewEarnings={handleViewEarnings}
        />
      )}

      <CampaignTabs
        tabs={transformedTabs(campaignData)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="d-flex">
        <PostsList
          posts={filteredPosts}
          selectedPostId={selectedPostId}
          onPostSelect={setSelectedPostId}
          onAddPost={() => setIsNewPostDrawerOpen(true)}
          currentPage={currentPage as number}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <div className="flex-grow-1">
          <PostProgress postId={selectedPostId} stages={postStages} />
          <ContentVersions
            versions={contentVersions as any}
            onAddContent={() => setIsNewContentDrawerOpen(true)}
          />
        </div>
      </div>

      <CampaignDrawer
        isOpen={isNewPostDrawerOpen}
        onClose={() => setIsNewPostDrawerOpen(false)}
        title="Add New Submission"
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
        totalEarnings={5000}
        pendingPayments={1200}
        nextPayoutDate="March 31, 2024"
        transactions={transactions}
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampaignHubContent />
    </Suspense>
  );
}
