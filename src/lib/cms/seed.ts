import type { SiteContent } from "./schema";
import { HISTORY_BODY } from "./seed-history";

const p = (text: string) => `<p>${text}</p>`;

export const SEED_CONTENT: SiteContent = {
  site: {
    name: p("WintersNet"),
    nav: [
      { id: "projects", href: "/projects", label: p("Projects") },
      { id: "history", href: "/history", label: p("History") },
      { id: "minecraft", href: "/minecraft", label: p("Minecraft") },
      { id: "about", href: "/about", label: p("About") },
    ],
    footerLeft: p("© 2003–{{year}} WintersNet. All rights reserved."),
    footerRight: p('Created by <a href="/about">Nathan Scott</a>.'),
    seo: {
      title: "WintersNet",
      description:
        "WintersNet has existed in one form or another since 2003. Created by Nathan Scott.",
      ogDescription:
        "Independent infrastructure and a quiet corner of the internet since 2003.",
    },
  },
  home: {
    eyebrow: p("Pacific Northwest · Est. 2003"),
    title: p("A quiet corner of the internet."),
    intro: p(
      'WintersNet has existed, in one form or another, since early 2003. Founded by <a href="/about">Nathan Scott</a>, who still actively maintains it today.',
    ),
    body: p(
      'These days, WintersNet is my personal corner of the web. It’s home to a detailed, fact-checked <a href="/history">history of MSN Chat</a> — cited by Wikipedia — along with the <a href="/projects">projects</a> I build and maintain, chief among them <a href="https://flutterby.chat" target="_blank" rel="noreferrer">Flutterby Chat</a>, a modern reimagining of the MSN Chat community. Have a look around.',
    ),
    primaryCta: { label: p("Read the MSN Chat history"), href: "/history" },
    secondaryCta: {
      label: p("Join Flutterby Chat"),
      href: "https://flutterby.chat",
    },
    cards: [
      {
        id: "history",
        eyebrow: p("Long-form"),
        title: p("History of MSN Chat"),
        description: p(
          "A detailed, fact-checked history of MSN Chat, from its Comic Chat origins through its final days. Cited by Wikipedia.",
        ),
        href: "/history",
        cta: p("Read the history →"),
        external: false,
        image: "",
      },
      {
        id: "flutterby",
        eyebrow: p("Community"),
        title: p("Flutterby Chat"),
        description: p(
          "A modern, MSN-Chat-style community: works in every modern browser, secure SSL/IRC, no plugins required.",
        ),
        href: "https://flutterby.chat",
        cta: p("Join Flutterby Chat today →"),
        external: true,
        image: "",
      },
      {
        id: "minecraft",
        eyebrow: p("Minecraft"),
        title: p("Family Server"),
        description: p(
          "A quiet 24/7 survival world — live status, staff, house rules, and a BlueMap of the overworld, nether, and the end.",
        ),
        href: "/minecraft",
        cta: p("View the server →"),
        external: false,
        image: "",
      },
    ],
    seo: {
      title: "WintersNet",
      description:
        "WintersNet has existed in one form or another since 2003. Created by Nathan Scott.",
      ogDescription:
        "Independent infrastructure and a quiet corner of the internet since 2003.",
    },
  },
  about: {
    eyebrow: p("About"),
    title: p("Nathan Scott"),
    body: `<p>A messaging and systems engineer by trade, Nathan currently works full time for Microsoft as a Service Engineer and Product Manager for Exchange Online. With over 20 years cumulative experience within Information Services, he uses the wealth of his experience to ensure WintersNet continues to exist.</p>
<p>Nathan can be contacted via e-mail at <a href="mailto:nathan@wintersnet.net">nathan@wintersnet.net</a>, or via <a href="https://flutterby.chat" target="_blank" rel="noreferrer">Flutterby Chat</a>, the spiritual successor to MSN Chat.</p>`,
    image: "",
    seo: {
      title: "About",
      description: "About Nathan Scott, who created WintersNet in 2003.",
      ogDescription: "About Nathan Scott, who created WintersNet in 2003.",
    },
  },
  projects: {
    eyebrow: p("Active projects"),
    title: p("What I’m building"),
    subtitle: p("Side projects that keep the lights on at WintersNet."),
    items: [
      {
        id: "flutterby",
        name: p("Flutterby Chat"),
        tagline: p("MSN Chat, reborn."),
        href: "https://flutterby.chat",
        description: p(
          "A free, modern reimplementation of MSN Chat (chat.msn.com) running on the original 1998 IRCx protocol. Browse rooms by category and chat in your browser — no plugins, no Java, no nostalgia tax. Power users can also point any IRC client at irc.flutterby.chat over SSL.",
        ),
        features: `<ul>
<li>Browser-native — works in every modern browser</li>
<li>Original IRCx (Microsoft's 1998 IRC extension) on the back end</li>
<li>Secure IRC over SSL for traditional clients (irc.flutterby.chat:6697)</li>
<li>Browse rooms by category, just like the old days</li>
<li>Free, open, and ad-free</li>
</ul>`,
        cta: p("Visit flutterby.chat →"),
        image: "",
      },
      {
        id: "evaluate",
        name: p("Evaluate My Portfolio"),
        tagline: p("AI-powered investment analysis."),
        href: "https://evaluatemyportfolio.net",
        description: p(
          "Connect your brokerage or upload a CSV, and get a deep, AI-driven read on your portfolio: risk metrics, growth projections, benchmark comparison, ETF X-ray, and personalized recommendations — delivered as an actionable report.",
        ),
        features: `<ul>
<li>Risk metrics: Sharpe, Sortino, VaR, Beta, Alpha</li>
<li>Benchmark comparison vs. S&amp;P 500 and Nasdaq 100</li>
<li>30-year growth projections + dividend income projector</li>
<li>ETF X-Ray — see what you actually own under the hood</li>
<li>Brokerage integration (Fidelity, Vanguard, Chase) or CSV upload</li>
<li>What-if trade simulator, weekly digest emails, downloadable PDF report</li>
</ul>`,
        cta: p("Visit evaluatemyportfolio.net →"),
        image: "",
      },
    ],
    seo: {
      title: "Projects",
      description:
        "Active projects by Nathan Scott — Flutterby Chat (the spiritual successor to MSN Chat) and Evaluate My Portfolio (AI-powered investment analysis).",
      ogDescription:
        "Active projects by Nathan Scott — Flutterby Chat (the spiritual successor to MSN Chat) and Evaluate My Portfolio (AI-powered investment analysis).",
    },
  },
  history: {
    bannerHtml: p(
      "<strong>New — Flutterby Chat:</strong> the spiritual successor to MSN Chat. Modern, browser-native, no plugins. Secure IRC over SSL. Open to everyone.",
    ),
    bannerCta: {
      label: p("Join Flutterby Chat"),
      href: "https://flutterby.chat",
    },
    eyebrow: p("Long-form · Archival"),
    title: p("History of MSN Chat"),
    subtitle: p("A reference point for the years to come."),
    body: HISTORY_BODY,
    publishedIso: "2013-01-01T00:00:00.000Z",
    modifiedIso: "2026-06-19T00:00:00.000Z",
    seo: {
      title: "History of MSN Chat",
      description:
        "A detailed, fact-checked history of MSN Chat — from its 1996 Comic Chat origins, through Web Chat and the GateKeeper era, to its 2008 shutdown.",
      ogDescription:
        "A detailed, fact-checked history of MSN Chat — from its 1996 Comic Chat origins, through Web Chat and the GateKeeper era, to its 2008 shutdown.",
    },
  },
  minecraft: {
    eyebrow: p("Minecraft"),
    title: p("WintersNet Family Server"),
    subtitle: p("A quiet 24/7 survival world — open to anyone who plays nice."),
    joinHtml: `<h2>How to join</h2>
<p>Add <code>minecraft.wintersnet.net</code> as a Java Edition server. No whitelist for now — just connect and say hello.</p>`,
    mapCta: {
      label: p("Open the live map"),
      href: "https://map.wintersnet.net",
    },
    mapNote: p(
      "BlueMap covers the overworld, nether, and the end — useful for finding your way home or showing friends around.",
    ),
    staffHeading: p("Staff"),
    staffIntro: p(
      "A short roster. Ping either of us in-game if something needs sorting out.",
    ),
    staff: [
      { id: "nathan", name: p("Nathan Scott"), role: p("Administrator") },
      { id: "emily", name: p("Emily Scott"), role: p("Administrator") },
    ],
    rulesHeading: p("House rules"),
    rulesIntro: p("The usual stuff, kept short."),
    rules: [
      {
        id: "rule-1",
        html: p(
          "Be kind. This is a family server — treat people the way you’d want to be treated.",
        ),
      },
      {
        id: "rule-2",
        html: p(
          "Don’t steal or grief. Other players’ builds and belongings stay theirs.",
        ),
      },
      {
        id: "rule-3",
        html: p(
          "Keep it family-friendly. No harassment, hate, or inappropriate content.",
        ),
      },
      {
        id: "rule-4",
        html: p("Ask before big changes near someone else’s base."),
      },
    ],
    seo: {
      title: "Minecraft",
      description:
        "The WintersNet Family Minecraft server — a quiet 24/7 survival world. Join at minecraft.wintersnet.net and explore the live map.",
      ogDescription:
        "The WintersNet Family Minecraft server — a quiet 24/7 survival world. Join at minecraft.wintersnet.net and explore the live map.",
    },
  },
};
