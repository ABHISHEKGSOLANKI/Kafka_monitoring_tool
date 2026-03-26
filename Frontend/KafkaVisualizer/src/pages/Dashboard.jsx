import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MetricCard from "../components/MetricCard";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import { fetchClusterSnapshot } from "../api/kafkaApi";
import {
  formatNumber,
  formatRetention,
  normalizeBrokerGroups,
  normalizeEntities,
  normalizeTopics,
} from "../utils/formatters";

export default function Dashboard() {
  const [snapshot, setSnapshot] = useState({
    brokers: { active: [], inactive: [] },
    topics: [],
    producers: [],
    consumers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const result = await fetchClusterSnapshot();
        if (!mounted) return;

        setSnapshot({
          brokers:
            result.brokers.status === "fulfilled"
              ? normalizeBrokerGroups(result.brokers.value.data)
              : { active: [], inactive: [] },
          topics: result.topics.status === "fulfilled" ? normalizeTopics(result.topics.value.data) : [],
          producers:
            result.producers.status === "fulfilled"
              ? normalizeEntities(result.producers.value.data, "producer")
              : [],
          consumers:
            result.consumers.status === "fulfilled"
              ? normalizeEntities(result.consumers.value.data, "consumer")
              : [],
        });
        setError("");
      } catch {
        if (!mounted) return;
        setError("Unable to load the cluster snapshot from the configured APIs.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    const timer = setInterval(load, 30000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const averageReplication = useMemo(() => {
    if (snapshot.topics.length === 0) return 0;
    const total = snapshot.topics.reduce((sum, topic) => sum + topic.replicationFactor, 0);
    return (total / snapshot.topics.length).toFixed(1);
  }, [snapshot.topics]);

  const largestTopics = useMemo(
    () =>
      [...snapshot.topics]
        .sort((a, b) => b.partitions - a.partitions)
        .slice(0, 6)
        .map((topic) => ({
          name: topic.topic,
          partitions: topic.partitions,
        })),
    [snapshot.topics]
  );

  const pressureTopics = useMemo(
    () =>
      [...snapshot.topics]
        .map((topic) => ({
          ...topic,
          health: topic.replicationFactor < 2 ? "Warning" : "Healthy",
          pressureScore: topic.partitions * Math.max(topic.replicationFactor, 1),
        }))
        .sort((a, b) => b.pressureScore - a.pressureScore)
        .slice(0, 5),
    [snapshot.topics]
  );

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/8 px-5 py-4 text-sm text-rose-200">{error}</div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          helper="Active broker nodes currently reachable"
          label="Active brokers"
          tone="success"
          value={loading ? "..." : formatNumber(snapshot.brokers.active.length)}
        />
        <MetricCard
          helper="Broker nodes reported inactive"
          label="Inactive brokers"
          tone={snapshot.brokers.inactive.length > 0 ? "danger" : "default"}
          value={loading ? "..." : formatNumber(snapshot.brokers.inactive.length)}
        />
        <MetricCard
          helper="Topics discovered from the cluster metadata API"
          label="Topics"
          value={loading ? "..." : formatNumber(snapshot.topics.length)}
        />
        <MetricCard
          helper="Producer clients returned by the producer API"
          label="Producers"
          value={loading ? "..." : formatNumber(snapshot.producers.length)}
        />
        <MetricCard
          helper="Average replication factor across tracked topics"
          label="Avg replication"
          tone={Number(averageReplication) < 2 ? "warning" : "default"}
          value={loading ? "..." : averageReplication}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Panel
          subtitle="Sorted by partition count to highlight topics that are operationally heavier to manage."
          title="Top topics by partition count"
        >
          <div className="h-80">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={largestTopics}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(148,163,184,0.18)",
                    borderRadius: "16px",
                  }}
                />
                <Bar dataKey="partitions" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel subtitle="Derived from topic partition count and replication factor." title="Attention queue">
          <div className="space-y-3">
            {pressureTopics.map((topic) => (
              <Link
                key={topic.id}
                className="block rounded-2xl border border-white/8 bg-slate-950/40 p-4 transition hover:border-teal-400/30 hover:bg-slate-950"
                to={`/topics/${encodeURIComponent(topic.topic)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{topic.topic}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {formatNumber(topic.partitions)} partitions, replication {topic.replicationFactor}
                    </p>
                  </div>
                  <StatusBadge label={topic.health} />
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel subtitle="Sorted by retention and partition footprint." title="Topic inventory snapshot">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="pb-3 pr-4">Topic</th>
                  <th className="pb-3 pr-4">Partitions</th>
                  <th className="pb-3 pr-4">Replication</th>
                  <th className="pb-3">Retention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {snapshot.topics.slice(0, 6).map((topic) => (
                  <tr key={topic.id}>
                    <td className="py-3 pr-4 text-white">
                      <Link className="transition hover:text-teal-300" to={`/topics/${encodeURIComponent(topic.topic)}`}>
                        {topic.topic}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{formatNumber(topic.partitions)}</td>
                    <td className="py-3 pr-4 text-slate-300">{formatNumber(topic.replicationFactor)}</td>
                    <td className="py-3 text-slate-300">{formatRetention(topic.retention)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel subtitle="Counts below depend on the current API payloads." title="Service coverage">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Producer entries</p>
              <p className="mt-3 text-3xl font-bold text-white">{formatNumber(snapshot.producers.length)}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Consumer groups</p>
              <p className="mt-3 text-3xl font-bold text-white">{formatNumber(snapshot.consumers.length)}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Inactive broker share</p>
              <p className="mt-3 text-3xl font-bold text-white">
                {snapshot.brokers.active.length + snapshot.brokers.inactive.length === 0
                  ? "0%"
                  : `${Math.round(
                      (snapshot.brokers.inactive.length /
                        (snapshot.brokers.active.length + snapshot.brokers.inactive.length)) *
                        100
                    )}%`}
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Low-replication topics</p>
              <p className="mt-3 text-3xl font-bold text-white">
                {formatNumber(snapshot.topics.filter((topic) => topic.replicationFactor < 2).length)}
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
