import { apiController } from "./baseUrl";

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
