export default function ReferralTreeNode({ node, badgeLabel = "User" }) {
  if (!node) {
    return null;
  }

  const children = node.children || [];
  const hasTwoChildren = children.length === 2;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-4 shadow-sm dark:shadow-none transition-transform duration-200 hover:scale-[1.03]">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {node.name || node.user_id || "User"}
            </p>
            <p className="max-w-[170px] truncate overflow-hidden whitespace-nowrap text-xs text-slate-500 dark:text-neutral-400">
              {node.user_id || "—"}
            </p>
            {node.referral_code ? (
              <p className="mt-0.5 truncate text-xs text-blue-600 dark:text-blue-400">
                Code: {node.referral_code}
              </p>
            ) : null}
          </div>
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
            {badgeLabel}
          </span>
        </div>
      </div>

      {children.length > 0 ? (
        <div className="flex w-full flex-col items-center">
          <div className={`w-px bg-slate-300 dark:bg-neutral-700 ${hasTwoChildren ? "h-6" : "h-10"}`} />

          <div className="relative flex w-full min-w-max items-start justify-center">
            {children.map((child, index) => {
              const isLeftChild = index === 0;
              const isRightChild = index === 1;

              return (
                <div
                  key={child.id}
                  className="relative flex min-h-4 flex-1 flex-col items-center px-2 sm:px-4"
                >
                  {hasTwoChildren && isLeftChild ? (
                    <div className="absolute top-0 right-0 left-1/2 h-px bg-slate-300 dark:bg-neutral-700" />
                  ) : null}
                  {hasTwoChildren && isRightChild ? (
                    <div className="absolute top-0 left-0 right-1/2 h-px bg-slate-300 dark:bg-neutral-700" />
                  ) : null}

                  {hasTwoChildren ? (
                    <div className="h-4 w-px bg-slate-300 dark:bg-neutral-700" />
                  ) : null}
                  <ReferralTreeNode node={child} badgeLabel={badgeLabel} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
