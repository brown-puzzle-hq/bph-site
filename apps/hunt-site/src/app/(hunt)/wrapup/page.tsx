import { REMOTE } from "@/config/client";
import WrapUp from "./WrapUp";
import { redirect } from "next/navigation";
import { checkPermissions } from "~/lib/server";

export default async function Page() {
  const { error } = await checkPermissions({ level: "admin" });
  if (error && new Date() < REMOTE.WRAPUP_TIME) redirect("/");

  return <WrapUp />;
}
