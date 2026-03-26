import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import { fetchTopics } from "../api/kafkaApi";
import { formatNumber, formatRetention, normalizeTopics } from "../utils/formatters";

const rowsPerPage = 8;

export default function Topics() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("topic");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchTopics()
      .then((response) => {
        if (!mounted) return;
        setTopics(normalizeTopics(response.data));
        setError("");
      })
      .catch(() => {
        if (!mounted) return;
        setError("Failed to load topics.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => topic.topic.toLowerCase().includes(search.toLowerCase()));
  }, [search, topics]);

  const sortedTopics = useMemo(() => {
    return [...filteredTopics].sort((left, right) => {
      const valueA = left[sortField];
      const valueB = right[sortField];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      return sortDirection === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }, [filteredTopics, sortDirection, sortField]);

  const totalPages = Math.max(1, Math.ceil(sortedTopics.length / rowsPerPage));
  const pageTopics = sortedTopics.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  function onSort(field) {
    if (field === sortField) {
      setSortDirection((value) => (value === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  function healthLabel(topic) {
    return topic.replicationFactor < 2 ? "Warning" : "Healthy";
  }

  return (
    <Panel
      action={
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none sm:w-72"
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search topics"
          type="search"
          value={search}
        />
      }
      subtitle="Search, sort, and drill into topics to inspect partition health and messages."
      title="Topics"
    >
      {error ? <div className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              {[
                ["topic", "Topic"],
                ["partitions", "Partitions"],
                ["replicationFactor", "Replication"],
                ["retention", "Retention"],
              ].map(([field, label]) => (
                <th key={field} className="pb-3 pr-4">
                  <button className="font-semibold transition hover:text-white" onClick={() => onSort(field)} type="button">
                    {label} {sortField === field ? (sortDirection === "asc" ? "^" : "v") : ""}
                  </button>
                </th>
              ))}
              <th className="pb-3 pr-4">Health</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {loading ? (
              <tr>
                <td className="py-5 text-slate-400" colSpan="6">
                  Loading topics...
                </td>
              </tr>
            ) : pageTopics.length === 0 ? (
              <tr>
                <td className="py-5 text-slate-400" colSpan="6">
                  No topics match the current search.
                </td>
              </tr>
            ) : (
              pageTopics.map((topic) => (
                <tr key={topic.id}>
                  <td className="py-4 pr-4 font-medium text-white">{topic.topic}</td>
                  <td className="py-4 pr-4 text-slate-300">{formatNumber(topic.partitions)}</td>
                  <td className="py-4 pr-4 text-slate-300">{formatNumber(topic.replicationFactor)}</td>
                  <td className="py-4 pr-4 text-slate-300">{formatRetention(topic.retention)}</td>
                  <td className="py-4 pr-4">
                    <StatusBadge label={healthLabel(topic)} />
                  </td>
                  <td className="py-4">
                    <Link
                      className="text-sm font-semibold text-teal-300 transition hover:text-teal-200"
                      to={`/topics/${encodeURIComponent(topic.topic)}`}
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-3">
          <button
            className="rounded-full border border-white/10 px-4 py-2 disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((value) => value - 1)}
            type="button"
          >
            Previous
          </button>
          <button
            className="rounded-full border border-white/10 px-4 py-2 disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((value) => value + 1)}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </Panel>
  );
}
