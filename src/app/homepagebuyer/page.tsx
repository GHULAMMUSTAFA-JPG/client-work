"use client";

import {
  fetch_dashboard_data,
  fetchBuyerActiveCampaigns,
  fetchBuyersData,
} from "@/@api";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostCalendar from "@/components/Calendar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import EditProfileModalBuyer from "@/components/EditProfileModalBuyer";
import OffcanvasCreateCompaign from "@/components/offcanvascreatecompaign";
import { Tooltip } from "@mui/material";
import EmptyState from "@/components/EmptyState";
import { withAuthRole } from "@/utils/withAuthRole";
import { toast } from "react-toastify";
import React from "react";

// Custom CSS for notifications
const notificationStyles: {
  notificationSection: React.CSSProperties;
  notificationHeader: React.CSSProperties;
  notificationTitle: React.CSSProperties;
  loadMoreButton: React.CSSProperties;
} = {
  notificationSection: {
    maxHeight: "420px",
    overflowY: "auto" as const,
    paddingRight: "8px",
    scrollbarWidth: "thin" as any,
  },
  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  notificationTitle: {
    fontSize: "16px",
    fontWeight: 500,
    margin: 0,
  },
  loadMoreButton: {
    background: "transparent",
    border: "none",
    color: "#4F46E5",
    fontSize: "14px",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background 0.2s",
    marginTop: "8px",
  },
};

