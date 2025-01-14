import { Separator } from "~/components/ui/separator";
import { ProfileForm } from "../team-page/ProfileForm";
import { auth } from "~/server/auth/auth";
import { db } from "@/db/index";
import { teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import Toast from "../team-page/Toast";
import DefaultTeamPage from "../team-page/DefaultTeamPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Authentication
  const session = await auth();
  if (!session?.user?.id) {
    return <p>Not authenticated.</p>;
  }

  // Check if slug is a valid username
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

  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/teams/${slug}#profile`,
    },
    {
      title: "Members",
      href: `/teams/${slug}#members`,
    },
    {
      title: "Notifications",
      href: `/teams/${slug}#notifications`,
    },
  ];

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
          interactionMode={team.interactionMode}

          numCommunity={team.numCommunity}
          phoneNumber={team.phoneNumber}
          roomNeeded={team.roomNeeded}
          solvingLocation={team.solvingLocation}

          memberString={team.members}
        />
      </div>
    </div>
  );
}
