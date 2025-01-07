import axios from "axios";
import { apiController } from "./baseUrl";
import { toast } from "react-toastify";

export const fetch_dashboard_data = () => {
    const response = apiController.get('dashboard/dashboard_data')
    return response
}


export const login = (body: any) => {

    const response = apiController.post('auth/login/email', body)
    return response
}

export const newLogin = (body: any) => {

    const response = apiController.post('auth/buyer/login', body)
    return response
}
export const fetchProfileData = async (email: string, setUserData: any) => {

    try {
        const response = await apiController.get(`dashboard/creators/creator_data/${email}`)

        setUserData(response?.data)
        // return response
    } catch (error) {
        console.log(error)
        setUserData({})
        // return null
    }
}

export const fetchCompanyData = async (email: string, setCompanyData: any) => {
    try {
        const response = await apiController.get(`/dashboard/creators/my_company_creators/${email}`)
        // console.log(response)
        setCompanyData(response?.data)
        // return response
    } catch (error) {
        console.log(error)
        setCompanyData({})
        // return null
    }
}

export const updateProfileInformation = async (dto: any) => {
    try {
        const response = apiController.put(`/dashboard/creators/update_creator`, dto)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}






export const fetchBuyerDiscoveryData = async (email: string, setData: any, setIsLoading: any) => {
    setIsLoading(true)
    try {
        const response: any = await apiController.get(`/dashboard/buyers/discover_creators/${email}`)
        setIsLoading(false)
        setData(response?.data)
        return response

    } catch (error) {
        setIsLoading(false)

        setData({
            External_Creators: [],
            Internal_Creators: []
        })
        console.log(error, "Error")
        return error
    }
}

export const getSavedList = async (email: string, setData: any, setIsLoading: any) => {
    setIsLoading(true)

    try {

        const response: any = await apiController.get(`/dashboard/buyers/get_buyer_list_names/${email}`)
        setIsLoading(false)
        setData(response?.data?.Lists)
        return response
    } catch (error) {
        setIsLoading(false)
        setData([])
        console.log(error, "Error in saving list")
        return error
    }
}


export const getSpecificCreatorList = async (id: string, setData: any, setIsLoading: any) => {
    setIsLoading(true)

    try {
        const response: any = await apiController.get(`/dashboard/buyers/get_buyer_list_creators/${id}`)
        setData(response?.data)
        setIsLoading(false)
        return response
    } catch (error) {
        setData([])
        console.log(error, "Error in get specific creator list api")
        setIsLoading(false)
        return error
    }
}


export const updateListName = async (dto: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.put("/dashboard/buyers/update_creators_list", dto)
        setRendControl(!rendControl)
        const closebutton: any = document.getElementById('createNewlistmodalClose')
        closebutton && closebutton?.click()
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const createListName = async (dto: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.post("/dashboard/buyers/create_new_creators_list", dto)
        setRendControl(!rendControl)
        const closebutton: any = document.getElementById('createNewlistmodalClose')
        closebutton && closebutton?.click()
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteListItem = async (id: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.delete(`/dashboard/buyers/delete_creators_list/${id}`)
        setRendControl(!rendControl)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const addCreatorInList = async (dto: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.post("/dashboard/buyers/add_creator_to_list", dto)
        setRendControl(!rendControl)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getCampaignsList = async (email: any, setData: any, setIsLoading: any) => {
    setIsLoading(true)
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/get_buyer_campaigns/${email}`)
        setIsLoading(false)
        setData(response?.data?.campaigns || [])
        return response
    } catch (error) {
        setData([])
        setIsLoading(false)

        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const getSelectedCampaignsDetails = async (campaign_id: any, setData: any, setIsLoading: any) => {
    setIsLoading(true)
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/get_campaign_buyer_view/${campaign_id}`)
        setIsLoading(false)
        setData(response?.data)
        return response
    } catch (error) {
        setIsLoading(false)

        setData({})
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const createCampaign = async (dto: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.post(`/dashboard/campaigns/create_campaign`, dto)
        setRendControl(!rendControl)
        const buttonClose: any = document.getElementById('createCampaignOffcanvasModal')
        buttonClose && buttonClose.click()
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}

export const updateCampaign = async (dto: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.put(`/dashboard/campaigns/update_campaign`, dto)
        setRendControl(!rendControl)
        const buttonClose: any = document.getElementById('createCampaignOffcanvasModal')
        buttonClose && buttonClose.click()
        return response
    } catch (error) {

        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const deleteCampaign = async (id: string, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.delete(`/dashboard/campaigns/delete_campaign/${id}`)
        setRendControl(!rendControl)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const getDiscoverCampaigns = async (setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/public_campaigns`)
        setData(response?.data?.campaigns)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const getDiscoverCampaignsForSearch = async (searchText: string, setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/search_campaign?headline=${searchText}`)
        setData(response?.data?.campaigns)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const getDiscoverCampaignsForFilters = async (filter: string, setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/filter_campaigns?${filter}=true`)
        setData(response?.data?.campaigns)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const getCampaignsActivatedCreators = async (filter: string, setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/get_campaign_activated_creators/${filter}`)
        setData(response?.data?.campaign)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const changePostStatus = async (dto: any, setIsLoading: any, setRendControl: any, rendControl: boolean) => {
    setIsLoading(true)
    try {
        const response: any = await apiController.post(`/dashboard/campaigns/change_post_status`, dto)
        setIsLoading(false)
        const button = document.getElementById('close_modal_creator_detail')
        button && button?.click()
        setRendControl(!rendControl)
        return response
    } catch (error) {
        setIsLoading(false)

        console.log(error, "Error in get campaign list api")
        return error
    }
}



export const getCampaignsCreatorsOverview = async (email: string, setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/get_creator_campaigns_overview/${email}`)
        setData(response?.data)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const applyCampaign = async (dto: any) => {
    try {
        const response: any = await apiController.post(`/dashboard/campaigns/apply_campaign`, dto)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const changeCreatorStatus = async (dto: any, setRendControl: any, rendControl: boolean) => {
    try {
        const response: any = await apiController.post(`/dashboard/campaigns/change_creator_status`, dto)
        setRendControl(!rendControl)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const getCreatorsCampaignSubmissions = async (dto: any, setData: any) => {
    try {
        const response: any = await apiController.post(`/dashboard/campaigns/get_creator_campaign_submissions`, dto)
        setData(response?.data)
        console.log(response, "lol")
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}

export const fetchBuyerActiveCampaigns = async (email: string, setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/get_buyer_active_campaigns/${email}`)
        setData(response?.data)
        // console.log(response?.data)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}


export const addCampaignPostSubmission = async (dto: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response = await apiController.post('/dashboard/campaigns/add_campaign_post_submission', dto)
        const closeButton: any = document.getElementById('closeSubmissionModal')
        closeButton && closeButton.click()
        setRendControl(!rendControl)
        return response

    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return error
    }
}

const uploadImage = async (file: any) => {
    try {
        const formData = new FormData();
        formData.append('file_request', file);

        const response = await axios.post('https://synncapi.onrender.com/dashboard/upload_files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Upload successful:', response.data);
        return response?.data;
    } catch (error: any) {
        console.error('Error uploading image:', error.response?.data || error.message);
        return error;
    }
};

export const handleFileUpload = async (event: any) => {
    const files = event.target.files;
    const maxImageSize = 10 * 1024 * 1024
    if (files && files.length > 0) {
        const fileUploadPromises: Promise<any>[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // Check if the file is an image
            if (file.type.startsWith('image/')) {

                const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/heic'];
                if (file.size > maxImageSize) {
                    toast.warn('Image size cannot exceed 10mb')
                }
                else if (allowedImageTypes.includes(file.type)) {
                    fileUploadPromises.push(uploadImage(file));
                }

                else {
                    toast.warn('Invalid image file. Only JPEG, PNG, JPG, WEBP, HEIC are supported.');
                }
            }
            // Check if the file is a video
            else if (file.type.startsWith('video/')) {
                const allowedVideoTypes = ['video/mp4', 'video/mkv', 'video/quicktime']; // .mov is video/quicktime in MIME type

                if (allowedVideoTypes.includes(file.type)) {
                    fileUploadPromises.push(uploadImage(file));
                } else {
                    toast.warn('Invalid video file. Only MP4, MKV, MOV are supported.');
                }
            }
            // Check if the file is a PDF
            else if (file.type === 'application/pdf') {
                fileUploadPromises.push(uploadImage(file));
            } else {
                toast.warn('The file is not supported.');
            }
        }

        // Wait for all files to be uploaded
        try {
            const results = await Promise.all(fileUploadPromises);
            console.log('All files uploaded successfully:', results);
            return results;
        } catch (error) {
            console.error('Error uploading one or more files:', error);
            return error;
        }
    }
};


export const fetchBuyersData = async (setData: any, email: string) => {
    try {
        const response = await apiController.get(`/dashboard/buyers/get_buyer/${email}`)
        setData(response?.data)
        return response?.data
    } catch (error) {
        console.log(error)
        setData(null)
        return error
    }
}