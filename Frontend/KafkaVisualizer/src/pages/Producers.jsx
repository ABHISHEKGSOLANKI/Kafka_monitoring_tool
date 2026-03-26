import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import { fetchProducers } from "../api/kafkaApi";
import { normalizeEntities } from "../utils/formatters";

export default function Producers() {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchProducers()
      .then((response) => {
        if (!mounted) return;
        setProducers(normalizeEntities(response.data, "producer"));
        setError("");
      })
      .catch(() => {
        if (!mounted) return;
        setError("Failed to load producers.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Panel subtitle="Producer clients as returned by the producer API." title="Producers">
      {error ? <div className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
      <EntityTable label="producer" loading={loading} rows={producers} />
    </Panel>
  );
}

function EntityTable({ loading, rows, label }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="pb-3 pr-4">Name</th>
            <th className="pb-3 pr-4">Topic</th>
            <th className="pb-3 pr-4">Host</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/6">
          {loading ? (
            <tr>
              <td className="py-5 text-slate-400" colSpan="4">
                Loading {label}s...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td className="py-5 text-slate-400" colSpan="4">
                No {label}s returned by the API.
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
