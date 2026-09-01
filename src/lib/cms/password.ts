import { timingSafeEqual } from "node:crypto";
import { isCmsConfigured } from "./session";

export { isCmsConfigured };

export function verifyCmsPassword(password: string): boolean {
  const expected = process.env.CMS_PASSWORD;
  if (!expected) return false;
  const left = Buffer.from(password);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    timingSafeEqual(left, Buffer.alloc(left.length));
    return false;
  }
  return timingSafeEqual(left, right);
}
