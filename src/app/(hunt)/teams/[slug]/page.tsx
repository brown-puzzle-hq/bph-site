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
    <div className="mb-6 flex w-2/3 min-w-36 grow flex-col pt-6">
      <div className="flex flex-col items-center pb-6">
        <h1 className="w-full truncate text-ellipsis px-4 text-center">
          Welcome, {team.displayName}!
        </h1>
        <p>
          {team.id} • {team.interactionMode}
        </p>
      </div>
      <div className="flex flex-col items-center">
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
        />
      </div>
    </div>
  );
}
