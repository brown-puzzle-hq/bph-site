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
        token.hasBox = user.hasBox;
      }
      if (trigger === "update") {
        if (session?.displayName !== undefined) {
          token.displayName = session.displayName;
        }
        if (session?.role !== undefined) {
          token.role = session.role;
        }
        if (session?.interactionMode !== undefined) {
          token.interactionMode = session.interactionMode;
        }
        if (session?.hasBox !== undefined) {
          token.hasBox = session.hasBox;
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
          hasBox: token.hasBox as boolean,
        };
      }
      return session;
    },
  },
  // adapter: DrizzleAdapter(db),
  providers: [],
} satisfies NextAuthConfig;
