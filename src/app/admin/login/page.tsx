import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/cms/login-form";
import { isCmsConfigured } from "@/lib/cms/session";

export const metadata: Metadata = {
  title: { absolute: "Sign in · CMS" },
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
        WintersNet
      </p>
      <h1 className="serif mt-3 text-3xl font-medium tracking-tight">
        Sign in to the CMS
      </h1>
      <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <Suspense>
          <LoginForm configured={isCmsConfigured()} />
        </Suspense>
      </div>
    </div>
  );
}
