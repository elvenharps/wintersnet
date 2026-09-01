import { getContent } from "@/lib/cms/store";
import { HomeEditor } from "@/components/cms/home-editor";

export default async function AdminHomePage() {
  const content = await getContent();
  return (
    <>
      <h1 className="serif mb-8 text-3xl font-medium tracking-tight">Home</h1>
      <HomeEditor initial={content.home} />
    </>
  );
}
