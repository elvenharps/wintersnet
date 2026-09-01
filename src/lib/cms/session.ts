import { SignJWT, jwtVerify } from "jose";

export const CMS_COOKIE = "wn_cms";
export const CMS_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret(): Uint8Array | null {
  const secret = process.env.CMS_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export function isCmsConfigured(): boolean {
  return Boolean(process.env.CMS_PASSWORD && process.env.CMS_SECRET);
}

export async function signCmsSession(): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("CMS_SECRET is not set");
  return new SignJWT({ cms: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyCmsSession(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.cms === true;
  } catch {
    return false;
  }
}

export function cmsCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: CMS_COOKIE_MAX_AGE,
  };
}
