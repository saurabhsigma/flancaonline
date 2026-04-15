import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(
  file: Buffer,
  filename: string,
  folder = "flanca/projects",
) {
  const base64 = `data:image/${filename.split(".").pop() ?? "png"};base64,${file.toString("base64")}`;

  return cloudinary.uploader.upload(base64, {
    folder,
    public_id: filename.replace(/\.[^.]+$/, ""),
    resource_type: "image",
    // Let Cloudinary deliver the most efficient format and quality per device.
    transformation: [
      { fetch_format: "auto" },
      { quality: "auto:good" },
      { width: 1600, crop: "limit" },
    ],
  });
}
