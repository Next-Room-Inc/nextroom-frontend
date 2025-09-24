import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseUrl } from "./endpoints";
import { toast } from "react-toastify";

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // If the token exists, add it to the Authorization header
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  responseHandler: async (response) => {
    return response.headers.get("content-type")?.includes("application/json")
      ? response.json()
      : response.text();
  },
  validateStatus: (response, _) => {
    if (response.status === 401 && window.location.pathname !== "/") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.info("Session expired. Please log in.");

      // redirect to login page
      window.location.assign("/");
    }
    // else if (response.status === 401) {
    //   window.location.assign("/login");
    // }

    return [201, 200].includes(response.status);
  },
});
export const baseQueryAuth = fetchBaseQuery({
  baseUrl,
  // prepareHeaders: (headers) => {
  //   // Retrieve the token from localStorage
  //   // const token = localStorage.getItem("token");
  //   // if (token) {
  //   //   // If the token exists, add it to the Authorization header
  //   //   headers.set("Authorization", `Bearer ${token}`);
  //   // }
  //   // return headers;
  // },
  responseHandler: async (response) => {
    return response.headers.get("content-type")?.includes("application/json")
      ? response.json()
      : response.text();
  },
  validateStatus: (response, _) => {
    if (response.status === 401 && window.location.pathname !== "/") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.info("Session expired. Please log in.");

      // redirect to login page
      window.location.assign("/");
    }
    // else if (response.status === 401) {
    //   window.location.assign("/login");
    // }

    return [201, 200].includes(response.status);
  },
});
