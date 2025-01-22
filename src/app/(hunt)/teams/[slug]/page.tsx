import { ProfileForm } from "../team-page/ProfileForm";
import { auth } from "~/server/auth/auth";
import { db } from "@/db/index";
import { teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import Toast from "../team-page/Toast";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Authentication
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Check if slug is a valid username
  const { slug } = await params;
  const team = await db.query.teams.findFirst({
    where: eq(teams.username, slug),
  });

  if (
    !team ||
    (team.id != session.user.id && !(session.user.role === "admin"))
  ) {
    return (
      <Toast
        title={"Team not found"}
        description={`No team with username ${slug} was found.`}
      />
    );
  }

  return (
    <div className="mb-6 flex w-2/3 min-w-36 grow flex-col">
      <div className="flex flex-col items-center pb-6">
        <h1 className="">Welcome, {team.displayName}!</h1>
        <p>
          {team.username} • {team.interactionMode}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <ProfileForm
          username={slug}
          displayName={team.displayName}
          role={team.role}
          memberString={team.members}
          interactionMode={team.interactionMode}
          numCommunity={team.numCommunity}
          phoneNumber={team.phoneNumber}
          roomNeeded={team.roomNeeded}
          solvingLocation={team.solvingLocation}
          remoteBox={team.remoteBox}
        />
      </div>
    </div>
  );
}
