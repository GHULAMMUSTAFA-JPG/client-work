// // "use client";

// // import Image from "next/image";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { Icon } from "@iconify/react/dist/iconify.js";
// // import { useAuth } from "@/contexts/AuthContext";
// // import { FeedbackFish } from "@feedback-fish/react";

// // import {
// //   countNumberOfUnreadMessages,
// //   fetchBuyersData,
// //   fetchProfileData,
// // } from "@/@api";
// // import Loader from "@/components/loader";
// // import { defaultImagePath } from "@/components/constants";
// // import LogoComponent from "@/components/LogoComponent";

// // export default function Header() {
// //   const router = useRouter();
// //   const [users, setUser] = useState<any>();
// //   const {
// //     restartSocket,
// //     setSockets,
// //     user,
// //     logout,
// //     userProfile,
// //     setUserProfile,
// //     rendControl,
// //     isLoading,
// //     setIsLoading,
// //     notifications,
// //     setNotifications,
// //     setConversations,
// //     selectedIds,
// //   } = useAuth();
// //   const [conversationList, setConversationList] = useState<any>();
// //   const [newNotification, setNewNotification] = useState<boolean>(false);
// //   const [socket, setSocket] = useState<any>();
// //   const [newMessage, setNewMessage] = useState<boolean>(false);
// //   const [totalUnreadMessage, setTotalUnreadMessage] = useState<number>(0);

// //   useEffect(() => {
// //     setUser(localStorage.getItem("user"));
// //   }, []);

// //   const loginUser = (userData: any) => {
// //     setIsLoading(true);
// //     localStorage.setItem("user", JSON.stringify(userData));
// //     setIsAuthenticated(true);
// //     setUser(userData);
// //   };

// //   const navigateToSignIn = () => {
// //     logout();
// //   };

// //   useEffect(() => {
// //     if (user?.email) {
// //       // console.log("fetchbuyerdatasecond");

// //       // getHistoryOfUser();
// //       !user?.isBuyer
// //         ? fetchProfileData(user?.email, setUserProfile, setIsLoading)
// //         : fetchBuyersData(setUserProfile, user?.email, setIsLoading);
// //     }
// //   }, [user, rendControl]);

// //   useEffect(() => {
// //     if (userProfile?._id) {
// //       const ws = new WebSocket(
// //         `${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/message/${userProfile._id}`
// //       );
// //       setSocket(ws);
// //       setSockets(ws);
// //       ws.onopen = () => {
// //         const data: any = {
// //           notification: true,
// //           recipient_id: userProfile?._id,
// //         };
// //         console.log("Sockets are working");
// //         ws.send(JSON.stringify(data));
// //         if (user?.email) {
// //           const dtoForHistory: any = {
// //             email: user?.email,
// //           };
// //           ws.send(JSON.stringify(dtoForHistory));
// //         }
// //       };

// //       ws.onmessage = (event) => {
// //         console.log("message recieved");

// //         const message = event.data;
// //         const response = JSON.parse(message);
// //         console.log("response", response);
// //         // console.log(response, "response from sockets", selectedIds);
// //         if (response?.notifications) {
// //           // console.log(response?.notifications, "response?.notifications");
// //           setNotifications(response);
// //           const not = response?.notifications || [];
// //           const hasUnseen = not.some(
// //             (notification: any) => notification.Is_Seen === false
// //           );
// //           setNewNotification(hasUnseen);
// //         } else if (response?.conversations) {
// //           countNumberOfUnreadMessages(
// //             response?.conversations,
// //             setTotalUnreadMessage
// //           );
// //           // response?.conversations?.map((messages: any, index: number) => {
// //           //     const checkNewMessage = messages?.conversation_new_messages !== 0
// //           //     console.log(messages,"checkNewMessage",checkNewMessage)
// //           //       checkNewMessage &&  setNewMessage(checkNewMessage)
// //           // })
// //           const hasNewMessage = response?.conversations?.some(
// //             (messages: any) =>
// //               messages?.conversation_new_messages !== 0 &&
// //               selectedIds?.Conversation_Id !== messages?._id
// //           );
// //           setTimeout(() => {
// //             setNewMessage(hasNewMessage);
// //           }, 0);
// //           // setNewMessage(hasNewMessage);
// //           setConversationList(response);
// //           setConversations(response);
// //         }
// //       };

// //       ws.onerror = (error) => {
// //         console.error("WebSocket error:", error);
// //       };

// //       ws.onclose = () => {
// //         console.log("WebSocket connection closed");
// //       };

// //       setSocket(ws);

// //       return () => {
// //         ws.close();
// //       };
// //     }
// //   }, [userProfile, restartSocket]);

// //   // const getHistoryOfUser = async () => {
// //   //     const response = await conversationHistory(user?.email, setConversationList, 1, 6, setIsLoading)
// //   // }

