// Base URL for the local API
// export const baseUrl = "http://localhost:8090";
// Base URL for the dev server API
export const baseUrl = import.meta.env.VITE_API_URL;

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
  // GOOGLE_API: {
  //   PLACE_TEXT_SEARCH: {
  //     URL: () => createApiUrl("/promotion/send-email"),
  //     METHOD: HttpMethod.POST,
  //   },
  // },
  AUTH: {
    STUDENT_LOGIN: {
      URL: () => createApiUrl("/auth/student/login"),
      METHOD: HttpMethod.POST,
    },
    STUDENT_SIGNUP: {
      URL: () => createApiUrl("/auth/student/signup"),
      METHOD: HttpMethod.POST,
    },
    FORGOT_PASSWORD: {
      URL: () => createApiUrl("/auth/forgot-password"),
      METHOD: HttpMethod.POST,
    },
    RESET_PASSWORD: {
      URL: () => createApiUrl("/auth/reset-password"),
      METHOD: HttpMethod.POST,
    },
    VERIFY_EMAIL: {
      URL: () => createApiUrl("/auth/verify-email"),
      METHOD: HttpMethod.POST,
    },
    RESEND_VERIFICATION: {
      URL: () => createApiUrl("/auth/resend-verification"),
      METHOD: HttpMethod.POST,
    },
    CRAETE_INVITE: {
      URL: () => createApiUrl("/invite/create"),
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
  PROMOTION: {
    SEND_EMAIL: {
      URL: () => createApiUrl("/promotion/send-email"),
      METHOD: HttpMethod.POST,
    },
  },
  ONBOARDING: {
    SUBMIT_PREFERENCES: {
      URL: () => createApiUrl("/onboarding/student/preferences"),
      METHOD: HttpMethod.POST,
    },
    UPDATE_STATUS: {
      URL: () => createApiUrl("/onboarding/student/update-status"),
      METHOD: HttpMethod.PATCH,
    },
    GET_ALL_INTERESTS: {
      URL: () => createApiUrl("/onboarding/student/interests"),
      METHOD: HttpMethod.GET,
    },
  },
  PROPERTY: {
    GET_ENTRATA_PROPERTIES: {
      URL: () => createApiUrl("/entrata/fetch/property"),
      METHOD: HttpMethod.GET,
    },
  },
};
