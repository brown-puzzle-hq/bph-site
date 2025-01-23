"use server";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
  await signOut();
  revalidatePath("/");
  redirect("/login");
}
