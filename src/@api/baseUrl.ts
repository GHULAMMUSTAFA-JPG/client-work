import axios from "axios";
import { toast } from "react-toastify";

export const apiController = axios.create({
  baseURL: "https://api.synnc.us/", //isServer ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL,
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

apiController.interceptors.response.use(
  (response) => {
    // console.log(response.config.url)

    // Display success message if it exists
    if (
      response.data &&
      response.data.message &&
      !isExcludedApi(response.config.url as string)
    ) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(error?.response?.data?.detail);
      console.log(error.response);
      // Display the error message from the backend in a toast notification
      console.error(
        error.response.data.message ||
          error?.response?.data?.detail ||
          "An error occurred"
      );
    } else {
      // Display a generic error message for other types of errors
      toast.error("An error occurred. Please try again later.");
    }

    return Promise.reject(error);
  }
);
function isExcludedApi(url: string) {
  // Define your excluded API URL(s) here
  const excludedUrls = [
    "chat/getChat",
    "getThreads",
    "pre-signed-url",
    "attachment/create",
    "sampleQuestions/getQuestions",
    "thread/createThread",
    "generatePdf",
    "plans/getPlans",
    "thread/getThreadById",
    "tac/getTAC",
    "system-instruction/getInstruction",
  ];

  // Check if the provided URL matches any excluded URL
  return excludedUrls.some((excludedUrl) => url.includes(excludedUrl));
}
