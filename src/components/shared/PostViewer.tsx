import React from "react";
import {
  Clock,
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react";

interface ViewerPost {
  id: string;
  type: string;
  status: "in-review" | "approved" | "rejected" | "published" | "draft";
  submittedOn: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface PostViewerProps {
  post: ViewerPost;
  preview?: boolean;
}

export function PostViewer({ post, preview = false }: PostViewerProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatContent = (content: string) => {
    return content.split("\n\n").map((block, index) => {
      // Handle lists
      if (block.match(/^\d\./)) {
        return (
          <div key={index} className="tw-pl-4 tw-mb-4">
            <p className="tw-font-medium">{block}</p>
          </div>
        );
      }

      // Handle bullet points
      if (block.startsWith("--")) {
        return (
          <div key={index} className="tw-pl-6 tw-mb-4 tw-text-gray-600">
            <p>{block.substring(2).trim()}</p>
          </div>
        );
      }

      // Handle headers
      if (block.includes(":") && !block.includes("Example:")) {
        const [header, ...rest] = block.split(":");
        return (
          <div key={index} className="tw-mb-4">
            <h3 className="tw-font-semibold tw-mb-2">{header.trim()}</h3>
            <p>{rest.join(":").trim()}</p>
          </div>
        );
      }

      // Regular paragraphs
      return (
        <p key={index} className="tw-mb-4 tw-last:mb-0">
          {block}
        </p>
      );
    });
  };

  return (
    <div
      className={`tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden ${
        preview ? "tw-border" : ""
      }`}
    >
      {/* Post Metadata */}
      {!preview && (
        <div className="tw-p-4 tw-border-b">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
            <div className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-text-sm tw-font-medium">Type</span>
              <span className="tw-text-sm tw-text-gray-600">
                {post.type || "Post"}
              </span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-4">
              <div className="tw-flex tw-items-center tw-gap-2">
                <Clock className="tw-w-4 tw-h-4 tw-text-gray-500" />
                <span className="tw-text-sm tw-text-gray-600">
                  {post.submittedOn}
                </span>
              </div>
              <span
                className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-sm
                ${
                  post.status === "in-review"
                    ? "tw-bg-yellow-100 tw-text-yellow-700"
                    : post.status === "approved"
                    ? "tw-bg-green-100 tw-text-green-700"
                    : post.status === "rejected"
                    ? "tw-bg-red-100 tw-text-red-700"
                    : post.status === "draft"
                    ? "tw-bg-gray-100 tw-text-gray-700"
                    : "tw-bg-blue-100 tw-text-blue-700"
                }`}
              >
                {post.status.charAt(0).toUpperCase() +
                  post.status.slice(1).replace("-", " ")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Post Content */}
      <div className="tw-p-4">
        {/* Author Info */}
        <div className="tw-flex tw-items-start tw-justify-between tw-mb-6">
          <div className="tw-flex tw-gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="tw-w-12 tw-h-12 tw-rounded-full tw-object-cover"
            />
            <div>
              <h3 className="tw-font-semibold tw-text-[15px] tw-hover:text-blue-600 tw-cursor-pointer">
                {post.author.name}
              </h3>
              <p className="tw-text-sm tw-text-gray-500">{post.author.role}</p>
              <div className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-gray-500 tw-mt-1">
                <Clock className="tw-w-4 tw-h-4" />
                <span>{post.timestamp}</span>
                <span>•</span>
                <Globe className="tw-w-4 tw-h-4" />
              </div>
            </div>
          </div>
          <button className="tw-p-2 tw-hover:bg-gray-100 tw-rounded-full">
            <MoreHorizontal className="tw-w-5 tw-h-5 tw-text-gray-600" />
          </button>
        </div>

        {/* Post Text */}
        <div className="tw-mb-6 tw-text-[15px] tw-leading-relaxed">
          {formatContent(post.content)}
        </div>

        {/* Post Media */}
        {post.image && (
          <div className="tw-mb-6">
            <img
              src={post.image}
              alt="Post content"
              className="tw-w-full tw-rounded-lg tw-object-contain"
            />
          </div>
        )}

        {/* Engagement Stats */}
        <div className="tw-pt-4 tw-border-t">
          <div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-text-gray-500 tw-mb-4">
            <div className="tw-flex tw-items-center tw-gap-1">
              <ThumbsUp className="tw-w-4 tw-h-4 tw-text-blue-600 tw-fill-current" />
              <span>{formatNumber(post.engagement.likes)}</span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-4">
              <span>{formatNumber(post.engagement.comments)} comments</span>
              <span>{formatNumber(post.engagement.shares)} shares</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="tw-flex tw-items-center tw-justify-between tw-pt-2 tw-border-t">
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-py-3 tw-hover:bg-gray-100 tw-rounded-lg tw-transition">
              <ThumbsUp className="tw-w-5 tw-h-5" />
              <span className="tw-text-sm tw-font-medium">Like</span>
            </button>
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-py-3 tw-hover:bg-gray-100 tw-rounded-lg tw-transition">
              <MessageSquare className="tw-w-5 tw-h-5" />
              <span className="tw-text-sm tw-font-medium">Comment</span>
            </button>
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-py-3 tw-hover:bg-gray-100 tw-rounded-lg tw-transition">
              <Share2 className="tw-w-5 tw-h-5" />
              <span className="tw-text-sm tw-font-medium">Share</span>
            </button>
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-py-3 tw-hover:bg-gray-100 tw-rounded-lg tw-transition">
              <Bookmark className="tw-w-5 tw-h-5" />
              <span className="tw-text-sm tw-font-medium">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
