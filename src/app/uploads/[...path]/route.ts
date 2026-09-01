import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getUploadsDir } from "@/lib/cms/paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  if (!segments?.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const uploads = getUploadsDir();
  const filename = path.basename(segments.join("/"));
  const filePath = path.join(uploads, filename);
  if (!filePath.startsWith(uploads)) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    const ext = path.extname(filename).toLowerCase();
    const type = TYPES[ext];
    if (!type) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    const data = await readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
