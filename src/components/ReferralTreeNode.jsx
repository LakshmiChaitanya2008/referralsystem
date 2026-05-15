import { MAX_DIRECT_REFERRALS } from "../lib/referralLimits";

function treeRowWidth(childCount) {
  return `calc(${childCount} * 11rem + ${Math.max(0, childCount - 1)} * 1.5rem)`;
}

function TreeMemberCard({ node, badgeLabel, isRoot }) {
  return (
    <div
      className={`relative w-44 shrink-0 rounded-xl border bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:bg-neutral-900/90 ${
        isRoot
          ? "border-blue-300/80 ring-2 ring-blue-500/20 dark:border-blue-500/50"
          : "border-slate-200/80 dark:border-neutral-700"
      }`}
    >
      <span className="absolute -top-2.5 right-3 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
        {badgeLabel}
      </span>
      <p className="pr-12 text-sm font-semibold leading-snug text-slate-900 dark:text-white">
        {node.name || "Member"}
      </p>
      <p className="mt-1 font-mono text-xs text-slate-500 dark:text-neutral-400">{node.user_id || "-"}</p>
      {node.referral_code ? (
        <p className="mt-1.5 truncate text-xs font-medium text-blue-600 dark:text-blue-400">
          {node.referral_code}
        </p>
      ) : null}
    </div>
  );
}

export default function ReferralTreeNode({ node, badgeLabel = "Member", isRoot = false }) {
  if (!node) {
    return null;
  }

  const children = node.children || [];
  const childCount = children.length;
  const hasMultiple = childCount > 1;

  return (
    <div className="flex flex-col items-center">
      <TreeMemberCard node={node} badgeLabel={badgeLabel} isRoot={isRoot} />

      {childCount > 0 ? (
        <div className="flex flex-col items-center">
          <div className={`w-px bg-slate-300 dark:bg-neutral-600 ${hasMultiple ? "h-8" : "h-10"}`} />

          {hasMultiple ? (
            <div
              className="h-px bg-slate-300 dark:bg-neutral-600"
              style={{ width: treeRowWidth(childCount) }}
            />
          ) : null}

          <div className={`flex items-start justify-center ${hasMultiple ? "gap-6" : ""}`}>
            {children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                {hasMultiple ? <div className="h-6 w-px bg-slate-300 dark:bg-neutral-600" /> : null}
                <ReferralTreeNode node={child} badgeLabel={badgeLabel} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ReferralTreeLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 px-5 pb-2 text-xs text-slate-500 dark:text-neutral-400">
      <span className="inline-flex items-center gap-2">
        <span className="h-3 w-3 rounded border-2 border-blue-400/60 bg-blue-500/10" />
        Root member
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-0.5 w-6 rounded bg-slate-300 dark:bg-neutral-600" />
        Referral link
      </span>
      <span>Max {MAX_DIRECT_REFERRALS} direct referrals per parent</span>
    </div>
  );
}
