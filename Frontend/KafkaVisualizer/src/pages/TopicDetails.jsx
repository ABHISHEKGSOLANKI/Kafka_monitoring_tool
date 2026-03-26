import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import { fetchPartitionHealth } from "../api/kafkaApi";
import { normalizePartitions } from "../utils/formatters";
import { getPartitionHealth } from "../utils/healthUtils";

export default function TopicDetails() {
  const { topic } = useParams();
  const decodedTopic = decodeURIComponent(topic || "");
  const [partitions, setPartitions] = useState([]);
  const [loading, setLoading] = useState(Boolean(decodedTopic));
  const [error, setError] = useState(decodedTopic ? "" : "No topic was selected.");

  useEffect(() => {
    if (!decodedTopic) {
      return;
    }

    let mounted = true;

    fetchPartitionHealth(decodedTopic)
      .then((response) => {
        if (!mounted) return;
        setPartitions(normalizePartitions(response.data));
        setError("");
      })
      .catch(() => {
        if (!mounted) return;
        setError("Failed to load partition health for the selected topic.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [decodedTopic]);

  const healthSummary = useMemo(() => {
    const offline = partitions.filter((partition) => getPartitionHealth(partition) === "OFFLINE").length;
    const underReplicated = partitions.filter(
      (partition) => getPartitionHealth(partition) === "UNDER_REPLICATED"
    ).length;

    return {
      total: partitions.length,
      offline,
      underReplicated,
      healthy: Math.max(partitions.length - offline - underReplicated, 0),
    };
  }, [partitions]);

  return (
    <div className="space-y-6">
      <Panel
        action={
          <Link
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-teal-400/30 hover:text-white"
            to={`/topics/${encodeURIComponent(decodedTopic)}/messages`}
          >
            Explore messages
          </Link>
        }
        subtitle="Partition health, replica coverage, and size distribution for the selected topic."
        title={decodedTopic || "Topic details"}
      >
        {error ? <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        <div className="grid gap-4 md:grid-cols-4">
          <SummaryCard label="Partitions" value={healthSummary.total} />
          <SummaryCard label="Healthy" tone="success" value={healthSummary.healthy} />
          <SummaryCard label="Under replicated" tone="warning" value={healthSummary.underReplicated} />
          <SummaryCard label="Offline" tone="danger" value={healthSummary.offline} />
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel subtitle="Replica and ISR status per partition." title="Partition health table">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3 pr-4">Partition</th>
                  <th className="pb-3 pr-4">Leader</th>
                  <th className="pb-3 pr-4">Replicas</th>
                  <th className="pb-3 pr-4">ISR</th>
                  <th className="pb-3 pr-4">Size</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {loading ? (
                  <tr>
                    <td className="py-5 text-slate-400" colSpan="6">
                      Loading partition health...
                    </td>
                  </tr>
                ) : (
                  partitions.map((partition) => (
                    <tr key={partition.partition}>
                      <td className="py-4 pr-4 text-white">{partition.partition}</td>
                      <td className="py-4 pr-4 text-slate-300">{partition.leader}</td>
                      <td className="py-4 pr-4 text-slate-300">{partition.replicas.join(", ") || "N/A"}</td>
                      <td className="py-4 pr-4 text-slate-300">{partition.isr.join(", ") || "N/A"}</td>
                      <td className="py-4 pr-4 text-slate-300">{partition.size}</td>
                      <td className="py-4">
                        <StatusBadge label={getPartitionHealth(partition)} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel subtitle="Useful for identifying uneven partition growth." title="Partition size distribution">
          <div className="h-96">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={partitions}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                <XAxis dataKey="partition" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(148,163,184,0.18)",
                    borderRadius: "16px",
                  }}
                />
                <Bar dataKey="size" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, tone = "default" }) {
  const tones = {
    default: "border-white/8 bg-slate-900/70",
    success: "border-emerald-500/20 bg-emerald-500/8",
    warning: "border-amber-500/20 bg-amber-500/8",
    danger: "border-rose-500/20 bg-rose-500/8",
  };

  return (
    <div className={`rounded-3xl border p-4 ${tones[tone] || tones.default}`}>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
