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
      .min(1, "Email is required")
      .email("Invalid email format"),
    university: z.string({ message: "University is required" }),
    age: z.string({ message: "Age must be a string" }).optional(),
    phoneNumber: z.string().optional(),
    pronouns: z.string().optional(),
    password: z
      .string({ message: "Password is required" })
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => {
    const domain = data.email.split("@")[1]?.toLowerCase();

    const universityDomains: Record<string, string> = {
      "The University of Ottawa": "uottawa.ca",
      "Carleton University": "carleton.ca",
      "Algonquin College": "algonquinlive.ca",
      "Collège La Cité": "collegelacite.ca",
    };

    const expectedDomain = universityDomains[data.university];
    return expectedDomain ? domain === expectedDomain : true;
  }, {
    message:
      "Email domain must match your selected university (e.g. uottawa.ca carleton.ca algonquinlive.ca collegelacite.ca for University of Ottawa)",
    path: ["email"],
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

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Must be an email" }),
  password: z
    .string({ message: "Password is requried" })
    .min(6, "Password must be at least 6 characters long"),
});
export const ForgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Must be an email" }),
});
export const ResetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Password is requried" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string({ message: "Confirm Password is requried" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match", 
    path: ["confirmPassword"], // Attach the error to confirmPassword field
  });