// //   // useEffect(() => {
// //   //     if (user?.email && socket && socket.readyState === WebSocket.OPEN) {
// //   //         const dtoForHistory: any = {
// //   //             "email": user?.email
// //   //         }
// //   //         socket.send(JSON.stringify(dtoForHistory))
// //   //     }
// //   // }, [socket, user])

// //   const readNotification = async () => {
// //     const data = {
// //       notification_is_seen: true,
// //       recipient_id: userProfile?._id,
// //     };
// //     if (socket.readyState === WebSocket.OPEN) {
// //       setTimeout(() => {
// //         socket.send(JSON.stringify(data));
// //       }, 5000);
// //     }
// //   };

// //   const readMessage = async (conversation: any) => {
// //     const data = {
// //       conversation_id: conversation?._id,
// //       sender_id: userProfile?._id,
// //     };
// //     if (socket.readyState === WebSocket.OPEN) {
// //       socket.send(JSON.stringify(data));
// //       return true;
// //     } else {
// //       return false;
// //     }
// //   };

// //   const handlePlanUpgrade = async () => {
// //     try {
// //       // Close WebSocket connection before redirecting
// //       if (socket && socket.readyState === WebSocket.OPEN) {
// //         socket.close();
// //       }

// //       const response = await fetch(
// //         `process.env.NEXT_PUBLIC_API_URL/payments/create-customer-portal?user_id=${userProfile?._id}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             accept: "application/json",
// //           },
// //         }
// //       );

// //       const url = await response.json();
// //       if (url) {
// //         window.location.href = url;
// //       }
// //     } catch (error) {
// //       console.error("Error creating portal session:", error);
// //     }
// //   };

// //   return (
// //     <>
// //       {isLoading && <Loader />}
// //       <header className="navbar-section">
// //         <nav className="navbar bg-white">
// //           <div className="container-fluid">
// //             <Icon
// //               icon="ic:round-menu"
// //               width={24}
// //               height={24}
// //               type="button"
// //               className="d-lg-none"
// //               data-bs-toggle="offcanvas"
// //               data-bs-target="#offcanvasResponsive"
// //               aria-controls="offcanvasResponsive"
// //             />
// //             <LogoComponent role={user?.isBuyer ? "brand" : "creator"} />

// //             <div className="dropdown ms-auto">
// //               <FeedbackFish projectId={"0f9650767d04f4"}>
// //                 <button className="btn bg-transparent border-0 me-2">
// //                   <Icon
// //                     icon="mingcute:question-line"
// //                     width={24}
// //                     height={24}
// //                     className="text-warning"
// //                   />
// //                 </button>
// //               </FeedbackFish>
// //             </div>
// //             <div className="dropdown ">
// //               <a
// //                 className="btn bg-transparent dropdown-toggle border-0"
// //                 type="button"
// //                 data-bs-toggle="dropdown"
// //                 aria-expanded="false"
// //                 onClick={readNotification}
// //               >
// //                 <Icon
// //                   icon="mingcute:notification-line"
// //                   width={24}
// //                   height={24}
// //                   className="text-warning"
// //                 />
// //                 {newNotification && (
// //                   <span className="position-circle-notification">
// //                     <div
// //                       style={{
// //                         height: "10px",
// //                         width: "10px",
// //                         borderRadius: "50%",
// //                         backgroundColor: "red",
// //                       }}
// //                     ></div>
// //                   </span>
// //                 )}
// //               </a>

// //               <ul className="dropdown-menu p-0">
// //                 <li className="activated-subtle dropdown-header sticky-top d-flex justify-content-between">
// //                   <span className="text-dark">Notifications</span>
// //                   {/* <a href="#" className="text-muted fs-12 text-decoration-none">View All</a> */}
// //                 </li>
// //                 {notifications?.notifications &&
// //                   notifications?.notifications?.length !== 0 ? (
// //                   notifications?.notifications?.map(
// //                     (notify: any, index: number) => {
// //                       return (
// //                         <div
// //                           key={index}
// //                           style={
// //                             notify?.Is_Seen
// //                               ? {}
// //                               : { backgroundColor: "#F0F5FF" }
// //                           }
// //                         >
// //                           <li>
// //                             <a className="dropdown-item">
// //                               <div className="d-flex gap-2">
// //                                 <div className="rounded-circle flex-shrink-0 bg-circle-notification">
// //                                   {notify?.Notification_Icon_Type ==
// //                                     "new_campaign_application" && (
// //                                       <Icon
// //                                         icon="ci:add-plus"
// //                                         width="22"
// //                                         height="22"
// //                                         className="text-info"
// //                                       />
// //                                     )}
// //                                   {notify?.Notification_Icon_Type ==
// //                                     "campaign_application_accepted" && (
// //                                       <Icon
// //                                         icon="mdi:tick"
// //                                         width="20"
// //                                         height="20"
// //                                         className="text-primary"
// //                                       />
// //                                     )}
// //                                   {notify?.Notification_Icon_Type ==
// //                                     "campaign_post_rejected" && (
// //                                       <Icon
// //                                         icon="pepicons-pencil:exclamation"
// //                                         width="22"
// //                                         height="22"
// //                                         className="text-danger"
// //                                       />
// //                                     )}
// //                                   {notify?.Notification_Icon_Type ==
// //                                     "campaign_post_approved" && (
// //                                       <Icon
// //                                         icon="mdi:tick"
// //                                         width="20"
// //                                         height="20"
// //                                         className="text-primary"
// //                                       />
// //                                     )}
// //                                   {notify?.Notification_Icon_Type ==
// //                                     "campaign_post_submission" && (
// //                                       <Icon
// //                                         icon="ci:add-plus"
// //                                         width="22"
// //                                         height="22"
// //                                         className="text-info"
// //                                       />
// //                                     )}
// //                                 </div>
// //                                 <div className="flex-grow-1">
// //                                   <p className="mb-0 fw-medium fs-12">
// //                                     {notify?.Title}
// //                                   </p>
// //                                   <p className="mb-0 fs-10 text-warning line-clamp-2">
// //                                     {notify?.Message}
// //                                   </p>
// //                                 </div>
// //                               </div>
// //                             </a>
// //                           </li>

