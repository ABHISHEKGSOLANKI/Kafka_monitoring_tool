import { getPartitionHealth } from "../utils/healthUtils";

export default function TopicSummary({ topic, partitions }) {
  const total = partitions.length;

  const underReplicated = partitions.filter(
    (p) => getPartitionHealth(p) === "UNDER_REPLICATED"
  ).length;

  const offline = partitions.filter(
    (p) => getPartitionHealth(p) === "OFFLINE"
  ).length;

  return (
    <div className="card p-3 bg-light">
      <h2>Topic: {topic}</h2>

      <div style={{ display: "flex", gap: "40px", marginTop: "10px" }}>
        <div>Partitions: <b>{total}</b></div>
        <div style={{ color: "red" }}>Under Replicated: <b>{underReplicated}</b></div>
        <div style={{ color: "gray" }}>Offline: <b>{offline}</b></div>
      </div>
    </div>
  );
}