import { initials, type User } from "@/lib/session";

export interface NavItem {
  label: string;
  href: string;
}

export interface DashboardNavProps {
  user: User;
  items?: NavItem[];
  activeHref?: string;
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Billing", href: "/dashboard/billing" },
  { label: "Settings", href: "/dashboard/settings" },
];

/** Sidebar/top navigation for the authenticated dashboard shell. */
export function DashboardNav({
  user,
  items = DEFAULT_NAV_ITEMS,
  activeHref = "/dashboard",
}: DashboardNavProps) {
  return (
    <nav
      aria-label="Dashboard"
      className="flex h-full flex-col gap-6 border-r border-slate-200 bg-slate-50 p-4"
    >
      <a href="/" className="text-lg font-bold tracking-tight text-brand-700">
        SaaS Starter
      </a>

      <ul className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "block rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-brand-100 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
        >
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">
            {user.name}
          </p>
          <p className="truncate text-xs text-slate-500">{user.email}</p>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
