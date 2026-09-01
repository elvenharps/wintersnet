import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  return (
    <>
      <SiteHeader name={content.site.name} links={content.site.nav} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        left={content.site.footerLeft}
        right={content.site.footerRight}
      />
    </>
  );
}
