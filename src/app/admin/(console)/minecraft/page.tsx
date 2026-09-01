import { getContent } from "@/lib/cms/store";
import { MinecraftEditor } from "@/components/cms/minecraft-editor";

export default async function AdminMinecraftPage() {
  const content = await getContent();
  return (
    <>
      <h1 className="serif mb-8 text-3xl font-medium tracking-tight">
        Minecraft
      </h1>
      <MinecraftEditor initial={content.minecraft} />
    </>
  );
}
