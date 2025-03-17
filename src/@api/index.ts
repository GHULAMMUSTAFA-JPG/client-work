import axios from "axios";
import { apiController } from "./baseUrl";
import { toast } from "react-toastify";
import { formatISO } from "date-fns";

export const fetch_dashboard_data = (setIsLoading?: any) => {
  setIsLoading && setIsLoading(true);
  try {
    const response = apiController.get("dashboard/dashboard_data");
    setIsLoading && setIsLoading(false);
    return response;
  } catch (error) {
    setIsLoading && setIsLoading(false);
    return error;
  }
};

export const login = (body: any) => {
  const response = apiController.post("auth/login/email", body);
  return response;
};

export const newLogin = (body: any) => {
  const response = apiController.post("auth/buyer/login", body);
  return response;
};
export const fetchProfileData = async (
  email: any,
  setUserData: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);
  try {
    const response = await apiController.post(
      `dashboard/creators/creator_data`,
      {
        email: email,
      }
    );
    setUserData(response?.data);
    // return response
  } catch (error) {
    console.log(error);
    setUserData({});
    // return null
  } finally {
    setIsLoading && setIsLoading(false);
  }
};

export const fetchProfileDataByIds = async (id: string, setUserData: any) => {
  try {
    const response = await apiController.post(
      `dashboard/creators/creator_data`,
      {
        id: id,
      }
    );
    setUserData((prev: any) => {
      return {
        ...prev,
        ["Name"]: response?.data?.Name,
        ["Profile_Image"]: response?.data?.Profile_Image,
      };
    });
    // return response
  } catch (error) {
    console.log(error);

    // return null
  }
};

export const fetchCompanyData = async (
  email: string,
  setCompanyData: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);

  try {
    const response = await apiController.get(
      `/dashboard/creators/my_company_creators/${email}`
    );
    // console.log(response)
    setCompanyData(response?.data);
    setIsLoading && setIsLoading(false);
    // return response
  } catch (error) {
    console.log(error);
    setIsLoading && setIsLoading(false);

    setCompanyData({});
    // return null
  }
};

export const updateProfileInformation = async (
  dto: any,
  setIsLoading: any,
  rendControl: boolean,
  setRendControl: any
) => {
  try {
    const response = await apiController.put(
      `/dashboard/creators/update_creator`,
      dto
    );
    setIsLoading(false);
    const closeButton: any = document.getElementById(
      "close_modal_edit_profile"
    );
    closeButton && closeButton.click();
    setRendControl(!rendControl);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchBuyerDiscoveryData = async (
  email: string,
  setData: any,
  setIsLoading: any,
  query: string,
  filters?: {
    countries: string[];
    jobTitles: string[];
    companies: string[];
    companySizes: string[];
    followerRange: string;
  }
) => {
  if (!query) {
    setIsLoading(true);
  }
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("email", email);
    queryParams.append("search_query", query);

    if (filters) {
      if (filters.companies?.length > 0) {
        queryParams.append("company_names", filters.companies.join(","));
      }

      if (filters.jobTitles?.length > 0) {
        queryParams.append("job_titles", filters.jobTitles.join(","));
      }

      if (filters.countries?.length > 0) {
        queryParams.append("county_codes", filters.countries.join(","));
      }

      if (filters.companySizes?.length > 0) {
        queryParams.append("company_sizes", filters.companySizes.join(","));
      }

      if (filters.followerRange) {
        const [min, max] = filters.followerRange.split("-");
        if (min) queryParams.append("min_followers", min);
        if (max && max !== "+") queryParams.append("max_followers", max);
        if (max === "+" && min) {
          queryParams.append("min_followers", min);
        }
      }
    }

    const response: any = await apiController.get(
      `/dashboard/buyers/discover_creators?${queryParams.toString()}`
    );

    setIsLoading(false);
    setData(response?.data);
    return response;
  } catch (error) {
    setIsLoading(false);
    setData({
      External_Creators: [],
      Internal_Creators: [],
    });
    console.log(error, "Error");
    return error;
  }
};

export const getSavedList = async (
  brand_id: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);

  try {
    const response: any = await apiController.get(
      `/dashboard/buyers/${brand_id}/lists`
    );
    setIsLoading(false);
    setData(response?.data?.Lists);
    return response;
  } catch (error) {
    setIsLoading(false);
    setData([]);
    console.log(error, "Error in saving list");
    return error;
  }
};

