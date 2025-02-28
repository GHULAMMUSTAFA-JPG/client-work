"use client";

import { getCreatorDetailsById } from "@/@api";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CreatorProfileDrawerProps {
  creatorId: string;
}

export default function CreatorProfileDrawer({ creatorId }: CreatorProfileDrawerProps) {
  const { user, setIsLoading, isLoading } = useAuth();
  const [userProfile, setUserDetails] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (creatorId) {
      getCreatorDetailsById(creatorId, setUserDetails, setIsLoading);
    }
  }, [creatorId]);

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="creatorProfileDrawer" aria-labelledby="creatorProfileDrawerLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="creatorProfileDrawerLabel">Creator Profile</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {userProfile ? (
          <div className="profile-container">
            <div className="position-relative">
              <img
                src={userProfile?.Banner_Image || defaultImagePath}
                alt="Profile Banner"
                className="object-fit-cover rounded-3 w-100 cover-img"
                style={{ height: "200px" }}
              />
            </div>

            <div className="p-3">
              <div className="position-relative" style={{ marginTop: "-50px" }}>
                <img
                  src={userProfile?.Profile_Image || "https://e1cdn.social27.com/digitalevents/synnc/no-pic-synnc.jpg"}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-circle border border-4 border-white"
                />
              </div>

              <div className="mt-5" >
                <h4 className="mb-1">{userProfile?.Name}</h4>
                <p className="text-muted mb-2">{userProfile?.Current_Company}</p>
                
                <div className="d-flex gap-2 align-items-center">
                  <p className="mb-0 fs-12 text-warning">@{userProfile?.Profile_URL}</p>
                  <div className="bg-light rounded-circle d-inline-block" style={{ width: "6px", height: "6px" }}></div>
                  <p className="mb-0 fs-12 text-warning">
                    <span className="text-dark fw-medium">{userProfile?.No_of_Followers || 0}</span> followers
                  </p>
                </div>

                <div className="mt-3">
                  <p>{userProfile?.Description || ""}</p>
                </div>

                {user?.isBuyer && (
                  <div className="mt-4">
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        router.push(`/inbox?id=${userProfile?._id}`);
                      }}
                    >
                      DM for Custom Collaborations
                    </button>
                  </div>
                )}

                <div className="row mt-4 g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <p className="text-muted">Total Followers</p>
                        <h5>{userProfile?.No_of_Followers}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <p className="text-muted">Average Impressions</p>
                        <h5>{userProfile?.Average_Impressions}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <p className="text-muted">Average Engagements</p>
                        <h5>{userProfile?.Average_Engagements}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <Icon icon="mdi:loading" className="text-primary" width={48} height={48} />
            <p className="mt-2">Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
} 