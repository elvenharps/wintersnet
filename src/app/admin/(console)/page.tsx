import Link from "next/link";

const SECTIONS = [
  {
    href: "/admin/site",
    title: "Site",
    body: "Name, navigation, footer, and default SEO.",
  },
  {
    href: "/admin/home",
    title: "Home",
    body: "Hero copy, body, buttons, and cards.",
  },
  {
    href: "/admin/about",
    title: "About",
    body: "Biography and optional portrait.",
  },
  {
    href: "/admin/projects",
    title: "Projects",
    body: "Project list, descriptions, features, and images.",
  },
  {
    href: "/admin/history",
    title: "History",
    body: "The MSN Chat article, banner, and dates.",
  },
  {
    href: "/admin/minecraft",
    title: "Minecraft",
    body: "Join info, staff roster, and house rules.",
  },
] as const;

export default function AdminOverviewPage() {
  return (
    <>
      <h1 className="serif text-3xl font-medium tracking-tight">Content</h1>
      <p className="mt-2 text-[var(--muted)]">
        Edit any section. Changes go live as soon as you save.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 no-underline transition hover:border-[var(--accent)] hover:shadow-md"
            >
              <h2 className="serif text-xl font-medium text-[var(--foreground)]">
                {section.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{section.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
