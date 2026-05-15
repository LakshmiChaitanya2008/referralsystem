import ReferralTreeNode, { ReferralTreeLegend } from "./ReferralTreeNode";
import { countDescendants } from "../lib/referralTree";

export function ReferralTreePanel({ tree, badgeLabel = "Member" }) {
  if (!tree) {
    return (
      <p className="text-sm text-slate-600 dark:text-neutral-400">No referral tree data available yet.</p>
    );
  }

  const memberCount = countDescendants(tree) + 1;
  const rootLabel = tree.name || tree.user_id || "Member";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/60 bg-gradient-to-b from-slate-50/80 to-white/40 dark:border-white/10 dark:from-neutral-900/80 dark:to-neutral-950/40">
      <div className="border-b border-slate-200/60 px-5 py-4 dark:border-white/10">
        <p className="text-sm font-medium text-slate-700 dark:text-neutral-200">
          Root: <span className="text-slate-900 dark:text-white">{rootLabel}</span>
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-neutral-400">
          {memberCount} {memberCount === 1 ? "member" : "members"} in this network
        </p>
      </div>

      <ReferralTreeLegend />

      <div className="overflow-x-auto overscroll-x-contain px-6 pb-10 pt-2">
        <div className="mx-auto flex min-w-min justify-center">
          <ReferralTreeNode node={tree} badgeLabel={badgeLabel} isRoot />
        </div>
      </div>
    </div>
  );
}
