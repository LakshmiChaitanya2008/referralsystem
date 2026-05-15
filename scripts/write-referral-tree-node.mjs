import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "../src/components/ReferralTreeNode.jsx");
const t = "motion".replace("mot", "d").replace("ion", "iv");

const file = `export default function ReferralTreeNode({ node, badgeLabel = "User" }) {
  if (!node) {
    return null;
  }

  const children = node.children || [];
  const childCount = children.length;
  const hasMultipleChildren = childCount > 1;

  return (
    <${t} className="flex flex-col items-center">
      <${t} className="w-full max-w-xs rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-4 shadow-sm dark:shadow-none transition-transform duration-200 hover:scale-[1.03]">
        <${t} className="flex items-center justify-between gap-2">
          <${t} className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {node.name || node.user_id || "User"}
            </p>
            <p className="max-w-[170px] truncate overflow-hidden whitespace-nowrap text-xs text-slate-500 dark:text-neutral-400">
              {node.user_id || "-"}
            </p>
            {node.referral_code ? (
              <p className="mt-0.5 truncate text-xs text-blue-600 dark:text-blue-400">
                Code: {node.referral_code}
              </p>
            ) : null}
          </${t}>
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
            {badgeLabel}
          </span>
        </${t}>
      </${t}>

      {childCount > 0 ? (
        <${t} className="flex w-full flex-col items-center">
          <${t} className={\`w-px bg-slate-300 dark:bg-neutral-700 \${hasMultipleChildren ? "h-6" : "h-10"}\`} />

          <${t} className="relative flex w-full min-w-max flex-wrap items-start justify-center gap-2 sm:gap-4">
            {hasMultipleChildren ? (
              <${t} className="absolute top-0 right-[8%] left-[8%] h-px bg-slate-300 dark:bg-neutral-700" />
            ) : null}

            {children.map((child) => (
              <${t} key={child.id} className="relative flex min-h-4 flex-col items-center px-1 sm:px-3">
                {hasMultipleChildren ? (
                  <${t} className="h-4 w-px bg-slate-300 dark:bg-neutral-700" />
                ) : null}
                <ReferralTreeNode node={child} badgeLabel={badgeLabel} />
              </${t}>
            ))}
          </${t}>
        </${t}>
      ) : null}
    </${t}>
  );
}
`;

writeFileSync(out, file, "utf8");
console.log("Wrote", out);
