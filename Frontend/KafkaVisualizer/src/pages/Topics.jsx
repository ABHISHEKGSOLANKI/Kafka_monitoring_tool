import { NavLink } from "react-router-dom";
import { fetchTopics } from "../api/kafkaApi";
import { useEffect, useState } from "react";

export default function Topics() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [sortField, setSortField] = useState("topic");
    const [sortDirection, setSortDirection] = useState("asc");
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Normalize API response (fix backend typo safely)
    const normalizedTopics = topics.map(t => ({
        ...t,
        replicationFactor: t.replicationFactor ?? t.replificationFactor
    }));

    const filteredTopics = normalizedTopics.filter(topic =>
        topic.topic.toLowerCase().includes(search.toLowerCase())
    );

    const sortedTopics = [...filteredTopics].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === "number") {
            return sortDirection === "asc" ? valA - valB : valB - valA;
        }

        return sortDirection === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });

    const totalPages = Math.ceil(sortedTopics.length / rowsPerPage);

    const paginatedTopics = sortedTopics.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    useEffect(() => {
        fetchTopics()
            .then(res => {
                setTopics(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load topics");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading topics...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Kafka Topics</h1>

            <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className="mb-4 p-2 rounded bg-slate-700 text-white"
            />

            <table className="min-w-full bg-slate-800 text-gray-300">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("topic")} className="cursor-pointer">
                            Topic {sortField === "topic" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                        </th>

                        <th onClick={() => handleSort("partition")} className="cursor-pointer">
                            Partitions {sortField === "partition" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                        </th>

                        <th onClick={() => handleSort("replicationFactor")} className="cursor-pointer">
                            Replication {sortField === "replicationFactor" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                        </th>

                        <th onClick={() => handleSort("retention")} className="cursor-pointer">
                            Retention(ms) {sortField === "retention" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedTopics.map(data => (
                        <tr key={data.topic}>
                            <NavLink to="/topics/details" state={{ topic: data.topic }} className="text-blue-400 hover:underline">
                                {data.topic}
                            </NavLink>
                            <td>{data.partition}</td>
                            <td>{data.replicationFactor}</td>
                            <td>{Number(data.retention).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                >
                    Prev
                </button>

                <span>Page {currentPage} / {totalPages}</span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}