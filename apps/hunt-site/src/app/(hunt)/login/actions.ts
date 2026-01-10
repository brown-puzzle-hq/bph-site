"use server";

import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { sendBotMessage } from "~/lib/comms";
import { ensureError } from "~/lib/utils";

export async function login(id: string, password: string) {
  try {
    await signIn("credentials", {
      id,
      password,
      redirect: false,
    });
    return { error: null };
  } catch (e) {
    const error = ensureError(e);
    if (error instanceof CredentialsSignin) {
      return { error: "Username or password is incorrect" };
    } else {
      sendBotMessage(
        `🐛 Login for ${id} failed: ${error.message} <@&1287563929282678795>`,
        "dev",
      );
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
