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
        console.log(response)
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
        console.log(response)
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


export const fetchBuyerDiscoveryData = async (email: string, setData: any) => {

    try {
        const response: any = await apiController.get(`/dashboard/buyers/discover_creators/${email}`)
        setData(response?.data)
        return response

    } catch (error) {
        setData({
            External_Creators: [],
            Internal_Creators: []
        })
        console.log(error, "lops eror")
        return null
    }
}

export const getSavedList = async (email: string, setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/buyers/get_buyer_list_names/${email}`)
        setData(response?.data?.Lists)
        console.log(response?.data, "ee kha na")
        return response
    } catch (error) {
        setData([])
        console.log(error, "lops eror")
        return null
    }
}


export const getSpecificCreatorList = async (id: string, setData: any) => {
    try {
        const response: any = await apiController.get(`/dashboard/buyers/get_buyer_list_creators/${id}`)
        setData(response?.data)
        return response
    } catch (error) {
        setData([])
        console.log(error, "lops eror")
        return null
    }
}


export const updateListName = async (dto: any) => {
    try {
        const response: any = await apiController.put("/dashboard/buyers/udpate_creators_list", dto)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createListName = async (dto: any) => {
    try {
        const response: any = await apiController.put("/dashboard/buyers/create_new_creators_list", dto)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteListItem =  async (id:any) =>{
    try {
        const response:any = await apiController.delete(`/dashboard/buyers/delete_creators_list/${id}`)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}