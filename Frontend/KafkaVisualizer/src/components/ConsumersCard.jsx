import { fetchTopics } from "../api/kafkaApi";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function ConsumersCard() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then((res) => {
        setTopics(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load topics");
        setLoading(false);
      });
  }, []);

  return (
    <NavLink to="/consumers" className="col-span-12 md:col-span-6 xl:col-span-3 bg-slate-800 text-gray-200 rounded-xl p-2 shadow">

        <h3 className="text-white-400 text-center font-bold">Consumers</h3>
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (

          <div className="text-3xl font-semibold mt-2">{topics.length}</div>

        )}

    </NavLink>
  );
}