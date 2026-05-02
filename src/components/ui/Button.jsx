const buttonVariants = {
  primary:
    "bg-gradient-to-b from-blue-500 to-indigo-500 text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_15px_-3px_rgba(59,130,246,0.25)]",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
