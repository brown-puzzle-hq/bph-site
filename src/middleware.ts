import { auth } from "@/auth";
import { IN_PERSON, REMOTE } from "./hunt.config";

export default auth(async (req) => {
  // Allow admins to access all pages
  if (req.auth?.user?.role === "admin") {
    return;
  }

  // Protect admin pages from non-admin users
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const newUrl = new URL("./", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // Protect wrapup before hunt end
  if (
    req.nextUrl.pathname.startsWith("/wrapup") &&
    new Date() <
      (req.auth?.user?.interactionMode === "in-person"
        ? IN_PERSON.END_TIME
        : REMOTE.END_TIME)
  ) {
    const newUrl = new URL("./", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// WARNING: middleware currently only matches on admin paths and wrapup
export const config = {
  matcher: ["/admin/:path*", "/wrapup/:path*"],
};
