import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function getAuthSession() {
  return getServerSession(authOptions);
}

export async function requireAdminSession() {
  const session = await getAuthSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session;
}
