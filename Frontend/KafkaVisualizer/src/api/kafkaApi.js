import axios from "axios";

const CLUSTER_BASE_URL = "http://localhost:8080/kafka/v1";
const PRODUCER_BASE_URL = "http://localhost:8081/kafka/producer/v1";

const clusterClient = axios.create({
  baseURL: CLUSTER_BASE_URL,
  timeout: 8000,
});

const producerClient = axios.create({
  baseURL: PRODUCER_BASE_URL,
  timeout: 8000,
});

export function fetchBrokers() {
  return clusterClient.get("/brokers");
}

export function fetchTopics() {
  return clusterClient.get("/topics");
}

export function fetchProducers() {
  return producerClient.get("/producers");
}

export function fetchTopicDetails(topic) {
  return clusterClient.get(`/topics/${encodeURIComponent(topic)}`);
}

export function fetchConsumerGroups() {
  return clusterClient.get("/consumers");
}

export function searchMessages(topic, query) {
  return clusterClient.post("/search", { topic, query });
}

export function fetchPartitionHealth(topic) {
  return clusterClient.get(`/topics/${encodeURIComponent(topic)}/partitions`);
}

export async function fetchClusterSnapshot() {
  const [brokers, topics, producers, consumers] = await Promise.allSettled([
    fetchBrokers(),
    fetchTopics(),
    fetchProducers(),
    fetchConsumerGroups(),
  ]);

  return { brokers, topics, producers, consumers };
}
