import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { requireAdminSession } from "@/lib/session";
import { projectSchema } from "@/lib/validators";
import { ProjectModel } from "@/models/project";

export async function POST(request: Request) {
  try {
    await requireAdminSession();

    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    await connectToDatabase();
    const project = await ProjectModel.create(validatedData);

    return NextResponse.json({ project: project.toObject() }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create project.";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message }, { status });
  }
}
