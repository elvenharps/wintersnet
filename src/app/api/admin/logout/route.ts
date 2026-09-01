import { NextResponse } from "next/server";
import { CMS_COOKIE } from "@/lib/cms/session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CMS_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
