import { LoginForm } from "./LoginForm";
import { checkPermissions } from "~/lib/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { error } = await checkPermissions({ level: "userAny" });
  if (!error) {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-56px-32px)] grow flex-col items-center justify-center">
      <h1 className="mb-2">Login</h1>
      <LoginForm />
    </div>
  );
}