// //                           <hr className="m-0 text-warning" />
// //                         </div>
// //                       );
// //                     }
// //                   )
// //                 ) : (
// //                   <div className=" mb-2 mt-2 text-center">
// //                     <small>No new Notifications </small>
// //                   </div>
// //                 )}
// //               </ul>
// //             </div>

// //             <div className="dropdown">
// //               <a
// //                 className="btn bg-transparent dropdown-toggle border-0"
// //                 type="button"
// //                 data-bs-toggle="dropdown"
// //                 aria-expanded="false"
// //                 onClick={() => {
// //                   setNewMessage(false);
// //                 }}
// //               >
// //                 <Icon
// //                   icon="uil:envelope"
// //                   width={25}
// //                   height={25}
// //                   className="text-warning"
// //                 />
// //                 <span className="position-circle-message">
// //                   {newMessage && (
// //                     <div
// //                       style={{
// //                         height: "10px",
// //                         width: "10px",
// //                         borderRadius: "50%",
// //                         backgroundColor: "red",
// //                       }}
// //                     ></div>
// //                   )}
// //                 </span>
// //               </a>
// //               <ul className="dropdown-menu p-0">
// //                 <li className="activated-subtle dropdown-header sticky-top d-flex justify-content-between">
// //                   <span className="text-dark">Messages</span>
// //                   <a
// //                     className="text-muted fs-12 text-decoration-none"
// //                     style={{ cursor: "pointer" }}
// //                     onClick={() => {
// //                       router.push("/inbox");
// //                     }}
// //                   >
// //                     View All
// //                   </a>
// //                 </li>
// //                 {conversationList?.conversations?.map(
// //                   (conversation: any, index: number) => {
// //                     return (
// //                       <div key={index}>
// //                         <li
// //                           onClick={async () => {
// //                             const response = await readMessage(conversation);
// //                             if (response) {
// //                               router.push(
// //                                 `/inbox?id=${conversation?.Last_Message?.Recipient_ID}`
// //                               );
// //                             } else {
// //                             }
// //                           }}
// //                           style={{ cursor: "pointer" }}
// //                         >
// //                           <a
// //                             className="dropdown-item"
// //                             style={{ color: "inherit" }}
// //                           >
// //                             <div className="d-flex align-items-center cursor-pointer">
// //                               <img
// //                                 src={
// //                                   conversation?.Profile_Image ||
// //                                   "https://e1cdn.social27.com/digitalevents/synnc/no-pic-synnc.jpg"
// //                                 }
// //                                 alt="Profile"
// //                                 width={32}
// //                                 height={32}
// //                                 className="rounded-circle me-2 flex-shrink-0"
// //                               />

// //                               <div className="flex-grow-1">
// //                                 <h6 className="mb-0 fs-12">
// //                                   {conversation?.Name}{" "}
// //                                 </h6>
// //                                 <small className="text-muted fs-10">
// //                                   {conversation?.Last_Message?.Message?.length <
// //                                     26
// //                                     ? conversation?.Last_Message?.Message
// //                                     : conversation?.Last_Message?.Message?.slice(
// //                                       0,
// //                                       25
// //                                     ) + "..."}
// //                                 </small>
// //                               </div>
// //                               <div
// //                                 style={{
// //                                   textAlign: "center",
// //                                   alignContent: "center",
// //                                 }}
// //                               >
// //                                 {conversation?.conversation_new_messages !==
// //                                   0 && (
// //                                     <div className="number-circle ms-auto">
// //                                       <span className="fs-10">
// //                                         {conversation?.conversation_new_messages}
// //                                       </span>
// //                                     </div>
// //                                   )}
// //                                 <small className="text-muted fs-10 flex-shrink-0 ms-2 w-s">
// //                                   {conversation?.Last_Message?.Time_Ago}
// //                                 </small>
// //                               </div>
// //                             </div>
// //                           </a>
// //                         </li>
// //                         <hr className="m-0 text-warning" />
// //                       </div>
// //                     );
// //                   }
// //                 )}
// //               </ul>
// //             </div>

