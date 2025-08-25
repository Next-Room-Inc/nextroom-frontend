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
      URL: (studentId: any) =>
        createApiUrl(`/onboarding/student/${studentId}/onboarding-preferences`),
      METHOD: HttpMethod.PUT,
    },
    GET_SUBMIT_PREFERENCES_BY_STUDENT_ID: {
      URL: (studentId: any) =>
        createApiUrl(`/onboarding/student/${studentId}/onboarding-preferences`),
      METHOD: HttpMethod.GET,
    },
    GET_PREFERENCES_STATUS: {
      URL: (studentId: any) =>
        createApiUrl(`/onboarding/student/${studentId}/onboarding-status`),
      METHOD: HttpMethod.GET,
    },
    UPDATE_STATUS: {
      URL: () => createApiUrl("/onboarding/student/update-status"),
      METHOD: HttpMethod.POST,
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
    MATCHES: {
      URL: (id: string) =>
        createApiUrl(`/student/match-results?studentId=${id}`),
      METHOD: HttpMethod.GET,
    },
    EXPLORE: {
      URL: (query: string | null = null) =>
        createApiUrl(`/explore${query ? query : ""}`),
      METHOD: HttpMethod.GET,
    },
    ACCEPTED_PROPERTY: {
      URL: (id: string) =>
        createApiUrl(`/student/accepted-property?studentId=${id}`),
      METHOD: HttpMethod.GET,
    },
    GET_SAVED_PROPERTIES: {
      URL: () => createApiUrl(`/student/saved-properties`),
      METHOD: HttpMethod.GET,
    },
    ADD_NEW_SAVED_PROPERTY: {
      URL: (id: string) => createApiUrl(`/student/saved-properties/${id}`),
      METHOD: HttpMethod.POST,
    },
    DELETE_SAVED_PROPERTY: {
      URL: (id: string) => createApiUrl(`/student/saved-properties/${id}`),
      METHOD: HttpMethod.DELETE,
    },
  },
  CHAT: {
    CREATE_MESSAGE: {
      URL: () => createApiUrl("/chat/fetch/property"),
      METHOD: HttpMethod.GET,
    },
    GET_MESSAGE: {
      URL: (id: string) => createApiUrl(`/chat/match-results?studentId=${id}`),
      METHOD: HttpMethod.GET,
    },
    GET_SINGLE_CHAT_MESSAGES: {
      URL: (query: string | null = null) =>
        createApiUrl(`/chat${query ? query : ""}`),
      METHOD: HttpMethod.GET,
    },
    GET_SINGLE_USER_MESSAGES: {
      URL: (id: string) =>
        createApiUrl(`/chat/accepted-property?studentId=${id}`),
      METHOD: HttpMethod.GET,
    },
  },
};
