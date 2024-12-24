import { apiController } from "./baseUrl";

export const fetch_dashboard_data = () => {
    const response = apiController.get('dashboard/dashboard_data')
    return response
}


export const login = (body: any) => {

    const response = apiController.post('auth/login/email', body)
    return response
}

export const fetchProfileData = async (email: string, setUserData:any) => {
   
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

export const fetchCompanyData  = async (email:string , setCompanyData:any)=>{
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