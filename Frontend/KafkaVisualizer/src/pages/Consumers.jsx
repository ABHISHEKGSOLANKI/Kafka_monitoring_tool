import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import { fetchConsumerGroups } from "../api/kafkaApi";
import { normalizeEntities } from "../utils/formatters";

export default function Consumers() {
  const [consumers, setConsumers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchConsumerGroups()
      .then((response) => {
        if (!mounted) return;
        setConsumers(normalizeEntities(response.data, "consumer"));
        setError("");
      })
      .catch(() => {
        if (!mounted) return;
        setError("Failed to load consumer groups.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Panel subtitle="Consumer groups and client details as returned by the cluster API." title="Consumers">
      {error ? <div className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
      <EntityTable loading={loading} rows={consumers} />
    </Panel>
  );
}

function EntityTable({ loading, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="pb-3 pr-4">Group / Name</th>
            <th className="pb-3 pr-4">Topic</th>
            <th className="pb-3 pr-4">Host</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/6">
          {loading ? (
            <tr>
              <td className="py-5 text-slate-400" colSpan="4">
                Loading consumers...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td className="py-5 text-slate-400" colSpan="4">
                No consumer groups returned by the API.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                <td className="py-4 pr-4 text-white">{row.name}</td>
                <td className="py-4 pr-4 text-slate-300">{String(row.topic)}</td>
                <td className="py-4 pr-4 text-slate-300">{row.host}</td>
                <td className="py-4">
                  <StatusBadge label={row.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
