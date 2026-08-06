import { z } from "zod";
import { contactServices } from "./contact-services";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^[+]?[\d\s()-]{7,20}$/.test(value),
      "Enter a valid phone number"
    ),
  service: z.enum(contactServices, {
    message: "Please select a service",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;