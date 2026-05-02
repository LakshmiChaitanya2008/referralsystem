export default function Card({ title, description, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] md:p-8 ${className}`}
    >
      {title ? <h3 className="text-xl font-semibold text-slate-900">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      {children ? <div className={title || description ? "mt-5" : ""}>{children}</div> : null}
    </section>
  );
}
