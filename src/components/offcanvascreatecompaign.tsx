import { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { createCampaign, handleFileUpload, updateCampaign } from "@/@api";
import { toast } from "react-toastify";

const AVAILABLE_SKILLS = [
  "AI/Analytics",
  "Blog",
  "Career Coaching",
  "Creator Tools",
  "CRM",
  "Collaboration & Productivity",
  "Content Creation",
  "Customer Service",
  "Customer Success",
  "Cybersecurity",
  "Data",
  "Design",
  "E-commerce",
  "Enterprise",
  "Finance",
  "HR",
  "IT & Software Development",
  "Management & Leadership",
  "Marketing",
  "Project Management",
  "Product Management",
  "Research",
  "Security",
  "Service Businesses",
  "Sales",
  "Solopreneurship",
  "Tech",
  "Venture Capital",
  "Writing",
  "Supply Chain & Logistics",
  "International Trade",
  "Business Intelligence",
  "Change Management",
  "Mergers & Acquisitions",
  "Risk Management",
  "Sustainable Business Practices",
  "Digital Transformation",
  "Business Law & Compliance",
  "Operations Management",
  "Quality Assurance",
  "Business Process Outsourcing",
  "Innovation Management",
  "Corporate Social Responsibility",
  "Employee Experience",
  "Training & Development",
  "Business Strategy",
  "Franchising",
  "Real Estate Investment",
  "Business Consulting",
  "Healthcare Management",
  "Nonprofit Management",
  "Agricultural Business",
  "Hospitality Management",
  "Educational Technology",
  "Sports Management",
  "Entertainment Business",
  "Retail Management",
  "Manufacturing",
  "Business Analytics",
  "Intellectual Property Management",
];

interface createCampaignDto {
  Is_Public: boolean;
  Headline: string;
  Budget: number;
  Brief_Description: string;
  Campaign_Details: string;
  Is_Ongoing: boolean;
  Start_Date?: string | null;
  End_Date?: string | null;
  Target_Audience: string[];
  Campaign_Required_Channels: string;
  Campaign_Media: string;
  Email: string;
  Campaign_Id?: string;
}

function OffcanvasCreateCompaign(props: any) {
  const { rendControl, setRendControl, data } = props;
  const [activeTab, setActiveTab] = useState("ongoing");
  const [dto, setDto] = useState<createCampaignDto>();
  const dropdownRef: any = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { user, setIsLoading } = useAuth();

  useEffect(() => {
    if (data) {
      const obj = mapper();
      data?.campaign?.Is_Ongoing == true
        ? setActiveTab("ongoing")
        : setActiveTab("dateRange");
      setDto(obj);
      if (data?.campaign?.Target_Audience) {
        setSelectedSkills(data.campaign.Target_Audience);
      }
    } else {
      Newmapper();
    }
  }, [data]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    user?.email &&
      setDto((prev: any) => {
        return { ...prev, ["Email"]: user?.email };
      });
  }, [user]);

  function formatDate(inputDate: any) {
    const months: any = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    if (inputDate) {
      const [month, day, year]: any = inputDate?.replace(".", "")?.split(" ");

      const data = `${year}-${months[month]}-${day.padStart(2, "0")}`;
      return data?.slice(0, data?.length - 1);
    } else {
      return;
    }
  }

  const mapper = () => {
    const obj = {
      Is_Public: data?.campaign?.Is_Public,
      Headline: data?.campaign?.Headline,
      Budget: data?.campaign?.Budget,
      Brief_Description: data?.campaign?.Brief_Description,
      Campaign_Details: data?.campaign?.Campaign_Details,
      Is_Ongoing: data?.campaign?.Is_Ongoing,
      Start_Date: data?.campaign?.Is_Ongoing
        ? null
        : data?.campaign?.Start_Date
        ? formatDate(data?.campaign?.Start_Date)
        : null,
      End_Date: data?.campaign?.Is_Ongoing
        ? null
        : data?.campaign?.End_Date
        ? formatDate(data?.campaign?.End_Date)
        : null,
      Target_Audience: data?.campaign?.Target_Audience,
      Campaign_Required_Channels: data?.campaign?.Campaign_Required_Channels,
      Campaign_Media: data?.campaign?.Campaign_Media,
      Email: data?.campaign?.user?.email,
      Campaign_Id: data?.campaign?._id,
    };
    return obj;
  };

  const Newmapper = () => {
    const obj = {
      Is_Public: false,
      Headline: "",
      Budget: 0,
      Brief_Description: "",
      Campaign_Details: "",
      Is_Ongoing: true,
      Start_Date: null,
      End_Date: null,
      Target_Audience: [],
      Campaign_Required_Channels: "",
      Campaign_Media: "",
      Email: user?.email,
    };
    setDto(obj);
    setSelectedSkills([]);
    return obj;
  };

  const updateDto = (e: any) => {
    if (e.target.id == "Is_Public") {
      setDto((prev: any) => {
        const updatedDto = { ...prev, [e.target.id]: e.target.checked };
        return updatedDto;
      });
    } else {
      setDto((prev: any) => {
        const updatedDto = { ...prev, [e.target.id]: e.target.value };
        return updatedDto;
      });
    }
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const result = await validate();
    if (result) {
      data
        ? updateCampaign(
            dto,
            rendControl,
            setRendControl,
            Newmapper,
            setIsLoading,
            selectedSkills,
            setActiveTab
          )
        : createCampaign(
            dto,
            rendControl,
            setRendControl,
            Newmapper,
            setIsLoading,
            selectedSkills,
            setActiveTab
          );
    }
  };

  const validate = async () => {
    if (dto?.Headline == "" && !dto?.Headline) {
      toast.warn("Campaign Name cannot be empty");
      setIsLoading(false);
      return false;
    } else if (dto?.Budget == 0 && !dto?.Budget) {
      toast.warn("Campaign budget cannot be less than 1");
      setIsLoading(false);
      return false;
    } else if (dto?.Brief_Description == "") {
      toast.warn("Campaign description cannot be empty");
      setIsLoading(false);
      return false;
    } else if (dto?.Campaign_Details == "" && !dto?.Campaign_Details) {
      toast.warn("Campaign details cannot be empty");
      setIsLoading(false);
      return false;
    } else if (!dto?.Is_Ongoing) {
      if (dto?.Start_Date == "" || !dto?.Start_Date) {
        toast.warn("Start date cannot be empty");
        setIsLoading(false);
        return false;
      } else if (dto?.End_Date == "" || !dto?.End_Date) {
        toast.warn("End date cannot be empty");
        setIsLoading(false);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
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
          {data ? "Update Campaign" : "Create Campaign"}
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
              {/* Basic Campaign Info Section */}
              <div className="mb-4">
                <h6 className="mb-3">Public/Private Campaign Info</h6>
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
                        checked={dto?.Is_Public}
                        role="switch"
                        id="Is_Public"
                        onChange={updateDto}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Left Column */}
              <div className="mb-3">
                <label className="form-label">Campaign Name *</label>
                <input
                  type="text"
                  id="Headline"
                  className="form-control"
                  value={dto?.Headline}
                  placeholder="New Generative AI Product Launch: Agentspot"
                  onChange={updateDto}
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
                    type="text"
                    id="Budget"
                    value={dto?.Budget}
                    className="form-control"
                    placeholder="0.00"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(value)) {
                        updateDto(e);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Brief Description *</label>
                <textarea
                  className="form-control"
                  rows={3}
                  id="Brief_Description"
                  placeholder="Help us launch Agentspot, an AI agent for SMBs to enterprises"
                  value={dto?.Brief_Description ? dto?.Brief_Description : ""}
                  onChange={updateDto}
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
                  id="Campaign_Details"
                  value={dto?.Campaign_Details ? dto?.Campaign_Details : ""}
                  onChange={updateDto}
                  placeholder="We're launching a new product feature that helps brands manage business creator partnerships at scale! The cold DMs and endless back-and-forths waste countless hours, so we allow brands to book collaborations directly with you and streamline 90% of the process."
                ></textarea>
              </div>
            </div>

            <div className="col-md-6">
              {/* Right Column */}

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
                          setDto((prev: any) => ({
                            ...prev,
                            Is_Ongoing: true,
                            Start_Date: null,
                            End_Date: null,
                          }));
                        }}
                        type="button"
                        id="Is_Ongoing"
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
                          setDto((prev: any) => ({
                            ...prev,
                            Is_Ongoing: false,
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
                        id="Start_Date"
                        value={dto?.Start_Date || ""}
                        onChange={(e: any) => {
                          const startDate = e.target.value;
                          setDto((prev: any) => ({
                            ...prev,
                            Start_Date: startDate,
                            Is_Ongoing: false,
                          }));
                          if (
                            dto?.End_Date &&
                            new Date(startDate) > new Date(dto.End_Date)
                          ) {
                            setDto((prev: any) => ({
                              ...prev,
                              End_Date: "",
                            }));
                          }
                        }}
                        className="form-control"
                      />
                      <span className="input-group-text">→</span>
                      <input
                        type="date"
                        value={dto?.End_Date || ""}
                        onChange={(e: any) => {
                          const endDate = e.target.value;
                          if (dto?.Start_Date && endDate) {
                            if (new Date(endDate) <= new Date(dto.Start_Date)) {
                              toast.warn(
                                "End date must be greater than the start date!"
                              );
                              return;
                            }
                          }
                          setDto((prev: any) => ({
                            ...prev,
                            End_Date: endDate,
                            Is_Ongoing: false,
                          }));
                        }}
                        id="End_Date"
                        className="form-control"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 " ref={dropdownRef}>
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
                            onClick={() => setSelectedSkills([])}
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
                        position: "fixed",
                        width: "inherit",
                      }}
                    >
                      {AVAILABLE_SKILLS.map((skill) => (
                        <div
                          key={skill}
                          className={`px-3 py-2 cursor-pointer hover-bg-light ${
                            selectedSkills.includes(skill) ? "bg-light" : ""
                          }`}
                          onClick={() => {
                            if (selectedSkills.length < 5) {
                              handleSkillSelect(skill);
                            }
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
                  {dto?.Campaign_Media && (
                    <>
                      <div className="position-relative">
                        <img
                          src={dto?.Campaign_Media}
                          width={100}
                          height={100}
                          className="border object-fit-cover rounded flex-shrink-0"
                        />
                        <Icon
                          icon="mdi:close-circle"
                          className="position-absolute cross-icon cursor"
                          width={20}
                          height={20}
                          onClick={() =>
                            setDto((prev: any) => {
                              return { ...prev, ["Campaign_Media"]: "" };
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                  <div
                    className="border-dashed rounded-2 text-center bg-base size-box cursor"
                    onClick={() =>
                      document.getElementById("Campaign_Media")?.click()
                    }
                  >
                    <input
                      onChange={async (e: any) => {
                        const file = e.target.files;
                        if (file[0]) {
                          const selectedFile = file[0];

                          const allowedTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/jpg",
                          ];
                          if (allowedTypes.includes(selectedFile.type)) {
                            const result: any = await handleFileUpload(
                              e,
                              setIsLoading
                            );
                            setDto((prev: any) => {
                              return {
                                ...prev,
                                ["Campaign_Media"]: result?.[0].file_urls,
                              };
                            });
                          } else {
                            toast.error(
                              "Only jpg, jpeg, and png files are allowed."
                            );
                          }
                        }
                      }}
                      type="file"
                      className="d-none"
                      id="Campaign_Media"
                      accept="image/*"
                    />
                    <label className="cursor">
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
          className="tw-px-4 tw-py-2 tw-border tw-rounded tw-border-gray-300 tw-text-gray-600 hover:tw-text-gray-800"
          style={{ width: "120px", display: "flex", justifyContent: "center" }}
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={() => Newmapper()}
        >
          Close
        </button>
        <button
          className="tw-px-4 tw-py-2 tw-bg-teal-500 tw-text-white tw-rounded hover:tw-bg-teal-600"
          style={{ width: "120px", display: "flex", justifyContent: "center" }}
          onClick={handleSubmit}
        >
          {data ? "Update" : "Publish"}
        </button>
      </div>
    </div>
  );
}

export default OffcanvasCreateCompaign;
