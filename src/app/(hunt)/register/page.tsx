import { REGISTRATION_START_TIME, REGISTRATION_END_TIME } from "@/hunt.config";
import { RegisterForm } from "./RegisterForm";
import { auth } from "~/server/auth/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Redirect register page to home page if the user is logged in
  let session = await auth();
  if (session?.user?.role && session?.user?.role !== "admin") {
    redirect("/");
  }

  if (new Date() < REGISTRATION_START_TIME) {
    return (
      <div className="flex min-h-[calc(100vh-56px-32px)] grow flex-col items-center justify-center">
        <p>Registration has not started yet.</p>
      </div>
    );
  }

  if (new Date() > REGISTRATION_END_TIME) {
    return (
      <div className="flex min-h-[calc(100vh-56px-32px)] grow flex-col items-center justify-center">
        <p>Registration has ended.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-12 w-full max-w-xl px-4 pt-6">
      <h1 className="mb-6 text-center">Register</h1>
      <RegisterForm />
    </div>
  );
}
