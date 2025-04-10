import { auth } from "@/auth";

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
  // This matches on /puzzle/puzzleId and /puzzle/puzzleId/solution
  // but not on /puzzle
  // if (req.nextUrl.pathname.match(/^\/puzzle\/.+/)) {
  //   if (new Date() < IN_PERSON.START_TIME) {
  //     const newUrl = new URL("./puzzle", req.nextUrl.origin);
  //     return Response.redirect(newUrl);
  //   }
  // }
});

// WARNING: middleware currently only matches on admin paths
export const config = {
  matcher: ["/admin/:path*"],
};
