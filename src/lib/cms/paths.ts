import path from "node:path";

export function getDataDir(): string {
  return process.env.DATA_DIR || path.join(process.cwd(), "data");
}

export function getContentPath(): string {
  return path.join(getDataDir(), "content.json");
}

export function getUploadsDir(): string {
  return path.join(getDataDir(), "uploads");
}
