import type { ReactNode } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { getCurrentUser, requireUser } from "@/lib/session";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = requireUser(getCurrentUser());

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="hidden md:block">
        <DashboardNav user={user} activeHref="/dashboard" />
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
