const toneMap = {
  Healthy: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20",
  Warning: "bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/20",
  Critical: "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/20",
  Unknown: "bg-slate-500/10 text-slate-300 ring-1 ring-slate-400/20",
  HEALTHY: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20",
  UNDER_REPLICATED: "bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/20",
  OFFLINE: "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/20",
};

export default function StatusBadge({ label }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneMap[label] || toneMap.Unknown}`}>
      {label}
    </span>
  );
}
