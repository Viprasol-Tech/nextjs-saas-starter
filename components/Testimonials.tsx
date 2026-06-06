import { initials } from "@/lib/session";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsProps {
  items: readonly Testimonial[];
}

export const DEFAULT_TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "We shipped our billing flow in a weekend. The proration math just worked.",
    author: "Maya Chen",
    role: "Founder, Loopline",
  },
  {
    quote:
      "Clean, typed, and well tested. It is the SaaS boilerplate I keep reaching for.",
    author: "Daniel Okafor",
    role: "Staff Engineer, Northwind",
  },
  {
    quote:
      "Dark mode, dashboard widgets, and a sensible structure out of the box. Huge head start.",
    author: "Priya Nair",
    role: "CTO, Beacon Labs",
  },
] as const;

/** A three-up grid of customer testimonials. */
export function Testimonials({ items }: TestimonialsProps) {
  return (
    <div
      data-testid="testimonials"
      className="grid gap-6 md:grid-cols-3"
    >
      {items.map((item) => (
        <figure
          key={item.author}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <blockquote className="flex-1 text-sm text-slate-700 dark:text-slate-200">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
            >
              {initials(item.author)}
            </span>
            <span className="text-sm">
              <span className="block font-medium text-slate-900 dark:text-slate-100">
                {item.author}
              </span>
              <span className="block text-slate-500 dark:text-slate-400">
                {item.role}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default Testimonials;
