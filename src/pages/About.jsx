export default function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-10">
      
      {/* HEADER */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl mb-6">
          About MjChits
        </h1>
        <p className="text-xl text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Modern chit fund service built on trust, records, and accessibility.
        </p>
      </section>

      {/* INTRO */}
      <section className="rounded-2xl bg-white dark:bg-neutral-900 p-8 border border-slate-200 dark:border-neutral-800 shadow-sm">
        <p className="text-lg text-slate-700 dark:text-neutral-300 leading-relaxed">
          We combine traditional community savings with digital workflows for onboarding, collections, auctions, customer support, and administration. MjChits focuses on simple communication, verified member records, clear auction flow, and payment visibility so customers can participate with confidence.
        </p>
      </section>

      {/* VALUES */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-blue-50/50 dark:bg-blue-900/20 p-8 border border-blue-100 dark:border-blue-800">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Transparent operations</h3>
          <p className="text-slate-600 dark:text-neutral-400">
            Members should be able to understand their group value, installment cycle, auction result, dividend distribution, and pending dues without confusion.
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/20 p-8 border border-indigo-100 dark:border-indigo-800">
          <div className="text-3xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Community-first savings</h3>
          <p className="text-slate-600 dark:text-neutral-400">
            Chit funds work best when groups are managed with discipline. Our process supports savers, bidders, field agents, and branch staff in one operating flow.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/20 p-8 border border-emerald-100 dark:border-emerald-800">
          <div className="text-3xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verification and control</h3>
          <p className="text-slate-600 dark:text-neutral-400">
            KYC, user roles, branch records, payment receipts, and approval steps help reduce operational risk and keep financial activity accountable.
          </p>
        </div>

        <div className="rounded-2xl bg-purple-50/50 dark:bg-purple-900/20 p-8 border border-purple-100 dark:border-purple-800">
          <div className="text-3xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Digital convenience</h3>
          <p className="text-slate-600 dark:text-neutral-400">
            The platform supports mobile-first access for customers and agents while keeping admin teams equipped with web-based monitoring and reporting.
          </p>
        </div>
      </section>

    </div>
  );
}
