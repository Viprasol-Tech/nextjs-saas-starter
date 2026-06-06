import { PricingCard } from "@/components/PricingCard";
import { PLANS } from "@/lib/pricing";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Ship your SaaS faster
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          The Next.js SaaS starter that gets out of your way
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Auth-ready layout, a pricing page wired to typed plan logic, and a
          dashboard shell. Bring your database and start building features.
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
            className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            View dashboard
          </a>
        </div>
      </section>

      <section id="pricing" className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-slate-600">
            Switch to annual billing to save. Prices shown are per month.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} interval="annual" />
          ))}
        </div>
      </section>
    </main>
  );
}
