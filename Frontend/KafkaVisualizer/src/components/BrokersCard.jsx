import { fetchBrokers } from "../api/kafkaApi";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export default function BrokerCard() {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadingRef = useRef(false);   // prevents overlapping calls
  const mountedRef = useRef(true);    // prevents state update after unmount

  // ✅ DEFINE FUNCTION HERE (component scope)
  const loadBrokers = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      const res = await fetchBrokers();

      if (mountedRef.current) {
        setBrokers(res.data);
        setLoading(false);
        setError(null);
      }
    } catch (e) {
      console.error(e);

      if (mountedRef.current) {
        setError("Failed to fetch brokers...");
        setLoading(false);
      }
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    mountedRef.current = true;

    // Initial call
    loadBrokers();

    // Poll every 30s (10s is too aggressive)
    const interval = setInterval(loadBrokers, 30000);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);
const activeList = Object.values(brokers.active || {});
const inactiveList = Object.values(brokers.inactive || {});
const maxRows = Math.max(activeList.length, inactiveList.length);
  return (
    <NavLink
      to="/brokers"
      className="col-span-12 md:col-span-6 xl:col-span-3 bg-slate-800 text-gray-200 rounded-xl p-2 shadow"
    >
      <h1 className="text-white-400 text-center font-bold">Brokers</h1>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
<table className="min-w-full bg-slate-800 text-gray-300">
  <thead>
    <tr>
      <th className="p-2 text-left">Active Brokers</th>
      <th className="p-2 text-left">Inactive Brokers</th>
    </tr>
  </thead>

  <tbody>
    {Array.from({ length: maxRows }).map((_, index) => {
      const active = activeList[index];
      const inactive = inactiveList[index];

      return (
        <tr key={index} className="text-xs border-t border-slate-700">
          <td className="p-2">
            {active ? `${active.host}:${active.port}` : "-"}
          </td>

          <td className="p-2">
            {inactive ? `${inactive.host}:${inactive.port}` : "-"}
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
      )}
    </NavLink>
  );
}