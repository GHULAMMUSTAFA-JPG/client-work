import { useState } from "react";
import {
  Instagram,
  Atom as Tiktok,
  Youtube,
  Plus,
  DollarSign,
  Eye,
} from "lucide-react";
import { CampaignDrawer } from "./CampaignDrawer";
import { Post } from "@/types";
import { getStatusBadge } from "./utils";

interface PostsListProps {
  posts: Post[];
  selectedPostId: string;
  onPostSelect: (postId: string) => void;
  onAddPost: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PostsList({
  posts,
  selectedPostId,
  onPostSelect,
  onAddPost,
  currentPage,
  totalPages,
  onPageChange,
}: PostsListProps) {
  const [viewingPost, setViewingPost] = useState<Post | null>(null);

  const getIcon = (type: Post["type"]) => {
    switch (type) {
      case "instagram-reel":
      case "instagram-image":
        return <Instagram style={{ width: "1.25rem", height: "1.25rem" }} />;
      case "tiktok":
        return <Tiktok style={{ width: "1.25rem", height: "1.25rem" }} />;
      case "youtube":
        return <Youtube style={{ width: "1.25rem", height: "1.25rem" }} />;
    }
  };

  // Enhanced mock data for posts
  const enhancedPosts = posts.map((post) => ({
    ...post,
    description:
      post.description ||
      "Create engaging content that showcases our brand values and connects with our target audience.",
    submittedDate: post.submittedDate || "2024-02-15",
    goLiveDate: post.goLiveDate || "2024-03-01",
  }));

  console.log("enhancedPosts", enhancedPosts);
  return (
    <div className="border-end" style={{ width: "380px", overflowY: "auto" }}>
      <div className="p-4">
        <button
          onClick={onAddPost}
          className="btn btn-primary w-100 mb-4 d-inline-flex align-items-center justify-content-center"
        >
          <Plus style={{ width: "1rem", height: "1rem" }} className="me-2" />
          Add New Submission
        </button>

        {enhancedPosts.map((post) => (
          <div key={post.id} className="mb-3">
            <button
              onClick={() => onPostSelect(post.id)}
              className={`btn w-100 text-start p-4 rounded border ${
                selectedPostId === post.id
                  ? "border-primary "
                  : "border-secondary-subtle border-secondary"
              }`}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-3">
                  <span className="p-2 rounded-circle bg-light">
                    {getIcon(post.type)}
                  </span>
                  <div>
                    <h3 className="fs-6 fw-medium mb-0">{post.title}</h3>
                    <div className="d-flex align-items-center mt-1">
                      <DollarSign
                        style={{ width: "1rem", height: "1rem" }}
                        className="text-primary"
                      />
                      <span className="fs-6 fw-medium text-primary">
                        {post.budget}
                      </span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(post.status)}
              </div>
            </button>
            <div
              onClick={() => setViewingPost(post)}
              className="cursor-pointer w-100 d-flex align-items-center justify-content-center py-1 text-secondary small"
            >
              <Eye
                style={{ width: "0.75rem", height: "0.75rem" }}
                className="me-1"
              />
              View Details
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => onPageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <CampaignDrawer
        isOpen={!!viewingPost}
        onClose={() => setViewingPost(null)}
        title="Post Details"
        description={viewingPost?.description || ""}
        dueDate={viewingPost?.dueDate || ""}
        payout={`$${viewingPost?.budget || 0}`}
        type="details"
        initialData={{
          ...viewingPost,
          submittedDate: viewingPost?.submittedDate,
          goLiveDate: viewingPost?.goLiveDate,
          type: viewingPost?.type || "",
          status: viewingPost?.status || "",
          budget: viewingPost?.budget?.toString() || "",
        }}
      />
    </div>
  );
}
