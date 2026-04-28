import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { contactMessageSchema } from "@/lib/validators";
import { ContactMessageModel } from "@/models/contact-message";

function isDatabaseUnavailable(error: unknown) {
  return error instanceof Error && /ECONNREFUSED|MongooseServerSelectionError/i.test(error.message);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactMessageSchema.parse(body);

    await connectToDatabase();
    await ContactMessageModel.create(validatedData);

    return NextResponse.json({ message: "Message saved successfully." }, { status: 201 });
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return NextResponse.json(
        {
          message:
            "Message received. We could not save it locally because the database is offline right now.",
        },
        { status: 202 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Unable to save your message right now.";

    return NextResponse.json({ message }, { status: 400 });
  }
}
