"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function login(id: string, password: string) {
  try {
    const session = await signIn("credentials", { id, password, redirect: false });
    return { error: null, session };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Username or password is incorrect" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
}

export async function logout() {
  await signOut();
}
