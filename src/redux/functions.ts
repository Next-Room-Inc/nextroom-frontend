import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseUrl } from "./endpoints";

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
    console.log("🚀 ~ responseHandler: ~ response:", response);
    return response.headers.get("content-type")?.includes("application/json")
      ? response.json()
      : response.text();
  },
  validateStatus: (response, result) => {
    console.log("🚀 ~ response:", response);
    console.log("🚀 ~  result:", result);

    if (response.status === 401) {
      //remove token from localStorage and redirect to login
      localStorage.removeItem("token");
      // remove user data from localStorage and redirect to login
      localStorage.removeItem("user");
      // redirect to login page
      window.location.assign("/login");
    }

    return [201, 200].includes(response.status);
  },
});
