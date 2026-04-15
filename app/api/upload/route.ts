import { NextResponse } from "next/server";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { requireAdminSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "File is required." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uploadResult = await uploadImageToCloudinary(
      Buffer.from(arrayBuffer),
      file.name,
    );

    return NextResponse.json({
      image: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        alt: file.name.replace(/\.[^.]+$/, ""),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Image upload failed.";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message }, { status });
  }
}
