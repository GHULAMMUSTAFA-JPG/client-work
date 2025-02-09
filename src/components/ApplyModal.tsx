"use client";
import { applyCampaign } from "@/@api";
import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "./constants";
import { toast } from "react-toastify";

function ApplyModal({ selectedCampaign, disable }: any) {
  const { user, setIsLoading } = useAuth();
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const applyCreatorProgram = (e: any) => {
    e.preventDefault();
    if (description.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }
    applyCampaign(
      {
        campaign_id: selectedCampaign?._id,
        creator_email: user?.email,
        message: description,
      },
      setDescription,
      setIsLoading
    );
  };
  return (
    <>
      <div
        className="modal fade"
        id="applyModal"
        tabIndex={-1}
        aria-labelledby="applyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-3 rounded">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold ">
                {selectedCampaign?.Headline}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3  p-3  ">
                  <Image
                    src={selectedCampaign?.Company_Logo || defaultImagePath}
                    className="border rounded-circle"
                    alt="logo"
                    width={70}
                    height={70}
                  />
                  <div>
                    <h6 className="mb-0">{selectedCampaign?.Company_Name}</h6>
                    <small className="text-muted">
                      {selectedCampaign?.Time_Ago}
                    </small>
                    <div className="d-flex gap-3 mt-2">
                      {/* LinkedIn & Website Links */}
                      <a
                        href={selectedCampaign?.LinkedIn_URL || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon
                          icon="mdi:linkedin"
                          width="28"
                          height="28"
                          className="text-info"
                        />
                      </a>
                      <a
                        href={selectedCampaign?.Website_URL || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon
                          icon="mdi:web"
                          width="28"
                          height="28"
                          className="text-primary"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center  gap-4 ">
                  <h5 className="m-0 text-bold">
                    $ {selectedCampaign?.Budget.toLocaleString()}
                  </h5>
                  {selectedCampaign?.Start_Date &&
                  selectedCampaign?.End_Date ? (
                    <span className="text-muted">
                      📅 {selectedCampaign?.Start_Date} -{" "}
                      {selectedCampaign?.End_Date}
                    </span>
                  ) : (
                    <span className="text-muted">📅 Ongoing Campaign</span>
                  )}
                </div>
              </div>

              {/* Campaign Description */}
              <div className="mt-4">
                <h6 className="fw-bold">Brief Description:</h6>
                <p className="text-secondary">
                  {selectedCampaign?.Brief_Description}
                </p>
              </div>

              {/* Campaign Details */}
              <div className="mb-3">
                <h6 className="fw-bold">Details:</h6>
                <p>{selectedCampaign?.Campaign_Details}</p>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold">Target Audience:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {selectedCampaign?.Target_Audience?.map(
                    (audience: string, index: number) => (
                      <span
                        key={index}
                        className="rounded bg-primary text-white p-2"
                      >
                        {audience}
                      </span>
                    )
                  )}
                </div>
              </div>

              {!selectedCampaign?.Is_Applied && (
                <div className="mt-3">
                  <h6 className="fw-bold">Send a Message to Apply:</h6>
                  <textarea
                    className="form-control p-2"
                    placeholder="Describe your interest in collaborating and share details on pricing to help brands make a quick decision."
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ minHeight: "80px", resize: "none" }}
                  ></textarea>
                </div>
              )}

              <button
                className={`btn ${
                  selectedCampaign?.Is_Applied ? "btn-dark" : "btn-info"
                } w-100 mt-4`}
                onClick={applyCreatorProgram}
                disabled={selectedCampaign?.Is_Applied || disable}
              >
                {selectedCampaign?.Is_Applied ? "Applied" : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyModal;
