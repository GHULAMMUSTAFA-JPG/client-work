"use client";
import { Suspense } from "react";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import SubmitCampaignModal from "@/components/SubmitCampaignModal";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import SubmitDetailModal from "@/components/SubmitDetailModal";
import { useAuth } from "@/contexts/AuthContext";
import { getCreatorsCampaignSubmissions } from "@/@api";
import { defaultImagePath } from "@/components/constants";
const SubmitCampaigns = () => {
  const { user, setIsLoading } = useAuth();
  const router = useRouter();
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [data, setData] = useState<any>();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [length, setLength] = useState<any>(0);
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Rejected" | "Approved" | "Pending Approval"
  >("All");
  const getSubmissionCampaigns = async (code: string) => {
    getCreatorsCampaignSubmissions(
      {
        email: user?.email,
        campaign_id: code,
      },
      setData,
      setIsLoading
    );
  };
  const searchParams = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("id");
    code && getSubmissionCampaigns(code);
  }, [rendControl]);

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Work submitted");
  };

  const calculateLength = () => {
    const totalLength = Object.values(data?.campaign?.Posts_Stats).reduce(
      (sum: any, value: any) => sum + value,
      0
    );
    console.log(totalLength);
    setLength(totalLength);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className="dashboard campaign-review">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between my-3">
            <a
              onClick={() => router.push("/campaigns")}
              className="text-dark text-decoration-none d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <Icon icon="akar-icons:arrow-left" width={18} height={18} />
              <span className="ms-2">All Campaigns</span>
            </a>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center gap-3 mb-1">
                    <h5 className="mb-0">{data?.campaign?.Headline}</h5>
                    <button className="bg-primary-subtle border-0 btn btn-outline-primary btn-sm py-1 px-2 rounded-pill">
                      Public
                    </button>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="fs-12 text-warning mb-0">
                      {data?.campaign?.Created_At}
                    </p>
                    <div className="vr mx-2 vr-public"></div>
                    <p className="fs-12 text-warning mb-0">
                      {data?.campaign?.Time_Ago}
                    </p>
                    <div className="vr mx-2 vr-public"></div>
                    <span>
                      Budget:{" "}
                      <span className="fw-medium">
                        ${data?.campaign?.Budget}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-2">
              <button
                onClick={() => {
                  setSelectedFilter("All");
                }}
                className={
                  selectedFilter == "All"
                    ? "btn btn-info btn-sm"
                    : "btn btn-outline-light text-dark btn-sm"
                }
              >
                All (Recent){" "}
                <span className="badge bg-white text-dark ms-1">{}</span>
              </button>
              <button
                onClick={() => {
                  setSelectedFilter("Pending Approval");
                }}
                className={
                  selectedFilter == "Pending Approval"
                    ? "btn btn-info btn-sm"
                    : "btn btn-outline-light text-dark btn-sm"
                }
              >
                Pending Approvals{" "}
                <span className="badge bg-light text-dark ms-1">
                  {data?.campaign?.Posts_Stats?.["Pending Approval"]}
                </span>
              </button>
              <button
                onClick={() => {
                  setSelectedFilter("Approved");
                }}
                className={
                  selectedFilter == "Approved"
                    ? "btn btn-info btn-sm"
                    : "btn btn-outline-light text-dark btn-sm"
                }
              >
                Approved Posts{" "}
                <span className="badge bg-light text-dark ms-1">
                  {data?.campaign?.Posts_Stats?.Approved}
                </span>
              </button>
              <button
                onClick={() => {
                  setSelectedFilter("Rejected");
                }}
                className={
                  selectedFilter == "Rejected"
                    ? "btn btn-info btn-sm"
                    : "btn btn-outline-light text-dark btn-sm"
                }
              >
                Rejected Posts{" "}
                <span className="badge bg-light text-dark ms-1">
                  {data?.campaign?.Posts_Stats?.Rejected}
                </span>
              </button>
            </div>
            <button
              className="btn btn-info btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#submitCampaignModal"
            >
              <Icon icon="material-symbols:add" width={16} height={16} /> Add
              Submission
            </button>
          </div>
          <div className="row g-3">
            {data?.campaign.Posts?.map((element: any, index: number) => {
              console.log("element", element);
              return (
                <div
                  key={index}
                  className="col-md-3"
                  style={
                    selectedFilter == "All"
                      ? { display: "block" }
                      : selectedFilter == element?.Status
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <div className="card h-100">
                    <div className="position-relative">
                      <span
                        className={
                          element?.Status == "Rejected"
                            ? "badge bg-danger-subtle end-0 fw-medium m-2 p-2 position-absolute text-danger top-0"
                            : element?.Status == "Pending Approval"
                            ? "position-absolute top-0 end-0 m-2 badge text-yellow p-2 fw-medium bg-orange-subtle"
                            : "position-absolute top-0 end-0 m-2 badge p-2 fw-medium text-primary bg-primary-subtle"
                        }
                      >
                        {element?.Status}
                      </span>
                      {element?.Media_Content[0] ? (
                        element?.Media_Content[0]
                          .toLowerCase()
                          .endsWith(".pdf") ? (
                          <div
                            className="bg-card-light d-flex align-items-center justify-content-center"
                            style={{ height: "130px" }}
                          >
                            <Icon
                              icon="mdi:file-document-outline"
                              width={30}
                              height={30}
                              className="text-dark"
                            />
                          </div>
                        ) : element?.Media_Content[0]
                            .toLowerCase()
                            .endsWith(".mp4") ||
                          element?.Media_Content[0]
                            .toLowerCase()
                            .endsWith(".mov") ? (
                          <video
                            style={{
                              height: "130px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          >
                            <source
                              src={element?.Media_Content[0]}
                              type={
                                element?.Media_Content[0]
                                  .toLowerCase()
                                  .endsWith(".mov")
                                  ? "video/quicktime"
                                  : "video/mp4"
                              }
                            />
                          </video>
                        ) : (
                          <img
                            src={element?.Media_Content[0]}
                            className="card-img-top"
                            alt="Post media content"
                            style={{ height: "130px", objectFit: "cover" }}
                          />
                        )
                      ) : (
                        <img
                          src="https://cdn.synnc.us/creator/09d2eea2-9fa9-45b1-89ae-cfb0d8363b6b.png"
                          className="card-img-top"
                          alt="Default image"
                          style={{ height: "130px", objectFit: "cover" }}
                        />
                      )}
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle">
                          <img
                            src={
                              data?.campaign?.Creator_Profile_Picture ||
                              "https://cdn.synnc.us/creator/7a06f497-8214-4cd8-b9a1-12cc3ffd1001.jpg"
                            }
                            className="rounded-circle"
                            alt="User avatar"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div>
                          <div className="fw-medium">
                            {data?.campaign?.Creator_Name}
                          </div>
                          <div className="text-muted small">
                            {element?.Submitted_At}
                          </div>
                        </div>
                      </div>
                      <h5 className="card-title fs-14 line-clamp-3">
                        {element?.Post_Title}
                      </h5>
                      <a
                        className="text-info text-decoration-none text-end cursor mt-auto"
                        data-bs-toggle="modal"
                        data-bs-target="#submitDetailModal"
                        onClick={() => {
                          setSelectedPost(element);
                        }}
                      >
                        View Details →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SubmitCampaignModal
        selectedCampaign={data}
        rendControl={rendControl}
        setRendControl={setRendControl}
      />
      <SubmitDetailModal selectedPost={selectedPost} campaignData={data} />
    </>
  );
};

export default function AuthPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmitCampaigns />
    </Suspense>
  );
}

// export default SubmitCampaigns;
