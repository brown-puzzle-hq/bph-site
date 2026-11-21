import { redirect } from "next/navigation";

/**
 * Obscures which routes are valid puzzle routes by redirecting all /puzzle/* routes to /puzzle.
 */
export default function CatchAll() {
  redirect("/puzzle");
}