function Homepagebuyer() {
  const { user, setIsLoading, notifications, userProfile } = useAuth();
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>();
  const [activeCampaigns, setActiveCampaigns] = useState<any>();
  const [viewRow, showViewRow] = useState<number>(6);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  console.log("userProfile", userProfile);
  const router = useRouter();

  // Function to get notification icon background color
  const getNotificationColor = (iconType: string): string => {
    switch (iconType) {
      case "campaign_post_proposal":
        return "#eef2ff"; // Indigo light
      case "campaign_post_submission":
        return "#ecfdf5"; // Green light
      case "campaign_post_proposal_accepted":
        return "#f0fdfa"; // Teal light
      case "new_campaign_application":
        return "#fff7ed"; // Orange light
      case "campaign_application_accepted":
        return "#eff6ff"; // Blue light
      case "campaign_post_rejected":
        return "#fef2f2"; // Red light
      case "campaign_post_approved":
        return "#f0fdf4"; // Green light
      default:
        return "#f9fafb"; // Gray light
    }
  };

  // Add handleNotificationClick function to handle notification navigation
  const handleNotificationClick = (notification: any) => {
    // Only process if we have either Post_ID or Campaign_ID
    if (!notification.Post_ID && !notification.Campaign_ID) {
      return;
    }

    // Determine notification type for post-related notifications
    const isPostRelatedNotification = [
      "campaign_post_proposal",
      "campaign_post_submission",
      "campaign_post_proposal_accepted",
    ].includes(notification.Notification_Icon_Type);

    if (isPostRelatedNotification) {
      // If we have both Campaign_ID and Post_ID, navigate to campaign details
      if (notification.Campaign_ID && notification.Post_ID) {
        router.push(
          `/campaign-details/${notification.Campaign_ID}?tab=in_campaign&post=${notification.Post_ID}`
        );
      }
      // If we only have Post_ID, navigate to post details
      else if (notification.Post_ID) {
        router.push(`/post-details?post=${notification.Post_ID}`);
      }
    } else {
      // For future reference - handle other notification types if needed
      console.log(
        `Notification clicked: ${notification.Notification_Icon_Type}`
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [rendControl]);
  console.log("notifications", notifications);

  useEffect(() => {
    if (user?.email) {
      // console.log("fetchbuterdatafirst");
      fetchBuyerActiveCampaigns(user?.email, setActiveCampaigns, setIsLoading);
      fetchBuyersData(setUserData, user?.email, setIsLoading);
    }
  }, [user?.email, rendControl]);

  useEffect(() => {
    const user = localStorage.getItem("user");
  }, []);

  const fetchData = async () => {
    const response: any = await fetch_dashboard_data(setIsLoading);
    setUsers(response.data?.users);
  };

  const shareProfile = () => {
    // console.log(userProfile, user);
    try {
      const path = window.location.origin + "/company-view/" + userProfile?._id;
      navigator.clipboard.writeText(path);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 5000);
    } catch (error) {}
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3 004">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="mb-0 fs-16 fw-medium">
                    Profile <span className="text-teal">(Brand)</span>
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      {/*  <Tooltip
                        title={linkCopied ? "Link Copied" : "Share Profile"}
                        arrow
                        placement="top"
                      >
                        <div
                          className="editprofilebox"
                          onClick={() => {
                            shareProfile();
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="22"
                            viewBox="0 0 20 22"
                          >
                            <g
                              id="Icon_feather-share-2"
                              data-name="Icon feather-share-2"
                              transform="translate(-2 -1)"
                            >
                              <path
                                id="Path_855"
                                data-name="Path 855"
                                d="M21,5a3,3,0,1,1-3-3A3,3,0,0,1,21,5Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="Path_856"
                                data-name="Path 856"
                                d="M9,12A3,3,0,1,1,6,9,3,3,0,0,1,9,12Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="Path_857"
                                data-name="Path 857"
                                d="M21,19a3,3,0,1,1-3-3A3,3,0,0,1,21,19Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                              <path
                                id="Path_858"
                                data-name="Path 858"
                                d="M8.59,13.51l6.83,3.98M15.41,6.51,8.59,10.49"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </g>
                          </svg>
                        </div>
                      </Tooltip> */}
                      <Tooltip title="Edit Profile" arrow placement="top">
                        <div
                          className="editprofilebox"
                          onClick={() => router.push("/companypage")}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="edit-medium"
                            aria-hidden="true"
                            data-supported-dps="24x24"
                            fill="currentColor"
                          >
                            <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                          </svg>
                        </div>
                      </Tooltip>
                    </div>
                    {/*       <Link
                      href="https://chrome.google.com/webstore/category/extensions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary ms-3 d-flex align-items-center gap-1"
                    >
                      <Icon icon="mdi:download" width={18} height={18} />
                      <span>Download Chrome Extension</span>
                    </Link> */}
                  </div>
                </div>

                <div className="d-flex gap-3 mb-4">
                  <div className="img-container-lg-general">
                    {userData?.Company_Logo && userData?.Company_Logo !== "" ? (
                      <img
                        src={userData?.Company_Logo}
                        className="flex-shrink-0"
                        alt="logo"
                      />
                    ) : (
                      <div className="companyImgbox border object-fit-cover rounded d-flex align-items-center justify-content-center">
                        <span className="fs-40 fw-medium text-uppercase">
                          {userData?.Company_Name &&
                          userData?.Company_Name !== ""
                            ? userData?.Company_Name?.slice(0, 1)
                            : userData?.Email && userData?.Email !== ""
                            ? userData?.Email?.slice(0, 1)
                            : "N"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5 className="mb-0 fw-medium fs-16 biggerTxt">
                        Welcome Back,{" "}
                        <span>
                          {userData?.Company_Name &&
                            userData?.Company_Name?.slice(0, 50)}
                        </span>
                      </h5>
                      {/* <img
                        src={`https://flagcdn.com/24x18/${
                          userProfile?.Country_Code || "us"
                        }.png`}
                        width={24}
                        height={14}
                      /> */}
                      {userProfile?.Company_Website ? (
                        <Link
                          href={`${userProfile?.Company_Website}`}
                          target="_blank"
                        >
                          <Icon
                            icon="mdi:web"
                            width="18"
                            height="18"
                            className="text-warning ms-1"
                            style={{
                              minWidth: "18px",
                              minHeight: "18px",
                            }}
                          />
                        </Link>
                      ) : (
                        <Tooltip title="" arrow placement="top">
                          <Icon
                            icon="mdi:web"
                            onClick={() => router.push("/companypage")}
                            width="18"
                            height="18"
                            className="text-warning ms-1"
                            style={{
                              minWidth: "18px",
                              minHeight: "18px",
                            }}
                          />
                        </Tooltip>
                      )}
                      {userProfile?.Company_Linkedin ? (
                        <Link
                          href={`https://www.linkedin.com/company/${userProfile?.Company_Linkedin}`}
                          target="_blank"
                        >
                          <Icon
                            style={{ cursor: "pointer" }}
                            icon="mdi:linkedin"
                            width={24}
                            height={24}
                            className="text-info"
                          />
                        </Link>
                      ) : (
                        <Tooltip
                          title="Add your LinkedIn User"
                          arrow
                          placement="top"
                        >
                          <Icon
                            style={{ cursor: "pointer", color: "grey" }}
                            icon="mdi:linkedin"
                            width={24}
                            height={24}
                            className="text-grey"
                            onClick={() => router.push("/companypage")}
                          />
                        </Tooltip>
                      )}
                    </div>

                    <div className="d-flex gap-2 align-items-center mb-2">
                      <p className="mb-0 fs-13 line-clamp-5">
                        {userData?.Company_Description}
                      </p>
                    </div>
                    {/* tags */}

                    <div className="d-flex gap-2 flex-wrap mb-3">
                      {userProfile?.Skills?.map(
                        (element: any, index: number) => (
                          <span
                            key={index}
                            className="badge bg-success text-secondary rounded-pill fw-light border border-transparent"
                          >
                            {element}
                          </span>
                        )
                      )}
                    </div>

                    <p className="mb-0 fs-12 text-warning">
                      {userProfile?.Description &&
                      userProfile?.Description?.length > 100
                        ? userProfile?.Description?.slice(0, 100) + "..."
                        : userProfile?.Description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-itmes-center">
                <div className="statsbox-container-3">
                  <div className="stats-box">
                    <div className="stats-count">
                      {" "}
                      {userProfile?.No_of_Employees || 0}
                    </div>
                    <div className="stats-heading">Employees (est)</div>
                  </div>
                </div>

                <div className="statsbox-container-3">
                  <div className="stats-box">
                    <div className="stats-count">
                      {userProfile?.Size || "Small"}
                    </div>
                    <div className="stats-heading">Size</div>
                  </div>
                </div>

                <div className="statsbox-container-3">
                  <div className="stats-box">
                    <div className="stats-count">
                      {userProfile?.Year_Founded}
                    </div>
                    <div className="stats-heading">Year Founded</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-with-table">
              <div className="card-header p-3">
                <div className="d-flex align-items-center w-100 justify-content-between gap-3">
                  <p className="mb-0 fw-medium fs-16">Campaigns</p>

                  <button
                    className="btn btn-info btn-sm"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight2"
                    aria-controls="offcanvasRight2"
                  >
                    <Icon
                      icon="ci:add-plus"
                      width="18"
                      height="18"
                      className="text-white"
                    />
                    Create New Campaign
                  </button>
                </div>
              </div>
              <div className="card-body p-3">
                <div className="table-responsive campaign-listing-table">
                  <table className="table align-middle text-center mb-0 table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="text-start ps-4">
                          Campaigns{" "}
                          <span className="text-muted fs-12">
                            ({activeCampaigns?.campaigns?.length || 0})
                          </span>
                        </th>
                        <th scope="col">Campaign Creators</th>
                        <th scope="col">New Applications</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeCampaigns?.campaigns?.length !== 0 ? (
                        activeCampaigns?.campaigns?.map(
                          (campaign: any, index: number) => {
                            if (index < viewRow) {
                              return (
                                <tr
                                  key={index}
                                  onClick={() => {
                                    router.push(
                                      `/campaign-details/${campaign?._id}`
                                    );
                                  }}
                                >
                                  <td className="text-start">
                                    <a
                                      href="#"
                                      className="fw-medium text-dark fs-16"
                                    >
                                      {campaign?.Headline}
                                    </a>
                                    <div className="d-flex align-items-center mt-1">
                                      <p className="fs-12 text-warning mb-0">
                                        {campaign?.Created_At}
                                      </p>
                                      <div className="vr mx-2"></div>
                                      <p className="fs-12 text-warning mb-0">
                                        {campaign?.Time_Ago}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="mb-0">
                                      {campaign?.Creator_Insights?.Approved}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="mb-0">
                                      {campaign?.Creator_Insights?.Applied}
                                    </p>
                                  </td>
                                  <td>
                                    <Icon
                                      icon="ion:arrow-up-right-box-outline"
                                      width={24}
                                      height={24}
                                      className="text-warning cursor"
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          }
                        )
                      ) : (
                        <tr>
                          <td colSpan={4} style={{ textAlign: "center" }}>
                            No Campaign Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <p className="mb-0 fs-16 fw-medium">Upcoming Posts</p>
                <PostCalendar />
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <div style={notificationStyles.notificationHeader}>
                  <p style={notificationStyles.notificationTitle}>What's New</p>
                  {notifications?.notifications?.length > 0 && (
                    <span className="badge bg-primary rounded-pill">
                      {
                        notifications.notifications.filter(
                          (n: any) => !n.Is_Seen
                        ).length
                      }
                    </span>
                  )}
                </div>
                <div style={notificationStyles.notificationSection}>
                  {notifications?.notifications?.length ? (
                    notifications.notifications
                      .slice(0, viewRow)
                      .map((notify: any, index: number) => {
                        const iconType = notify?.Notification_Icon_Type;
                        const iconMap: { [key: string]: JSX.Element } = {
                          new_campaign_application: (
                            <Icon
                              icon="mdi:bell-plus-outline"
                              width="20"
                              height="20"
                              style={{ color: "#f97316" }}
                            />
                          ),
                          campaign_application_accepted: (
                            <Icon
                              icon="mdi:check-circle-outline"
                              width="20"
                              height="20"
                              style={{ color: "#2563eb" }}
                            />
                          ),
                          campaign_post_rejected: (
                            <Icon
                              icon="mdi:close-circle-outline"
                              width="20"
                              height="20"
                              style={{ color: "#ef4444" }}
                            />
                          ),
                          campaign_post_approved: (
                            <Icon
                              icon="mdi:check-circle-outline"
                              width="20"
                              height="20"
                              style={{ color: "#10b981" }}
                            />
                          ),
                          campaign_post_submission: (
                            <Icon
                              icon="mdi:file-document-outline"
                              width="20"
                              height="20"
                              style={{ color: "#059669" }}
                            />
                          ),
                          campaign_post_proposal: (
                            <Icon
                              icon="mdi:file-plus-outline"
                              width="20"
                              height="20"
                              style={{ color: "#4f46e5" }}
                            />
                          ),
                          campaign_post_proposal_accepted: (
                            <Icon
                              icon="mdi:file-check-outline"
                              width="20"
                              height="20"
                              style={{ color: "#0891b2" }}
                            />
                          ),
                          default: (
                            <Icon
                              icon="mdi:information-outline"
                              width="20"
                              height="20"
                              style={{ color: "#6b7280" }}
                            />
                          ),
                        };
                        const isClickable =
                          (notify.Post_ID || notify.Campaign_ID) &&
                          (notify.Notification_Icon_Type ===
                            "campaign_post_proposal" ||
                            notify.Notification_Icon_Type ===
                              "campaign_post_submission" ||
                            notify.Notification_Icon_Type ===
                              "campaign_post_proposal_accepted");

                        return (
                          <div
                            key={index}
                            className={`notification_wrapper ${iconType} ${
                              isClickable ? "notification-clickable" : ""
                            } ${!notify.Is_Seen ? "notification-unread" : ""}`}
                            onClick={
                              isClickable
                                ? () => handleNotificationClick(notify)
                                : undefined
                            }
                            style={{
                              cursor: isClickable ? "pointer" : "default",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              marginBottom: "10px",
                              transition: "all 0.2s ease",
                              boxShadow: isClickable
                                ? "0 1px 3px rgba(0,0,0,0.1)"
                                : "none",
                              border: "1px solid #eaeaea",
                              position: "relative",
                              backgroundColor: !notify.Is_Seen
                                ? "#f9f9ff"
                                : "white",
                            }}
                            onMouseOver={(e) => {
                              if (isClickable) {
                                e.currentTarget.style.backgroundColor =
                                  "#f5f5ff";
                                e.currentTarget.style.boxShadow =
                                  "0 2px 5px rgba(0,0,0,0.1)";
                                e.currentTarget.style.borderColor = "#e0e0ff";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (isClickable) {
                                e.currentTarget.style.backgroundColor =
                                  !notify.Is_Seen ? "#f9f9ff" : "white";
                                e.currentTarget.style.boxShadow =
                                  "0 1px 3px rgba(0,0,0,0.1)";
                                e.currentTarget.style.borderColor = "#eaeaea";
                              }
                            }}
                          >
                            {!notify.Is_Seen && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "12px",
                                  right: "12px",
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: "#4F46E5",
                                }}
                              />
                            )}
                            <div className="d-flex align-items-start gap-3">
                              <div
                                className="notify_icons"
                                style={{
                                  backgroundColor: getNotificationColor(
                                    notify.Notification_Icon_Type
                                  ),
                                  width: "36px",
                                  height: "36px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "50%",
                                  flexShrink: 0,
                                }}
                              >
                                {iconMap[iconType] || iconMap["default"]}
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <p
                                    className="text-sm font-medium"
                                    style={{
                                      color: "#111827",
                                      marginBottom: 0,
                                      fontWeight: !notify.Is_Seen ? 600 : 500,
                                    }}
                                  >
                                    {notify?.Title}
                                  </p>
                                  <p
                                    className="fs-10 text-grey"
                                    style={{
                                      marginBottom: 0,
                                      marginLeft: "8px",
                                    }}
                                  >
                                    {notify?.Time_Ago}
                                  </p>
                                </div>
                                <p
                                  className="text-sm text-gray-500"
                                  style={{ marginBottom: 0, lineHeight: "1.4" }}
                                >
                                  {notify?.Message}
                                  {isClickable && (
                                    <span className="ml-1 text-primary fs-10 d-inline-flex align-items-center">
                                      {" "}
                                      <span>(View details</span>
                                      <Icon
                                        icon="material-symbols:arrow-forward"
                                        className="ms-1"
                                        style={{ fontSize: "12px" }}
                                      />
                                      <span>)</span>
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <EmptyState
                      icon="bi bi-bell-slash"
                      title="No New Notifications"
                      description="You're all caught up! No new notifications at the moment."
                      iconSize={32}
                    />
                  )}
                  {notifications?.notifications?.length > 0 && (
                    <div className="text-center mt-3">
                      {notifications.notifications.length > 5 && (
                        <button
                          style={{
                            ...notificationStyles.loadMoreButton,
                            backgroundColor:
                              viewRow >= notifications.notifications.length
                                ? "#f3f4f6"
                                : "transparent",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#f3f4f6";
                          }}
                          onMouseOut={(e) => {
                            if (viewRow < notifications.notifications.length) {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }
                          }}
                          onClick={() => {
                            if (viewRow >= notifications.notifications.length) {
                              showViewRow(5);
                            } else {
                              showViewRow(notifications.notifications.length);
                            }
                          }}
                        >
                          {viewRow >= notifications.notifications.length
                            ? "Show Less"
                            : "Load More"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModalBuyer
        user={user}
        userProfile={userData}
        setRendControl={setRendControl}
        rendControl={rendControl}
      />
      <OffcanvasCreateCompaign
        setRendControl={setRendControl}
        rendControl={rendControl}
      />
    </>
  );
}
export default withAuthRole({
  Component: Homepagebuyer,
  allowedRoles: ["buyer"],
});
