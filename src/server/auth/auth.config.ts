import { type NextAuthConfig } from "next-auth";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 */
export const authConfig = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.displayName = user.displayName;
        token.role = user.role;
        token.interactionMode = user.interactionMode;
      }
      if (trigger === "update") {
        if (session?.displayName) {
          token.displayName = session.displayName;
        }
        if (session?.role) {
          token.role = session.role;
        }
        if (session?.interactionMode) {
          token.interactionMode = session.interactionMode;
        }
      }
      return token;
    },
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
  // adapter: DrizzleAdapter(db),
  providers: [],
} satisfies NextAuthConfig;
