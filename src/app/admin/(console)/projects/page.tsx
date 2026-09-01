import { getContent } from "@/lib/cms/store";
import { ProjectsEditor } from "@/components/cms/projects-editor";

export default async function AdminProjectsPage() {
  const content = await getContent();
  return (
    <>
      <h1 className="serif mb-8 text-3xl font-medium tracking-tight">
        Projects
      </h1>
      <ProjectsEditor initial={content.projects} />
    </>
  );
}
