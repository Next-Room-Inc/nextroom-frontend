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
      URL: (token: any) => createApiUrl(`/auth/verify-email?token=${token}`),
      METHOD: HttpMethod.GET,
    },
    RESEND_VERIFICATION: {
      URL: () => createApiUrl("/auth/resend-verification"),
      METHOD: HttpMethod.POST,
    },
    CRAETE_INVITE: {
      URL: () => createApiUrl("/invite/create"),
      METHOD: HttpMethod.POST,
    },
    UPDATE_PROFILE_DETAILS: {
      URL: () => createApiUrl("/auth/user/profile-details"),
      METHOD: HttpMethod.PUT,
    },
    GET_MEMBERSHIP_CARD: {
      URL: (id: any) => createApiUrl(`/auth/user/membership-card?userId=${id}`),
      METHOD: HttpMethod.GET,
    },
    GET_PROFILE_PROGRESS: {
      URL: (id: any) =>
        createApiUrl(`/auth/user/profile-progress?userId=${id}`),
      METHOD: HttpMethod.GET,
    },
    GET_PROFILE_PHOTO: {
      URL: (id: any) =>
        createApiUrl(`/auth/student/profile-photo?userId=${id}`),
      METHOD: HttpMethod.GET,
    },
  },
  LISTINGS: {
    GET_ALL: {
      URL: () => createApiUrl("/listings"),
      METHOD: HttpMethod.GET,
    },
    GET_BY_ID: {
      URL: (id: any) => createApiUrl(`/listings/${id}`),
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
  EVENTS: {
    GET_ALL_UPCOMMING_EVENTS: {
      URL: () => createApiUrl("/events/upcoming"),
      METHOD: HttpMethod.GET,
    },
    GET_USER_EVENTS: {
      URL: (id?: any | null) => createApiUrl(`/events/user?userId=${id}`),
      METHOD: HttpMethod.GET,
    },
    CANCEL_USER_EVENTS: {
      URL: (userId?: any | null, eventId?: any | null) =>
        createApiUrl(`/events/${eventId}/cancel?userId=${userId}`),
      METHOD: HttpMethod.DELETE,
    },
    REGISTER_USER_EVENTS: {
      URL: (userId?: any | null, eventId?: any | null) =>
        createApiUrl(`/events/${eventId}/register?userId=${userId}`),
      METHOD: HttpMethod.POST,
    },
  },
  OFFERS: {
    GET_ALL: {
      URL: () => createApiUrl("/offers"),
      METHOD: HttpMethod.GET,
    },
    CLAIM_OFFER: {
      URL: (userId?: any | null, offerId?: any | null) =>
        createApiUrl(`/offers/${offerId}/claim?userId=${userId}`),
      METHOD: HttpMethod.POST,
    },
  },
};
