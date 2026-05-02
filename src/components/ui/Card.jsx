export default function Card({ title, description, children, className = "" }) {
  return (
    <section
      className={`rounded-xl bg-white p-6 shadow-md md:p-8 ${className}`}
    >
      {title ? <h3 className="text-xl font-semibold text-slate-900">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      {children ? <div className={title || description ? "mt-6" : ""}>{children}</div> : null}
    </section>
  );
}
