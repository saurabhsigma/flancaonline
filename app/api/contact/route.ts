import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { contactMessageSchema } from "@/lib/validators";
import { ContactMessageModel } from "@/models/contact-message";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactMessageSchema.parse(body);

    await connectToDatabase();
    await ContactMessageModel.create(validatedData);

    return NextResponse.json({ message: "Message saved successfully." }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save your message right now.";

    return NextResponse.json({ message }, { status: 400 });
  }
}
