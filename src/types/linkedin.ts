export type LinkedInPostType =
  | "text"
  | "image"
  | "video"
  | "document"
  | "poll"
  | "article"
  | "newsletter"
  | "event"
  | "link";

export interface LinkedInPostTypeInfo {
  id: LinkedInPostType;
  label: string;
  description: string;
  icon: string;
}

export const linkedInPostTypes: LinkedInPostTypeInfo[] = [
  {
    id: "text",
    label: "Text Post",
    description: "Simple status updates with plain text",
    icon: "Type",
  },
  {
    id: "image",
    label: "Image Post",
    description: "Single images or multi-image galleries",
    icon: "Image",
  },
  {
    id: "video",
    label: "Video Post",
    description:
      "Native video uploads, including short clips and live broadcasts",
    icon: "Video",
  },
  {
    id: "document",
    label: "Document Post",
    description: "Upload PDFs, PowerPoint presentations, or Word documents",
    icon: "FileText",
  },
  {
    id: "poll",
    label: "Poll Post",
    description: "Interactive polls with up to four options",
    icon: "BarChart",
  },
  {
    id: "article",
    label: "Article Post",
    description: "Long-form, editorial-style content",
    icon: "FileText",
  },
  {
    id: "newsletter",
    label: "Newsletter Post",
    description: "Regular, subscription-based content series",
    icon: "Mail",
  },
  {
    id: "event",
    label: "Event Post",
    description: "Announcements and details for events",
    icon: "Calendar",
  },
  {
    id: "link",
    label: "Link Post",
    description: "Posts that share external links with preview cards",
    icon: "Link",
  },
];
