import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { requireAdminSession } from "@/lib/session";
import { siteContentSchema } from "@/lib/validators";
import { SiteContentModel } from "@/models/site-content";

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();

    const body = await request.json();
    const validatedData = siteContentSchema.parse(body);

    await connectToDatabase();

    const existing = await SiteContentModel.findOne();
    const content = existing
      ? await SiteContentModel.findByIdAndUpdate(existing._id, validatedData, {
          new: true,
          runValidators: true,
        })
      : await SiteContentModel.create(validatedData);

    return NextResponse.json({ content: content?.toObject?.() ?? content });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update site content.";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message }, { status });
  }
}
