import ProfileForm from "./ProfileForm";
import { auth } from "@/auth";
import { db } from "@/db/index";
import { teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { checkPermissions } from "~/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: teamId } = await params;

  const { error } = await checkPermissions({
    level: "userExact",
    teamId,
  });
  if (error === "Not authenticated.") redirect("/login");
  if (error === "Not authorized.") notFound();

  // Check if slug is a valid id
  const team = await db.query.teams.findFirst({
    columns: {
      displayName: true,
      primaryEmail: true,
      role: true,
      members: true,
      interactionMode: true,
    },
    where: eq(teams.id, teamId),
  });

  if (!team) notFound();

  return (
    <div className="mx-auto mb-12 w-full max-w-xl px-4 pt-6">
      <ProfileForm id={teamId} initialProperties={team} />
    </div>
  );
}
