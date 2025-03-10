import axios from "axios";

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
  method: "get" | "post" | "put" | "delete",
  url: string,
  payloadOrParams?: object
): Promise<T | null> => {
  try {
    const response =
      method === "get"
        ? await apiController.get(url, { params: payloadOrParams })
        : method === "delete"
        ? await apiController.delete(url, { data: payloadOrParams })
        : await apiController[method](url, payloadOrParams);

    return response.data;
  } catch (error) {
    console.error(`API Error (${method.toUpperCase()} ${url}):`, error);
    return null;
  }
};
