export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  items: readonly FaqItem[];
}

export const DEFAULT_FAQ: readonly FaqItem[] = [
  {
    question: "Is this really production ready?",
    answer:
      "The pricing, billing, usage and session logic live in fully typed, unit-tested lib modules. Bring your own database and auth provider and you are ready to ship.",
  },
  {
    question: "Can I switch between monthly and annual billing?",
    answer:
      "Yes. The pricing helpers compute annual savings, seat totals, and prorated charges when customers upgrade, downgrade, or add seats mid-cycle.",
  },
  {
    question: "Does it support dark mode?",
    answer:
      "Dark mode ships out of the box with a no-flash bootstrap script and a persistent theme toggle.",
  },
  {
    question: "What is included for free?",
    answer:
      "Everything. The starter is MIT licensed, so you can use it in commercial and personal projects without restriction.",
  },
] as const;

/** Native, accessible FAQ accordion using <details>/<summary>. */
export function Faq({ items }: FaqProps) {
  return (
    <div data-testid="faq" className="mx-auto max-w-2xl divide-y divide-slate-200 dark:divide-slate-800">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-left text-base font-medium text-slate-900 dark:text-slate-100">
            {item.question}
            <span
              aria-hidden
              className="ml-4 text-slate-400 transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export default Faq;
