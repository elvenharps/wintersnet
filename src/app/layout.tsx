import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getContent } from "@/lib/cms/store";
import { stripHtml } from "@/lib/cms/html";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const name = stripHtml(content.site.name) || "WintersNet";
  return {
    metadataBase: new URL("https://www.wintersnet.net"),
    title: {
      default: content.site.seo.title,
      template: `%s · ${name}`,
    },
    description: content.site.seo.description,
    openGraph: {
      title: content.site.seo.title,
      description: content.site.seo.ogDescription || content.site.seo.description,
      url: "https://www.wintersnet.net",
      siteName: name,
      type: "website",
    },
  };
}

const themeInit = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="atmosphere" aria-hidden="true" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
