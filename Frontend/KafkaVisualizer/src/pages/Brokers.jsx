import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import { fetchBrokers } from "../api/kafkaApi";
import { normalizeBrokerGroups } from "../utils/formatters";

export default function Brokers() {
  const [brokers, setBrokers] = useState({ active: [], inactive: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchBrokers()
      .then((response) => {
        if (!mounted) return;
        setBrokers(normalizeBrokerGroups(response.data));
        setError("");
      })
      .catch(() => {
        if (!mounted) return;
        setError("Failed to load broker state.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <Panel subtitle="Broker availability split by active and inactive nodes." title="Broker summary">
        {error ? <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <BrokerSummaryCard count={brokers.active.length} label="Active brokers" tone="success" />
          <BrokerSummaryCard count={brokers.inactive.length} label="Inactive brokers" tone="danger" />
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2">
        <BrokerTable loading={loading} rows={brokers.active} title="Active brokers" tone="HEALTHY" />
        <BrokerTable loading={loading} rows={brokers.inactive} title="Inactive brokers" tone="OFFLINE" />
      </div>
    </div>
  );
}

function BrokerSummaryCard({ count, label, tone }) {
  const toneStyles = {
    success: "border-emerald-500/20 bg-emerald-500/8",
    danger: "border-rose-500/20 bg-rose-500/8",
  };

  return (
    <div className={`rounded-3xl border p-5 ${toneStyles[tone]}`}>
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-4xl font-bold text-white">{count}</p>
    </div>
  );
}

function BrokerTable({ loading, rows, title, tone }) {
  return (
    <Panel subtitle="Broker ID, host and port from the cluster metadata API." title={title}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-3 pr-4">ID</th>
              <th className="pb-3 pr-4">Host</th>
              <th className="pb-3 pr-4">Port</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {loading ? (
              <tr>
                <td className="py-5 text-slate-400" colSpan="4">
                  Loading brokers...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="py-5 text-slate-400" colSpan="4">
                  No brokers in this group.
                </td>
              </tr>
            ) : (
              rows.map((broker) => (
                <tr key={`${title}-${broker.id}`}>
                  <td className="py-4 pr-4 text-white">{broker.id}</td>
                  <td className="py-4 pr-4 text-slate-300">{broker.host}</td>
                  <td className="py-4 pr-4 text-slate-300">{broker.port}</td>
                  <td className="py-4">
                    <StatusBadge label={tone} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
