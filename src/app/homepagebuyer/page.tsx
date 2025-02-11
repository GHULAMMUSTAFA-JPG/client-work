"use client";

import {
  fetch_dashboard_data,
  fetchBuyerActiveCampaigns,
  fetchBuyersData,
} from "@/@api";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import PostCalendar from "@/components/Calendar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import EditProfileModalBuyer from "@/components/EditProfileModalBuyer";
import OffcanvasCreateCompaign from "@/components/offcanvascreatecompaign";
import { Tooltip } from "@mui/material";
import { withAuthRole } from "@/utils/withAuthRole";

function homepagebuyer() {
  const { user, setIsLoading, notifications, userProfile } = useAuth();
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>();
  const [activeCampaigns, setActiveCampaigns] = useState<any>();
  const [viewRow, showViewRow] = useState<number>(6);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, [rendControl]);

  useEffect(() => {
    if (user?.email) {
      console.log("fetchbuterdatafirst");
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
    console.log(userProfile, user);
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
            <div className="card welcom-card-height mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between gap-5">
                  <div>
                    <h3 className="fw-medium">
                      Welcome Back,{" "}
                      <span className="fw-bold">
                        {userData?.Company_Name &&
                          userData?.Company_Name?.slice(0, 30) + "...."}
                      </span>
                    </h3>
                    {/* <p className='mb-0 fw-medium fs-20'>Apollo: Join our Creator Program</p> */}
                    <p className="mb-0 fs-14 text-muted line-clamp-5">
                      {userData?.Company_Description}
                    </p>
                  </div>
                  <div>
                    <div
                      className="align-items-center cursor d-flex gap-2 justify-content-end mb-3 ms-auto rounded text-white"
                      style={{ width: "25px", height: "25px" }}
                    >
                      <div className="d-flex gap-2 align-items-center cursor">
                        <Tooltip
                          title={linkCopied ? "Link Copied" : "Share Profile"}
                          arrow
                          placement="top"
                          className=""
                        >
                          <Icon
                            icon="iconamoon:share-1-thin"
                            width="20"
                            height="20"
                            className="cursor flex-shrink-0 text-dark me-1"
                            onClick={() => {
                              shareProfile();
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Edit Profile" arrow placement="top">
                          <Icon
                            icon="material-symbols-light:edit-square-outline-rounded"
                            width="20"
                            height="20"
                            className="cursor flex-shrink-0 text-dark"
                            onClick={() => router.push("/companypage")}
                          />
                        </Tooltip>
                      </div>
                    </div>
                    {userData?.Company_Logo && userData?.Company_Logo !== "" ? (
                      <img
                        src={userData?.Company_Logo}
                        className="border object-fit-cover rounded flex-shrink-0"
                        alt="logo"
                        width={120}
                        height={120}
                      />
                    ) : (
                      <div
                        className="discussion-subtle border object-fit-cover rounded d-flex align-items-center justify-content-center"
                        style={{ width: "120px", height: "120px" }}
                      >
                        <span className="fs-40 fw-medium text-uppercase">
                          {" "}
                          {userData?.Company_Name &&
                          userData?.Company_Name! == ""
                            ? userData?.Company_Name?.slice(0, 2)
                            : userData?.Email && userData?.Email !== ""
                            ? userData?.Email?.slice(0, 2)
                            : "NA"}
                        </span>
                      </div>
                    )}
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
                                      `/buyerdashboard?id=${campaign?._id}`
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
                <p className="mb-3 fs-16 fw-medium">Notifications</p>
                {notifications?.notifications?.map(
                  (notify: any, index: number) => {
                    if (index < 5) {
                      return (
                        <div key={index} className="notification-list">
                          <div className="d-flex gap-2 mb-3 ">
                            {notify?.Notification_Icon_Type ==
                              "new_campaign_application" && (
                              <div style={{ width: "22px", height: "22px" }}>
                                <Icon
                                  icon="ci:add-plus"
                                  width="22"
                                  height="22"
                                  className="text-info"
                                />
                              </div>
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

                            <div className="flex-grow-1 ">
                              <p className="mb-0 fw-medium">{notify?.Title}</p>
                              <p className="mb-0 fs-12 text-warning line-clamp-1">
                                {notify?.Message}
                              </p>
                            </div>
                            <p className="mb-0 fs-12 text-muted ms-auto flex-shrink-0">
                              {notify?.Time_Ago}
                            </p>
                          </div>
                          {<hr className="my-3 text-warning" />}
                        </div>
                      );
                    }
                  }
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
  Component: homepagebuyer,
  allowedRoles: ["buyer"],
});
