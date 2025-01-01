import { z } from "zod";

export const userFormValidation = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(30, "Username must be less than 30 characters."),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^[0-9]{10}$/.test(phone), "Invalid phone number"),
});
