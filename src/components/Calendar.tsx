// import { useEffect, useState } from 'react';
// import { addDays, format } from 'date-fns';
// import { useAuth } from '@/contexts/AuthContext';
// import { fetchBrandCalendar, fetchCreatorCalendar } from '@/@api';

// // Adjusted interface to match API response
// interface PostEvent {
//   _id: string;
//   Campaign_ID: string;
//   Campaign_Headline: string;
//   Creator_ID: string;
//   Post_Title: string;
//   Post_Description: string;
//   Submission_Date: string;
//   Due_Date: string;
//   Live_Link: string | null;
//   Status: number;
//   Creator_Name?: string;
//   Creator_Profile_Image?: string;
//   Company_Logo?: string;
//   Impressions?: number;
//   payment_status?: number;
// }

// interface Post {
//   Start_Date: string;
//   End_Date: string;
//   Posts: PostEvent[];
// }

// // Interface for grouped posts
// interface GroupedPosts {
//   [date: string]: PostEvent[];
// }

// const PostCalendar = () => {
//   const [selectedFilter, setSelectedFilter] = useState("7");
//   const [upcomingPosts, setUpcomingPosts] = useState<Post | null>(null);
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuth();
//   const [visibleItems, setVisibleItems] = useState(10);
//   const ITEMS_PER_PAGE = 10;

//   useEffect(() => {
//     if (user?.email) {
//       const fetchCalendarData = async () => {
//         setLoading(true);
//         try {
//           const startDate = new Date();
//           const endDate = addDays(startDate, Number(selectedFilter));
//           let posts: Post;

//           if (!user?.isBuyer) {
//             posts = await fetchCreatorCalendar(user?.uuid, startDate, endDate);
//           } else {
//             posts = await fetchBrandCalendar(user?._id, startDate, endDate);
//           }

//           console.log("Fetched posts:", posts);
//           setUpcomingPosts(posts || null);
//           setVisibleItems(ITEMS_PER_PAGE);
//         } catch (error) {
//           console.error("Error fetching calendar data:", error);
//           setUpcomingPosts(null);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchCalendarData();
//     }
//   }, [user, selectedFilter]);

//   // Helper for Go-Live Status
//   const getGoLiveStatus = (post: PostEvent) => {
//     const todayUTC = new Date();
//     const submissionDateUTC = new Date(post.Submission_Date);

//     const todayDateOnly = new Date(Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth(), todayUTC.getUTCDate()));
//     const submissionDateOnly = new Date(Date.UTC(submissionDateUTC.getUTCFullYear(), submissionDateUTC.getUTCMonth(), submissionDateUTC.getUTCDate()));

//     if (todayDateOnly > submissionDateOnly && !post.Live_Link) {
//       return { status: "Missing Submission", color: "orange" };
//     } else if (post.Live_Link) {
//       return { status: "Published", color: "green" };
//     } else if (todayDateOnly.getTime() === submissionDateOnly.getTime() && !post.Live_Link) {
//       return { status: "Live Today", color: "green" };
//     } else {
//       return { status: "Scheduled for Posting", color: "blue" };
//     }
//   };

//   // Helper for Payout Status
//   const getPayoutStatus = (post: PostEvent) => {
//     const todayUTC = new Date();
//     const dueDateUTC = new Date(post.Due_Date);

//     const todayDateOnly = new Date(Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth(), todayUTC.getUTCDate()));
//     const dueDateOnly = new Date(Date.UTC(dueDateUTC.getUTCFullYear(), dueDateUTC.getUTCMonth(), dueDateUTC.getUTCDate()));

//     if (post.payment_status === 10) {
//       return { status: "Payment Processed", color: "green" };
//     } else if (post.payment_status === 9 && post.Live_Link && post.Impressions) {
//       return { status: "Payment Pending", color: "blue" };
//     } else if (todayDateOnly.getTime() === dueDateOnly.getTime() && post.payment_status !== 10 && post.Live_Link && post.Impressions) {
//       return { status: "Payout Today", color: "green" };
//     } else {
//       return { status: "", color: "red" };
//     }
//   };

//   // Handle "Load More" click
//   const handleLoadMore = () => {
//     if (upcomingPosts) {
//       setVisibleItems(upcomingPosts.Posts.length);
//     }
//   };

//   const getCampaignURL = (campaignID: any, creatorId: any, postID: any, isBuyer: any) => {
//     const host = window.location.origin;
//     const baseURL = `${host}/campaign-details/${campaignID}?tab=in_campaign`;
//     return isBuyer ? `${baseURL}&creator=${creatorId}&post=${postID}` : `${baseURL}&post=${postID}`;
//   };

//   // Group posts by Submission_Date and sort by date
//   const groupPostsByDate = (posts: PostEvent[]): GroupedPosts => {
//     // Sort posts by Submission_Date
//     const sortedPosts = [...posts].sort((a, b) =>
//       new Date(a.Submission_Date).getTime() - new Date(b.Submission_Date).getTime()
//     );

//     return sortedPosts.reduce((acc: GroupedPosts, post) => {
//       const date = format(new Date(post.Submission_Date), 'MMM-dd'); // e.g., "Mar-11"
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(post);
//       return acc;
//     }, {});
//   };

