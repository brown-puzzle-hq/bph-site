import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type DefaultSession } from "next-auth";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { teams } from "~/server/db/schema";
import { object, string } from "zod";
import { compare } from "bcryptjs";

import { authConfig } from "./auth.config";

export const signInSchema = object({
  id: string({ required_error: "Team name is required" }).min(
    1,
    "Team name is required",
  ),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password is required",
  ),
});

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {}
  interface User {
    id?: string | undefined;
    displayName: string;
    role: string;
    interactionMode: string;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // These are the fields to be submitted
      credentials: {
        id: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // Get id and password
          if (!credentials?.id || !credentials?.password) return null;
          const { id, password } = await signInSchema.parseAsync(credentials);

          // Get user
          const user = await db.query.teams.findFirst({
            where: eq(teams.id, id.toLowerCase()),
          });
          if (!user) return null;

          // Check if credentials are valid
          const validCredentials = await compare(password, user.password);
          if (!validCredentials) return null;

          return {
            id: user.id,
            displayName: user.displayName,
            role: user.role,
            interactionMode: user.interactionMode,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
});