export const getSpecificCreatorList = async (
  id: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);

  try {
    const response: any = await apiController.get(
      `/dashboard/buyers/get_buyer_list_creators/${id}`
    );
    setData(response?.data);
    setIsLoading(false);
    return response;
  } catch (error) {
    setData([]);
    console.log(error, "Error in get specific creator list api");
    setIsLoading(false);
    return error;
  }
};

export const updateListName = async (
  dto: any,
  rendControl: boolean,
  setRendControl: any,
  setListName?: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);
  try {
    const response: any = await apiController.put(
      "/dashboard/buyers/update_creators_list",
      dto
    );
    setRendControl(!rendControl);
    const closebutton: any = document.getElementById("createNewlistmodalClose");
    setListName && setListName("");
    setIsLoading && setIsLoading(false);

    closebutton && closebutton?.click();
    return response;
  } catch (error) {
    setIsLoading && setIsLoading(false);

    console.log(error);
    return error;
  }
};

export const createListName = async (
  dto: any,
  rendControl: boolean,
  setRendControl: any,
  setListName?: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);

  try {
    const response: any = await apiController.post(
      "/dashboard/buyers/create_new_creators_list",
      dto
    );
    setRendControl(!rendControl);
    const closebutton: any = document.getElementById("createNewlistmodalClose");
    setIsLoading && setIsLoading(false);
    closebutton && closebutton?.click();
    setListName && setListName("");
    return response;
  } catch (error) {
    setIsLoading && setIsLoading(false);
    console.log(error);
    return error;
  }
};

