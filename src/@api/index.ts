import { apiController } from "./baseUrl";

export const fetch_dashboard_data = ()=>{
    const response = apiController.get('dashboard/dashboard_data')
    return response 
}


export const login = (body:any)=>{
    console.log(body)
    const response = apiController.post('auth/login/email',body)
    return response 
}