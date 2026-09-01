import { getContent } from "@/lib/cms/store";
import { SiteEditor } from "@/components/cms/site-editor";

export default async function AdminSitePage() {
  const content = await getContent();
  return (
    <>
      <h1 className="serif mb-8 text-3xl font-medium tracking-tight">Site</h1>
      <SiteEditor initial={content.site} />
    </>
  );
}
