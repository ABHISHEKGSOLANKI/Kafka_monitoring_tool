export function formatNumber(value) {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric.toLocaleString() : "0";
}

export function formatRetention(ms) {
  const numeric = Number(ms ?? 0);

  if (!Number.isFinite(numeric) || numeric <= 0) {
    return "N/A";
  }

  const hours = numeric / (1000 * 60 * 60);
  if (hours < 24) return `${hours.toFixed(1)}h`;

  const days = hours / 24;
  return `${days.toFixed(1)}d`;
}

export function formatDateTime(value) {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString();
}

export function normalizeTopics(payload) {
  return (Array.isArray(payload) ? payload : []).map((topic, index) => ({
    id: topic.topic ?? `topic-${index}`,
    topic: topic.topic ?? "unknown-topic",
    partitions: Number(topic.partition ?? topic.partitions ?? 0),
    replicationFactor: Number(topic.replicationFactor ?? topic.replificationFactor ?? 0),
    retention: Number(topic.retention ?? 0),
  }));
}

export function normalizeBrokerGroups(payload) {
  const normalizeList = (group) =>
    Object.values(group || {}).map((broker, index) => ({
      id: String(broker.id ?? index),
      host: broker.host ?? "unknown-host",
      port: broker.port ?? "N/A",
    }));

  return {
    active: normalizeList(payload?.active),
    inactive: normalizeList(payload?.inactive),
  };
}

export function normalizeEntities(payload, fallbackLabel) {
  if (Array.isArray(payload)) {
    return payload.map((item, index) => normalizeEntity(item, fallbackLabel, index));
  }

  if (payload && typeof payload === "object") {
    return Object.entries(payload).map(([key, value], index) =>
      normalizeEntity({ key, ...value }, fallbackLabel, index)
    );
  }

  return [];
}

function normalizeEntity(item, fallbackLabel, index) {
  if (typeof item === "string" || typeof item === "number") {
    return {
      id: `${fallbackLabel}-${index}`,
      name: String(item),
      topic: "N/A",
      host: "N/A",
      status: "Unknown",
      raw: item,
    };
  }

  return {
    id: String(item.id ?? item.key ?? item.name ?? item.clientId ?? `${fallbackLabel}-${index}`),
    name: item.name ?? item.clientId ?? item.groupId ?? item.key ?? `${fallbackLabel}-${index}`,
    topic: item.topic ?? item.topics ?? "N/A",
    host: item.host ?? item.clientHost ?? "N/A",
    status: item.status ?? item.state ?? "Unknown",
    raw: item,
  };
}

export function normalizePartitions(payload) {
  return (Array.isArray(payload) ? payload : []).map((partition, index) => ({
    partition: Number(partition.partition ?? index),
    leader: partition.leader ?? "N/A",
    replicas: Array.isArray(partition.replicas) ? partition.replicas : [],
    isr: Array.isArray(partition.isr) ? partition.isr : [],
    size: Number(partition.size ?? 0),
  }));
}
