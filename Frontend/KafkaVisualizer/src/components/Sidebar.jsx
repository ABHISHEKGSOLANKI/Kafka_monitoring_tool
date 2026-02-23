import { NavLink } from "react-router-dom";


  
export default function Sidebar({ collapsed, setCollapsed, setActiveMenu }) {
  return (
    <aside
      className="h-dvh bg-stone-900 text-gray-300 flex flex-col
                 transition-all duration-300 ease-in-out mr-1 rounded-xl"
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-4 rounded-lg bg-slate-800 hover:bg-slate-700
                   text-white text-lg"
      >
        ☰
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 px-2">
        <NavItem to="/" icon="📊" label="Dashboard" collapsed={collapsed} setActiveMenu={setActiveMenu} active />
        <NavItem to="/brokers" icon="🖥️" label="Brokers" collapsed={collapsed} setActiveMenu={setActiveMenu} end />
        <NavItem to="/topics" icon="🧵" label="Topics" collapsed={collapsed} setActiveMenu={setActiveMenu} end />
        <NavItem to="/topics/details" icon="📋" label="Topics Details" collapsed={collapsed} setActiveMenu={setActiveMenu} />
        <NavItem to="/producers" icon="🚀" label="Producers" collapsed={collapsed} setActiveMenu={setActiveMenu} end />
        <NavItem to="/consumers" icon="👥" label="Consumers" collapsed={collapsed} setActiveMenu={setActiveMenu} end />
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="mt-auto p-4 text-sm text-gray-500">
          Cluster: <span className="text-gray-300">DEV</span>
        </div>
      )}
    </aside>
  );
}

function NavItem({ to, icon, label, collapsed, setActiveMenu, end = false }) {
  console.log({to, icon, label, collapsed, setActiveMenu})
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3.5 py-3 rounded-lg cursor-pointer
         transition-colors duration-200
         ${isActive
            ? "bg-green-500 text-black"
            : "hover:bg-slate-800 hover:text-white"}` 
      } onClick={() => setActiveMenu(label)}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
}


