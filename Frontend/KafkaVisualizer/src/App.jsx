import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Brokers from "./pages/Brokers";
import Consumers from "./pages/Consumers";
import Dashboard from "./pages/Dashboard";
import MessageViewer from "./pages/MessageViewer";
import Producers from "./pages/Producers";
import TopicDetails from "./pages/TopicDetails";
import Topics from "./pages/Topics";

function AppLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const pageTitle = useMemo(() => {
    if (location.pathname === "/") return "Cluster Overview";
    if (location.pathname.startsWith("/brokers")) return "Brokers";
    if (location.pathname.startsWith("/topics/") && location.pathname.endsWith("/messages")) return "Message Explorer";
    if (location.pathname.startsWith("/topics/")) return "Topic Details";
    if (location.pathname.startsWith("/topics")) return "Topics";
    if (location.pathname.startsWith("/producers")) return "Producers";
    if (location.pathname.startsWith("/consumers")) return "Consumers";
    if (location.pathname.startsWith("/messages")) return "Message Explorer";
    return "Kafka Visualizer";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[auto_1fr]">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex min-w-0 flex-col">
          <Header collapsed={collapsed} pageTitle={pageTitle} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Routes>
              <Route element={<Dashboard />} path="/" />
              <Route element={<Brokers />} path="/brokers" />
              <Route element={<Topics />} path="/topics" />
              <Route element={<TopicDetails />} path="/topics/:topic" />
              <Route element={<MessageViewer />} path="/topics/:topic/messages" />
              <Route element={<Producers />} path="/producers" />
              <Route element={<Consumers />} path="/consumers" />
              <Route element={<Navigate replace to="/" />} path="*" />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
