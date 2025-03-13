"use client";
import React, { Suspense, useEffect, useState } from "react";
import { CampaignHeader } from "@/components/campaign-hub/CampaignHeader";
import { CampaignTabs } from "@/components/campaign-hub/CampaignTabs";
import { PostsList } from "@/components/campaign-hub/PostsList";
import { PostProgress } from "@/components/campaign-hub/PostProgress";
import {
  ContentVersions,
  Version,
} from "@/components/campaign-hub/ContentVersions";
import { CampaignDrawer } from "@/components/campaign-hub/CampaignDrawer";
import { CreatePostDrawer } from "@/components/campaign-hub/CreatePostDrawer";
import { useAuth } from "@/contexts/AuthContext";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { getCampaignCreatorPosts } from "@/@api/campaign";
import { CampaignStatus, Status } from "@/types";
import { formatDate } from "@/utils";
import { withAuthRole } from "@/utils/withAuthRole";
import EmptyState from "@/components/EmptyState";
import { getCurrentPostStage, transformPostContent } from "@/utils/dataFormat";
import { postStages } from "@/constant/campaign";

function CampaignHubContent() {
  const [activeTab, setActiveTab] = useState<Status | "all">("all");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isNewPostDrawerOpen, setIsNewPostDrawerOpen] = useState(false);
  const [isNewContentDrawerOpen, setIsNewContentDrawerOpen] = useState(false);
  const [isCreatePostDrawerOpen, setIsCreatePostDrawerOpen] = useState(false);
  const [contentVersion, setContentVersion] = useState<Version[]>([]);
  const [campaignData, setCampaignData] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const { user, setIsLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (campaignData && selectedPostId) {
      const post =
        campaignData.Posts?.find((item: any) => item._id === selectedPostId) ||
        null;
      setSelectedPost(post);
    } else {
      setSelectedPost(null);
    }
  }, [campaignData, selectedPostId]);

  const getCampaignPostsList = async () => {
    try {
      const code = searchParams.get("id");
      if (!code) {
        redirect("/campaigns");
      }
      setIsLoading(true);
      const response = await getCampaignCreatorPosts({
        creator_id: user?.uuid as string,
        campaign_id: code,
      });

      setCampaignData(response);
      if (response && (response as any).Posts.length) {
        const postId = searchParams.get("postId");
        let firstPost;

        if (postId) {
          firstPost =
            (response as any).Posts.find((post: any) => post._id === postId) ||
            (response as any).Posts[0];
        } else {
          firstPost = (response as any).Posts[0];
        }

        const contentList = transformPostContent(firstPost);
        setContentVersion(contentList);
        setSelectedPostId(firstPost._id);

        // Update URL with the selected post ID
        if (firstPost._id !== postId) {
          updateUrlWithPostId(code, firstPost._id);
        }
      }
    } catch (error) {
      console.error("Error fetching campaign posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUrlWithPostId = (campaignId: string, postId: string) => {
    router.replace(`/campaign-hub?id=${campaignId}&postId=${postId}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const code = searchParams.get("id");
    if (!code) {
      redirect("/campaigns");
    }

    if (user) {
      getCampaignPostsList();
    }
  }, [user]);

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
      description: post.Post_Description,
      status: post.Status ? post.Status : "unknown",
      budget: post.Budget || 0,
      dueDate: formatDate(post.Due_Date),
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

  const isCampaignActive = !!campaignData?.Posts?.find(
    (post: any) => post.Status === Status.Approved
  );

  const handleSelectedPostChange = (id: string) => {
    const post = campaignData?.Posts?.find((item: any) => item._id === id);
    if (post) {
      const contentList = transformPostContent(post);
      setContentVersion(contentList);
      setSelectedPostId(id);

      const campaignId = searchParams.get("id");
      if (campaignId) {
        updateUrlWithPostId(campaignId, id);
      }
    }
  };
  const handleTabChange = (tab: Status | "all") => {
    setActiveTab(tab);
    if (tab === "all") {
      if (transformedPosts.length > 0) {
        setSelectedPostId(transformedPosts[0].id);
        handleSelectedPostChange(transformedPosts[0].id);
      }
    } else {
      const post = transformedPosts?.find((post: any) => post.status === tab);
      if (post) {
        setSelectedPostId(post.id);
        handleSelectedPostChange(post.id);
      }
    }
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      {campaignData && (
        <CampaignHeader
          onBack={() => window.history.back()}
          title={campaignData.Headline}
          budget={`${campaignData.Posts?.filter(
            (post: any) => post.Status === Status.Approved
          )?.reduce((sum: number, post: any) => sum + post.Budget, 0)}`}
          date={formatDate(campaignData.Created_At)}
          status={isCampaignActive ? "Public" : "Draft"}
          objective={campaignData.Brief_Description}
          audience={campaignData.Target_Audience}
          userId={user.uuid}
        />
      )}

      <CampaignTabs
        tabs={transformedTabs(campaignData) as any}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="tw-flex">
        <PostsList
          posts={filteredPosts}
          selectedPostId={selectedPostId}
          onPostSelect={handleSelectedPostChange}
          onCreatePost={() => setIsCreatePostDrawerOpen(true)}
          campaignStatus={CampaignStatus.Live}
        />

        <div className="tw-flex-1 ">
          <PostProgress
            postId={selectedPostId}
            stages={postStages}
            campaignId={campaignData?._id}
            creatorId={user.uuid}
            currentStage={selectedPost ? getCurrentPostStage(selectedPost) : 1}
            onSubmit={getCampaignPostsList}
            linkedinPostUrl={selectedPost?.Live_Link || ""}
            postStatus={selectedPost?.Status}
          />

          {selectedPostId ? (
            <ContentVersions
              versions={contentVersion as any}
              onAddContent={() => setIsNewContentDrawerOpen(true)}
              campaignId={campaignData?._id}
              creatorId={user.uuid}
              postId={selectedPostId}
              onSubmit={getCampaignPostsList}
              canSubmit={true}
            />
          ) : (
            <EmptyState
              title="No Content Available"
              description="Select a post or create new  one to view its content versions."
              buttonText="Create A Post"
              buttonAction={() => setIsCreatePostDrawerOpen(true)}
            />
          )}
        </div>
      </div>

      <CampaignDrawer
        isOpen={isNewPostDrawerOpen}
        onClose={() => setIsNewPostDrawerOpen(false)}
        title="Start New Post"
        description="Create a new post for this campaign"
        type="post"
      />

      <CampaignDrawer
        isOpen={isNewContentDrawerOpen}
        onClose={() => setIsNewContentDrawerOpen(false)}
        title="Add New Content"
        description="Upload new content for review"
        type="content"
      />

      <CreatePostDrawer
        isOpen={isCreatePostDrawerOpen}
        onClose={() => setIsCreatePostDrawerOpen(false)}
        creatorId={user.uuid}
        campaignId={campaignData?._id}
        campaignStatus={CampaignStatus.Live}
        onSubmit={getCampaignPostsList}
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