//   // Flatten grouped posts back to an array with a limit, preserving date order
//   const getVisiblePosts = (groupedPosts: GroupedPosts, limit: number) => {
//     const flatPosts: { date: string; post: PostEvent }[] = [];
//     let count = 0;

//     // Sort dates chronologically
//     const sortedDates = Object.keys(groupedPosts).sort((a, b) => {
//       const dateA = new Date(a);
//       const dateB = new Date(b);
//       return dateA.getTime() - dateB.getTime();
//     });

//     sortedDates.forEach((date) => {
//       groupedPosts[date].forEach((post) => {
//         if (count < limit) {
//           flatPosts.push({ date, post });
//           count++;
//         }
//       });
//     });

//     return flatPosts;
//   };

//   return (
//     <div className="bg-white rounded-lg p-6">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0 fs-16 fw-medium">Upcoming Posts</h2>
//         <select
//           value={selectedFilter}
//           onChange={(e) => setSelectedFilter(e.target.value)}
//           className="tw-border tw-rounded-lg px-3 py-2"
//         >
//           <option value="7">Next 7 Days</option>
//           <option value="14">Next 14 Days</option>
//           <option value="30">Next 30 Days</option>
//           <option value="90">Next 90 Days</option>
//         </select>
//       </div>

//       <div>
//         {loading ? (
//           <div className="tw-text-center tw-py-4">
//             <svg
//               className="tw-animate-spin tw-h-8 tw-w-8 tw-mx-auto tw-text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="tw-opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="tw-opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//               />
//             </svg>
//             <p className="tw-text-gray-500 tw-mt-2">Loading posts...</p>
//           </div>
//         ) : upcomingPosts && upcomingPosts.Posts.length > 0 ? (
//           <>
//             {(() => {
//               const groupedPosts = groupPostsByDate(upcomingPosts.Posts);
//               const visiblePosts = getVisiblePosts(groupedPosts, visibleItems);

//               console.log("Grouped Posts:", groupedPosts); // Debug: Check grouped structure
//               console.log("Visible Posts:", visiblePosts); // Debug: Check visible items

//               let currentDate = '';
//               return visiblePosts.map(({ date, post }, index) => {
//                 const goLiveStatus = getGoLiveStatus(post);
//                 const payoutStatus = getPayoutStatus(post);

//                 const showDateHeader = currentDate !== date;
//                 currentDate = date;

//                 return (
//                   <div key={post._id}>
//                     {showDateHeader && (
//                       <div className="tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-2">
//                         {date} {/* e.g., "Mar-11" */}
//                       </div>
//                     )}
//                     <div className="tw-p-3 tw-border-b tw-border-gray-100 last:tw-border-b-0">
//                       <div className="tw-space-y-2">
//                         <div className="tw-relative">
//                           <button
//                             onClick={() => {
//                               const url = getCampaignURL(post.Campaign_ID, post.Creator_ID, post._id, user?.isBuyer);
//                               window.open(url, "");
//                             }}
//                             className="tw-w-full tw-flex tw-items-center tw-justify-between tw-p-2 tw-rounded-md hover:tw-bg-gray-50 tw-transition-all tw-duration-200"
//                           >
//                             <div className="tw-flex tw-items-center tw-min-w-0 gap-2">
//                               <div className="img-container-topHeader">
//                                 <img
//                                   src={
//                                     user?.isBuyer
//                                       ? post.Creator_Profile_Image || "https://via.placeholder.com/30"
//                                       : post.Company_Logo || "https://via.placeholder.com/30"
//                                   }
//                                   className="border object-fit-cover rounded-circle flex-shrink-0"
//                                   alt="Profile Picture"
//                                   width="30"
//                                   height="30"
//                                 />
//                               </div>
//                               <div className="tw-truncate tw-text-left">
//                                 <h3 className="tw-text-sm tw-font-medium tw-text-gray-900 tw-truncate">
//                                   {post.Campaign_Headline}
//                                 </h3>
//                                 <p className="tw-text-xs tw-text-gray-500 tw-truncate">
//                                   {post.Post_Title}
//                                 </p>
//                                 {post.Creator_Name && (
//                                   <p className="tw-text-xs tw-text-gray-400 tw-truncate">
//                                     {user?.isBuyer ? post.Creator_Name : ""}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="tw-flex tw-gap-2">
//                               {goLiveStatus.status && (
//                                 <span
//                                   className="tw-px-2 tw-py-1 tw-text-[10px] tw-font-medium tw-rounded-full tw-flex-shrink-0"
//                                   style={{ backgroundColor: goLiveStatus.color, color: 'white' }}
//                                 >
//                                   {goLiveStatus.status}
//                                 </span>
//                               )}
//                               {payoutStatus.status && (
//                                 <span
//                                   className="tw-px-2 tw-py-1 tw-text-[10px] tw-font-medium tw-rounded-full tw-flex-shrink-0"
//                                   style={{ backgroundColor: payoutStatus.color, color: 'white' }}
//                                 >
//                                   {payoutStatus.status}
//                                 </span>
//                               )}
//                             </div>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               });
//             })()}
//             {upcomingPosts.Posts.length > ITEMS_PER_PAGE && visibleItems < upcomingPosts.Posts.length && (
//               <div className="tw-text-center tw-mt-4">
//                 <button
//                   onClick={handleLoadMore}
//                   className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-blue-600 tw-transition-all"
//                 >
//                   Load More
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="tw-text-center tw-text-gray-500">No upcoming posts.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostCalendar;


