import { sanitizeCmsHtml } from "@/lib/cms/sanitize";
import { unwrapBlocks } from "@/lib/cms/html";

type Props = {
  html: string;
  className?: string;
  inline?: boolean;
};

export function cmsInnerHtml(html: string, inline = false): string {
  const clean = sanitizeCmsHtml(html);
  return inline ? unwrapBlocks(clean) : clean;
}

export function CmsHtml({ html, className, inline }: Props) {
  const inner = cmsInnerHtml(html, inline);
  if (!inner) return null;
  if (inline) {
    return (
      <span className={className} dangerouslySetInnerHTML={{ __html: inner }} />
    );
  }
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: inner }} />
  );
}
