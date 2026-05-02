function SectionHeading({ id, children }) {
  return (
    <div id={id} className="mt-12 scroll-mt-24 border-b border-slate-200 dark:border-neutral-800 pb-2">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500">{children}</h2>
    </div>
  );
}

export default function About() {
  return (
    <div className="pb-20">

      <div className="mb-12 border-b border-slate-200 dark:border-neutral-800 pb-6">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">About Us</h1>
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-start">

        <article className="flex-1 min-w-0 text-[18px] leading-10 text-slate-600 dark:text-neutral-300">

          <p>
            <strong className="font-semibold text-slate-900 dark:text-white">LocalBazaar</strong> is an
            invite-only marketplace designed to connect local sellers and buyers through
            trusted referral networks. The platform uses a binary referral model — each
            member may directly invite a maximum of two people — ensuring every participant
            has been personally vouched for before joining.
          </p>
          <p className="mt-4">
            Unlike conventional e-commerce platforms, growth on LocalBazaar is slow and
            deliberate. The constraint is architectural: it embeds accountability into the
            platform's structure rather than relying on moderation after the fact.
          </p>

          <SectionHeading id="history">History</SectionHeading>
          <p className="mt-4">
            LocalBazaar launched in early 2023 with twelve founding sellers in Bangalore's
            Indiranagar neighborhood, after its founders observed that high-quality local
            producers — home cooks, weavers, farmers — had no reliable way to reach nearby
            customers beyond word-of-mouth.
          </p>
          <p className="mt-4">
            Within thirty days of launch, the binary referral model grew the seller count to
            over 500 with zero paid marketing. By Q3 2024 the platform had expanded to
            Mysore, Hubli, and Mangalore, crossing ₹1 Crore in gross merchandise value
            (GMV). As of 2025, over 2,400 verified sellers and 12,000 listed products are
            active across six Karnataka cities.
          </p>

          <SectionHeading id="how-it-works">How It Works</SectionHeading>
          <p className="mt-4">
            Membership requires a referral code from an existing member. Upon signing up,
            each user receives their own unique referral code and may extend it to two
            others, forming a binary tree of connected accounts. Every node in the tree is
            traceable back to a founding member.
          </p>
          <p className="mt-4">
            Each profile page renders a live visualization of the user's referral network,
            showing direct referrals at depth one and indirect referrals at depth two and
            beyond. Referral codes are case-normalized to uppercase and validated for
            uniqueness platform-wide before activation.
          </p>

          <SectionHeading id="values">Core Values</SectionHeading>
          <div className="mt-4 space-y-4">
            {[
              ["Community First", "Every product decision begins with a simple question: does this strengthen local commerce?"],
              ["Trust by Design", "The referral limit is architectural, not a moderation strategy. Every connection implies a real relationship."],
              ["Hyperlocal Focus", "Proximity and neighborhood relevance are first-class product attributes. This is not a pan-India marketplace."],
              ["Sustainable Growth", "The platform favors depth of trust over breadth of reach, and always will."],
            ].map(([term, def]) => (
              <div key={term} className="flex gap-3">
                <div className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-neutral-600" />
                <p>
                  <span className="font-medium text-slate-800 dark:text-neutral-200">{term}</span>
                  <span className="text-slate-500 dark:text-neutral-500"> — {def}</span>
                </p>
              </div>
            ))}
          </div>

    
        </article>

        <aside className="w-full shrink-0 md:w-56">
          <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-neutral-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500">Quick Facts</p>
            </div>
            <div className="px-4 py-4 space-y-4">
              {[
                ["Founded", "2023"],
                ["Headquarters", "Bangalore, India"],
                ["Model", "Binary Referral"],
                ["Sellers", "2,400+"],
                ["Products", "12,000+"],
                ["GMV", "₹4.2 Crore"],
                ["Cities", "6 in Karnataka"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-600">{label}</p>
                  <p className="mt-0.5 text-sm text-slate-700 dark:text-neutral-300">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