import { useEffect, useState } from 'react';
import { addDays, formatISO, parseISO, format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { fetchBrandCalendar, fetchCreatorCalendar } from '@/@api';

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

const groupByDate = (posts: PostEvent[]) => {
  return posts.reduce((acc: Record<string, PostEvent[]>, post) => {
    const dateKey = format(parseISO(post.Submission_Date), 'yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(post);
    return acc;
  }, {});
};

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

  const getGoLiveStatus = (post: any) => {
    const todayUTC = new Date();
    const submissionDateUTC = new Date(post.Submission_Date);
    const todayDateOnly = new Date(Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth(), todayUTC.getUTCDate()));
    const submissionDateOnly = new Date(Date.UTC(submissionDateUTC.getUTCFullYear(), submissionDateUTC.getUTCMonth(), submissionDateUTC.getUTCDate()));

    if (todayDateOnly > submissionDateOnly && !post.Live_Link) {
      return { status: "Missing Submission", color: "orange" };
    } else if (post.Live_Link) {
      return { status: "Published", color: "green" };
    } else if (todayDateOnly.getTime() === submissionDateOnly.getTime() && !post.Live_Link) {
      return { status: "Live Today", color: "green" };
    } else {
      return { status: "Scheduled for Posting", color: "blue" };
    }
  };

  const handleLoadMore = () => {
    if (upcomingPosts) {
      setVisibleItems(upcomingPosts.Posts.length);
    }
  };

  const groupedPosts = upcomingPosts ? groupByDate(upcomingPosts.Posts.slice(0, visibleItems)) : {};

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
      <div className="tw-h-80 tw-overflow-y-auto">
      {loading ? (
        <div className="tw-text-center tw-py-4">Loading posts...</div>
      ) : upcomingPosts && upcomingPosts.Posts.length > 0 ? (
        Object.entries(groupedPosts).map(([date, posts]) => (
        
          <div key={date}  className="tw-mb-6 tw-border-b">
            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500 mb-3">
              {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
            </h3>
            {posts.map((post) => (
              <div key={post._id} className="tw-p-2 tw-mb-2 hover:tw-bg-gray-100 cursor-pointer">
                <div className="tw-flex tw-items-center tw-min-w-0 gap-2 tw-justify-between">
                  <div className="tw-flex tw-items-center gap-2">
                            <div className="img-container-topHeader">
                                <img
                                 src={
                                   user?.isBuyer
                                      ? post.Creator_Profile_Image || "https://via.placeholder.com/30"
                                      : post.Company_Logo || "https://via.placeholder.com/30"
                                  }
                                  className=""
                                 alt="Profile Picture"
                                
                                />
                              </div>
                <div>
                  <p className="tw-text-sm tw-font-medium tw-text-gray-900">{post.Post_Title}</p>
                  <p className="tw-text-sm tw-text-gray-500">{post.Campaign_Headline}</p>
                  <p className="tw-text-xs tw-text-gray-400">
                    Submitted on: {format(parseISO(post.Submission_Date), 'PPP')}
                  </p>
                </div>
                </div>
                <div className="tw-flex gap-2 tw-items-center tw-px-2.5 tw-py-1 tw-rounded-full tw-bg-[#E8F5E9] tw-text-[#2E7D32]"><svg xmlns="http://www.w3.org/2000/svg" width="15.49" height="15.341" viewBox="0 0 15.49 15.341">
  <g id="Group_42" data-name="Group 42" transform="translate(-1.318 -1.348)">
    <path id="Path_877" data-name="Path 877" d="M16.1,8.4v.649A7.05,7.05,0,1,1,11.919,2.6" transform="translate(0 0)" fill="none" stroke="#1bb09d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
    <path id="Path_878" data-name="Path 878" d="M9,8.935l2.115,2.115L18.165,4" transform="translate(-2.065 -0.592)" fill="none" stroke="#1bb09d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
  </g>
</svg>
<span className="tw-text-xs tw-font-medium">Published</span></div>
              </div>
              </div>
            ))}
          </div>
        
        ))
      ) : (
        <p className="tw-flex tw-items-center tw-justify-center tw-bg-teal-50 tw-text-black tw-font-medium tw-py-2 tw-px-4 tw-rounded-md ht-300p">No posts available for the selected period.</p>
      )}
</div>
      {upcomingPosts && upcomingPosts.Posts.length > ITEMS_PER_PAGE && visibleItems < upcomingPosts.Posts.length && (
        <div className="tw-text-center tw-mt-4">
          <button
            onClick={handleLoadMore}
            className="tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded hover:tw-bg-teal-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCalendar;
