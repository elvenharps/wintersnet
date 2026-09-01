import { NextResponse } from "next/server";
import { verifyCmsPassword } from "@/lib/cms/password";
import { isCmsConfigured } from "@/lib/cms/session";
import {
  CMS_COOKIE,
  cmsCookieOptions,
  signCmsSession,
} from "@/lib/cms/session";

export async function POST(request: Request) {
  if (!isCmsConfigured()) {
    return NextResponse.json(
      { error: "CMS_PASSWORD and CMS_SECRET must be set." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyCmsPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await signCmsSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CMS_COOKIE, token, cmsCookieOptions());
  return response;
}
