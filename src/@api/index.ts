import { apiController } from "./baseUrl";

export const fetch_dashboard_data = () => {
    const response = apiController.get('dashboard/dashboard_data')
    return response
}


export const login = (body: any) => {

    const response = apiController.post('auth/login/email', body)
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

export const updateProfileInformation = async (email: string, dto: any) => {
    try {
        const response = apiController.put(`/dashboard/creators/update_creator/${email}`, dto)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}


export const fetchBuyerDiscoveryData = async (email: string, setData: any, setIsLoading:any) => {
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
        return null
    }
}

export const getSavedList = async (email: string, setData: any, setIsLoading:any) => {
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
        return null
    }
}


export const getSpecificCreatorList = async (id: string, setData: any, setIsLoading:any) => {
    setIsLoading(true)

    try {
        const response: any = await apiController.get(`/dashboard/buyers/get_buyer_list_creators/${id}`)
        setIsLoading(false)

        setData(response?.data)
        return response
    } catch (error) {
        setData([])
        setIsLoading(false)

        console.log(error, "Error in get specific creator list api")
        return null
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
        return null
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
        return null
    }
}

export const deleteListItem = async (id: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.delete(`/dashboard/buyers/delete_creators_list/${id}`)
        setRendControl(!rendControl)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const addCreatorInList = async (dto: any, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.post("/dashboard/buyers/add_creator_to_list", dto)
        setRendControl(!rendControl)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCampaignsList = async (email: any, setData: any,setIsLoading:any) => {
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
        return null
    }
}


export const getSelectedCampaignsDetails = async (campaign_id: any, setData: any, setIsLoading:any) => {
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
        return null
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
        return null
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
        return null
    }
}


export const deleteCampaign = async (id: string, rendControl: boolean, setRendControl: any) => {
    try {
        const response: any = await apiController.delete(`/dashboard/campaigns/delete_campaign/${id}`)
        setRendControl(!rendControl)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return null
    }
}


export const getDiscoverCampaigns = async (setData:any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/public_campaigns`)
        setData(response?.data?.campaigns)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return null
    }
}


export const getDiscoverCampaignsForSearch = async (searchText:string, setData:any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/search_campaign?headline=${searchText}`)
        setData(response?.data?.campaigns)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return null
    }
}


export const getDiscoverCampaignsForFilters = async (filter:string, setData:any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/filter_campaigns?${filter}=true`)
        setData(response?.data?.campaigns)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return null
    }
}


export const getCampaignsActivatedCreators = async (filter:string, setData:any) => {
    try {
        const response: any = await apiController.get(`/dashboard/campaigns/get_campaign_activated_creators/${filter}`)
        setData(response?.data?.campaign)
        return response
    } catch (error) {
        console.log(error, "Error in get campaign list api")
        return null
    }
}


export const changePostStatus = async (dto:any,setIsLoading:any,setRendControl:any, rendControl:boolean) => {
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
        return null
    }
}



