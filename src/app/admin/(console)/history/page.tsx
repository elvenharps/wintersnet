import { getContent } from "@/lib/cms/store";
import { HistoryEditor } from "@/components/cms/history-editor";

export default async function AdminHistoryPage() {
  const content = await getContent();
  return (
    <>
      <h1 className="serif mb-8 text-3xl font-medium tracking-tight">
        History
      </h1>
      <HistoryEditor initial={content.history} />
    </>
  );
}
