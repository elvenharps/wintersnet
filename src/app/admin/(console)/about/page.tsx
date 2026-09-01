import { getContent } from "@/lib/cms/store";
import { AboutEditor } from "@/components/cms/about-editor";

export default async function AdminAboutPage() {
  const content = await getContent();
  return (
    <>
      <h1 className="serif mb-8 text-3xl font-medium tracking-tight">About</h1>
      <AboutEditor initial={content.about} />
    </>
  );
}
