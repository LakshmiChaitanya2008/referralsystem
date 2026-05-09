export default function Branches() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl mb-6">Branches</h1>
        <p className="text-xl text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Local support for onboarding, collections, and service requests. Visit a branch for chit group enquiries, document assistance, payment clarification, and customer support.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm border-t-4 border-t-blue-500">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Hyderabad</h2>
          <p className="text-slate-600 dark:text-neutral-400 mb-4">Banjara Hills, Hyderabad, Telangana</p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><span className="font-medium text-slate-900 dark:text-white">Call:</span> +91 9999 000 111</p>
            <p className="flex items-center gap-2"><span className="font-medium text-slate-900 dark:text-white">Mail:</span> mjchitspvltd@gmail.com</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm border-t-4 border-t-indigo-500">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Vijayawada</h2>
          <p className="text-slate-600 dark:text-neutral-400 mb-4">Andhra Pradesh service coordination desk</p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><span className="font-medium text-slate-900 dark:text-white">Call:</span> Contact head office</p>
            <p className="flex items-center gap-2"><span className="font-medium text-slate-900 dark:text-white">Mail:</span> mjchitspvltd@gmail.com</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm border-t-4 border-t-emerald-500 md:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Remote support</h2>
          <p className="text-slate-600 dark:text-neutral-400 mb-4">Digital support for registered members and agents</p>
          <div className="grid sm:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-100 dark:border-neutral-800">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-neutral-200 mb-2">New member help</h4>
              <p className="text-sm text-slate-500 dark:text-neutral-400">Understand available chits, required documents, and joining process.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-neutral-200 mb-2">Payment support</h4>
              <p className="text-sm text-slate-500 dark:text-neutral-400">Clarify dues, receipts, payment references, and collection schedules.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-neutral-200 mb-2">Auction queries</h4>
              <p className="text-sm text-slate-500 dark:text-neutral-400">Get assistance on auction timing, results, dividends, and payout process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
