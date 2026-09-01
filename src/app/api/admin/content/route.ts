import { NextResponse } from "next/server";
import { CONTENT_SECTIONS, type ContentSectionKey, type SiteContent } from "@/lib/cms/schema";
import { getContent, patchContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an object." }, { status: 400 });
  }

  const patch: Partial<SiteContent> = {};
  const incoming = body as Partial<SiteContent>;
  for (const key of CONTENT_SECTIONS) {
    if (key in incoming && incoming[key] !== undefined) {
      Object.assign(patch, { [key]: incoming[key] });
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "No recognized sections to save." },
      { status: 400 },
    );
  }

  const content = await patchContent(patch);
  return NextResponse.json({
    ok: true,
    saved: Object.keys(patch) as ContentSectionKey[],
    content,
  });
}
