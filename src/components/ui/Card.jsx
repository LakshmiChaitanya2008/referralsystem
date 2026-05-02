export default function Card({ title, description, children, className = "" }) {
  return (
    <section
      className={`rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-md md:p-8 dark:border dark:border-neutral-800 dark:shadow-none ${className}`}
    >
      {title ? <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm text-slate-600 dark:text-neutral-400">{description}</p> : null}
      {children ? <div className={title || description ? "mt-6" : ""}>{children}</div> : null}
    </section>
  );
}
