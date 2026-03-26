export default function Header({ collapsed, pageTitle }) {
  return (
    <header className="border-b border-white/10 bg-slate-950/85 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-400">Kafka monitoring tool</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">{pageTitle}</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-teal-300">
            {collapsed ? "Compact nav" : "Expanded nav"}
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1">Local APIs: 8080 / 8081</span>
        </div>
      </div>
    </header>
  );
}
