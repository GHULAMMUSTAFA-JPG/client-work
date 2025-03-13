import axios, { AxiosRequestConfig } from "axios";
import { apiController } from "./baseUrl";

export const handleApiRequest = async <T>(
  method: string,
  endpoint: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<T | null> => {
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

    const response = await apiController(config);
    return response.data;
  } catch (error: any) {
    console.error(`API Error (${method} ${endpoint}):`, error);

    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    }
    return null;
  }
};
interface UploadOptions {
  campaignId?: string;
  postId?: string;
  [key: string]: any;
}

export const uploadFile = async (
  file: File,
  options: UploadOptions = {}
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file_request", file);

    Object.entries(options).forEach(([key, value]) => {
      if (value) {
        const snakeCaseKey = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        );
        formData.append(snakeCaseKey, value.toString());
      }
    });

    const response = await apiController.post(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/upload_files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response?.data?.file_urls && response.data.file_urls.length > 0) {
      return response.data.file_urls;
    }

    return null;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const uploadFiles = async (
  files: File[],
  options: UploadOptions = {}
): Promise<string[]> => {
  try {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file_request", file);

      Object.entries(options).forEach(([key, value]) => {
        if (value) {
          const snakeCaseKey = key.replace(
            /[A-Z]/g,
            (letter) => `_${letter.toLowerCase()}`
          );
          formData.append(snakeCaseKey, value.toString());
        }
      });

      const response = await apiController.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/upload_files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response?.data?.file_urls;
    });

    const urls = await Promise.all(uploadPromises);
    return urls.filter((url) => url !== null);
  } catch (error) {
    console.error("Error uploading files:", error);
    return [];
  }
};
