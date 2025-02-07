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
  getCompanyPageDataByID,
  getSelectedCampaignsDetails,
  handleFileUpload,
  updateProfileInformation,
} from "@/@api";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ApplyModal from "@/components/ApplyModal";
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

export default function companypage({ params }: any) {
  const { id } = params;
  const { user, setIsLoading, rendControl, setRendControl } = useAuth();
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
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
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
          userProfile?.Size && userProfile?.Size !== "" ? userProfile?.Size : 0,
        categories: userProfile?.Categories,
        year_founded:
          userProfile?.Year_Founded == "" ? 1995 : userProfile?.Year_Founded,
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
        "https://synncapi.onrender.com/dashboard/buyers/update_buyer",
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

  const fileHandler = async (e: any, id: string) => {
    const file = e.target.files;
    const filePath: any = await handleFileUpload(e, setIsLoading);
    if (filePath[0]?.file_urls) {
      setEditDetails((prev: any) => {
        return { ...prev, [id]: filePath[0]?.file_urls };
      });
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
    id && getCompanyPageDataByID(id, setUserData, setIsLoading);
  }, [user, rendControl]);

  useEffect(() => {
    id &&
      getCompanyActiveBuyersData(
        id,
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

  return (
    <div className="container">
      <div className="row mt-3 ooo">
        <div className="col-md-8 mx-auto">
          {/* First profile container - Add onClick */}
          <div
            className="profile-container mb-4 pb-3"
            onClick={() => handleSectionClick("about")}
            style={{ cursor: "pointer" }}
          >
            {/* Banner Image */}
            <div className="position-relative">
              <Image
                src={
                  userProfile?.Company_Banner !== ""
                    ? userProfile?.Company_Banner
                    : defaultImagePath
                }
                alt="Profile Banner"
                className="object-fit-cover rounded-3 w-100 cover-img"
                width={1000}
                height={1000}
              />
            </div>

            {/* Profile Section */}
            <div className="p-3">
              {/* Profile Image */}
              <div className="position-relative" style={{ marginTop: "-75px" }}>
                <Image
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
              {/* Profile Info */}
              <div className="mt-2">
                <div className="d-flex justify-content-between align-items-center gap-2 mb-1">
                  <div className="">
                    {" "}
                    <h5 id="name" className="mb-0">
                      {userProfile?.Company_Name}
                    </h5>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <a href={userProfile?.Company_Website}>
                      <i
                        className="bi bi-globe"
                        style={{ width: "19px", height: "19px" }}
                      ></i>
                    </a>
                    <a href={userProfile?.Company_Linkedin} target="_blank">
                      <Icon
                        style={{ cursor: "pointer" }}
                        icon="mdi:linkedin"
                        width={19}
                        height={19}
                        className="text-info"
                      />
                    </a>
                  </div>
                </div>

                {/* <p className="mt-2">👋 Welcome to my partnership storefront!</p> */}

                <div className="mt-3">
                  <p>{userProfile?.Company_Description}</p>{" "}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 d-flex justify-content-between profile-second-section">
                  <div
                    className="d-flex flex-column div-size"
                    style={{ minWidth: "200px" }}
                  >
                    <label>
                      <b>Location</b>
                    </label>
                    <span className="text-muted mt-2">
                      {userProfile?.Location}
                    </span>
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ minWidth: "200px" }}
                  >
                    <label>
                      <b>Employees(est)</b>
                    </label>
                    <span className="text-muted mt-2">
                      {" "}
                      {userProfile?.No_of_Employees || 0}
                    </span>
                  </div>

                  <div
                    className="d-flex flex-column"
                    style={{ minWidth: "200px" }}
                  >
                    <div className="">
                      <label className="d-block">
                        <b>Size</b>
                      </label>
                      <button
                        type="button"
                        className="bg-info-subtle text-info border-0 btn btn-sm mt-2 rounded-pill size-btn px-2"
                      >
                        {userProfile?.Size || "Small"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-between profile-second-section">
                  <div
                    className="d-flex flex-wrap gap-2 justify-content-start"
                    style={{ minWidth: "200px", maxWidth: "200px" }}
                  >
                    <div className="">
                      <label className="d-block">
                        <b>Categories</b>
                      </label>
                      {userProfile?.Categories?.map(
                        (category: any, index: number) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              className="activated-subtle text-activated border-0 btn btn-sm mt-2 rounded-pill size-btn px-2 mx-1"
                            >
                              {category}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div
                    className="d-flex flex-column ms-4 "
                    style={{ minWidth: "200px" }}
                  >
                    <label>
                      <b>Year Founded</b>
                    </label>
                    <span className="text-muted mt-2">
                      {userProfile?.Year_Founded}
                    </span>
                  </div>
                  <div
                    className="d-flex flex-column ms-4"
                    style={{ minWidth: "200px" }}
                  ></div>
                </div>

                {/* Stats Section */}
              </div>
            </div>
          </div>

          {/* Second profile container - Add onClick */}
          {/* <div className='profile-container'
                        onClick={() => handleSectionClick('collaboration')}
                        style={{ cursor: 'pointer' }}>
                        <div>
                            <h5>Let's Collaborate</h5>

                            <div className="mt-4">
                                {
                                    userProfile?.Collaboration_Packages?.map((ele: any, index: number) => {
                                        return (
                                            <div className="card mb-3" key={index} onClick={async () => {
                                                const mapper = await mapperFunction(userProfile?.Collaboration_Packages)
                                                setCardDetails(mapper)
                                            }}>
                                                <div className="card-body d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h6>{ele?.Package_Name}</h6>
                                                        <p className="text-muted mb-0">
                                                            {ele?.Package_Description}
                                                        </p>
                                                    </div>
                                                    <div className='ms-5 text-end'>
                                                        <h6 className='text-muted'>${ele?.Package_Price}</h6>
                                                        <button id={ele?._id} className="btn btn-dark flex-shrink-0 btn-sm">Book Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    })
                                }



                            </div>
                        </div>
                    </div> */}

          <label className="d-block mb-3">Campaigns</label>

          {/* Second profile container - Add onClick */}
          <div className={``} style={{ cursor: "pointer" }}>
            {/* Collaboration Section */}
            {campaignData?.campaigns?.map((campaign: any, index: number) => {
              return (
                <div key={index} className="mb-3 profile-container">
                  <div className="d-flex justify-content-between mb-2">
                    <label className="d-block mt-2">
                      <b>{campaign?.Headline}</b>
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
                    <p className="mb-0">{campaign?.Target_Audience?.join(' , ')}</p>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    {/* <button className="btn btn-white border flex-shrink-0 btn-sm">Manage creators</button> */}
                    <button
                      onClick={() => {
                        setSelectedCampaign(campaign);
                      }}
                      className="btn btn-dark flex-shrink-0 btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#applyModal"
                    >
                      Learn More
                    </button>
                    {/* <button className="btn btn-white border flex-shrink-0 btn-sm">Detail</button>
                                            <button className="btn btn-white border disabled flex-shrink-0 btn-sm">Apply</button> */}
                  </div>

                  {/* Collaboration Cards */}
                </div>
              );
            })}
            <ApplyModal selectedCampaign={selectedCampaign} />
            {campaignData?.pagination?.Total_Pages !== page && (
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
        </div>
      </div>
    </div>
  );
}
