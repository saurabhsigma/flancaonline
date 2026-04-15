import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { requireAdminSession } from "@/lib/session";
import { projectSchema } from "@/lib/validators";
import { ProjectModel } from "@/models/project";

type Context = {
  params: { id: string };
};

export async function PATCH(request: Request, context: Context) {
  try {
    await requireAdminSession();

    const { id } = context.params;
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    await connectToDatabase();
    const project = await ProjectModel.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ project: project.toObject() });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update project.";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireAdminSession();

    const { id } = context.params;
    await connectToDatabase();
    const project = await ProjectModel.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully." });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete project.";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message }, { status });
  }
}
