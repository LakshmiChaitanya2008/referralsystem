export default function StandaloneMemberCard({ member }) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-slate-200/60 border-dashed bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {member.name || member.user_id || "Member"}
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-neutral-400">
            {member.user_id || "—"}
          </p>
          {member.referral_code ? (
            <p className="mt-0.5 truncate text-xs text-blue-600 dark:text-blue-400">
              Code: {member.referral_code}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">
          Individual
        </span>
      </div>
    </div>
  );
}
