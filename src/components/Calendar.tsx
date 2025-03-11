import { useEffect, useState } from 'react';
import { addDays, formatISO } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { fetchBrandCalendar, fetchCreatorCalendar } from '@/@api';

// Adjusted interface to match API response
interface PostEvent {
  _id: string;
  Campaign_ID: string;
  Campaign_Headline: string;
  Creator_ID: string;
  Post_Title: string;
  Post_Description: string;
  Submission_Date: string;
  Due_Date: string;
  Live_Link: string | null;
  Status: number;
  Creator_Name?: string;
  Creator_Profile_Image?: string;
  Company_Logo?: string;
}

interface Post {
  Start_Date: string;
  End_Date: string;
  Posts: PostEvent[];
}

const PostCalendar = () => {
  const [selectedFilter, setSelectedFilter] = useState("7");
  const [upcomingPosts, setUpcomingPosts] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [visibleItems, setVisibleItems] = useState(10);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (user?.email) {
      const fetchCalendarData = async () => {
        setLoading(true);
        try {
          const startDate = new Date();
          const endDate = addDays(startDate, Number(selectedFilter));
          let posts: Post;

          if (!user?.isBuyer) {
            posts = await fetchCreatorCalendar(user?.uuid, startDate, endDate);
          } else {
            posts = await fetchBrandCalendar(user?._id, startDate, endDate);
          }

          console.log("Fetched posts:", posts);
          setUpcomingPosts(posts || null);
          setVisibleItems(ITEMS_PER_PAGE);
        } catch (error) {
          console.error("Error fetching calendar data:", error);
          setUpcomingPosts(null);
        } finally {
          setLoading(false);
        }
      };

      fetchCalendarData();
    }
  }, [user, selectedFilter]);

  // Helper for Go-Live Status with font-size: 10px
  const getGoLiveStatus = (submissionDate: string, liveLink: string | null) => {
    const today = new Date();
    const submission = new Date(submissionDate);
    const todayStr = today.toDateString();
    const submissionStr = submission.toDateString();

    if (today < submission) {
      return { text: "Scheduled for Posting", className: "tw-bg-blue-100 tw-text-blue-800 tw-text-[10px]" };
    } else if (todayStr === submissionStr) {
      return { text: "Live Today", className: "tw-bg-green-100 tw-text-green-800 tw-text-[10px]" };
    } else if (today > submission && liveLink) {
      return { text: "Published", className: "tw-bg-green-100 tw-text-green-800 tw-text-[10px]" };
    } else {
      return { text: "Missing Submission", className: "tw-bg-orange-100 tw-text-orange-800 tw-text-[10px]" };
    }
  };

  // Helper for Payout Status with font-size: 10px
  const getPayoutStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const todayStr = today.toDateString();
    const dueStr = due.toDateString();

    if (today < due) {
      return { text: "Payment Pending", className: "tw-bg-blue-100 tw-text-blue-800 tw-text-[10px]" };
    } else if (todayStr === dueStr) {
      return { text: "Payout Today", className: "tw-bg-green-100 tw-text-green-800 tw-text-[10px]" };
    } else {
      return { text: "Payment Processed", className: "tw-bg-green-100 tw-text-green-800 tw-text-[10px]" };
    }
  };

  // Handle "Load More" click
  const handleLoadMore = () => {
    if (upcomingPosts) {
      setVisibleItems(upcomingPosts.Posts.length);
    }
  };

  const getCampaignURL = (campaignID: any, creatorId: any, postID: any, isBuyer: any) => {
    const host = window.location.origin;
    const baseURL = `${host}/campaign-details/${campaignID}?tab=in_campaign`;
    return isBuyer ? `${baseURL}&creator=${creatorId}&post=${postID}` : `${baseURL}&post=${postID}`;
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fs-16 fw-medium">Upcoming Posts</h2>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="tw-border tw-rounded-lg px-3 py-2"
        >
          <option value="7">Next 7 Days</option>
          <option value="14">Next 14 Days</option>
          <option value="30">Next 30 Days</option>
          <option value="90">Next 90 Days</option>
        </select>
      </div>

      <div>
        {loading ? (
          <div className="tw-text-center tw-py-4">
            <svg
              className="tw-animate-spin tw-h-8 tw-w-8 tw-mx-auto tw-text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="tw-opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="tw-opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="tw-text-gray-500 tw-mt-2">Loading posts...</p>
          </div>
        ) : upcomingPosts && upcomingPosts.Posts.length > 0 ? (
          <>
            {upcomingPosts.Posts.slice(0, visibleItems).map((event) => {
              const goLiveStatus = getGoLiveStatus(event.Submission_Date, event.Live_Link);
              const payoutStatus = getPayoutStatus(event.Due_Date);

              return (
                <div
                  key={event._id}
                  className="tw-p-3 tw-border-b tw-border-gray-100 last:tw-border-b-0"
                >
                  <div className="tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-2">
                    {formatISO(new Date(upcomingPosts.Start_Date), { representation: "date" })}
                  </div>
                  <div className="tw-space-y-2">
                    <div className="tw-relative">
                      <button
                        onClick={() => {
                          const url = getCampaignURL(event.Campaign_ID, event.Creator_ID, event._id, user?.isBuyer);
                          window.open(url, "");
                        }}
                        className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-2 tw-rounded-md hover:tw-bg-gray-50 tw-transition-all tw-duration-200"
                      >
                        <div className="tw-flex tw-items-center tw-min-w-0 gap-2">
                          <div className="img-container-topHeader">
                            <img
                              src={
                                user?.isBuyer
                                  ? event.Creator_Profile_Image || "https://via.placeholder.com/30"
                                  : event.Company_Logo || "https://via.placeholder.com/30"
                              }
                              className="border object-fit-cover rounded-circle flex-shrink-0"
                              alt="Profile Picture"
                              width="30"
                              height="30"
                            />
                          </div>
                          <div className="tw-truncate tw-text-left">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">
                              {event.Campaign_Headline}
                            </h3>
                            <p className="tw-text-xs tw-text-gray-500 tw-truncate">
                              {event.Post_Title}
                            </p>
                            {event.Creator_Name && (
                              <p className="tw-text-xs tw-text-gray-400 tw-truncate">
                                {user?.isBuyer ? event.Creator_Name : ""}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="tw-flex tw-gap-2">
                          <span
                            className={`tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-rounded-full tw-flex-shrink-0 ${goLiveStatus.className}`}
                          >
                            {goLiveStatus.text}
                          </span>
                          <span
                            className={`tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-rounded-full tw-flex-shrink-0 ${payoutStatus.className}`}
                          >
                            {payoutStatus.text}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {upcomingPosts.Posts.length > ITEMS_PER_PAGE && visibleItems < upcomingPosts.Posts.length && (
              <div className="tw-text-center tw-mt-4">
                <button
                  onClick={handleLoadMore}
                  className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-blue-600 tw-transition-all"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="tw-text-center tw-text-gray-500">No upcoming posts.</p>
        )}
      </div>
    </div>
  );
};

export default PostCalendar;