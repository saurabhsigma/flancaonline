import { z } from "zod";

const trimmedString = z.string().trim();

export const imageSchema = z.object({
  url: z.string().url(),
  publicId: trimmedString.min(1),
  alt: trimmedString.min(1),
});

export const projectSchema = z.object({
  title: trimmedString.min(3).max(100),
  description: trimmedString.min(20).max(500),
  techStack: z.array(trimmedString.min(1)).min(1),
  liveLink: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined)
    .refine((value) => !value || /^https?:\/\//.test(value), "Live link must be a valid URL."),
  images: z.array(imageSchema).min(1),
  featured: z.boolean().optional().default(false),
});

export const serviceItemSchema = z.object({
  title: trimmedString.min(2).max(60),
  description: trimmedString.min(10).max(220),
});

export const siteContentSchema = z.object({
  heroBadge: trimmedString.min(3).max(120),
  heroTitle: trimmedString.min(10).max(160),
  heroDescription: trimmedString.min(20).max(320),
  heroPrimaryCta: trimmedString.min(2).max(40),
  heroSecondaryCta: trimmedString.min(2).max(40),
  servicesIntro: trimmedString.min(20).max(260),
  services: z.array(serviceItemSchema).length(4),
  whyChooseUsTitle: trimmedString.min(3).max(120),
  whyChooseUsItems: z.array(trimmedString.min(5).max(140)).min(3).max(6),
  aboutTitle: trimmedString.min(3).max(120),
  aboutDescription: trimmedString.min(20).max(400),
  contactTitle: trimmedString.min(3).max(120),
  contactDescription: trimmedString.min(20).max(240),
  contactEmail: z.string().email(),
  contactPhone: trimmedString.min(6).max(40),
  contactLocation: trimmedString.min(4).max(120),
});

export const contactMessageSchema = z.object({
  name: trimmedString.min(2).max(80),
  email: z.string().email(),
  company: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((value) => value || undefined),
  projectType: trimmedString.min(2).max(80),
  message: trimmedString.min(20).max(1000),
});
