import {API_URL, baseUrl} from "../endpoints";
import * as interfaces from "../../utils/interfaces";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const AuthServices = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl,
        responseHandler: async (response) => {
            console.log("🚀 ~ responseHandler: ~ response:", response)
            return response.headers.get("content-type")?.includes("application/json")
                ? response.json()
                : response.text();
        },
        validateStatus: (response, result) => {
            console.log("🚀 ~ response, result:", response, result)
            return [201, 200].includes(response.status);

        },
    }),
    endpoints: (builder) => ({
        studentSignup: builder.mutation({
            query: (signupDto: interfaces.StudentSignupPayload) => ({
                url: API_URL.AUTH.STUDENT_SIGNUP.URL(),
                method: API_URL.AUTH.STUDENT_SIGNUP.METHOD,
                body: signupDto,
            }),
        }),
        studentLogin: builder.mutation({
            query: (loginDto: interfaces.StudentSignupPayload) => ({
                url: API_URL.AUTH.STUDENT_LOGIN.URL(),
                method: API_URL.AUTH.STUDENT_LOGIN.METHOD,
                body: loginDto,
            }),
        }),
    }),
});

export const {useStudentSignupMutation, useStudentLoginMutation} = AuthServices;
