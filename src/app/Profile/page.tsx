"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { useEffect, useRef, useState } from "react";
import { handleFileUpload, updateProfileInformation } from "@/@api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import HowToInstall from "@/components/HowToInstall";
import { withAuthRole } from "@/utils/withAuthRole";
interface editDtoProps {
  email: string;
  name: string;
  profile_url: string;
  profile_image: string;
  banner_image: string;
  description: string;
  skills: [string];
  current_company: string;
  audience_interest: string;
  collaboration_packages: any;
}

interface editFieldProps {
  email: boolean;
  name: boolean;
  profile_url: boolean;
  profile_image: boolean;
  banner_image: boolean;
  description: boolean;
  skills: boolean;
  current_company: boolean;
  audience_interest: boolean;
  collaboration_packages: boolean;
}

interface cardDetailsDto {
  package_name: string;
  package_description: string;
  package_price: number | null;
}
function ProfilePage() {
  const {
    user,
    userProfile,
    setIsLoading,
    rendControl,
    setRendControl,
    setIsActive,
  } = useAuth();
  const fileInputRef: any = useRef(null);
  const fileInputRef1: any = useRef(null);
  const [preview, setPreview] = useState<boolean>(true);
  const router = useRouter();
  const [editDetails, setEditDetails] = useState<editDtoProps>({
    email: user?.Email,
    name: "",
    profile_url: "",
    profile_image: "",
    banner_image: "",
    description: "",
    skills: [""],
    current_company: "",
    audience_interest: "",
    collaboration_packages: [
      {
        package_name: "",
        package_description: "",
        package_price: 0,
      },
    ],
  });

  const [editField, setEditField] = useState<editFieldProps>({
    email: false,
    name: false,
    profile_url: false,
    profile_image: false,
    banner_image: false,
    description: false,
    skills: false,
    current_company: false,
    audience_interest: false,
    collaboration_packages: false,
  });

  const [activeSection, setActiveSection] = useState<
    "about" | "collaboration" | null
  >("about");
  const [cardDetails, setCardDetails] = useState<any[]>();

  const [showSidebar, setShowSidebar] = useState(true);

  const dropdownRef = useRef<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const AVAILABLE_SKILLS = [
    "AI creators with founders and enterprise employee audiences",
    "Finance professionals",
    "Tech enthusiasts",
    "Business leaders",
    "Startup founders",
    "Enterprise employees",
    "Sales professionals",
    "Marketing experts",
    "HR professionals",
    "Product managers",
    "Software developers",
    "Data scientists",
    "Digital marketers",
    "Business consultants",
    "Industry analysts",
  ];

  const handleClick = () => {
    fileInputRef && fileInputRef.current.click();
  };

  const handleClick1 = () => {
    fileInputRef1 && fileInputRef1.current.click();
  };

  useEffect(() => {
    setIsActive(5);
  }, [setIsActive]);

  useEffect(() => {
    let collabPack: any = [];
    userProfile?.Collaboration_Packages?.map((element: any) => {
      const entry = {
        package_name: element?.Package_Name,
        package_description: element?.Package_Description,
        package_price: element?.Package_Price,
      };
      collabPack?.push(entry);
    });
    userProfile?._id &&
      setEditDetails({
        email: userProfile?.Email,
        name: userProfile?.Name,
        profile_url: userProfile?.Profile_URL,
        profile_image: userProfile?.Profile_Image,
        banner_image: userProfile?.Banner_Image,
        description: userProfile?.Description,
        skills: userProfile?.Skills,
        current_company: userProfile?.Current_Company,
        audience_interest: userProfile?.Audience_Interest,
        collaboration_packages: collabPack,
      });
  }, [userProfile]);

  const changeHandler = async (e: any) => {
    setEditDetails((prev: any) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const editFieldHandler = async (e: any) => {
    setEditField((prev: any) => {
      return { ...prev, [e.target.id]: true };
    });
  };

  const updateProfile = async () => {
    updateProfileInformation(
      editDetails,
      setIsLoading,
      rendControl,
      setRendControl
    );
  };

  const handleSectionClick = (section: "about" | "collaboration") => {
    setActiveSection(section);
    setShowSidebar(true);
  };

  const handleCancel = () => {
    setShowSidebar(false);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const updateddetails = {
        ...editDetails,
        email: user?.email,
      };
      console.log("updateddetails", updateddetails);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/creators/update_creator`,
        updateddetails
      );
      toast.success("Profile updated successfully");
      setRendControl(!rendControl);
    } catch (error) {
      toast.warn("Error while updating the data. Please try again later");
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fileHandler = async (e: any, id: string) => {
    const file = e.target.files;
    console.log(file?.[0]?.type, "hello");
    if (file?.[0]?.type == "image/png" || file?.[0]?.type == "image/jpeg") {
      const filePath: any = await handleFileUpload(e, setIsLoading);
      if (filePath[0]?.file_urls) {
        setEditDetails((prev: any) => {
          return { ...prev, [id]: filePath[0]?.file_urls };
        });
      }
    } else {
      toast.warn("Only png and jpeg extensions are allowed");
    }
  };

  const valueAdder = (e: any, index: number) => {
    cardDetails && (cardDetails[index][e.target.id] = e.target.value);
  };

  const mapperFunction = (array: any) => {
    let mappedArray: any = [];
    array?.map((element: any, index: number) => {
      const singleObject = {
        package_name: element?.Package_Name,
        package_description: element?.Package_Description,
        package_price: element?.Package_Price,
      };
      mappedArray.push(singleObject);
    });
    return mappedArray;
  };

  const deleteSection = (index: number) => {
    setPreview(false);
    const array = cardDetails;
    array?.splice(index, 1);
    setCardDetails(array);
    setTimeout(() => {
      setPreview(true);
    }, 100);
  };

  const submitCardDetails = async (e: any) => {
    const check = cardDetails?.some((entry) => entry.package_name == "");
    if (check) {
      toast.warn("Title cannot be empty");
    } else {
      setIsLoading(true);
      e.preventDefault();
      const reslt = cardDetails;
      editDetails.collaboration_packages = reslt;

      setTimeout(() => {
        submitHandler();
      }, 600);
    }
  };

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setEditDetails((prev: any) => ({
        ...prev,
        audience_interest: [...selectedSkills, skill].join(", "),
      }));
    }
    setIsDropdownOpen(false);
  };

  const handleRemoveSkill = (skillToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
    setEditDetails((prev: any) => ({
      ...prev,
      audience_interest: updatedSkills.join(", "),
    }));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (userProfile?.Audience_Interest) {
      const skills = userProfile.Audience_Interest.split(", ").filter(Boolean);
      setSelectedSkills(skills);
    }
  }, [userProfile]);
  const TargetAudience = userProfile?.Audience_Interest.split(", ");
  return (
    <div className="container">
      <div className="main-profilebanner">
        {/* Banner Image */}
        <img
          src={
            userProfile?.Banner_Image ||
            "https://e1cdn.social27.com/digitalevents/synnc/cover.png"
          }
          width={1000}
          height={300}
          alt="Profile Banner"
          className="object-fit-cover rounded-3 w-100 cover-img"
        />
      </div>
      <div className="col-md-8 mx-auto">
        <div className="profile-box-container mb-4 -mt-16 position-relative">
          <div className="profile-topsection">
            <div className="profile-image-content">
              <div className="profile-image">
                <img
                  src={userProfile?.Profile_Image || defaultImagePath}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-circle border border-4 border-white"
                />
              </div>
              <div className="profile-image-content-text">
                {/* Profile Info */}
                <div className="mt-2">
                  <h4 className="mb-1" id="name" onClick={editFieldHandler}>
                    {userProfile?.Name}
                    <div
                      className="editprofilebox"
                      onClick={() => handleSectionClick("about")}
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
                  </h4>
                  <h6 className="text-muted mb-2">
                    {userProfile?.Current_Position ||
                      "Senior Software Engineer"}
                  </h6>

                  {/* Company and Location Row */}
                  <div className="d-flex align-items-center gap-2 text-muted mb-2">
                    <Icon icon="mdi:building" width={18} height={18} />
                    <span>
                      {userProfile?.Current_Company || "TechCorp Industries"}
                    </span>
                  </div>

                  {/* Skills Row */}
                  <div className="chips-container d-flex flex-wrap gap-2">
                    {TargetAudience?.map((skill: string) => (
                      <div className="chip" key={skill}>
                        <div className="chip-text">{skill}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="actionbtn-container">
              <div className="profileactionsbtn">
             {/*    <button
                  className="btn btn-primary d-flex align-items-center gap-1"
                  onClick={() => router.push(`/inbox?id=${userProfile?._id}`)}
                >
                  <Icon icon="mdi:message" width={18} height={18} />
                  Message me
                </button> */}
                <button className="btn btn-outline-primary d-flex align-items-center gap-1">
                  <Icon icon="mdi:plus" width={18} height={18} />
                  Add to list
                </button>
                <a
                  href={`https://www.linkedin.com/in/${userProfile?.Profile_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-linkedin"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19.963"
                    viewBox="0 0 20 19.963"
                  >
                    <path
                      id="Path_854"
                      data-name="Path 854"
                      d="M68.173,115.963H64.031V102.625h4.148v13.337ZM66.1,100.8a2.4,2.4,0,1,1,2.4-2.4A2.4,2.4,0,0,1,66.1,100.8Zm17.6,15.159H79.558v-6.488c0-1.547-.031-3.537-2.152-3.537-2.158,0-2.489,1.684-2.489,3.425v6.6H70.774V102.625h3.974v1.822H74.8a4.363,4.363,0,0,1,3.924-2.152c4.192,0,4.972,2.764,4.972,6.357Z"
                      transform="translate(-63.7 -96)"
                      fill="#0077b5"
                    />
                  </svg>
                </a>
              </div>
              <div className="action-profilebox mt-4">
                <Link
                  href="https://chrome.google.com/webstore/category/extensions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary ms-3 d-flex align-items-center"
                >
                  <Icon icon="mdi:download" width={18} height={18} />
                  <span>Download Chrome Extension</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="statsbox-container">
            <div className="stats-box">
              <div className="stats-count">
                {userProfile?.Profile_Views || "1,234"}
              </div>
              <div className="stats-heading">Profile views</div>
            </div>
            <div className="stats-box">
              <div className="stats-count">
                {userProfile?.Average_Impressions || "5.6k"}
              </div>
              <div className="stats-heading">Post impressions</div>
            </div>
            <div className="stats-box">
              <div className="stats-count">
                {userProfile?.Search_Appearances || "789"}
              </div>
              <div className="stats-heading">Search appearances</div>
            </div>
            <div className="stats-box">
              <div className="stats-count">{userProfile?.No_of_Followers}+</div>
              <div className="stats-heading">Connections</div>
            </div>
            <div className="stats-box">
              <div className="stats-count">
                {userProfile?.Followers || "2.5k"}
              </div>
              <div className="stats-heading">Followers</div>
            </div>
          </div>
        </div>

        <div className="profile-bottom-section">
          <div className="profile-left-column">
            <div className="profile-box-container mb-4 mt-16 position-relative">
              <div className="aboutusSection">
                <h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  &nbsp; About
                </h2>
                <p className="text-muted-l">
                  {userProfile?.Description ||
                    "Passionate software engineer with 8+ years of experience building scalable applications and leading engineering teams."}
                </p>
              </div>
            </div>
          </div>
          <div className="profile-right-column">
            <div className="profile-box-container mb-4 mt-16 position-relative">
              {/* Collaboration Section */}
              <div className="aboutusSection">
                <div className="letbox">
                  <h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                    </svg>
                    &nbsp; Let's Collaborate
                  </h2>
                  <div className="d-flex justify-content-between align-items-center">
                    {userProfile?.Collaboration_Packages?.length < 1 && (
                      <Icon
                        icon="mdi:plus"
                        width="24"
                        height="24"
                        className="text-muted"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSectionClick("collaboration")}
                      />
                    )}
                  </div>
                </div>
                {/* Collaboration Cards */}
                <div className="mt-4">
                  {userProfile?.Collaboration_Packages?.length > 0 ? (
                    userProfile?.Collaboration_Packages?.map(
                      (ele: any, index: number) => {
                        return (
                          <div className="packagebox mb-3" key={index}>
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <h6 className="mb-0 line-clamp-2">
                                  {ele?.Package_Name}
                                </h6>
                                <div className="ms-5 text-end flex-shrink-0">
                                  <h6 className="package-prize">
                                    ${ele?.Package_Price}
                                  </h6>
                                </div>
                              </div>
                              <p className="package-description">
                                {ele?.Package_Description}
                              </p>
                            </div>
                            <div className="buttonboxcard">
                              <button
                                className="booknowbtn"
                                onClick={() =>
                                  handleSectionClick("collaboration")
                                }
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )
                  ) : (
                    <>
                      <div className="packagebox mb-3">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div className="card-content">
                            <h6>1x Sponsored Post</h6>
                            <p className="package-description mb-0">
                              I'll create a LinkedIn post to educate my audience
                              on the benefits of your company's offerings, or
                              for anything else you're interested in promoting,
                              like an upcoming event.
                            </p>
                          </div>
                          <div className="ms-5 text-end">
                            <h6 className="package-prize mb-5">$ 900</h6>
                          </div>
                        </div>
                        <div className="buttonboxcard">
                          <button
                            className="booknowbtn"
                            onClick={() => handleSectionClick("collaboration")}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                      <div className="packagebox mb-3">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div className="card-content">
                            <h6>
                              3x Sponsored Post Series (Most Popular • 20%
                              Discount)
                            </h6>
                            <p className="package-description mb-0">
                              I'll create a series of posts to educate my
                              audience on a specific topic, mentioning your
                              brand throughout and how you can help.
                            </p>
                          </div>
                          <div className="ms-5 text-end">
                            <h6 className="package-prize mb-5">$ 2100</h6>
                          </div>
                        </div>
                        <div className="buttonboxcard">
                          <button
                            className="booknowbtn"
                            onClick={() => handleSectionClick("collaboration")}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* sidebar sections starts here */}
                <div className={`col col-md-4 ${showSidebar ? "" : "d-none"}`}>
                  <div className="profile-sidebar-wraper">
                    <div
                      className={`profilee-container ${
                        activeSection === "about"
                          ? "d-none d-md-block d-lg-block"
                          : "d-none"
                      }`}
                    >
                      {/* Edit profile starts here */}
                      <div className="d-flex justify-content-between align-items-center mb-3 px-3">
                        <h6 className="mb-0 ">Edit Profile</h6>
                        <div>
                          <button
                            className="bg-white border btn btn-sm"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-dark btn-sm ms-3"
                            onClick={submitHandler}
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      <div className="pb-2 profile-sidebar-scroll">
                                             <div className="mb-4 section-box_container">
                          <label className="mb-2">Banner image</label>
                          <div className="position-relative">
                            <img
                              src={editDetails.banner_image || defaultImagePath}
                              alt="Banner"
                              width={500}
                              height={100}
                              className="w-100 rounded-3 mb-2"
                              style={{ objectFit: "cover" }}
                            />
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                className="text-muted"
                                onClick={handleClick}
                              >
                                Choose a photo
                              </span>
                              <Icon
                                icon="material-symbols:delete-outline"
                                className="cursor-pointer"
                                onClick={() => {
                                  setEditDetails((prev: any) => {
                                    return { ...prev, ["banner_image"]: "" };
                                  });
                                }}
                              />
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e: any) => {
                                  fileHandler(e, "banner_image");
                                }}
                                style={{ display: "none" }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 section-box_container">
                          <label className="mb-2">Profile photo</label>
                          <div className="position-relative">
                            <img
                              src={
                                editDetails.profile_image || defaultImagePath
                              }
                              alt="Profile"
                              width={80}
                              height={80}
                              className="rounded-circle mb-2"
                            />
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                onClick={handleClick1}
                                className="text-muted"
                              >
                                Choose a photo
                              </span>
                              <Icon
                                icon="material-symbols:delete-outline"
                                className="cursor-pointer"
                                onClick={() => {
                                  setEditDetails((prev: any) => {
                                    return { ...prev, ["profile_image"]: "" };
                                  });
                                }}
                              />
                              <input
                                type="file"
                                ref={fileInputRef1}
                                onChange={(e: any) => {
                                  fileHandler(e, "profile_image");
                                }}
                                style={{ display: "none" }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 section-box_container">
                          <label className="mb-2">Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editDetails.name}
                            onChange={changeHandler}
                            id="name"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="mb-4 section-box_container">
                          <label className="mb-2">Linkedin Username*</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editDetails.profile_url}
                            onChange={changeHandler}
                            id="profile_url"
                            placeholder="john-doe"
                          />
                        </div>
                        <div className="mb-4 section-box_container">
                          <label className="mb-2">Current Company*</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editDetails.current_company}
                            onChange={changeHandler}
                            id="current_company"
                            placeholder="Synnc"
                          />
                        </div>
                        <div
                          className="mb-4 section-box_container"
                          ref={dropdownRef}
                        >
                          <label className="mb-2">Audience Interest*</label>
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
                                        onClick={(e) =>
                                          handleRemoveSkill(skill, e)
                                        }
                                      />
                                    </span>
                                  ))}
                                  {selectedSkills.length > 1 && (
                                    <span
                                      className="text-muted ms-2 cursor-pointer"
                                      onClick={() => {
                                        setSelectedSkills([]);
                                        setEditDetails((prev: any) => ({
                                          ...prev,
                                          audience_interest: "",
                                        }));
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
                                  position: "fixed",
                                  width: "inherit",
                                }}
                              >
                                {AVAILABLE_SKILLS.map((skill) => (
                                  <div
                                    key={skill}
                                    className={`px-3 py-2 cursor-pointer hover-bg-light ${
                                      selectedSkills.includes(skill)
                                        ? "bg-light"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      if (selectedSkills.length < 5) {
                                        handleSkillSelect(skill);
                                      }
                                    }}
                                  >
                                    {skill}
                                    {selectedSkills.includes(skill) && (
                                      <Icon
                                        icon="mdi:check"
                                        className="float-end"
                                      />
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

                        <div className="mb-4 bg-white">
                          <label className="mb-2">*About Me (Description)</label>
                          <small className="d-block text-muted mb-2">
                            Welcome brands and introduce yourself
                          </small>
                          <textarea
                            className="form-control"
                            rows={10}
                            value={editDetails.description}
                            onChange={changeHandler}
                            id="description"
                            placeholder="Welcome to my profile! I use this to collaborate with great brands and other creators..."
                          />
                        </div>
                      </div>
                    </div>
                    {/* Main lets colorborate box Section starts here */}
                    <div
                      className={`profilee-container ${
                        activeSection === "collaboration" ? "" : "d-none"
                      }`}
                    >
                      <div className="d-flex justify-content-between mb-3 pt-2">
                        <h6 className="mb-0 ">Edit Section</h6>
                        <div>
                          <button
                            className="bg-white border btn btn-sm"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-dark btn-sm ms-3"
                            onClick={submitCardDetails}
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      {/* package Content Section starts here */}
                      <div className="pb-2 main-box">
                        <h6 className="mb-1">Let's Collaborate</h6>
                        <p className="text-muted">
                          Add your collaboration packages here
                        </p>
                        {/* Stats Section */}
                        <div className="mb-4 section-box_container">
                          <div className="card mb-3">
                            {/* <div className="card-header bg-white">
                              <h6 className="mb-0">Package</h6>
                          </div> */}

                            {/* Card 1 */}
                            {preview &&
                              cardDetails &&
                              cardDetails?.length !== 0 &&
                              cardDetails?.map((ele: any, index: number) => {
                                return (
                                  <div className="card-body" key={index}>
                                    <div>
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="mb-0">
                                          Card {index + 1}
                                        </h6>
                                        <Icon
                                          icon="material-symbols:delete-outline"
                                          className="cursor-pointer"
                                          onClick={() => deleteSection(index)}
                                        />
                                      </div>

                                      {/* Title */}
                                      <div className="mb-3">
                                        <label className="mb-2">Title *</label>
                                        <input
                                          id="package_name"
                                          required={true}
                                          defaultValue={ele.package_name}
                                          onChange={(e) => valueAdder(e, index)}
                                          type="text"
                                          className="form-control"
                                          placeholder="1x Sponsored Post"
                                        />
                                      </div>

                                      {/* Description */}
                                      <div className="mb-3">
                                        <label className="mb-2">
                                          Description
                                        </label>
                                        <textarea
                                          className="form-control"
                                          rows={5}
                                          defaultValue={
                                            ele?.package_description
                                          }
                                          onChange={(e) => valueAdder(e, index)}
                                          id="package_description"
                                          placeholder="I'll create a LinkedIn post to educate my audience on the benefits of your company's offerings, or for anything else you're interested in promoting, like an upcoming event."
                                        />
                                      </div>

                                      {/* Price */}
                                      <div>
                                        <label className="mb-2">Price</label>
                                        <input
                                          id="package_price"
                                          min="0"
                                          defaultValue={
                                            ele?.package_price
                                              ? ele?.package_price
                                              : 0
                                          }
                                          type="number"
                                          onChange={(e) => {
                                            valueAdder(e, index);
                                          }}
                                          className="form-control"
                                          placeholder="$ 100"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                          <button
                            className="btn btn-outline-dark w-100"
                            onClick={() => {
                              setPreview(false);
                              const newEntry = {
                                package_name: "",
                                package_description: "",
                                package_price: 0,
                              };
                              const newArray: any = cardDetails;
                              newArray?.push(newEntry);
                              setCardDetails(newArray);
                              setTimeout(() => {
                                setPreview(true);
                              }, 100);
                            }}
                          >
                            + Add Card
                          </button>
                        </div>

                        <button
                          className="btn btn-outline-danger w-100 mt-auto"
                          onClick={() => {
                            setPreview(false);

                            setCardDetails([]);
                            setTimeout(() => {
                              setPreview(true);
                            }, 100);
                          }}
                        >
                          Delete Block
                        </button>
                      </div>
                      {/* package Content Section ends here */}
                    </div>
                    {/* Main lets colorborate box Section starts here */}
                  </div>
                </div>
                {/* sidebar sections ends here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuthRole({
  Component: ProfilePage,
  allowedRoles: ["creator"],
});
