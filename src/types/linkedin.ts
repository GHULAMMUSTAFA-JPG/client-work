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
    label: "Text Posts",
    description: "Simple status updates with plain text",
    icon: "Type",
  },
  {
    id: "image",
    label: "Image Posts",
    description: "Single images or multi-image galleries",
    icon: "Image",
  },
  {
    id: "video",
    label: "Video Posts",
    description:
      "Native video uploads, including short clips and live broadcasts",
    icon: "Video",
  },
  {
    id: "document",
    label: "Document Posts",
    description: "Upload PDFs, PowerPoint presentations, or Word documents",
    icon: "FileText",
  },
  {
    id: "poll",
    label: "Poll Posts",
    description: "Interactive polls with up to four options",
    icon: "BarChart",
  },
  {
    id: "article",
    label: "Article Posts",
    description: "Long-form, editorial-style content",
    icon: "FileText",
  },
  {
    id: "newsletter",
    label: "Newsletter Posts",
    description: "Regular, subscription-based content series",
    icon: "Mail",
  },
  {
    id: "event",
    label: "Event Posts",
    description: "Announcements and details for events",
    icon: "Calendar",
  },
  {
    id: "link",
    label: "Link Posts",
    description: "Posts that share external links with preview cards",
    icon: "Link",
  },
];
