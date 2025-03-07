import { z } from "zod";

// Zod schema for validating the form
export const checkoutFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

