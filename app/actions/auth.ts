"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithPin(pin: string) {

  if (pin !== process.env.APP_PASSWORD) {
    redirect("/login?error=invalid");
  }

  const cookieStore = await cookies();

  cookieStore.set("app-auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: "/",
  });

  redirect("/");
}