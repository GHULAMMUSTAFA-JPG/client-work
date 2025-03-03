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
  useEffect(() => {
    fetchData();
  }, [rendControl]);

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
                  <p className="mb-0 fs-16 fw-medium">Profile</p>
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
                    <div
                      className="companyImgbox border object-fit-cover rounded d-flex align-items-center justify-content-center"
                     
                    >
                      <span className="fs-40 fw-medium text-uppercase">
                        {" "}
                        {userData?.Company_Name && userData?.Company_Name! == ""
                          ? userData?.Company_Name?.slice(0, 2)
                          : userData?.Email && userData?.Email !== ""
                          ? userData?.Email?.slice(0, 2)
                          : "NA"}
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
              {" "}{userProfile?.No_of_Employees || 0}
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
            <div className="statsbox-container-dash py-3">
           <div className="d-flex align-items-center gap-2 box-effect-shadow">
                 <div className="p-2 rounded-full bg-gray-50">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-teal-svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>

                <div className="ml-4">
                  <p className="fs-14">Active Campaigns</p>
                  <p className="fs-16 fw-bold text-red">3</p>
                </div>
          </div>

       <div className="d-flex align-items-center gap-2 box-effect-shadow">
                 <div className="p-2 rounded-full bg-gray-50">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-blue-svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>

                <div className="ml-4">
                <p className="fs-14">Pending Applications</p>
                  <p className="fs-16 fw-bold text-red">5</p>
                </div>
          </div>

          <div className="d-flex align-items-center gap-2 box-effect-shadow">
                 <div className="p-2 rounded-full bg-gray-50">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-green-svg"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
                  </div>

                <div className="ml-4">
                <p className="fs-14">Total Spend</p>
                <p className="fs-16 fw-bold text-red">$12,450</p>
                </div>
          </div>
  </div>
             <div className="card card-with-table">
              <div className="card-header p-3">
                <div className="d-flex align-items-center justify-content-between">
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
                                      `/campaign-details?id=${campaign?._id}`
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
              <p className="mb-2 fs-16 fw-medium">What's New (Notifications)</p>
              {notifications?.notifications?.length ? (
                notifications.notifications.slice(0, viewRow).map((notify: any, index: number) => {
                const iconType = notify?.Notification_Icon_Type;
                const iconMap: { [key: string]: JSX.Element } = {
                  "new_campaign_application": (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="Notification_icon">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  ),
                  "campaign_application_accepted": (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="Notification_icon">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  ),
                  "campaign_post_rejected": (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="Notification_icon">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  ),
                  "campaign_post_approved": (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="Notification_icon">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  ),
                  "campaign_post_submission": (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="Notification_icon">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                  ),
                  "default": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-square "><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  )
                };
                return (
                  <div key={index} className={`notification_wrapper ${iconType}`}>
                  <div className="notify_icons">
                    {iconMap[iconType] || iconMap["default"]}
                  </div>
                  <div className="ml-3">
                    <div className="d-flex justify-content-between align-items-center">
                    <p className="text-sm font-medium text-gray-900">{notify?.Title}</p>
                    <p className="fs-10 text-grey">5 min ago</p>
                    </div>
                    <p className="text-sm text-gray-500">{notify?.Message}</p>
                    
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
                <div className="text-center mt-1">
                {notifications.notifications.length > 5 && (
                  <button
                    className="loadmorebtn"
                    onClick={() => {
                      if (viewRow >= notifications.notifications.length) {
                        showViewRow(5);
                      } else {
                        showViewRow(notifications.notifications.length);
                      }
                    }}
                  >
                    {viewRow >= notifications.notifications.length ? "Show Less" : "Load More"}
                  </button>
                )}
                </div>
              )}
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
