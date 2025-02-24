export const transformPostContent = (post: any) => {
  return (
    post?.Content_Versions?.map((content: any) => ({
      id: content.Content_ID,
      date: content.Submitted_At || post.Created_At,
      imageUrl: content.Media_Content?.[0],
      status: content.Status,
      title: content.Content_Title || post.Post_Title,
      feedback: content.Feedback ? [content.Feedback] : [],
      livePostLink: post.Live_Link || undefined,
      postType: post.Category || "unknown",
      metrics: post.Impressions
        ? {
            impressions: post.Impressions.Impressions || 0,
            clicks: post.Impressions.Clicks || 0,
            engagementRate: post.Impressions.Engagement_Rate || 0,
            comments: post.Impressions.Comments || 0,
            shares: post.Impressions.Shares || 0,
          }
        : undefined,
    })) ?? []
  );
};
