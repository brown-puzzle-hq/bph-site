import { type NextAuthConfig } from "next-auth";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { teams } from "@/db/schema";

export const authConfig = {
  session: { strategy: "jwt" },
  // Callbacks are async functions that are called
  // at various points in the authentication flow

  // In order to pass data to the browser,
  // we persist data in the token during the jwt callback
  // and pass the data to the browser in the session callback
  callbacks: {
    // The jwt callback is called whenever a token is created
    // (i.e. at sign-in) or updated (i.e. `useSession`).
    // The returned value is encrypted and stored in a cookie.
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.displayName = user.displayName;
        token.role = user.role;
        token.interactionMode = user.interactionMode;
      }
      if (trigger === "update" && typeof token.id === "string") {
        const team = await db.query.teams.findFirst({
          where: eq(teams.id, token.id),
        });

        if (team) {
          token.displayName = team.displayName;
          token.role = team.role;
          token.interactionMode = team.interactionMode;
        }
      }
      return token;
    },
    // The session callback is called whenever a session
    // is checked. By default, only a subset of the token is
    // returned. You need to explicitly forward values to
    // make it available to the client.
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          displayName: token.displayName as string,
          role: token.role as string,
          interactionMode: token.interactionMode as string,
        };
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
