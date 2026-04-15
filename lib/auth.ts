import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@/lib/constants";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";

type AdminUserRecord = {
  _id: Types.ObjectId;
  username: string;
  passwordHash: string;
  role: string;
};

async function ensureAdminUser() {
  await connectToDatabase();

  const existingUser = await UserModel.findOne({ username: ADMIN_USERNAME });
  if (existingUser) {
    return existingUser;
  }

  // Seed the default admin account once so the dashboard can be used
  // immediately after setup without a separate bootstrap step.
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  return UserModel.create({
    username: ADMIN_USERNAME,
    passwordHash,
    role: "admin",
  });
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Username and password are required.");
        }

        await ensureAdminUser();

        const user = (await UserModel.findOne({
          username: credentials.username,
        }).lean()) as AdminUserRecord | null;
        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!isValidPassword) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
