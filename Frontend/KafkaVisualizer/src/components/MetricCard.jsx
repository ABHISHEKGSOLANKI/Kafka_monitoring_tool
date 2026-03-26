export default function MetricCard({ label, value, helper, tone = "default" }) {
  const toneStyles = {
    default: "border-slate-800 bg-slate-900/80",
    success: "border-emerald-500/20 bg-emerald-500/8",
    warning: "border-amber-500/20 bg-amber-500/8",
    danger: "border-rose-500/20 bg-rose-500/8",
  };

  return (
    <article className={`rounded-3xl border p-5 shadow-lg shadow-slate-950/20 ${toneStyles[tone] || toneStyles.default}`}>
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
      {helper ? <p className="mt-3 text-sm leading-6 text-slate-400">{helper}</p> : null}
    </article>
  );
}