export const deleteListItem = async (
  id: any,
  rendControl: boolean,
  setRendControl: any
) => {
  try {
    const response: any = await apiController.delete(
      `/dashboard/buyers/delete_creators_list/${id}`
    );
    setRendControl(!rendControl);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addCreatorInList: any = async (
  dto: any,
  rendControl: boolean,
  setRendControl: any
) => {
  try {
    const response: any = await apiController.post(
      "/dashboard/buyers/add_creator_to_list",
      dto
    );
    setRendControl(!rendControl);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCampaignsList = async (
  email: any,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  try {
    if (email == null) return;
    const response: any = await apiController.get(
      `/dashboard/campaigns/get_buyer_campaigns/${email}`
    );
    setIsLoading(false);
    setData(response?.data?.campaigns || []);
    return response;
  } catch (error) {
    setData([]);
    setIsLoading(false);

    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const getSelectedCampaignsDetails = async (
  campaign_id: any,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  try {
    const response: any = await apiController.get(
      `/dashboard/campaigns/get_campaign_buyer_view/${campaign_id}`
    );
    setIsLoading(false);
    setData(response?.data);
    return response;
  } catch (error) {
    setIsLoading(false);

    setData({});
    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const createCampaign = async (
  dto: any,
  rendControl: boolean,
  setRendControl: any,
  Newmapper: any,
  setIsLoading?: any,
  selectedSkills?: any,
  setActiveTab?: any
) => {
  try {
    // console.log("selectedSkills", selectedSkills);
    // console.log("setRendControl", setRendControl);
    if (!selectedSkills) {
      toast.warn("Please select Target Audience");
      return;
    }
    const updatedDto = {
      ...dto, // Spread the existing dto properties
      Target_Audience: selectedSkills, // Update Target_Audience with selectedSkills
    };
    // console.log("updatedDto", updatedDto);
    const response: any = await apiController.post(
      `/dashboard/campaigns/create_campaign`,
      updatedDto
    );
    setRendControl(!rendControl);
    const buttonClose: any = document.getElementById(
      "createCampaignOffcanvasModal"
    );
    // console.log("buttonClose", buttonClose);
    buttonClose && buttonClose.click();
    setIsLoading(false);
    setActiveTab("ongoing");
    Newmapper();
    return response;
  } catch (error) {
    console.log(error, "Error in get campaign list api");
    setIsLoading && setIsLoading(false);
    return error;
  }
};

export const updateCampaign = async (
  dto: any,
  rendControl: boolean,
  setRendControl: any,
  Newmapper: any,
  setIsLoading?: any,
  selectedSkills?: any,
  setActiveTab?: any
) => {
  try {
    if (!selectedSkills) {
      toast.warn("Please select Target Audience");
      return;
    }

    const updatedDto = {
      ...dto, // Spread the existing dto properties
      Target_Audience: selectedSkills, // Update Target_Audience with selectedSkills
    };
    const response: any = await apiController.put(
      `/dashboard/campaigns/update_campaign`,
      updatedDto
    );
    setRendControl(!rendControl);
    const buttonClose: any = document.getElementById(
      "createCampaignOffcanvasModal"
    );
    buttonClose && buttonClose.click();
    setIsLoading(false);
    setActiveTab("ongoing");
    Newmapper();
    return response;
  } catch (error) {
    toast.warn("Error in updating campaign. Please try again later");
    console.log(error, "Error in get campaign list api");
    setIsLoading(false);

    return error;
  }
};

export const deleteCampaign = async (
  id: string,
  rendControl: boolean,
  setRendControl: any
) => {
  try {
    const response: any = await apiController.delete(
      `/dashboard/campaigns/delete_campaign/${id}`
    );
    setRendControl(!rendControl);

    return response;
  } catch (error) {
    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const getDiscoverCampaigns = async (
  setData: any,
  setIsLoading: any,
  email: string,
  limit: number,
  page: number
) => {
  setIsLoading(true);
  try {
    const response: any = await apiController.get(
      `/dashboard/campaigns/public_campaigns?email=${email}&page=${page}&limit=${limit}`
    );
    if (page == 1) {
      setData(response?.data);
    } else {
      setData((prevData: any) => ({
        campaigns: [...prevData.campaigns, ...response?.data?.campaigns],
        pagination: response?.data?.pagination,
      }));
    }

    setIsLoading(false);
    return response;
  } catch (error) {
    setIsLoading(false);

    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const getDiscoverCampaignsForSearch = async (
  searchText: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);

  try {
    const response: any = await apiController.get(
      `/dashboard/campaigns/search_campaign?headline=${searchText}`
    );
    setData(response?.data);
    setIsLoading(false);

    return response;
  } catch (error) {
    setIsLoading(false);
    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const getDiscoverCampaignsForFilters = async (
  filter: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);

  try {
    const response: any = await apiController.get(
      `/dashboard/campaigns/filter_campaigns?${filter}=true`
    );
    setData(response?.data);
    setIsLoading(false);
    return response;
  } catch (error) {
    console.log(error, "Error in get campaign list api");
    setIsLoading(false);

    return error;
  }
};

export const getCampaignsActivatedCreators = async (
  filter: string,
  setData: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);
  try {
    const response: any = await apiController.get(
      `/dashboard/campaigns/get_campaign_activated_creators/${filter}`
    );
    setData(response?.data?.campaign);
    setIsLoading && setIsLoading(false);
    return response;
  } catch (error) {
    setIsLoading && setIsLoading(false);
    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const changePostStatus = async (
  dto: any,
  setIsLoading: any,
  setRendControl: any,
  rendControl: boolean,
  setFeedback?: any
) => {
  setIsLoading(true);
  try {
    const response: any = await apiController.post(
      `/dashboard/campaigns/change_post_status`,
      dto
    );
    setIsLoading(false);
    const button = document.getElementById("close_modal_creator_detail");
    button && button?.click();
    setRendControl(!rendControl);
    setFeedback && setFeedback("");
    return response;
  } catch (error) {
    setIsLoading(false);
    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const getCampaignsCreatorsOverview = async (
  email: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  try {
    const response: any = await apiController.get(
      `/dashboard/campaigns/get_creator_campaigns_overview/${email}`
    );
    setData(response?.data);
    setIsLoading(false);
    return response;
  } catch (error) {
    setIsLoading(false);

    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const applyCampaign = async (
  dto: any,
  setDescription: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);
  try {
    const response: any = await apiController.post(
      `/dashboard/campaigns/apply_campaign`,
      dto
    );
    // setRendControl(!rendControl);
    const buttonClose: any = document.getElementById("closeButton");
    buttonClose && buttonClose.click();
    setIsLoading && setIsLoading(false);
    setDescription("");
    return response;
  } catch (error) {
    setIsLoading && setIsLoading(false);
    const result: any = document.getElementById(
      "applyCampaignCloseModalButton"
    );
    result && result?.click();
    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const changeCreatorStatus = async (
  dto: any,
  setRendControl: any,
  rendControl: boolean
) => {
  try {
    const response: any = await apiController.post(
      `/dashboard/campaigns/change_creator_status`,
      dto
    );
    setRendControl(!rendControl);
    return response;
  } catch (error) {
    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const getCreatorsCampaignSubmissions = async (
  dto: any,
  setData: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);

  try {
    const response: any = await apiController.post(
      `/dashboard/campaigns/get_creator_campaign_submissions`,
      dto
    );
    setData(response?.data);
    setIsLoading && setIsLoading(false);
    return response;
  } catch (error) {
    console.log(error, "Error in get campaign list api");
    setIsLoading && setIsLoading(false);

    return error;
  }
};

export const fetchBuyerActiveCampaigns = async (
  email: string,
  setData: any,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);
  try {
    const response: any = await apiController.get(
      `/dashboard/campaigns/get_buyer_active_campaigns/${email}`
    );
    setData(response?.data);
    setIsLoading && setIsLoading(false);

    // console.log(response?.data)
    return response;
  } catch (error) {
    setIsLoading && setIsLoading(false);

    console.log(error, "Error in get campaign list api");
    return error;
  }
};

export const addCampaignPostSubmission = async (
  dto: any,
  rendControl: boolean,
  setRendControl: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  try {
    const response = await apiController.post(
      "/dashboard/campaigns/add_campaign_post_submission",
      dto
    );
    const closeButton: any = document.getElementById("closeSubmissionModal");
    closeButton && closeButton.click();
    setRendControl(!rendControl);
    setIsLoading(false);

    return response;
  } catch (error) {
    console.log(error, "Error in get campaign list api");
    setIsLoading(false);

    return error;
  }
};

const uploadImage = async (file: any, setIsLoading?: any) => {
  setIsLoading && setIsLoading(true);

  try {
    const formData = new FormData();
    formData.append("file_request", file);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/upload_files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setIsLoading && setIsLoading(false);

    return response?.data;
  } catch (error: any) {
    console.error(
      "Error uploading image:",
      error.response?.data || error.message
    );
    setIsLoading && setIsLoading(false);

    return error;
  }
};

export const handleFileUpload = async (event: any, setIsLoading?: any) => {
  const files = event.target.files;
  const maxImageSize = 10 * 1024 * 1024;
  if (files && files.length > 0) {
    const fileUploadPromises: Promise<any>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        const allowedImageTypes = [
          "image/jpeg",
          "image/gif",
          "image/png",
          "image/jpg",
          "image/webp",
          "image/heic",
        ];
        if (file.size > maxImageSize) {
          toast.warn("Image size cannot exceed 10mb");
        } else if (allowedImageTypes.includes(file.type)) {
          fileUploadPromises.push(uploadImage(file, setIsLoading));
        } else {
          toast.warn(
            "Invalid image file. Only JPEG, PNG, JPG, WEBP, HEIC are supported."
          );
        }
      }
      // Check if the file is a video
      else if (file.type.startsWith("video/")) {
        const allowedVideoTypes = ["video/mp4", "video/mkv", "video/quicktime"]; // .mov is video/quicktime in MIME type

        if (allowedVideoTypes.includes(file.type)) {
          fileUploadPromises.push(uploadImage(file, setIsLoading));
        } else {
          toast.warn("Invalid video file. Only MP4, MKV, MOV are supported.");
        }
      }
      // Check if the file is a PDF
      else if (file.type === "application/pdf") {
        fileUploadPromises.push(uploadImage(file, setIsLoading));
      } else {
        toast.warn("The file is not supported.");
      }
    }

    // Wait for all files to be uploaded
    try {
      const results = await Promise.all(fileUploadPromises);
      // console.log("All files uploaded successfully:", results);
      return results;
    } catch (error) {
      console.error("Error uploading one or more files:", error);
      return error;
    }
  }
};

export const fetchBuyersData = async (
  setData: any,
  email: string,
  setIsLoading?: any
) => {
  setIsLoading && setIsLoading(true);
  try {
    const response = await apiController.get(
      `/dashboard/buyers/get_buyer?email=${email}`
    );
    setData(response?.data);
    localStorage.setItem("Company_Name", response?.data?.Company_Name);
    setIsLoading && setIsLoading(false);
    return response?.data;
  } catch (error) {
    console.log(error);
    setIsLoading && setIsLoading(false);
    setData(null);
    return error;
  }
};

export const editProfileCall = async (
  setIsLoading: any,
  dto: any,
  setRendControl: any,
  rendControl: boolean
) => {
  setIsLoading(true);
  try {
    const response = await apiController.put(
      "/dashboard/buyers/update_buyer",
      dto
    );
    setIsLoading(false);
    const button = document?.getElementById("close_modal_edit_pprofile");
    button && button?.click();
    setRendControl(!rendControl);
    return response;
  } catch (error) {
    toast.warn("Error uploading data. Please try again later.");
    setIsLoading(false);
    return error;
  }
};

export const conversationHistory = async (
  email: string,
  setData: any,
  pageNo: number,
  limit: number,
  setIsLoading: any
) => {
  // setIsLoading(true)
  try {
    const response = await apiController.get(
      `/dashboard/get_all_conversations?email=${email}&page=${pageNo}&limit=${limit}`
    );
    setData(response?.data);
    // setIsLoading(false)
  } catch (error) {
    setData(null);
    console.log(error, "error while fetching conversation history");
    // setIsLoading(false)
  }
};

export const getSpecificMessageHistory = async (
  id: any,
  setData: any,
  setIsLoading: any,
  pageNo: number,
  limit: number
) => {
  setIsLoading(true);
  try {
    const response = await apiController.get(
      `/dashboard/get_conversation_messages?sender_id=${id?.Sender_ID}&conversation_id=${id?.Conversation_Id}&page=${pageNo}&limit=${limit}`
    );
    // console.log(response?.data,"ee kha ")
    setData(response?.data?.messages);
    setIsLoading(false);
  } catch (error) {
    setData(null);
    setIsLoading(false);
  }
};

export const downloadAllMedia = async (
  mediaFiles: any[],
  setIsLoading: any
) => {
  setIsLoading(true);
  try {
    const response = await apiController.post(
      "/dashboard/download_files",
      { file_urls: mediaFiles },
      {
        headers: {
          Accept: "application/zip",
          "Content-Disposition": "attachment",
        },
      }
    );
    setIsLoading(false);
    return response?.data;
  } catch (error) {
    setIsLoading(false);
    return null;
  }
};

export const countNumberOfUnreadMessages = async (
  conversationObject: any,
  setTotalUnreadMessage: any
) => {
  let totalCount = 0;

  conversationObject.forEach((conversation: any) => {
    if (conversation.messages && Array.isArray(conversation.messages)) {
      totalCount += conversation.messages.filter(
        (message: any) => message.Is_Seen === false
      ).length;
    }
  });

  setTotalUnreadMessage(totalCount);
};

export const getCreatorDetailsById = async (
  id: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);

  try {
    const response = await apiController.post(
      "/dashboard/creators/creator_data",
      { id }
    );
    setData(response?.data);
  } catch (error: any) {
    return null;
  } finally {
    setIsLoading(false);
  }
};

export const inviteCreatorCall = async (dto: any, setIsLoading: any) => {
  setIsLoading(true);

  try {
    const response = await apiController.post(
      "/dashboard/campaigns/invite_creator",
      dto
    );
    return response?.data;
  } catch (error: any) {
    return null;
  } finally {
    setIsLoading(false);
  }
};

export const getCompanyPageData = async (
  email: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  try {
    const response = await apiController.get(
      `/dashboard/buyers/get_buyer?email=${email}`
    );
    setData(response?.data);
    localStorage.setItem("Company_Name", response?.data?.Company_Name);
  } catch (error) {
    console.log(error);
    setData(null);
  } finally {
    setIsLoading(false);
  }
};

export const getCompanyPageDataByID = async (
  id: string,
  setData: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  try {
    const response = await apiController.get(
      `/dashboard/buyers/get_buyer?id=${id}`
    );
    setData(response?.data);
  } catch (error) {
    console.log(error);
    setData(null);
  } finally {
    setIsLoading(false);
  }
};

export const getCompanyActiveBuyersData = async (
  email: string,
  setData: any,
  setIsLoading: any,
  page: number,
  data: any
) => {
  setIsLoading(true);
  try {
    const response = await apiController.get(
      `/dashboard/campaigns/get_buyer_active_campaigns/${email}?page=${page}&limit=5`
    );

    page == 1
      ? setData(response?.data)
      : setData((prevData: any) => ({
          campaigns: [...prevData.campaigns, ...response?.data?.campaigns],
          pagination: response?.data?.pagination,
        }));
  } catch (error) {
    console.log(error);
    setData(null);
  } finally {
    setIsLoading(false);
  }
};

export const fetchCreatorData = async (email: string) => {
  try {
    const response = await apiController.post('/dashboard/creators/creator_data', { email });
    return response?.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchCreatorByCompany = async (userId: string) => {
  try {
    const response = await apiController.get(
      `/dashboard/creators/${userId}/by-company/list?page=1&limit=30`
    );
    return response?.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchBrandCalendar = async (
  brandId: string,
  startDate: Date,
  endDate: Date
) => {
  try {
    const response = await apiController.get(
      `/dashboard/buyers/${brandId}/calendar?start_date=${encodeURIComponent(
        formatISO(startDate)
      )}&end_date=${encodeURIComponent(formatISO(endDate))}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching brand calendar:", error);
    throw error;
  }
};

export const fetchCreatorCalendar = async (
  creatorId: string,
  startDate: Date,
  endDate: Date
) => {
  try {
    const response = await apiController.get(
      `/dashboard/creators/${creatorId}/calendar?start_date=${encodeURIComponent(
        formatISO(startDate)
      )}&end_date=${encodeURIComponent(formatISO(endDate))}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching creator calendar:", error);
    throw error;
  }
};


// Fetch notification history
export const fetchNotificationHistory = async (recipientId: string, page = 1, limit = 10) => {
  try {
    const response = await apiController.get(
      `/notifications_rest/notifications/all?recipient_id=${recipientId}&page=${page}&limit=${limit}`
    );
    console.log("Notification History Response:", response.data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching notification history:", error);
    throw error;
  }
};

// Fetch unseen notification count
export const fetchUnseenNotificationCount = async (recipientId: string, page = 1, limit = 10) => {
  try {
    const response = await apiController.get(
      `/notifications_rest/notifications/unseen?recipient_id=${recipientId}&page=${page}&limit=${limit}`
    );
    console.log("Unseen Notification Response:", response.data);
    return response?.data;
  } catch (error) {
    console.error("Error fetching unseen notification count:", error);
    throw error;
  }
};


