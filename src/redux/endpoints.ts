// Base URL for the local API
// export const baseUrl = "http://localhost:8090";
// Base URL for the dev server API
export const baseUrl =  import.meta.env.VITE_API_URL;

// Enum for HTTP methods
export enum HttpMethod {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

// Utility function to construct API URLs
// const createApiUrl = (path: string) => `${baseUrl}${path}`;
const createApiUrl = (path: string) => `${path}`;

// API endpoints
export const API_URL = {
  AUTH: {
    STUDENT_LOGIN: {
      URL: () => createApiUrl("/auth/student/login"),
      METHOD: HttpMethod.POST,
    },
    STUDENT_SIGNUP: {
      URL: () => createApiUrl("/auth/student/signup"),
      METHOD: HttpMethod.POST,
    },
  },
  LISTINGS: {
    GET_ALL: {
      URL: () => createApiUrl("/listings"),
      METHOD: HttpMethod.GET,
    },
    GET_BY_ID: {
      URL: (id: number) => createApiUrl(`/listings/${id}`),
      METHOD: HttpMethod.GET,
    },
  },
};
