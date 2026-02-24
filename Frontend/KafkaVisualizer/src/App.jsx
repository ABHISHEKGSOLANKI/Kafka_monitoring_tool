import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import TopicDetails from "./pages/TopicDetails";
import Header from "./components/Header";
import Brokers from "./pages/Brokers";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <BrowserRouter>
      <Header activeMenu={activeMenu} />
      <div className="grid h-screen overflow-hidden transition-all duration-300"
        style={{ gridTemplateColumns: collapsed ? "70px 1fr" : "240px 1fr" }}>

        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} setActiveMenu={setActiveMenu} />
        <main className="p-4 m-1 rounded-xl bg-slate-900 text-gray-300 flex flex-col gap-4 overflow-y-auto">

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/brokers" element={<Brokers />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/details" element={<TopicDetails />} />
            <Route path="/producers" element={<div>Producer List</div>} />
            <Route path="/consumers" element={<div>Consumer List</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
