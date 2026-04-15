import { Schema, model, models } from "mongoose";

const serviceItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const siteContentSchema = new Schema(
  {
    heroBadge: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroDescription: { type: String, required: true },
    heroPrimaryCta: { type: String, required: true },
    heroSecondaryCta: { type: String, required: true },
    servicesIntro: { type: String, required: true },
    services: { type: [serviceItemSchema], required: true },
    whyChooseUsTitle: { type: String, required: true },
    whyChooseUsItems: { type: [String], required: true },
    aboutTitle: { type: String, required: true },
    aboutDescription: { type: String, required: true },
    contactTitle: { type: String, required: true },
    contactDescription: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactLocation: { type: String, required: true },
  },
  { timestamps: true },
);

export const SiteContentModel =
  models.SiteContent || model("SiteContent", siteContentSchema);
