import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { IN_PERSON, REMOTE } from "@/hunt.config";

export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // Allow admins to access all pages
  if (req.auth?.user?.role === "admin") {
    return;
  }

  // Protect admin pages from non-admin users
  if (
    req.auth?.user?.role !== "admin" &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    const newUrl = new URL("./", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Protect puzzle pages.
  // This only matches on /puzzle/puzzleId, not /puzzle/puzzleId/solution
  // or /puzzle/puzzleId/hint
  if (req.nextUrl.pathname.match(/^\/puzzle\/[^\/]+\/$/)) {
    // Unauthenticated users
    if (!req.auth?.user?.id) {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }

    // Before the hunt starts
    if (
      new Date() <
      (req.auth?.user?.interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME)
    ) {
      const newUrl = new URL("/puzzle", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
