import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

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
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png).*)"],
};
