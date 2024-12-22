import { Separator } from "~/components/ui/separator";
import { ProfileForm } from "../team-page/ProfileForm";
import { SidebarNav } from "../team-page/SidebarNav";
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
    with: {
      members: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
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
      href: `/teams/${slug}`,
    },
    // {
    //   title: "Members",
    //   href: "/examples/forms/account",
    // },
    // {
    //   title: "Appearance",
    //   href: "/examples/forms/appearance",
    // },
    // {
    //   title: "Notifications",
    //   href: "/examples/forms/notifications",
    // },
    // {
    //   title: "Display",
    //   href: "/examples/forms/display",
    // },
  ];

  // return <DefaultTeamPage username={slug} />;
  return (
    <div className="grow flex-col space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col items-center pb-6">
        <h1 className="">Welcome, {team.displayName}!</h1>
        <p>
          {team.username} • {team.interactionMode}
        </p>
      </div>
      <div className="flex flex-col space-y-8 p-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-[80vh]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-muted-foreground text-sm">
                This is how others will see you on the site.
              </p>
            </div>
            <Separator />
            <ProfileForm
              teamId={slug}
              displayName={team.displayName}
              interactionMode={team.interactionMode}
              role={team.role}
              members={team.members}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
