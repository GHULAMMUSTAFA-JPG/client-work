"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { useEffect, useRef, useState } from "react";
import {
  getCompanyActiveBuyersData,
  getCompanyPageData,
  getSelectedCampaignsDetails,
  handleFileUpload,
  updateProfileInformation,
} from "@/@api";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import OffcanvasCreateCompaign from "@/components/offcanvascreatecompaign";
import ApplyModal from "@/components/ApplyModal";
import { withAuthRole } from "@/utils/withAuthRole";
interface editDtoProps {
  email: string;
  first_name: string;
  last_name: string;
  company_logo: string;
  company_banner: string;
  company_name: string;
  company_description: string;
  company_website: string;
  company_linkedin: string;
  location: string;
  no_of_employees: number;
  size: string;
  categories: [string];
  year_founded: number;
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

interface CategoryOption {
  value: string;
  label: string;
}

function CompanyPage() {
  const { user, setIsLoading, rendControl, setRendControl, setIsActive } =
    useAuth();
  const fileInputRef: any = useRef(null);
  const fileInputRef1: any = useRef(null);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [preview, setPreview] = useState<boolean>(true);
  const [editDetails, setEditDetails] = useState<editDtoProps>({
    email: "",
    first_name: "",
    last_name: "",
    company_logo: "",
    company_banner: "",
    company_name: "",
    company_description: "",
    company_website: "",
    company_linkedin: "",
    location: "",
    no_of_employees: 0,
    size: "",
    categories: [""],
    year_founded: 0,
  });
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  console.log("selectedCampaign", selectedCampaign);
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

  // Add new state for active section
  const [activeSection, setActiveSection] = useState<
    "about" | "collaboration" | null
  >("about");
  const [cardDetails, setCardDetails] = useState<any[]>();
  // Add new state for sidebar visibility
  const [showSidebar, setShowSidebar] = useState(true);
  const [campaignData, setCampaignData] = useState<any>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [compaignId, setCompaignId] = useState(null);
  const [selectedCampaignDetails, setSelectedCampaignDetails] = useState();
  const [userProfile, setUserData] = useState<any>();
  const dropdownRef: any = useRef(null);
  const categoryOptions: CategoryOption[] = [
    { value: "Sales", label: "Sales" },
    { value: "CRM", label: "CRM" },
    { value: "Conversation Intelligence", label: "Conversation Intelligence" },
    {
      value: "Customer Revenue Optimization",
      label: "Customer Revenue Optimization",
    },
    { value: "Sales Analytics", label: "Sales Analytics" },
    { value: "Sales Acceleration", label: "Sales Acceleration" },
    { value: "Sales Intelligence", label: "Sales Intelligence" },
    { value: "Marketing", label: " Marketing" },
    { value: "Customer Data", label: "Customer Data" },
    { value: "Email Marketing", label: "Email Marketing" },
    { value: "Marketing Analytics", label: "Marketing Analytics" },
    { value: "Marketing Automation", label: "Marketing Automation" },
    { value: "Product Analytics", label: "Product Analytics" },
    { value: "Consulting", label: "Consulting" },
    { value: "Operations Consulting", label: "Operations Consulting" },
    { value: "Management", label: "Management Consulting" },
    { value: "Project Management", label: "Project Management Consulting" },
    { value: "Customer Service", label: "Customer Service Consulting" },
    { value: "Customer Success", label: "Customer Success Consulting" },
    {
      value: "Customer Service Automation",
      label: "Customer Service Automation",
    },
    { value: "Experience Management", label: "Experience Management" },
  ];

  const handleClick = () => {
    fileInputRef && fileInputRef.current.click();
  };

  const handleClick1 = () => {
    fileInputRef1 && fileInputRef1.current.click();
  };

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
        email: user?.email,
        first_name: "",
        last_name: "",
        company_logo: userProfile?.Company_Logo,
        company_banner:
          userProfile?.Company_Banner !== ""
            ? userProfile?.Company_Banner
            : defaultImagePath,
        company_name: userProfile?.Company_Name,
        company_description: userProfile?.Company_Description,
        company_website: userProfile?.Company_Website,
        company_linkedin: userProfile?.Company_Linkedin,
        location: userProfile?.Location,
        no_of_employees:
          userProfile?.No_of_Employees && userProfile?.No_of_Employees !== ""
            ? userProfile?.No_of_Employees
            : 0,
        size:
          userProfile?.Size && userProfile?.Size !== ""
            ? userProfile?.Size
            : "Small",
        categories: userProfile?.Categories,
        year_founded:
          userProfile?.Year_Founded == "" ? 1995 : userProfile?.Year_Founded,
      });

    userProfile?.Categories && setSelectedCategories(userProfile?.Categories);
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

  // Add click handlers for the profile containers
  const handleSectionClick = (section: "about" | "collaboration") => {
    setActiveSection(section);
    setShowSidebar(true);
  };

  // Add handler for cancel button
  const handleCancel = () => {
    setShowSidebar(false);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/buyers/update_buyer`,
        editDetails
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

  // const fileHandler: any = async (e: any, id: string) => {
  //   const file = e.target.files;
  //   const filePath: any = await handleFileUpload(e, setIsLoading);
  //   if (filePath[0]?.file_urls) {
  //     setEditDetails((prev: any) => {
  //       return { ...prev, [id]: filePath[0]?.file_urls };
  //     });
  //   }
  // };

  const fileHandler: any = async (e: any, id: string) => {
    const file = e.target.files[0]; // Access the first selected file
    if (file) {
      // Check if the file type is an image (JPG, PNG, or JPEG)
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (validImageTypes.includes(file.type)) {
        const filePath: any = await handleFileUpload(e, setIsLoading);
        if (filePath[0]?.file_urls) {
          setEditDetails((prev: any) => {
            return { ...prev, [id]: filePath[0]?.file_urls };
          });
        }
      } else {
        toast.error("Please upload a valid image file (JPEG, PNG, JPG).");
      }
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

  // const submitCardDetails = async (e: any) => {
  //     setIsLoading(true)
  //     e.preventDefault();
  //     const reslt = cardDetails
  //     editDetails.collaboration_packages = reslt

  //     setTimeout(() => {
  //         submitHandler()
  //     }, 600);

  // }

  const handleCategorySelect = (value: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((category) => category !== value);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, value];
    });
  };

  const handleRemoveCategory = (
    categoryToRemove: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedCategories((prev) =>
      prev.filter((category) => category !== categoryToRemove)
    );
  };

  const handleClearAllCategories = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategories([]);
  };

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
    console.log("companypagedata");

    user?.email && getCompanyPageData(user?.email, setUserData, setIsLoading);
    user?.isBuyer ? setIsActive(4) : undefined;
  }, [user, rendControl]);

  useEffect(() => {
    user?.email &&
      getCompanyActiveBuyersData(
        user?.email,
        setCampaignData,
        setIsLoading,
        page,
        campaignData
      );
  }, [user, rendControl, page]);

  useEffect(() => {
    const cat = selectedCategories;
    setEditDetails((prev: any) => {
      return { ...prev, ["categories"]: cat };
    });
  }, [selectedCategories]);

  useEffect(() => {
    compaignId &&
      getSelectedCampaignsDetails(
        compaignId,
        setSelectedCampaignDetails,
        setIsLoading
      );
  }, [compaignId]);

  return (
    <div className="container">
    <div className="main-profilebanner">
      {/* Banner Image */}
      <img
                src={
                  userProfile?.Company_Banner !== ""
                    ? userProfile?.Company_Banner
                    : "https://e1cdn.social27.com/digitalevents/synnc/cover.png"}
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
                  src={
                    userProfile?.Company_Logo !== ""
                      ? userProfile?.Company_Logo
                      : defaultImagePath
                  }
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
                    {userProfile?.Company_Name}
                      <div className="editprofilebox"  onClick={() => handleSectionClick("about")} style={{ cursor: "pointer" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="edit-medium" aria-hidden="true" data-supported-dps="24x24" fill="currentColor">
                          <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                        </svg>
                      </div>
                    </h4>
                    <h6 className="text-muted mb-2">{userProfile?.Current_Position || "Senior Software Engineer"}</h6>
                    
                    {/* Company and Location Row */}
                    <div className="d-flex align-items-center gap-2 text-muted mb-2">
                      <Icon icon="mdi:building" width={18} height={18} />
                      <span>{userProfile?.Current_Company || "TechCorp Industries"}</span>
                    </div>
  
                    {/* Skills Row */}
                    <div className="chips-container d-flex flex-wrap gap-2">
                    {userProfile?.Categories?.map(
                        (category: any, index: number) => {
                          return (
                            <div className="chip" key={index}><div className="chip-text">{category}</div></div>
                          );
                        }
                      )}
                     </div>
                  </div>
                </div>
              </div>
              <div className="actionbtn-container">
                <div className="profileactionsbtn">
                <a
                    href={userProfile?.Company_Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-linkedin"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path id="Icon_fa-solid-globe" data-name="Icon fa-solid-globe" d="M16.5,12a29.31,29.31,0,0,1-.155,3H7.655A28.034,28.034,0,0,1,7.5,12a29.311,29.311,0,0,1,.155-3h8.691A28.034,28.034,0,0,1,16.5,12Zm1.35-3h5.77a12.042,12.042,0,0,1,0,6H17.85A29.616,29.616,0,0,0,18,12,29.616,29.616,0,0,0,17.85,9Zm5.278-1.5h-5.47A16.488,16.488,0,0,0,15.066.394,12.023,12.023,0,0,1,23.123,7.5Zm-6.989,0H7.861A18.892,18.892,0,0,1,9.127,3.061,7.657,7.657,0,0,1,10.7.647,1.937,1.937,0,0,1,12,0a1.937,1.937,0,0,1,1.3.647,7.657,7.657,0,0,1,1.57,2.414A18.543,18.543,0,0,1,16.139,7.5Zm-9.8,0H.872A12.031,12.031,0,0,1,8.934.394,16.488,16.488,0,0,0,6.342,7.5ZM.38,9H6.15a30.075,30.075,0,0,0,0,6H.38a12.042,12.042,0,0,1,0-6ZM9.127,20.934A18.565,18.565,0,0,1,7.861,16.5h8.278a18.784,18.784,0,0,1-1.266,4.434,7.657,7.657,0,0,1-1.57,2.414A1.926,1.926,0,0,1,12,24a1.937,1.937,0,0,1-1.3-.647,7.657,7.657,0,0,1-1.57-2.414ZM6.342,16.5a16.488,16.488,0,0,0,2.592,7.106A12.031,12.031,0,0,1,.872,16.5Zm16.786,0a12.033,12.033,0,0,1-8.058,7.106A16.548,16.548,0,0,0,17.663,16.5h5.466Z" fill="#1bb09d"/>
</svg>

  
  
                  </a>
                   <a
                    href={`https://${userProfile?.Company_Linkedin}`}
                      target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-linkedin"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.963" viewBox="0 0 20 19.963">
    <path id="Path_854" data-name="Path 854" d="M68.173,115.963H64.031V102.625h4.148v13.337ZM66.1,100.8a2.4,2.4,0,1,1,2.4-2.4A2.4,2.4,0,0,1,66.1,100.8Zm17.6,15.159H79.558v-6.488c0-1.547-.031-3.537-2.152-3.537-2.158,0-2.489,1.684-2.489,3.425v6.6H70.774V102.625h3.974v1.822H74.8a4.363,4.363,0,0,1,3.924-2.152c4.192,0,4.972,2.764,4.972,6.357Z" transform="translate(-63.7 -96)" fill="#0077b5"/>
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
                <div className="stats-count">{userProfile?.Location}</div>
                <div className="stats-heading">Location</div>
              </div>
              <div className="stats-box">
                <div className="stats-count">{" "}{userProfile?.No_of_Employees || 0}</div>
                <div className="stats-heading">Employees(est)</div>
              </div>
              <div className="stats-box">
                <div className="stats-count">{userProfile?.Size || "Small"}</div>
                <div className="stats-heading">Size</div>
              </div>
              <div className="stats-box">
                <div className="stats-count">{userProfile?.Year_Founded}</div>
                <div className="stats-heading">Year Founded</div>
              </div>
             </div>
          </div>
  
          <div className="profile-bottom-section">
            <div className="profile-left-column">
              <div className="profile-box-container mb-4 mt-16 position-relative">
                <div className="aboutusSection">
                  <h2 className="d-flex align-items-center py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    &nbsp; About
                  </h2>
                  <p className="text-muted-l">
                  {userProfile?.Company_Description || "Passionate software engineer with 8+ years of experience building scalable applications and leading engineering teams."}
                  </p>
                </div>
              </div>
            </div>
            <div className="profile-right-column">
              <div className="profile-box-container mb-4 mt-16 position-relative">
                {/* Collaboration Section */}
                <div className="aboutusSection">
                  <div className="letbox_campaigns">
                  <h2 className="d-flex align-items-center py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
                    </svg>
                    &nbsp; Campaigns
                  </h2>
            {/* Campaigns html starts here */}
            <div className={``} style={{ cursor: "pointer" }}>
            {/* Collaboration Section */}
            {campaignData?.campaigns?.map((campaign: any, index: number) => {
              return (
                <div key={index} className="mb-3 profile-container">
                  <div className="d-flex justify-content-between mb-2">
                    <label className="d-block mt-2">
                      <b className="line-clamp-1 me-3">{campaign?.Headline}</b>
                    </label>
                    <button className="bg-primary-subtle text-primary border-0 btn btn-sm mt-2 rounded-pill size-btn px-2">
                      Public
                    </button>
                  </div>

                  <p className="text-muted">{campaign?.Brief_Description}</p>

                  <div className="d-flex gap-2 mb-2 align-items-center">
                    <Icon
                      icon="solar:eye-broken"
                      width="18"
                      height="18"
                      className="text-gray flex-shrink-0"
                    />
                    <p className="mb-0">
                      {campaign?.Target_Audience?.join(" , ")}
                    </p>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      onClick={() => {
                        router.push(`/buyerdashboard?id=${campaign?._id}`);
                      }}
                      className="btn btn-white border flex-shrink-0 btn-sm"
                    >
                      Manage creators
                    </button>
                    <button
                      onClick={() => {
                        setCompaignId(campaign?._id);
                      }}
                      className="btn btn-dark text-white  flex-shrink-0 btn-sm btn btn-outline-dark fs-12 btn-sm"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight2"
                      aria-controls="offcanvasRight2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        console.log("clicked");
                        setSelectedCampaign(campaign);
                      }}
                      className="btn btn-white border flex-shrink-0 btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#applyModal"
                    >
                      Detail
                    </button>
                    {/* <button className="btn btn-white border disabled flex-shrink-0 btn-sm">
                      Apply
                    </button> */}
                  </div>
                  {/* Collaboration Cards */}
                </div>
              );
            })}
            <ApplyModal selectedCampaign={selectedCampaign} disable={true} />
            <OffcanvasCreateCompaign
              data={selectedCampaignDetails}
              setRendControl={setRendControl}
              rendControl={rendControl}
            />
            {campaignData?.campaigns?.length > 0 &&
              campaignData?.pagination?.Total_Pages >= page && (
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-dark flex-shrink-0 btn-sm"
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    Load more
                  </button>
                </div>
              )}
          </div>
 {/* Campaigns html starts here */}
            
                  </div>
                  {/* Campaigns */}
               
                
         {/* sidebar sections starts here */}
         <div className={`col-md-4 ${showSidebar ? "" : "d-none"}`}>
          <div className="profile-sidebar-wraper">
            {/* First edit section */}
            <div
              className={`profilee-container ${
                activeSection === "about" ? "" : "d-none"
              }`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3 px-3">
                <h6 className="mb-0 ">Edit Profile</h6>
                <div className="d-flex align-items-center gap-2">
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
                      src={
                        editDetails?.company_banner !== ""
                          ? editDetails?.company_banner
                          : defaultImagePath
                      }
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
                      <span onClick={handleClick} className="text-muted">
                        Choose a photo
                      </span>
                      <Icon
                        onClick={() => {
                          setEditDetails((prev: any) => {
                            return { ...prev, ["company_banner"]: "" };
                          });
                        }}
                        icon="material-symbols:delete-outline"
                        className="cursor-pointer"
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e: any) => {
                          fileHandler(e, "company_banner");
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4 section-box_container">
                  <label className="mb-2">Company Logo</label>
                  <div className="position-relative">
                    <img
                      src={
                        editDetails.company_logo !== ""
                          ? editDetails?.company_logo
                          : defaultImagePath
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
                      <span onClick={handleClick1} className="text-muted">
                        Choose a photo
                      </span>
                      <Icon
                        onClick={() => {
                          setEditDetails((prev: any) => {
                            return { ...prev, ["company_logo"]: "" };
                          });
                        }}
                        icon="material-symbols:delete-outline"
                        className="cursor-pointer"
                      />
                      <input
                        type="file"
                        ref={fileInputRef1}
                        onChange={(e: any) => {
                          fileHandler(e, "company_logo");
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4 section-box_container">
                  <label className="mb-2">Company Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editDetails.company_name}
                    onChange={changeHandler}
                    id="company_name"
                    placeholder="Synnc"
                  />
                </div>
                <div className="mb-4 section-box_container">
                  <label className="mb-2">About Me(Description)</label>
                  <textarea
                    className="form-control"
                    placeholder="Synnc is a platform that connects brands with creators to help them grow their business."
                    value={editDetails.company_description}
                    onChange={changeHandler}
                    id="company_description"
                    rows={4}
                  ></textarea>
                </div>
                <div className="mb-4 section-box_container">
                  <label className="mb-2">Company Website</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editDetails.company_website}
                    onChange={changeHandler}
                    id="company_website"
                    placeholder="https://www.synnc.com"
                  />
                </div>
                <div className="mb-4 section-box_container">
                  <label className="mb-2">Company Linkedin</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editDetails.company_linkedin}
                    onChange={changeHandler}
                    id="company_linkedin"
                    placeholder="https://www.linkedin.com/company/synnc"
                  />
                </div>
                <div className="mb-4 section-box_container">
                  <label className="mb-2">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editDetails.location}
                    onChange={changeHandler}
                    id="location"
                    placeholder="United States"
                  />
                </div>
                <div className="mb-4 section-box_container">
                  <label className="mb-2">Employees(est)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editDetails.no_of_employees}
                    min={0}
                    onChange={changeHandler}
                    id="no_of_employees"
                    placeholder="e.g 100"
                  />
                </div>
                <div className="mb-4 section-box_container">
                  <label className="mb-2">Year founded(est)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editDetails.year_founded}
                    onChange={changeHandler}
                    id="year_founded"
                    placeholder="e.g 1996"
                  />
                </div>
                <div className="mb-4 section-box_container">
                  <label className="mb-2">Size</label>
                  <select
                    className="form-select form-select-sm"
                    value={editDetails.size}
                    onChange={changeHandler}
                    id="size"
                  >
                    <option
                      disabled
                      selected
                      value=""
                      className="small text-muted"
                    >
                      Select size
                    </option>
                    <option value="Small" className="small">
                      Small
                    </option>
                    <option value="Medium" className="small">
                      Medium
                    </option>
                    <option value="Large" className="small">
                      Large
                    </option>
                  </select>
                </div>

                <div className="mb-4 section-box_container" ref={dropdownRef}>
                  <label className="mb-2 mt-3">Categories</label>
                  <div className="position-relative">
                    <div
                      className="form-select d-flex align-items-center flex-wrap gap-2 min-height-auto cursor-pointer"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {selectedCategories.length > 0 ? (
                        <>
                          {selectedCategories.map((category) => (
                            <span
                              key={category}
                              className="bg-dark-subtle text-dark px-2 py-1 rounded-pill d-flex align-items-center gap-1"
                            >
                              {category}
                              <Icon
                                icon="mdi:close"
                                className="cursor-pointer"
                                width={16}
                                height={16}
                                onClick={(e) =>
                                  handleRemoveCategory(category, e)
                                }
                              />
                            </span>
                          ))}
                          {selectedCategories.length > 1 && (
                            <span
                              className="text-muted ms-2 cursor-pointer"
                              onClick={handleClearAllCategories}
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
                        className="position-absolute bottom-100 start-0 w-100 mb-1 bg-white border rounded-3 shadow-sm z-3"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {categoryOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`px-3 py-2 cursor-pointer hover-bg-light ${
                              selectedCategories.includes(option.value)
                                ? "bg-light"
                                : ""
                            }`}
                            onClick={() => handleCategorySelect(option.value)}
                          >
                            {option.label}
                            {selectedCategories.includes(option.value) && (
                              <Icon icon="mdi:check" className="float-end" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedCategories.length >= 5 && (
                    <small className="text-muted">
                      Maximum 5 categories can be selected
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* Second edit section */}
            <div
              className={`profile-container ${
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
                  <button className="btn btn-dark btn-sm ms-3">Save</button>
                </div>
              </div>

              {/* Content Section */}
              <div className="pb-2 main-box">
                <h6 className="mb-1">Let's Collaborate</h6>
                <p className="text-muted">
                  Add your collaboration packages here
                </p>
                {/* Stats Section */}
                <div className="mb-4">
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
                                <h6 className="mb-0">Card {index + 1}</h6>
                                <Icon
                                  icon="material-symbols:delete-outline"
                                  className="cursor-pointer"
                                />
                              </div>

                              {/* Title */}
                              <div className="mb-3">
                                <label className="mb-2">Title</label>
                                <input
                                  id="package_name"
                                  defaultValue={ele.package_name}
                                  onChange={(e) => valueAdder(e, index)}
                                  type="text"
                                  className="form-control"
                                  placeholder="1x Sponsored Post"
                                />
                              </div>

                              {/* Description */}
                              <div className="mb-3">
                                <label className="mb-2">Description</label>
                                <textarea
                                  className="form-control"
                                  rows={5}
                                  defaultValue={ele?.package_description}
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
                                  defaultValue={
                                    ele?.package_price ? ele?.package_price : 0
                                  }
                                  type="number"
                                  onChange={(e) => valueAdder(e, index)}
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
            </div>
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
  Component: CompanyPage,
  allowedRoles: ["buyer"],
});
