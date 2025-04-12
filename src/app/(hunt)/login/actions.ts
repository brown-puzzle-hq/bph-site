"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { sendBotMessage } from "~/lib/comms";
import { ensureError } from "~/lib/utils";

export async function login(id: string, password: string) {
  try {
    const session = await signIn("credentials", {
      id,
      password,
      redirect: false,
    });
    return { error: null, session };
  } catch (e) {
    const error = ensureError(e);
    if (error instanceof AuthError) {
      return { error: "Username or password is incorrect" };
    } else {
      sendBotMessage(`Login for ${id} failed: ${error.message}`, "dev");
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
