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
      className={`tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden tw-max-w-[600px] tw-min-w-[450px] tw-mx-auto tw-font-sans ${
        preview ? "tw-border tw-border-gray-200" : ""
      }`}
    >
      {/* Post Metadata */}
      {!preview && (
        <div className="tw-p-3 tw-border-b tw-border-gray-200">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <div className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-text-xs tw-font-medium">Type</span>
              <span className="tw-text-xs tw-text-gray-600">
                {post.type || "Post"}
              </span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-4">
              <div className="tw-flex tw-items-center tw-gap-2">
                <Clock className="tw-w-3.5 tw-h-3.5 tw-text-gray-500" />
                <span className="tw-text-xs tw-text-gray-600">
                  {post.submittedOn}
                </span>
              </div>
              <span
                className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-xs
                ${
                  post.status === "in-review"
                    ? "tw-bg-yellow-50 tw-text-yellow-700"
                    : post.status === "approved"
                    ? "tw-bg-green-50 tw-text-green-700"
                    : post.status === "rejected"
                    ? "tw-bg-red-50 tw-text-red-700"
                    : post.status === "draft"
                    ? "tw-bg-gray-50 tw-text-gray-700"
                    : "tw-bg-blue-50 tw-text-blue-700"
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
        {/* Author Info - LinkedIn Style */}
        <div className="tw-flex tw-items-start tw-justify-between tw-mb-3">
          <div className="tw-flex tw-gap-2">
            <div className="tw-relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="tw-w-12 tw-h-12 tw-rounded-full tw-object-cover tw-border tw-border-gray-200"
              />
              {/* LinkedIn-style online indicator dot */}
              <div className="tw-absolute tw-bottom-0 tw-right-0 tw-w-3 tw-h-3 tw-bg-green-500 tw-rounded-full tw-border-2 tw-border-white"></div>
            </div>
            <div>
              <div className="tw-flex tw-items-center tw-gap-1">
                <h3 className="tw-font-semibold tw-text-[14px] tw-text-gray-900 hover:tw-text-blue-600 tw-cursor-pointer tw-leading-tight">
                  {post.author.name}
                </h3>
              </div>
              <p className="tw-text-xs tw-text-gray-500 tw-leading-tight">
                {post.author.role}
              </p>
              <div className="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-gray-500 tw-mt-0.5">
                <span>{post.timestamp}</span>
                <span>•</span>
                <Globe className="tw-w-3 tw-h-3" />
              </div>
            </div>
          </div>
          <button className="tw-p-1.5 tw-hover:bg-gray-100 tw-rounded-full tw-transition-colors">
            <MoreHorizontal className="tw-w-5 tw-h-5 tw-text-gray-600" />
          </button>
        </div>

        {/* Post Text */}
        <div className="tw-mb-3 tw-text-sm tw-leading-relaxed tw-text-gray-800">
          {formatContent(post.content)}
        </div>

        {/* Post Media */}
        {post.image && (
          <div className="tw-mb-4 tw-flex tw-justify-center tw-overflow-hidden">
            <div className="tw-relative tw-w-full tw-min-w-[400px] tw-max-w-[520px] tw-bg-gray-50 tw-flex tw-items-center tw-justify-center tw-rounded-md">
              <img
                src={post.image}
                alt="Post content"
                className="tw-object-contain tw-max-h-[450px] tw-max-w-full tw-rounded-md"
                style={{
                  aspectRatio: "auto",
                  objectPosition: "center",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        {/* Engagement Stats - LinkedIn Style */}
        <div className="tw-pt-1">
          <div className="tw-flex tw-items-center tw-justify-between tw-text-xs tw-text-gray-500 tw-py-2 tw-px-1">
            <div className="tw-flex tw-items-center tw-gap-1">
              <div className="tw-flex tw-items-center">
                <span className="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-rounded-full tw-bg-blue-500 tw-text-white">
                  <ThumbsUp className="tw-w-2.5 tw-h-2.5" />
                </span>
                <span className="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-rounded-full tw-bg-red-500 tw-text-white tw-ml-[-3px]">
                  ❤️
                </span>
              </div>
              <span>{formatNumber(post.engagement.likes)}</span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-3">
              <span>{formatNumber(post.engagement.comments)} comments</span>
              <span>{formatNumber(post.engagement.shares)} shares</span>
            </div>
          </div>

          {/* Action Buttons - LinkedIn Style */}
          <div className="tw-flex tw-items-center tw-justify-between tw-pt-1 tw-border-t tw-border-gray-200">
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-py-2.5 tw-hover:bg-gray-100 tw-rounded-md tw-transition-colors">
              <ThumbsUp className="tw-w-4.5 tw-h-4.5 tw-text-gray-600" />
              <span className="tw-text-xs tw-font-medium tw-text-gray-600">
                Like
              </span>
            </button>
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-py-2.5 tw-hover:bg-gray-100 tw-rounded-md tw-transition-colors">
              <MessageSquare className="tw-w-4.5 tw-h-4.5 tw-text-gray-600" />
              <span className="tw-text-xs tw-font-medium tw-text-gray-600">
                Comment
              </span>
            </button>
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-py-2.5 tw-hover:bg-gray-100 tw-rounded-md tw-transition-colors">
              <Share2 className="tw-w-4.5 tw-h-4.5 tw-text-gray-600" />
              <span className="tw-text-xs tw-font-medium tw-text-gray-600">
                Share
              </span>
            </button>
            <button className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-py-2.5 tw-hover:bg-gray-100 tw-rounded-md tw-transition-colors">
              <div className="tw-flex tw-items-center tw-justify-center">
                <svg
                  className="tw-w-4.5 tw-h-4.5 tw-text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
              <span className="tw-text-xs tw-font-medium tw-text-gray-600">
                Send
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
