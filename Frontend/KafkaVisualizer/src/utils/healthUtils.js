export const getPartitionHealth = (p) => {
  if (p.leader === null || p.leader === undefined) return "OFFLINE";

  if (p.isr.length < p.replicas.length) return "UNDER_REPLICATED";

  return "HEALTHY";
};

export const getHealthColor = (status) => {
  switch (status) {
    case "HEALTHY":
      return "green";
    case "UNDER_REPLICATED":
      return "red";
    case "OFFLINE":
      return "gray";
    default:
      return "black";
  }
};