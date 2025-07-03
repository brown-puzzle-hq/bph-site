import { auth } from "~/server/auth/auth";
import { REMOTE } from "~/hunt.config";
import WrapUp from "./WrapUp";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (new Date() > REMOTE.WRAPUP_TIME || session?.user?.role === "admin") {
    return <WrapUp />;
  } else {
    redirect("/");
  }
}
