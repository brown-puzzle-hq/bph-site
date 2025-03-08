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

  // Check if slug is a valid id
  const { slug } = await params;
  const team = await db.query.teams.findFirst({
    where: eq(teams.id, slug),
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
    <div className="mx-auto mb-12 w-full max-w-xl px-4 pt-6">
      <h1 className="w-full truncate text-ellipsis px-4 text-center">
        Welcome, {team.displayName}!
      </h1>
      <p className="mb-6 text-center">
        {team.id} • {team.interactionMode}
      </p>
      <ProfileForm
        id={slug}
        displayName={team.displayName}
        role={team.role}
        memberString={team.members}
        interactionMode={team.interactionMode}
        numCommunity={team.numCommunity}
        phoneNumber={team.phoneNumber}
        roomNeeded={team.roomNeeded}
        solvingLocation={team.solvingLocation}
        wantsBox={team.wantsBox}
        hasBox={team.hasBox}
      />
    </div>
  );
}
