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
                  {userData?.Company_Logo && userData?.Company_Logo !== "" ? (
                    <img
                      src={userData?.Company_Logo}
                      className="border object-fit-cover rounded-dash flex-shrink-0"
                      alt="logo"
                      width={120}
                      height={120}
                    />
                  ) : (
                    <div
                      className="companyImgbox border object-fit-cover rounded d-flex align-items-center justify-content-center"
                      style={{ width: "120px", height: "120px" }}
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

                <div className="statsbox-container-dash">
                  <div className="stats-box-dash">
                    <h5 className="stats-count-dash">
                      {" "}
                      {userProfile?.No_of_Employees || 0}
                    </h5>
                    <p className="stats-heading-dash">Employees(est)</p>
                  </div>

                  <div className="stats-box-dash">
                    <h5 className="stats-count-dash">
                      {userProfile?.Size || "Small"}
                    </h5>
                    <p className="stats-heading-dash">Size</p>
                  </div>

                  <div className="stats-box-dash">
                    <h5 className="stats-count-dash">
                      {userProfile?.Year_Founded}
                    </h5>
                    <p className="stats-heading-dash">Year Founded</p>
                  </div>
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
              <div className="card-body p-0">
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
                                    {/* <div className="d-flex align-items-center">
                                                                 <Image src="/assets/images/user1.jpg" alt="logo" width={30} height={30} className="user-img img-fluid" />
                                                                  <div className="ms-2 text-start">
                                                                  <p className="mb-0">Billi Ellish</p>
                                                                      <p className="fs-12 text-muted mb-0">Nov 20, 2024</p>
                                                                    </div>
                                                                   </div> */}
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
              <p className="mb-2 fs-16 fw-medium ">Notifications</p>
              {notifications?.notifications &&
              notifications?.notifications?.length !== 0 ? (
                notifications?.notifications
                .slice(0, viewRow)
                ?.map((notify: any, index: number) => {
                return (
                <div
                  key={index}
                  className={`notification-list ${
                  notify?.Notification_Icon_Type ===
                  "new_campaign_application"
                  ? "new_campaign"
                  : notify?.Notification_Icon_Type ===
                  "campaign_application_accepted"
                  ? "accepted_campaign"
                  : notify?.Notification_Icon_Type ===
                  "campaign_post_rejected"
                  ? "rejected_campaign"
                  : notify?.Notification_Icon_Type ===
                  "campaign_post_approved"
                  ? "post_approved"
                  : notify?.Notification_Icon_Type ===
                  "campaign_post_submission"
                  ? "post_submission"
                  : ""
                  }`}
                >
                  <div className="d-flex gap-3">
                  <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                  {notify?.Notification_Icon_Type == 
                  "new_campaign_application" && (
                  <Icon
                    icon="mdi:bell"
                    width="22"
                    height="22"
                    className="text-info"
                  />
                  )}
                  {notify?.Notification_Icon_Type == 
                  "campaign_application_accepted" && (
                  <Icon
                    icon="mdi:bell"
                    width="20"
                    height="20"
                    className="text-primary"
                  />
                  )}
                  {notify?.Notification_Icon_Type == 
                  "campaign_post_rejected" && (
                  <Icon
                    icon="mdi:bell"
                    width="22"
                    height="22"
                    className="text-danger"
                  />
                  )}
                  {notify?.Notification_Icon_Type == 
                  "campaign_post_approved" && (
                  <Icon
                    icon="mdi:bell"
                    width="20"
                    height="20"
                    className="text-primary"
                  />
                  )}
                  {notify?.Notification_Icon_Type == 
                  "campaign_post_submission" && (
                  <Icon
                    icon="mdi:bell"
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
                  <p
                  className="mb-0 fs-10 line-clamp-1"
                  style={{ color: "black" }}
                  >
                  {notify?.Message}
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
              {notifications?.notifications?.length > viewRow && (
                <div className="text-center mt-3">
                <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  showViewRow(notifications?.notifications?.length);
                }}
                >
                Load More
                </button>
                </div>
               )}          
            
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <p className="mb-0 fs-16 fw-medium">Upcoming Posts</p>
                <PostCalendar />
              </div>
            </div>
          </div>
        </div>

        {/* <TopCardBuyer /> */}
        {/* <div className="row graphs g-3">
                    <div className="col-md-6">
                        <BarsDashboard />
                    </div>
                    <div className="col-md-6">
                        <ProgressDashboardBuyer />
                    </div>
                </div>
                <div className="row my-3">
                    <CardsDashboardBuyer />
                </div> */}
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
