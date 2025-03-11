import axios, { AxiosRequestConfig } from "axios";

export const apiController = axios.create({
  baseURL: "https://api.synnc.us/",
  timeout: 600000,
});

apiController.interceptors.request.use((request) => {
  if (localStorage.getItem("user")) {
    request.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user") ?? "")?.token
    }`;
  }
  return request;
});

export const handleApiRequest = async <T>(
  method: string,
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<T> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const headers = {
      "Content-Type": "application/json",
    };

    const config: AxiosRequestConfig = {
      baseURL,
      method,
      url: endpoint,
      headers,
      ...options,
    };

    if (method.toLowerCase() === "get") {
      config.params = data;
    } else {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error(`API Error (${method} ${endpoint}):`, error);

    // Log more details about the error response
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    }

    throw error;
  }
};
