import type { Metadata } from "next";
import { AdminChrome } from "@/components/cms/admin-chrome";

export const metadata: Metadata = {
  title: { absolute: "CMS · WintersNet" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminChrome>{children}</AdminChrome>;
}
