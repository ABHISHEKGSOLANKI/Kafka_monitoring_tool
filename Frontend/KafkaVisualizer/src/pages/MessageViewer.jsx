import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Panel from "../components/Panel";
import { searchMessages } from "../api/kafkaApi";
import useKafkaStream from "../hooks/useKafkaStream";
import { formatDateTime } from "../utils/formatters";

export default function MessageViewer() {
  const { topic } = useParams();
  const decodedTopic = decodeURIComponent(topic || "");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const liveMessages = useKafkaStream(decodedTopic);

  async function runSearch(event) {
    event.preventDefault();
    setSearching(true);

    try {
      const response = await searchMessages(decodedTopic, query);
      setSearchResults(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch {
      setError("Message search failed for the selected topic.");
    } finally {
      setSearching(false);
    }
  }

  const displayedLiveMessages = useMemo(() => liveMessages.slice(0, 25), [liveMessages]);

  useEffect(() => {
    setSearchResults([]);
    setError("");
  }, [decodedTopic]);

  return (
    <div className="space-y-6">
      <Panel
        action={
          <Link
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-teal-400/30 hover:text-white"
            to={`/topics/${encodeURIComponent(decodedTopic)}`}
          >
            Back to topic
          </Link>
        }
        subtitle="Search historical messages and watch the most recent websocket events for a topic."
        title={`Message explorer: ${decodedTopic}`}
      >
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={runSearch}>
          <input
            className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by key, text fragment, or payload hint"
            type="search"
            value={query}
          />
          <button
            className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
            disabled={searching}
            type="submit"
          >
            {searching ? "Searching..." : "Search messages"}
          </button>
        </form>
        {error ? <div className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2">
        <MessageTable messages={searchResults} subtitle="Results from the search API." title="Search results" />
        <MessageTable messages={displayedLiveMessages} subtitle="Recent websocket updates." title="Live stream" />
      </div>
    </div>
  );
}

function MessageTable({ messages, subtitle, title }) {
  return (
    <Panel subtitle={subtitle} title={title}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="pb-3 pr-4">Offset</th>
              <th className="pb-3 pr-4">Key</th>
              <th className="pb-3 pr-4">Value</th>
              <th className="pb-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {messages.length === 0 ? (
              <tr>
                <td className="py-5 text-slate-400" colSpan="4">
                  No messages to display.
                </td>
              </tr>
            ) : (
              messages.map((message, index) => (
                <tr key={`${title}-${message.offset ?? index}`}>
                  <td className="py-4 pr-4 text-slate-300">{message.offset ?? "N/A"}</td>
                  <td className="py-4 pr-4 text-slate-300">{message.key ?? "N/A"}</td>
                  <td className="py-4 pr-4 text-slate-300">
                    <pre className="max-w-md overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950/70 p-3 text-xs text-slate-200">
                      {JSON.stringify(message.value ?? message, null, 2)}
                    </pre>
                  </td>
                  <td className="py-4 text-slate-300">{formatDateTime(message.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
