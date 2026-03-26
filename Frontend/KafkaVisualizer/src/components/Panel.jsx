export default function Panel({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`rounded-[28px] border border-white/8 bg-slate-900/75 p-5 shadow-xl shadow-slate-950/20 ${className}`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
