export default function Input({ label, id, className = "", ...props }) {
  return (
    <div className="w-full space-y-2">
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-neutral-300">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={`w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:border-blue-500 dark:focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] dark:focus:shadow-[0_0_0_3px_rgba(59,130,246,0.3)] ${className}`}
        {...props}
      />
    </div>
  );
}
