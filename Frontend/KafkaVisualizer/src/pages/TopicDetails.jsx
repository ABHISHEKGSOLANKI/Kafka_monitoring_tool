import { useEffect, useState } from "react";
import { fetchPartitionHealth } from "../api/kafkaApi";
import TopicSummary from "../components/TopicSummary";
import PartitionHealthTable from "../components/PartitionHealthTable";
import PartitionSizeChart from "../components/PartitionSizeChart";
import { useLocation } from "react-router-dom";

export default function TopicDetails() {
  const [partitions, setPartitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const topic = location.state?.topic;

  useEffect(() => {
    fetchPartitionHealth(topic)
      .then((res) => {
        setPartitions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching partition health", err);
        setLoading(false);
        setError("Failed to load partition health data. Please select a topic from the list.");
      });
  }, [topic]);

  if (loading) return <div>Loading partition data...</div>;

  return (
    <div className="container mt-4">
      {loading ? <div>Loading partition data...</div> : 
      ( error ? 
      <div className="text-red-500">
        {error}
        <button onClick={() => window.location.href = "/topics"} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded">Topics</button>
      </div> :
        <>
          <TopicSummary topic={topic} partitions={partitions} />
          <PartitionHealthTable partitions={partitions} />
          <PartitionSizeChart partitions={partitions} />
        </>
      )}
    </div>
  );
}