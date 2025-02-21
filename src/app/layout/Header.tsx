"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { FeedbackFish } from "@feedback-fish/react";

import {
  countNumberOfUnreadMessages,
  fetchBuyersData,
  fetchProfileData,
} from "@/@api";
import Loader from "@/components/loader";
import { defaultImagePath } from "@/components/constants";

export default function Header() {
  const router = useRouter();
  const [users, setUser] = useState<any>();
  const {
    restartSocket,
    setSockets,
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
  const [newNotification, setNewNotification] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>();
  const [newMessage, setNewMessage] = useState<boolean>(false);
  const [totalUnreadMessage, setTotalUnreadMessage] = useState<number>(0);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const navigateToSignIn = () => {
    logout();
  };

  useEffect(() => {
    if (user?.email) {
      // console.log("fetchbuyerdatasecond");

      // getHistoryOfUser();
      !user?.isBuyer
        ? fetchProfileData(user?.email, setUserProfile, setIsLoading)
        : fetchBuyersData(setUserProfile, user?.email, setIsLoading);
    }
  }, [user, rendControl]);

  useEffect(() => {
    if (userProfile?._id) {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/message/${userProfile._id}`
      );
      setSocket(ws);
      setSockets(ws);
      ws.onopen = () => {
        const data: any = {
          notification: true,
          recipient_id: userProfile?._id,
        };
        console.log("Sockets are working");
        ws.send(JSON.stringify(data));
        if (user?.email) {
          const dtoForHistory: any = {
            email: user?.email,
          };
          ws.send(JSON.stringify(dtoForHistory));
        }
      };

      ws.onmessage = (event) => {
        const message = event.data;
        const response = JSON.parse(message);

        // console.log(response, "response from sockets", selectedIds);
        if (response?.notifications) {
          // console.log(response?.notifications, "response?.notifications");
          setNotifications(response);
          const not = response?.notifications || [];
          const hasUnseen = not.some(
            (notification: any) => notification.Is_Seen === false
          );
          setNewNotification(hasUnseen);
        } else if (response?.conversations) {
          countNumberOfUnreadMessages(
            response?.conversations,
            setTotalUnreadMessage
          );
          // response?.conversations?.map((messages: any, index: number) => {
          //     const checkNewMessage = messages?.conversation_new_messages !== 0
          //     console.log(messages,"checkNewMessage",checkNewMessage)
          //       checkNewMessage &&  setNewMessage(checkNewMessage)
          // })
          const hasNewMessage = response?.conversations?.some(
            (messages: any) =>
              messages?.conversation_new_messages !== 0 &&
              selectedIds?.Conversation_Id !== messages?._id
          );
          setNewMessage(hasNewMessage);
          setConversationList(response);
          setConversations(response);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [userProfile, restartSocket]);

  // const getHistoryOfUser = async () => {
  //     const response = await conversationHistory(user?.email, setConversationList, 1, 6, setIsLoading)
  // }

  // useEffect(() => {
  //     if (user?.email && socket && socket.readyState === WebSocket.OPEN) {
  //         const dtoForHistory: any = {
  //             "email": user?.email
  //         }
  //         socket.send(JSON.stringify(dtoForHistory))
  //     }
  // }, [socket, user])

  const readNotification = async () => {
    const data = {
      notification_is_seen: true,
      recipient_id: userProfile?._id,
    };
    if (socket.readyState === WebSocket.OPEN) {
      setTimeout(() => {
        socket.send(JSON.stringify(data));
      }, 5000);
    }
  };

  const readMessage = async (conversation: any) => {
    const data = {
      conversation_id: conversation?._id,
      sender_id: userProfile?._id,
    };
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  };

  const handlePlanUpgrade = async () => {
    try {
      // Close WebSocket connection before redirecting
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }

      const response = await fetch(
        `process.env.NEXT_PUBLIC_API_URL/payments/create-customer-portal?user_id=${userProfile?._id}`,
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
            <a className="navbar-brand">
              <img
                src="/assets/images/synnc-logo-new.png"
                alt="logo"
                width={80}
                height={30}
                className="img-fluid ps-3 ps-lg-0 mb-2 mb-lg-0"
              />
            </a>
            {/* <Icon icon="ic:round-menu" width={24} height={24} type="button" className="d-none d-lg-block" /> */}
            {/* <h5 className='mb-0 ms-3'>{pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)}</h5> */}
            {/* <button
                            className="navbar-toggler bg-primary"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
            {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            Navigation items here
                        </ul> */}
            {/* <form className="d-flex" role="search">
                                {(pathname !== '/' && pathname !== '/login') && (
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        type="button" // Ensure button type is 'button'
                                        onClick={navigateToSignIn}
                                    >
                                        {user?"Sign Out":"Sign In"}
                                    </button>
                                )} */}
            {/* Register button if needed */}
            {/* </form> */}

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
            <div className="dropdown ">
              <a
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={readNotification}
              >
                <Icon
                  icon="mingcute:notification-line"
                  width={24}
                  height={24}
                  className="text-warning"
                />
                {newNotification && (
                  <span className="position-circle-notification">
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    ></div>
                  </span>
                )}
              </a>

              <ul className="dropdown-menu p-0">
                <li className="activated-subtle dropdown-header sticky-top d-flex justify-content-between">
                  <span className="text-dark">Notifications</span>
                  {/* <a href="#" className="text-muted fs-12 text-decoration-none">View All</a> */}
                </li>
                {notifications?.notifications &&
                notifications?.notifications?.length !== 0 ? (
                  notifications?.notifications?.map(
                    (notify: any, index: number) => {
                      return (
                        <div
                          key={index}
                          style={
                            notify?.Is_Seen
                              ? {}
                              : { backgroundColor: "#F0F5FF" }
                          }
                        >
                          <li>
                            <a className="dropdown-item">
                              <div className="d-flex gap-2">
                                <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                  {notify?.Notification_Icon_Type ==
                                    "new_campaign_application" && (
                                    <Icon
                                      icon="ci:add-plus"
                                      width="22"
                                      height="22"
                                      className="text-info"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_application_accepted" && (
                                    <Icon
                                      icon="mdi:tick"
                                      width="20"
                                      height="20"
                                      className="text-primary"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_post_rejected" && (
                                    <Icon
                                      icon="pepicons-pencil:exclamation"
                                      width="22"
                                      height="22"
                                      className="text-danger"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_post_approved" && (
                                    <Icon
                                      icon="mdi:tick"
                                      width="20"
                                      height="20"
                                      className="text-primary"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_post_submission" && (
                                    <Icon
                                      icon="ci:add-plus"
                                      width="22"
                                      height="22"
                                      className="text-info"
                                    />
                                  )}
                                </div>
                                <div className="flex-grow-1">
                                  <p className="mb-0 fw-medium fs-12">
                                    {notify?.Title}
                                  </p>
                                  <p className="mb-0 fs-10 text-warning line-clamp-2">
                                    {notify?.Message}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>

                          <hr className="m-0 text-warning" />
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className=" mb-2 mt-2 text-center">
                    <small>No new Notifications </small>
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
                  (conversation: any, index: number) => {
                    return (
                      <div key={index}>
                        <li
                          onClick={async () => {
                            const response = await readMessage(conversation);
                            if (response) {
                              router.push(
                                `/inbox?id=${conversation?.Last_Message?.Recipient_ID}`
                              );
                            } else {
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
                                  defaultImagePath
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
                    );
                  }
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
                    <img
                      src={
                        userProfile?.Profile_Image || userProfile?.Company_Logo
                      }
                      alt="user"
                      width={32}
                      height={32}
                      className="user-img"
                    />
                  ) : (
                    <img src={defaultImagePath} width={32} height={32} />
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

            {/* </div> */}
          </div>
        </nav>
      </header>
    </>
  );
}
