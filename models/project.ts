import { Schema, model, models } from "mongoose";

import { slugify } from "@/lib/utils";

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    techStack: [{ type: String, required: true }],
    images: [imageSchema],
    liveLink: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

projectSchema.pre("validate", function updateSlug(next) {
  if (this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

export const ProjectModel = models.Project || model("Project", projectSchema);