// //             <div className="dropdown">
// //               <a
// //                 className="btn bg-transparent dropdown-toggle border-0"
// //                 type="button"
// //                 data-bs-toggle="dropdown"
// //                 aria-expanded="false"
// //               >
// //                 <div className="d-flex align-items-center">
// //                   {userProfile?.Profile_Image || userProfile?.Company_Logo ? (
// //                     <div className="img-container-topHeader">
// //                       <img
// //                         src={
// //                           userProfile?.Profile_Image ||
// //                           userProfile?.Company_Logo
// //                         }
// //                         alt="user"
// //                         className=""
// //                       />
// //                     </div>
// //                   ) : (
// //                     <div
// //                       className="d-flex align-items-center justify-content-center bg-light rounded-circle"
// //                       style={{ width: "32px", height: "32px" }}
// //                     >
// //                       <span className="fw-bold text-uppercase">
// //                         {userProfile?.Company_Name
// //                           ? userProfile.Company_Name.charAt(0)
// //                           : userProfile?.Name
// //                             ? userProfile.Name.charAt(0)
// //                             : "U"}
// //                       </span>
// //                     </div>
// //                   )}
// //                   <p className="mb-0 ms-2">
// //                     {userProfile?.Company_Name || userProfile?.Name}
// //                   </p>
// //                   <Icon
// //                     icon="prime:chevron-down"
// //                     className="ms-2"
// //                     width={20}
// //                     height={20}
// //                   />
// //                 </div>
// //               </a>

// //               <ul className="dropdown-menu sign-out-menu p-0">
// //                 {user?.isBuyer && (
// //                   <li>
// //                     <a
// //                       className="dropdown-item"
// //                       href="#"
// //                       onClick={handlePlanUpgrade}
// //                     >
// //                       Plan Upgrade
// //                     </a>
// //                   </li>
// //                 )}
// //                 <li>
// //                   <a
// //                     className="dropdown-item"
// //                     href="#"
// //                     onClick={() => {
// //                       router.push("/settings");
// //                     }}
// //                   >
// //                     <form className="d-flex" role="search">
// //                       <p className="mb-0">Settings</p>
// //                     </form>
// //                   </a>
// //                 </li>

// //                 <li>
// //                   <a
// //                     className="dropdown-item"
// //                     href="#"
// //                     onClick={navigateToSignIn}
// //                   >
// //                     <form className="d-flex" role="search">
// //                       <p className="mb-0">Sign Out</p>
// //                     </form>
// //                   </a>
// //                 </li>
// //               </ul>
// //             </div>

// //             {/* </div> */}
// //           </div>
// //         </nav>
// //       </header>
// //     </>
// //   );
// // }
// // function setIsAuthenticated(arg0: boolean) {
// //   throw new Error("Function not implemented.");
// // }

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { FeedbackFish } from "@feedback-fish/react";
import {
  countNumberOfUnreadMessages,
  fetchBuyersData,
  fetchProfileData,
  fetchNotificationHistory,
  fetchUnseenNotificationCount,
} from "@/@api";
import Loader from "@/components/loader";
import { defaultImagePath } from "@/components/constants";
import LogoComponent from "@/components/LogoComponent";
import { NotificationData } from "../services/socketService";
import useNotificationSocket from "../services/useNotificationSocket";

interface Notification {
  Is_Seen: boolean;
  Notification_Icon_Type: string;
  Title: string;
  Message: string;
  Event_Type: string;
  Meta_Data: {
    _id?: string;
    Campaign_ID: string;
    Creator_ID: string;
    Post_ID: string;
    [key: string]: any;
  };
}

interface NotificationListProps {
  notifications: Notification[];
}

interface NotificationResponse {
  notifications: Notification[];
  pagination: {
    Current_Page: number;
    Items_Per_Page: number;
    Total_Items: number;
    Total_Pages: number;
  };
}

interface UnseenNotificationResponse {
  data: {
    total: number;
  };
}

