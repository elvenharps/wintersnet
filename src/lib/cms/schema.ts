export type SeoFields = {
  title: string;
  description: string;
  ogDescription: string;
};

export type NavItem = {
  id: string;
  href: string;
  label: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type HomeCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external: boolean;
  image: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  tagline: string;
  href: string;
  description: string;
  features: string;
  cta: string;
  image: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
};

export type RuleItem = {
  id: string;
  html: string;
};

export type SiteSection = {
  name: string;
  nav: NavItem[];
  footerLeft: string;
  footerRight: string;
  seo: SeoFields;
};

export type HomeSection = {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  cards: HomeCard[];
  seo: SeoFields;
};

export type AboutSection = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  seo: SeoFields;
};

export type ProjectsSection = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ProjectItem[];
  seo: SeoFields;
};

export type HistorySection = {
  bannerHtml: string;
  bannerCta: Cta;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  publishedIso: string;
  modifiedIso: string;
  seo: SeoFields;
};

export type MinecraftSection = {
  eyebrow: string;
  title: string;
  subtitle: string;
  joinHtml: string;
  mapCta: Cta;
  mapNote: string;
  staffHeading: string;
  staffIntro: string;
  staff: StaffMember[];
  rulesHeading: string;
  rulesIntro: string;
  rules: RuleItem[];
  seo: SeoFields;
};

export type SiteContent = {
  site: SiteSection;
  home: HomeSection;
  about: AboutSection;
  projects: ProjectsSection;
  history: HistorySection;
  minecraft: MinecraftSection;
};

export const CONTENT_SECTIONS = [
  "site",
  "home",
  "about",
  "projects",
  "history",
  "minecraft",
] as const;

export type ContentSectionKey = (typeof CONTENT_SECTIONS)[number];
