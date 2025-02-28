"use client"
import { z } from "zod";
export const userRegisterValidation = z.object({
  name: z.string({ required_error: "Name is required." }).min(2).max(50),
  email: z.string({ required_error: "Email is required." }).email(),
  password: z
    .string({ required_error: "Password is required." })
    .min(3)
    .max(6),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required." })
    .min(3)
    .max(6),
    profileImage: z.string({ required_error: "Profile is required." }).url(),
});

export const userLoginValidation = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
  password: z.string({ required_error: "Password is required." }),
});

export const resetPasswordValidation = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
  newPassword: z.string({ required_error: "New Password is required." }),
  confirmPassword: z.string({ required_error: "Confirm Password is required." }),
});
