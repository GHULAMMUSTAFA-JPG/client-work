import { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { handleFileUpload } from "@/@api";
import { toast } from "react-toastify";
import Image from "next/image";
import { AVAILABLE_SKILLS } from "@/constant/campaign";
import { createBrandCampaign, updateBrandCampaign } from "@/@api/campaign";

export interface CampaignFormData {
  campaignId: string;
  isPublic: boolean;
  headline: string;
  budget: number;
  briefDescription: string;
  campaignDetails: string;
  isOngoing: boolean;
  startDate: string | null;
  endDate: string | null;
  targetAudience: string[];
  mediaUrl: string;
}

interface EditCreateCampaignProps {
  initialData?: CampaignFormData;
  isEditMode: boolean;
  onSuccess?: () => void;
}

function EditCreateCampaign({
  initialData,
  isEditMode,
  onSuccess,
}: EditCreateCampaignProps) {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [formData, setFormData] = useState<CampaignFormData>({
    isPublic: false,
    headline: "",
    budget: 0,
    briefDescription: "",
    campaignDetails: "",
    isOngoing: true,
    startDate: null,
    endDate: null,
    targetAudience: [],
    mediaUrl: "",
    campaignId: "",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { user, setIsLoading } = useAuth();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setSelectedSkills(initialData.targetAudience || []);
      setActiveTab(initialData.isOngoing ? "ongoing" : "dateRange");
    } else {
      resetForm();
    }
  }, [initialData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetForm = () => {
    setFormData({
      isPublic: false,
      headline: "",
      budget: 0,
      briefDescription: "",
      campaignDetails: "",
      isOngoing: true,
      startDate: null,
      endDate: null,
      targetAudience: [],
      mediaUrl: "",
      campaignId: "",
    });
    setSelectedSkills([]);
    setActiveTab("ongoing");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [id]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const prepareSubmissionData = () => {
    return {
      Is_Public: formData.isPublic,
      Headline: formData.headline,
      Budget: formData.budget,
      Brief_Description: formData.briefDescription,
      Campaign_Details: formData.campaignDetails,
      Is_Ongoing: formData.isOngoing,
      Start_Date: formData.startDate,
      End_Date: formData.endDate,
      Target_Audience: selectedSkills,
      Campaign_Media: formData.mediaUrl,
      Campaign_Id: formData.campaignId,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }

      const submissionData = prepareSubmissionData();
      if (isEditMode) {
        await updateBrandCampaign(submissionData);
      } else {
        await createBrandCampaign({
          ...submissionData,
          Email: user?.email,
        });
        resetForm();
      }

      if (onSuccess) {
        onSuccess();
      }

      const closeButton = document.getElementById(
        "createCampaignOffcanvasModal"
      );
      if (closeButton) {
        closeButton.click();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.headline) {
      toast.warn("Campaign Name cannot be empty");
      return false;
    }

    if (!formData.budget || formData.budget <= 0) {
      toast.warn("Campaign budget cannot be less than 1");
      return false;
    }

    if (!formData.briefDescription) {
      toast.warn("Campaign description cannot be empty");
      return false;
    }

    if (!formData.campaignDetails) {
      toast.warn("Campaign details cannot be empty");
      return false;
    }

    if (!formData.isOngoing) {
      if (!formData.startDate) {
        toast.warn("Start date cannot be empty");
        return false;
      }

      if (!formData.endDate) {
        toast.warn("End date cannot be empty");
        return false;
      }
    }

    return true;
  };

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill) && selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only jpg, jpeg, and png files are allowed.");
      return;
    }

    try {
      setIsLoading(true);
      const result: any = await handleFileUpload(e, setIsLoading);
      setFormData((prev) => ({
        ...prev,
        mediaUrl: result?.[0]?.file_urls || "",
      }));
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-create-campaign"
      tabIndex={1}
      id="offcanvasRight2"
      aria-labelledby="offcanvasRight2Label"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRight2Label">
          {isEditMode ? "Update Campaign" : "Create Campaign"}
        </h5>
        <button
          type="button"
          id="createCampaignOffcanvasModal"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="create-campaign-wrapper">
          <div className="row g-5">
            <div className="col-md-6">
              <div className="mb-4">
                <h6 className="mb-3">Basic Campaign Info</h6>
                <div className="mb-3 border mb-3 p-3 rounded">
                  <label className="form-label mb-0">
                    Is this a publicly visible campaign? *
                  </label>
                  <div className="d-flex align-items-center gap-2 justify-content-between">
                    <div className="form-text">
                      Creators can see the info below and apply to partner
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.isPublic}
                        role="switch"
                        id="isPublic"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Campaign Name *</label>
                <input
                  type="text"
                  id="headline"
                  className="form-control"
                  value={formData.headline}
                  placeholder="New Generative AI Product Launch: Agentspot"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Budget (USD) *</label>
                <small className="text-muted d-block mb-2">
                  This budget number is private and not visible to creators
                </small>
                <div className="input-group">
                  <select className="form-select" style={{ maxWidth: "80px" }}>
                    <option>USD</option>
                  </select>
                  <input
                    type="number"
                    id="budget"
                    value={formData.budget}
                    className="form-control"
                    placeholder="0"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Brief Description *</label>
                <textarea
                  className="form-control"
                  rows={3}
                  id="briefDescription"
                  placeholder="Help us launch Agentspot, an AI agent for SMBs to enterprises"
                  value={formData.briefDescription}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Campaign Details *</label>
                <small className="text-muted d-block mb-2">
                  Explain the goals, deliverables, and/or requirements for your
                  campaign
                </small>
                <textarea
                  className="form-control"
                  rows={6}
                  id="campaignDetails"
                  value={formData.campaignDetails}
                  onChange={handleInputChange}
                  placeholder="We're launching a new product feature that helps brands manage business creator partnerships at scale! The cold DMs and endless back-and-forths waste countless hours, so we allow brands to book collaborations directly with you and streamline 90% of the process."
                ></textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-4">
                <label className="form-label">Date Range of Campaign *</label>
                <div className="d-flex flex-column gap-2">
                  <ul className="nav nav-pills gap-3" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link d-flex align-items-center gap-1 ${
                          activeTab === "ongoing" ? "active text-white" : ""
                        }`}
                        onClick={() => {
                          setActiveTab("ongoing");
                          setFormData((prev) => ({
                            ...prev,
                            isOngoing: true,
                            startDate: null,
                            endDate: null,
                          }));
                        }}
                        type="button"
                        style={{
                          backgroundColor:
                            activeTab === "ongoing" ? "#15ab63" : "transparent",
                        }}
                      >
                        <Icon icon="tabler:infinity" />
                        Ongoing
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link d-flex align-items-center gap-1 ${
                          activeTab === "dateRange" ? "active text-white" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            isOngoing: false,
                          }));
                          setActiveTab("dateRange");
                        }}
                        type="button"
                        style={{
                          backgroundColor:
                            activeTab === "dateRange"
                              ? "#15ab63"
                              : "transparent",
                        }}
                      >
                        <Icon icon="solar:calendar-linear" />
                        Date Range
                      </button>
                    </li>
                  </ul>

                  {activeTab === "dateRange" && (
                    <div className="input-group">
                      <input
                        type="date"
                        id="startDate"
                        value={formData.startDate || ""}
                        onChange={(e) => {
                          const startDate = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            startDate: startDate,
                            isOngoing: false,
                          }));
                          if (
                            formData.endDate &&
                            new Date(startDate) > new Date(formData.endDate)
                          ) {
                            setFormData((prev) => ({
                              ...prev,
                              endDate: "",
                            }));
                          }
                        }}
                        className="form-control"
                      />
                      <span className="input-group-text">→</span>
                      <input
                        type="date"
                        value={formData.endDate || ""}
                        onChange={(e) => {
                          const endDate = e.target.value;
                          if (formData.startDate && endDate) {
                            if (
                              new Date(endDate) <= new Date(formData.startDate)
                            ) {
                              toast.warn(
                                "End date must be greater than the start date!"
                              );
                              return;
                            }
                          }
                          setFormData((prev) => ({
                            ...prev,
                            endDate: endDate,
                            isOngoing: false,
                          }));
                        }}
                        id="endDate"
                        className="form-control"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4" ref={dropdownRef}>
                <label className="mb-2 mt-3">
                  What type of creators and target audience? *
                </label>
                <div className="position-relative">
                  <div
                    className="form-select d-flex align-items-center flex-wrap gap-2 min-height-auto cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedSkills.length > 0 ? (
                      <>
                        {selectedSkills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-dark-subtle text-dark px-2 py-1 rounded-pill d-flex align-items-center gap-1"
                          >
                            {skill}
                            <Icon
                              icon="mdi:close"
                              className="cursor-pointer"
                              width={16}
                              height={16}
                              onClick={(e) => handleRemoveSkill(skill, e)}
                            />
                          </span>
                        ))}
                        {selectedSkills.length > 1 && (
                          <span
                            className="text-muted ms-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSkills([]);
                            }}
                          >
                            Clear all
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-muted">
                        Select up to 5 categories
                      </span>
                    )}
                  </div>

                  {isDropdownOpen && (
                    <div
                      className="position-absolute start-0 w-100 mt-1 bg-white border rounded-3 shadow-sm"
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        top: "calc(100% + 5px)",
                        zIndex: 1050,
                        position: "absolute",
                        width: "100%",
                      }}
                    >
                      {AVAILABLE_SKILLS.map((skill) => (
                        <div
                          key={skill}
                          className={`px-3 py-2 cursor-pointer hover-bg-light ${
                            selectedSkills.includes(skill) ? "bg-light" : ""
                          }`}
                          onClick={() => {
                            handleSkillSelect(skill);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {skill}
                          {selectedSkills.includes(skill) && (
                            <Icon icon="mdi:check" className="float-end" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedSkills.length >= 5 && (
                  <small className="text-muted">
                    Maximum 5 categories can be selected
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Campaign Image</label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <small className="text-muted">1:1 Ratio</small>
                  <div className="vr"></div>
                  <small className="text-muted">Max 10 MB</small>
                </div>
                <div className="d-flex gap-2">
                  {formData.mediaUrl && (
                    <>
                      <div className="position-relative">
                        <Image
                          src={formData.mediaUrl}
                          width={100}
                          height={100}
                          className="border object-fit-cover rounded flex-shrink-0"
                          alt="Campaign media"
                        />
                        <Icon
                          icon="mdi:close-circle"
                          className="position-absolute cross-icon cursor-pointer"
                          width={20}
                          height={20}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              mediaUrl: "",
                            }))
                          }
                        />
                      </div>
                    </>
                  )}
                  <div
                    className="border-dashed rounded-2 text-center bg-base size-box cursor-pointer"
                    onClick={() =>
                      document.getElementById("campaignMedia")?.click()
                    }
                  >
                    <input
                      onChange={handleImageUpload}
                      type="file"
                      className="d-none"
                      id="campaignMedia"
                      accept="image/*"
                    />
                    <label className="cursor-pointer">
                      <Icon icon="ph:plus-bold" className="fs-4" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top d-flex gap-3 justify-content-end p-3">
        <button
          className="btn btn-outline-info"
          style={{ width: "120px" }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={resetForm}
        >
          Discard
        </button>
        <button
          className="btn btn-info"
          style={{ width: "120px" }}
          onClick={handleSubmit}
        >
          {isEditMode ? "Update" : "Publish"}
        </button>
      </div>
    </div>
  );
}

export default EditCreateCampaign;
