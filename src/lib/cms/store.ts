import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { revalidatePath } from "next/cache";
import { SEED_CONTENT } from "./seed";
import { getContentPath, getDataDir, getUploadsDir } from "./paths";
import type {
  AboutSection,
  ContentSectionKey,
  HistorySection,
  HomeSection,
  MinecraftSection,
  ProjectsSection,
  SiteContent,
  SiteSection,
} from "./schema";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hydrateSeo(
  fallback: SiteContent["site"]["seo"],
  value: unknown,
): SiteContent["site"]["seo"] {
  if (!isRecord(value)) return fallback;
  return {
    title: typeof value.title === "string" ? value.title : fallback.title,
    description:
      typeof value.description === "string"
        ? value.description
        : fallback.description,
    ogDescription:
      typeof value.ogDescription === "string"
        ? value.ogDescription
        : fallback.ogDescription,
  };
}

function hydrateCta(
  fallback: { label: string; href: string },
  value: unknown,
): { label: string; href: string } {
  if (!isRecord(value)) return fallback;
  return {
    label: typeof value.label === "string" ? value.label : fallback.label,
    href: typeof value.href === "string" ? value.href : fallback.href,
  };
}

function hydrateSite(value: unknown): SiteSection {
  const fallback = SEED_CONTENT.site;
  if (!isRecord(value)) return fallback;
  return {
    ...fallback,
    ...value,
    name: typeof value.name === "string" ? value.name : fallback.name,
    footerLeft:
      typeof value.footerLeft === "string"
        ? value.footerLeft
        : fallback.footerLeft,
    footerRight:
      typeof value.footerRight === "string"
        ? value.footerRight
        : fallback.footerRight,
    nav: Array.isArray(value.nav) ? (value.nav as SiteSection["nav"]) : fallback.nav,
    seo: hydrateSeo(fallback.seo, value.seo),
  };
}

function hydrateHome(value: unknown): HomeSection {
  const fallback = SEED_CONTENT.home;
  if (!isRecord(value)) return fallback;
  return {
    ...fallback,
    ...value,
    primaryCta: hydrateCta(fallback.primaryCta, value.primaryCta),
    secondaryCta: hydrateCta(fallback.secondaryCta, value.secondaryCta),
    cards: Array.isArray(value.cards)
      ? (value.cards as HomeSection["cards"])
      : fallback.cards,
    seo: hydrateSeo(fallback.seo, value.seo),
  };
}

function hydrateAbout(value: unknown): AboutSection {
  const fallback = SEED_CONTENT.about;
  if (!isRecord(value)) return fallback;
  return {
    ...fallback,
    ...value,
    seo: hydrateSeo(fallback.seo, value.seo),
  };
}

function hydrateProjects(value: unknown): ProjectsSection {
  const fallback = SEED_CONTENT.projects;
  if (!isRecord(value)) return fallback;
  return {
    ...fallback,
    ...value,
    items: Array.isArray(value.items)
      ? (value.items as ProjectsSection["items"])
      : fallback.items,
    seo: hydrateSeo(fallback.seo, value.seo),
  };
}

function hydrateHistory(value: unknown): HistorySection {
  const fallback = SEED_CONTENT.history;
  if (!isRecord(value)) return fallback;
  return {
    ...fallback,
    ...value,
    bannerCta: hydrateCta(fallback.bannerCta, value.bannerCta),
    seo: hydrateSeo(fallback.seo, value.seo),
  };
}

function hydrateMinecraft(value: unknown): MinecraftSection {
  const fallback = SEED_CONTENT.minecraft;
  if (!isRecord(value)) return fallback;
  return {
    ...fallback,
    ...value,
    mapCta: hydrateCta(fallback.mapCta, value.mapCta),
    staff: Array.isArray(value.staff)
      ? (value.staff as MinecraftSection["staff"])
      : fallback.staff,
    rules: Array.isArray(value.rules)
      ? (value.rules as MinecraftSection["rules"])
      : fallback.rules,
    seo: hydrateSeo(fallback.seo, value.seo),
  };
}

export function hydrateContent(parsed: unknown): SiteContent {
  const p = isRecord(parsed) ? parsed : {};
  return {
    site: hydrateSite(p.site),
    home: hydrateHome(p.home),
    about: hydrateAbout(p.about),
    projects: hydrateProjects(p.projects),
    history: hydrateHistory(p.history),
    minecraft: hydrateMinecraft(p.minecraft),
  };
}

async function ensureDataDirs(): Promise<void> {
  await mkdir(getDataDir(), { recursive: true });
  await mkdir(getUploadsDir(), { recursive: true });
}

export async function getContent(): Promise<SiteContent> {
  await ensureDataDirs();
  const file = getContentPath();
  try {
    const raw = await readFile(file, "utf8");
    return hydrateContent(JSON.parse(raw) as unknown);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") {
      console.error("Failed to read CMS content, falling back to seed:", error);
    }
    await writeFile(file, `${JSON.stringify(SEED_CONTENT, null, 2)}\n`, "utf8");
    return structuredClone(SEED_CONTENT);
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  await ensureDataDirs();
  const file = getContentPath();
  const tmp = `${file}.${process.pid}.tmp`;
  const body = `${JSON.stringify(content, null, 2)}\n`;
  await writeFile(tmp, body, "utf8");
  await rename(tmp, file);
}

export async function patchContent(
  patch: Partial<SiteContent>,
): Promise<SiteContent> {
  const current = await getContent();
  const next: SiteContent = {
    site: patch.site ?? current.site,
    home: patch.home ?? current.home,
    about: patch.about ?? current.about,
    projects: patch.projects ?? current.projects,
    history: patch.history ?? current.history,
    minecraft: patch.minecraft ?? current.minecraft,
  };
  await saveContent(next);
  await revalidateCms(Object.keys(patch) as ContentSectionKey[]);
  return next;
}

const SECTION_PATHS: Record<ContentSectionKey, string[]> = {
  site: ["/", "/about", "/projects", "/history", "/minecraft"],
  home: ["/"],
  about: ["/about"],
  projects: ["/projects"],
  history: ["/history"],
  minecraft: ["/minecraft"],
};

export async function revalidateCms(sections: ContentSectionKey[]): Promise<void> {
  revalidatePath("/", "layout");
  const paths = new Set<string>(["/"]);
  for (const section of sections) {
    for (const route of SECTION_PATHS[section] ?? []) {
      paths.add(route);
    }
  }
  for (const route of paths) {
    revalidatePath(route);
  }
}
