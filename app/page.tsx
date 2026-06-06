import { PricingCard } from "@/components/PricingCard";
import { Faq, DEFAULT_FAQ } from "@/components/Faq";
import { Testimonials, DEFAULT_TESTIMONIALS } from "@/components/Testimonials";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PLANS } from "@/lib/pricing";

const HIGHLIGHTS = [
  { emoji: "💳", title: "Billing math", body: "Proration, seats, and annual savings as pure, tested functions." },
  { emoji: "📊", title: "Dashboard", body: "Stat widgets, usage bars, and a recent-activity feed." },
  { emoji: "🔐", title: "Auth-ready", body: "Typed session flow with role checks and expiry." },
  { emoji: "🌙", title: "Dark mode", body: "No-flash theme bootstrap with a persistent toggle." },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-600/20 dark:text-brand-400">
          Ship your SaaS faster
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
          The Next.js SaaS starter that gets out of your way
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Auth-ready layout, a pricing page wired to typed plan logic, billing
          math, and a real dashboard. Bring your database and start building
          features.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Get started
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            View dashboard
          </a>
        </div>
      </section>

      <section className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <span aria-hidden className="text-2xl">
              {item.emoji}
            </span>
            <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-50">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {item.body}
            </p>
          </div>
        ))}
      </section>

      <section id="pricing" className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Switch to annual billing to save. Prices shown are per month.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} interval="annual" />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Loved by builders
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Teams ship production SaaS on this starter every week.
          </p>
        </div>
        <div className="mt-10">
          <Testimonials items={DEFAULT_TESTIMONIALS} />
        </div>
      </section>

      <section className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-10">
          <Faq items={DEFAULT_FAQ} />
        </div>
      </section>
    </main>
  );
}
