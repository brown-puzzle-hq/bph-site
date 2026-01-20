import ProfileForm from "./ProfileForm";
import { auth } from "@/auth";
import { db } from "@/db/index";
import { teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

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
    columns: {
      displayName: true,
      role: true,
      members: true,
      interactionMode: true,
    },
    where: eq(teams.id, slug),
  });

  if (!team || (slug !== session.user.id && session.user.role !== "admin")) {
    notFound();
  }

  return (
    <div className="mx-auto mb-12 w-full max-w-xl px-4 pt-6">
      <ProfileForm id={slug} initialProperties={team} />
    </div>
  );
}
