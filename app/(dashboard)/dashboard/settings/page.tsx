import {
  canDeleteWorkspace,
  canInviteMembers,
  getCurrentUser,
  requireUser,
} from "@/lib/session";

export default function SettingsPage() {
  const user = requireUser(getCurrentUser());

  const fields = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    {
      label: "Member since",
      value: new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your profile and workspace preferences.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Profile
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-xs uppercase tracking-wide text-slate-400">
                {field.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Permissions
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>
            {canInviteMembers(user) ? "✅" : "🚫"} Invite team members
          </li>
          <li>
            {canDeleteWorkspace(user) ? "✅" : "🚫"} Delete workspace
          </li>
        </ul>
      </section>

      {canDeleteWorkspace(user) && (
        <section className="rounded-xl border border-rose-300 bg-rose-50 p-6 dark:border-rose-500/40 dark:bg-rose-500/10">
          <h2 className="text-lg font-semibold text-rose-700 dark:text-rose-400">
            Danger zone
          </h2>
          <p className="mt-1 text-sm text-rose-700/80 dark:text-rose-300/80">
            Deleting the workspace is permanent and cannot be undone.
          </p>
          <button
            type="button"
            className="mt-3 inline-flex rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Delete workspace
          </button>
        </section>
      )}
    </div>
  );
}
