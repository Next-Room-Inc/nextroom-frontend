import { z } from "zod";


export const SignupSchema = z
  .object({
    firstName: z
      .string({ message: "First name is required" })
      .min(1, "First name is required"),
    lastName: z
      .string({ message: "Last name is required" })
      .min(1, "Last name is required"),
    email: z
      .string({ message: "Email is required" })
      .min(1, "Last name is required")
      .regex(
        /^[^\s@]+$/, // Regex to ensure no "@" or spaces are present
        "Email should not contain '@' or spaces (e.g., 'username')"
      ),
    password: z
      .string({ message: "Password is requried" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({ message: "Confirm Password is requried" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach the error to confirmPassword field
  });

  
export const SignupFromPersonalEmailSchema = z
  .object({
    firstName: z
      .string({ message: "First name is required" })
      .min(1, "First name is required"),
    lastName: z
      .string({ message: "Last name is required" })
      .min(1, "Last name is required"),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Must be an email" }),
    password: z
      .string({ message: "Password is requried" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({ message: "Confirm Password is requried" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attach the error to confirmPassword field
  });

  export const LoginSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Must be an email" }),
    password: z
      .string({ message: "Password is requried" })
      .min(6, "Password must be at least 6 characters long")
  }) 