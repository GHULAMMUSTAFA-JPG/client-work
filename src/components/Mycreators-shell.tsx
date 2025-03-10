import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { defaultImagePath } from "@/components/constants";
import { fetchCreatorData } from '@/@api';

interface MyCreatorsShellProps {
  children?: React.ReactNode;
  handleInvite: () => void;
  companyData?: any;
  creatorStats?: any;
}



const MyCreatorsShell: React.FC<MyCreatorsShellProps> = ({ children, handleInvite, creatorStats }) => {
  const [companyData, setCreatorData] = useState<any>();
  const [loggedInUser, setLoggedInUser] = useState<any>();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user") ?? "null");
    const loggedUserEmail = loggedUser?.email;

    setLoggedInUser(loggedUser);

    if (loggedUserEmail) {
      fetchCreatorData(loggedUserEmail)
        .then((data) => {
          console.log("API Response:", data);
          setCreatorData(data);
        })
        .catch((error) => console.error("Error fetching creator data:", error));
    }
  }, []);

  return (
    <div>
      <div className="tw-bg-teal-50 p-3">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6">
          <div className="tw-flex tw-items-center tw-gap-6 tw-mb-8">
            <div className="profile-image">
              {companyData?.Company_Logo !== "" ? (
                <img
                  src={companyData?.Company_Logo}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-circle"
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                >
                  <span className="fs-1 fw-bold text-uppercase">
                    {companyData?.Company_Name?.charAt(0) ||
                      companyData?.Email?.charAt(0) ||
                      "N"}
                  </span>
                </div>
              )}
            </div>
            <div className="tw-flex-1">
              <div className="tw-flex tw-items-center tw-gap-3">
                <h1 className="tw-text-4xl tw-font-bold tw-text-gray-900"></h1>
                <span className="tw-bg-gray-100 text-black tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium">Creator Platform</span>
              </div>
              <p className="tw-text-gray-600 tw-mt-2">Empowering our team to share, inspire, and grow together</p>
            </div>
            <div className="tw-flex tw-gap-4">
              <button className="button-lg-teal">Start Creating</button>
              <button className="button-lg-white" onClick={handleInvite}>Invite Colleagues</button>
            </div>
          </div>

          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-6">
            <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow-sm tw-border tw-border-gray-100">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users h-5 w-5 text-primary-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <h3 className="tw-font-medium tw-text-gray-900">Total Creators</h3>
              </div>
              <p className="tw-text-2xl tw-font-bold tw-text-gray-900">{creatorStats.totalCreators}</p>
            </div>

            <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow-sm tw-border tw-border-gray-100">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-award h-5 w-5 text-primary-600"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                <h3 className="tw-font-medium tw-text-gray-900">Engagements</h3>
              </div>
              <p className="tw-text-2xl tw-font-bold tw-text-gray-900">75,000</p>
            </div>

            <div className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow-sm tw-border tw-border-gray-100">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trending-up h-5 w-5 text-primary-600"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                <h3 className="tw-font-medium tw-text-gray-900">Growth Rate</h3>
              </div>
              <p className="tw-text-2xl tw-font-bold tw-text-gray-900">+23%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-12">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
          <h2 className="tw-text-xl tw-font-bold tw-text-gray-900">All Creators</h2>
          <div className="tw-flex tw-gap-3">
            <select className="tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-px-3 tw-py-1.5 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary-500 focus:tw-border-primary-500">
              <option value="followers">Most Followers</option>
              <option value="engagement">Most Engaged</option>
            </select>
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-6">
          {Array.isArray(companyData?.creators) &&
            companyData?.creators?.map((user: any) => (
              <div key={user?._id} className="tw-bg-white tw-rounded-lg tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-border tw-border-gray-100">
                <div className="tw-p-4">
                  <div className="tw-flex tw-items-center tw-gap-4 tw-mb-6">
                    <div className="img-container-lg-general">
                      <img
                        src={user?.Profile_Image || defaultImagePath}
                        alt={user?.Name}
                        width={30}
                        height={30}
                        className="user-img img-fluid"
                      />
                    </div>
                    <div className="tw-flex-1 tw-min-w-0">
                      <div className="tw-flex tw-items-center tw-justify-between">
                        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-truncate">
                          {user?.Name}
                        </h3>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tw-text-primary-600 hover:tw-text-primary-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-external-link tw-h-4 tw-w-4"
                          >
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14 21 3"></path>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          </svg>
                        </a>
                      </div>
                      <p className="tw-text-sm tw-text-gray-600 tw-truncate">Senior Marketing Manager</p>
                    </div>
                  </div>

                  <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <div className="bg-teal-light tw-rounded-lg tw-p-3">
                      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                        <span className="tw-text-sm tw-text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users h-4 w-4 text-primary-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Followers</span>
                      </div>
                      <p className="tw-text-xl tw-font-bold tw-text-primary-600">{user?.No_of_Followers?.toLocaleString()}</p>
                    </div>

                    <div className="bg-teal-light tw-rounded-lg tw-p-3">
                      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                        <span className="tw-text-sm tw-text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye h-4 w-4 text-primary-600"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>Impressions</span>
                      </div>
                      <p className="tw-text-xl tw-font-bold tw-text-primary-600">{user?.No_of_Impressions}</p>
                    </div>

                    <div className="bg-teal-light tw-rounded-lg tw-p-3">
                      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                        <span className="tw-text-sm tw-text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart h-4 w-4 text-primary-600"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> Engagements</span>
                      </div>
                      <p className="tw-text-xl tw-font-bold tw-text-primary-600">{user?.No_of_Engagements}</p>
                    </div>

                    <div className="bg-teal-light tw-rounded-lg tw-p-3">
                      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                        <span className="tw-text-sm tw-text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trending-up h-4 w-4 text-primary-600"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>Avg. Engagement</span>
                      </div>
                      <p className="tw-text-xl tw-font-bold tw-text-primary-600">{user?.Average_Engagements}</p>
                    </div>
                  </div>
                </div>
                <div className="tw-border-t tw-p-3">
                  <button className="button-lg-teal w-100">
                    Follow
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default MyCreatorsShell; 