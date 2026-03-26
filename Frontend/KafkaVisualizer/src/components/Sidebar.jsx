import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Overview", shortLabel: "OV" },
  { to: "/brokers", label: "Brokers", shortLabel: "BR" },
  { to: "/topics", label: "Topics", shortLabel: "TP" },
  { to: "/producers", label: "Producers", shortLabel: "PR" },
  { to: "/consumers", label: "Consumers", shortLabel: "CS" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className="border-r border-white/10 bg-slate-950/70 px-3 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-2 pb-6">
        {!collapsed ? (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-400">Cluster</p>
            <p className="mt-1 text-lg font-bold text-white">Kafka Visualizer</p>
          </div>
        ) : (
          <div className="text-sm font-bold text-teal-400">KV</div>
        )}
        <button
          className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-teal-400/30 hover:text-white"
          onClick={() => setCollapsed((value) => !value)}
          type="button"
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/30"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white",
              ].join(" ")
            }
            end={item.to === "/"}
            to={item.to}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-slate-200">
              {item.shortLabel}
            </span>
            {!collapsed ? <span>{item.label}</span> : null}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