export default function Header() {
  const router = useRouter();
  const [users, setUser] = useState<any>();
  const {
    user,
    logout,
    userProfile,
    setUserProfile,
    rendControl,
    isLoading,
    setIsLoading,
    notifications,
    setNotifications,
    setConversations,
    selectedIds,
  } = useAuth();
  const [conversationList, setConversationList] = useState<any>();
  const [newNotificationCount, setNewNotificationCount] = useState<number>(0);
  const [newMessage, setNewMessage] = useState<boolean>(false);
  const [totalUnreadMessage, setTotalUnreadMessage] = useState<number>(0);
  const [eventTypes, setEventTypes] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Use notification socket with callback to update state
  const { isConnected, joinGroup } = useNotificationSocket({
    onNotification: (data: NotificationData) => {
      console.log("Notification received in Header:", data);
      const { event_type, message, meta_data, notification_icon_type, title } = data.m.OtherFields;

      const supportedEventTypes = [
        "apply_campaign",
        "campaign_application_approved",
        "campaign_post_created",
        "campaign_post_proposal_accepted",
        "campaign_post_proposal_rejected",
        "campaign_post_content_created",
        "campaign_live_link_generated",
        "payment_succeeded",
        "payment_initiated",
        "new_campaign_application",
        "campaign_application_accepted",
        "post_content_posted",
        "post_impression_posted",
        "post_content_approved",
        "post_content_rejected",
      ];
      setEventTypes(supportedEventTypes);

      if (!supportedEventTypes.includes(event_type)) {
        console.log("Event type not supported:", event_type);
        return;
      }

      const newNotificationData: Notification = {
        Is_Seen: false,
        Notification_Icon_Type: notification_icon_type || mapEventTypeToIcon(event_type),
        Title: title || getNotificationTitle(event_type),
        Message: message,
        Event_Type: event_type,
        Meta_Data: {
          ...meta_data,
          Campaign_ID: meta_data?.Campaign_ID || "",
          Creator_ID: meta_data?.Creator_ID || "",
          Post_ID: meta_data?.Post_ID || meta_data?._id || "",
        },
      };

      console.log("New Notification Data:", newNotificationData);

      // Update notifications state by appending the new notification
      setNotifications((prev: NotificationListProps) => {
        const currentNotifications = prev.notifications;
        // Avoid duplicates by checking if the notification already exists (using _id if available)
        const existingIds = new Set(currentNotifications.map((n) => n.Meta_Data?._id));
        if (newNotificationData.Meta_Data?._id && existingIds.has(newNotificationData.Meta_Data._id)) {
          console.log("Duplicate notification skipped:", newNotificationData.Meta_Data._id);
          return prev;
        }

        const updatedNotifications = [newNotificationData, ...currentNotifications];
        const unseenCount = updatedNotifications.filter((n: Notification) => !n.Is_Seen).length;
        console.log("Updated Notifications:", { notifications: updatedNotifications });
        console.log("New Unseen Count:", unseenCount);
        setNewNotificationCount(unseenCount);
        return { notifications: updatedNotifications };
      });
    },
  });

  // Fetch notification history and unseen count on page load
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userProfile?._id) return;

      const recipientId = userProfile._id;

      try {
        // Fetch notification history for the first page
        const historyData: NotificationResponse = await fetchNotificationHistory(recipientId, 1, 10);
        console.log("Notification History Response:", historyData);

        // Fetch unseen notification count
        const unseenData: UnseenNotificationResponse = await fetchUnseenNotificationCount(recipientId, 1, 10);
        console.log("Unseen Notification Response:", unseenData);

        // Set notifications state with historical data
        setNotifications({
          notifications: historyData.notifications || [],
        });

        // Set pagination state
        setCurrentPage(historyData.pagination.Current_Page);
        setTotalPages(historyData.pagination.Total_Pages);

        // Set unseen count
        setNewNotificationCount(unseenData.data.total || 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userProfile, setNotifications, setNewNotificationCount]);

  // Fetch more notifications when scrolling to the bottom
  const fetchMoreNotifications = async () => {
    if (isFetchingMore || currentPage >= totalPages || !userProfile?._id) return;

    setIsFetchingMore(true);
    const nextPage = currentPage + 1;

    try {
      const recipientId = userProfile._id;
      const historyData: NotificationResponse = await fetchNotificationHistory(recipientId, nextPage, 10);
      console.log("Fetched More Notifications:", historyData);

      // Append new notifications to the existing list
      setNotifications((prev: NotificationListProps) => {
        const updatedNotifications = [...prev.notifications, ...historyData.notifications];
        return { notifications: updatedNotifications };
      });

      // Update pagination state
      setCurrentPage(historyData.pagination.Current_Page);
      setTotalPages(historyData.pagination.Total_Pages);
    } catch (error) {
      console.error("Error fetching more notifications:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Handle scroll event to detect when user reaches the bottom
  const handleScroll = () => {
    if (!dropdownRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // Small threshold to trigger before exact bottom

    if (isAtBottom && !isFetchingMore && currentPage < totalPages) {
      fetchMoreNotifications();
    }
  };

  // Add and remove scroll event listener when dropdown opens/closes
  useEffect(() => {
    const dropdownElement = dropdownRef.current;
    if (isDropdownOpen && dropdownElement) {
      dropdownElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (dropdownElement) {
        dropdownElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isDropdownOpen, currentPage, totalPages, isFetchingMore]);

  // Handle dropdown open/close
  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
    if (isOpen) {
      readNotification();
    }
  };

  useEffect(() => {
    console.log("Is Socket Connected:", isConnected);
    console.log("User Profile:", userProfile);
    setUser(localStorage.getItem("user"));
  }, [isConnected, userProfile]);

  useEffect(() => {
    console.log("Notifications State Changed:", notifications);
    console.log("New Notification Count Changed:", newNotificationCount);
  }, [notifications, newNotificationCount]);

  const loginUser = (userData: any) => {
    setIsLoading(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const navigateToSignIn = () => {
    logout();
  };

  useEffect(() => {
    if (user?.email) {
      !user?.isBuyer
        ? fetchProfileData(user?.email, setUserProfile, setIsLoading)
        : fetchBuyersData(setUserProfile, user?.email, setIsLoading);
    }
  }, [user, rendControl]);

  const handleNotificationClick = (notify: Notification) => {
    const { _id, Campaign_ID, Creator_ID, Post_ID } = notify.Meta_Data;

    // Update notifications state with the clicked notification marked as seen
    setNotifications((prev: NotificationListProps) => {
      const updatedNotifications = prev.notifications.map((n) =>
        n === notify ? { ...n, Is_Seen: true } : n
      );
      const unseenCount = updatedNotifications.filter((n: Notification) => !n.Is_Seen).length;
      setNewNotificationCount(unseenCount);
      return { notifications: updatedNotifications };
    });

    // Define different URLs based on the event type
    let url = "";
    switch (notify.Event_Type) {
      case "apply_campaign":
        url = `/campaign-details/${_id}?tab=applied`;
        break;
      case "campaign_application_approved":
        url = `/campaign-hub?id=${Campaign_ID}`;
        break;
      case "campaign_post_created":
      case "campaign_post_content_created":
      case "campaign_live_link_generated":
      case "post_impression_posted":
        url = `/campaign-details/${Campaign_ID}?tab=in_campaign&creator=${Creator_ID}&post=${Post_ID}`;
        break;
      case "campaign_post_proposal_accepted":
      case "post_content_approved":
      case "post_content_rejected":
      case "payment_initiated":
      case "payment_succeeded":
        url = `/campaign-hub?id=${Campaign_ID}&postId=${Post_ID}`;
        break;
      default:
        console.warn(`Unhandled event type: ${notify.Event_Type}`);
        return;
    }

    // Navigate to the URL
    if (url) {
      router.push(url);
    }
  };

  const readNotification = () => {
    setNotifications((prev: NotificationListProps) => {
      const updatedNotifications = prev.notifications.map((n) => ({
        ...n,
        Is_Seen: true,
      }));
      setNewNotificationCount(0);
      return { notifications: updatedNotifications };
    });
  };

  const readMessage = async (conversation: any) => {
    setNewMessage(false);
    return true;
  };

  const mapEventTypeToIcon = (eventType: string): string => {
    switch (eventType) {
      case "new_campaign_application":
        return "new_campaign_application";
      case "campaign_application_accepted":
        return "campaign_application_accepted";
      case "campaign_post_created":
        return "campaign_post_submission";
      case "campaign_post_proposal_accepted":
        return "campaign_post_approved";
      case "campaign_post_proposal_rejected":
        return "campaign_post_rejected";
      case "payment_succeeded":
        return "campaign_application_accepted";
      case "post_content_posted":
        return "campaign_post_submission";
      case "post_content_approved":
        return "campaign_post_approved";
      case "post_content_rejected":
        return "campaign_post_rejected";
      default:
        return "new_campaign_application";
    }
  };

  const getNotificationTitle = (eventType: string): string => {
    switch (eventType) {
      case "new_campaign_application":
        return "New Campaign Application";
      case "campaign_application_accepted":
        return "Campaign Application Accepted";
      case "campaign_post_created":
        return "New Post Created";
      case "campaign_post_proposal_accepted":
        return "Post Proposal Accepted";
      case "campaign_post_proposal_rejected":
        return "Post Proposal Rejected";
      case "payment_succeeded":
        return "Payment Succeeded";
      case "post_content_posted":
        return "Post Content Posted";
      case "post_content_approved":
        return "Post Content Approved";
      case "post_content_rejected":
        return "Post Content Rejected";
      default:
        return "New Notification";
    }
  };

  const handlePlanUpgrade = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create-customer-portal?user_id=${userProfile?._id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const url = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating portal session:", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <header className="navbar-section">
        <nav className="navbar bg-white">
          <div className="container-fluid">
            <Icon
              icon="ic:round-menu"
              width={24}
              height={24}
              type="button"
              className="d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
              aria-controls="offcanvasResponsive"
            />
            <LogoComponent role={user?.isBuyer ? "brand" : "creator"} />

            <div className="dropdown ms-auto">
              <FeedbackFish projectId={"0f9650767d04f4"}>
                <button className="btn bg-transparent border-0 me-2">
                  <Icon
                    icon="mingcute:question-line"
                    width={24}
                    height={24}
                    className="text-warning"
                  />
                </button>
              </FeedbackFish>
            </div>
            <div className="dropdown">
              <a
                className="btn bg-transparent dropdown-toggle border-0 position-relative"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => handleDropdownToggle(true)}
                onBlur={() => handleDropdownToggle(false)}
              >
                <Icon
                  icon="mingcute:notification-line"
                  width={24}
                  height={24}
                  className="text-warning"
                />
                {newNotificationCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {newNotificationCount}
                    <span className="visually-hidden">unread notifications</span>
                  </span>
                )}
              </a>

              <ul
                className="dropdown-menu p-0"
                ref={dropdownRef}
                style={{ maxHeight: "400px", overflowY: "auto" }} // Enable scrolling in the dropdown
              >
                <li className="activated-subtle dropdown-header sticky-top d-flex justify-content-between">
                  <span className="text-dark">Notifications</span>
                </li>
                {notifications?.notifications?.length > 0 ? (
                  notifications.notifications.map((notify: Notification, index: number) => (
                    <div
                      key={index}
                      style={notify?.Is_Seen ? {} : { backgroundColor: "#F0F5FF" }}
                      onClick={() => handleNotificationClick(notify)}
                      className="notification-item"
                    >
                      <li>
                        <a className="dropdown-item" style={{ cursor: "pointer" }}>
                          <div className="d-flex gap-2">
                            <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                              {notify?.Event_Type === "apply_campaign" && (
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 2H16C17.1 2 18 2.9 18 4V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V4C6 2.9 6.9 2 8 2Z"
                                    stroke="#4CAF50"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9 6H15M9 10H15M9 14H12"
                                    stroke="#4CAF50"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M15 19L17 21L21 17"
                                    stroke="#4CAF50"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                              {notify?.Event_Type === "campaign_application_approved" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 2H16C17.1 2 18 2.9 18 4V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V4C6 2.9 6.9 2 8 2Z"
                                    stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M16 19L18 21L22 17" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                              {notify?.Event_Type === "campaign_post_created" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 2H16C17.1 2 18 2.9 18 4V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V4C6 2.9 6.9 2 8 2Z"
                                    stroke="#FF9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M12 8V14M9 11H15" stroke="#FF9800" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              )}
                              {notify?.Event_Type === "campaign_live_link_generated" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 6V2M12 6L16 2M12 6L8 2" stroke="#673AB7" strokeWidth="2" strokeLinecap="round" />
                                  <rect x="5" y="8" width="14" height="14" rx="2" stroke="#673AB7" strokeWidth="2" />
                                </svg>
                              )}
                              {notify?.Event_Type === "post_impression_posted" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 4C7 4 3 8 3 12C3 16 7 20 12 20C17 20 21 16 21 12C21 8 17 4 12 4Z"
                                    stroke="#03A9F4" strokeWidth="2" />
                                  <circle cx="12" cy="12" r="3" stroke="#03A9F4" strokeWidth="2" />
                                </svg>
                              )}
                              {notify?.Event_Type === "campaign_post_proposal_accepted" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7 9L12 14L17 9" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                                  <path d="M5 19H19" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              )}
                              {notify?.Event_Type === "post_content_approved" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 2H16C17.1 2 18 2.9 18 4V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V4C6 2.9 6.9 2 8 2Z"
                                    stroke="#4CAF50" strokeWidth="2" />
                                  <path d="M16 19L18 21L22 17" stroke="#4CAF50" strokeWidth="2" />
                                </svg>
                              )}
                              {notify?.Event_Type === "payment_initiated" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2V6M12 6L15 3M12 6L9 3" stroke="#FFC107" strokeWidth="2" />
                                  <circle cx="12" cy="14" r="8" stroke="#FFC107" strokeWidth="2" />
                                </svg>
                              )}
                              {notify?.Event_Type === "campaign_post_content_created" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M8 2H16C17.1 2 18 2.9 18 4V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V4C6 2.9 6.9 2 8 2Z"
                                    stroke="#FF9800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10 8H14M10 12H14M10 16H12"
                                    stroke="#FF9800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M17 17L21 21M21 17L17 21"
                                    stroke="#FF9800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              )}
                              {notify?.Event_Type === "campaign_post_content_updated" && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M8 2H16C17.1 2 18 2.9 18 4V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V4C6 2.9 6.9 2 8 2Z"
                                    stroke="#4CAF50"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10 8H14M10 12H14M10 16H12"
                                    stroke="#4CAF50"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M18 12V14M18 20V22M20 18H22M12 18H14M15.5 14.5L14 16M20.5 14.5L22 16M20.5 21.5L22 20M15.5 21.5L14 20"
                                    stroke="#4CAF50"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="flex-grow-1 position-relative">
                              <p className="mb-0 fw-medium fs-12">{notify?.Title}</p>
                              <p className="mb-0 fs-10 text-warning line-clamp-2">{notify?.Message}</p>
                              <span className="tooltip">View campaign details</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <hr className="m-0 text-warning" />
                    </div>
                  ))
                ) : (
                  <div className="mb-2 mt-2 text-center">
                    <small>No new Notifications</small>
                  </div>
                )}
                {isFetchingMore && (
                  <div className="text-center p-2">
                    <small>Loading more notifications...</small>
                  </div>
                )}
                {currentPage >= totalPages && notifications?.notifications?.length > 0 && (
                  <div className="text-center p-2">
                    <small>No more notifications to load</small>
                  </div>
                )}
              </ul>
            </div>

            <div className="dropdown">
              <a
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => {
                  setNewMessage(false);
                }}
              >
                <Icon
                  icon="uil:envelope"
                  width={25}
                  height={25}
                  className="text-warning"
                />
                <span className="position-circle-message">
                  {newMessage && (
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    ></div>
                  )}
                </span>
              </a>
              <ul className="dropdown-menu p-0">
                <li className="activated-subtle dropdown-header sticky-top d-flex justify-content-between">
                  <span className="text-dark">Messages</span>
                  <a
                    className="text-muted fs-12 text-decoration-none"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push("/inbox");
                    }}
                  >
                    View All
                  </a>
                </li>
                {conversationList?.conversations?.map(
                  (conversation: any, index: number) => (
                    <div key={index}>
                      <li
                        onClick={async () => {
                          const response = await readMessage(conversation);
                          if (response) {
                            router.push(
                              `/inbox?id=${conversation?.Last_Message?.Recipient_ID}`
                            );
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <a
                          className="dropdown-item"
                          style={{ color: "inherit" }}
                        >
                          <div className="d-flex align-items-center cursor-pointer">
                            <img
                              src={
                                conversation?.Profile_Image ||
                                "https://e1cdn.social27.com/digitalevents/synnc/no-pic-synnc.jpg"
                              }
                              alt="Profile"
                              width={32}
                              height={32}
                              className="rounded-circle me-2 flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                              <h6 className="mb-0 fs-12">
                                {conversation?.Name}{" "}
                              </h6>
                              <small className="text-muted fs-10">
                                {conversation?.Last_Message?.Message?.length <
                                  26
                                  ? conversation?.Last_Message?.Message
                                  : conversation?.Last_Message?.Message?.slice(
                                    0,
                                    25
                                  ) + "..."}
                              </small>
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                alignContent: "center",
                              }}
                            >
                              {conversation?.conversation_new_messages !==
                                0 && (
                                  <div className="number-circle ms-auto">
                                    <span className="fs-10">
                                      {conversation?.conversation_new_messages}
                                    </span>
                                  </div>
                                )}
                              <small className="text-muted fs-10 flex-shrink-0 ms-2 w-s">
                                {conversation?.Last_Message?.Time_Ago}
                              </small>
                            </div>
                          </div>
                        </a>
                      </li>
                      <hr className="m-0 text-warning" />
                    </div>
                  )
                )}
              </ul>
            </div>

            <div className="dropdown">
              <a
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  {userProfile?.Profile_Image || userProfile?.Company_Logo ? (
                    <div className="img-container-topHeader">
                      <img
                        src={
                          userProfile?.Profile_Image ||
                          userProfile?.Company_Logo
                        }
                        alt="user"
                        className=""
                      />
                    </div>
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <span className="fw-bold text-uppercase">
                        {userProfile?.Company_Name
                          ? userProfile.Company_Name.charAt(0)
                          : userProfile?.Name
                            ? userProfile.Name.charAt(0)
                            : "U"}
                      </span>
                    </div>
                  )}
                  <p className="mb-0 ms-2">
                    {userProfile?.Company_Name || userProfile?.Name}
                  </p>
                  <Icon
                    icon="prime:chevron-down"
                    className="ms-2"
                    width={20}
                    height={20}
                  />
                </div>
              </a>

              <ul className="dropdown-menu sign-out-menu p-0">
                {user?.isBuyer && (
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handlePlanUpgrade}
                    >
                      Plan Upgrade
                    </a>
                  </li>
                )}
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      router.push("/settings");
                    }}
                  >
                    <form className="d-flex" role="search">
                      <p className="mb-0">Settings</p>
                    </form>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={navigateToSignIn}
                  >
                    <form className="d-flex" role="search">
                      <p className="mb-0">Sign Out</p>
                    </form>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}