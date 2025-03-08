"use client";
import { z } from "zod";
export const userRegisterValidation = z.object({
  name: z.string({ required_error: "Name is required." }).min(2).max(50),
  phone: z
    .string({ required_error: "Phone number is required.Minimum 10" })
    .min(10),
  email: z.string({ required_error: "Email is required." }).email(),
  password: z.string({ required_error: "Password is required." }).min(3).max(6),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required." })
    .min(3)
    .max(6),
  profileImg: z.string().optional(),
});

export const loginValidationSchema = z.object({
  email: z.string().optional(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 6 characters" }),
});

export const resetPasswordValidation = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
  newPassword: z.string({ required_error: "New Password is required." }),
  confirmPassword: z.string({
    required_error: "Confirm Password is required.",
  }),
});
