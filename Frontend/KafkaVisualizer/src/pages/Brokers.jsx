import { fetchBrokers } from "../api/kafkaApi";
import { useEffect, useState } from "react";
import { sorting, handleSort } from "../utils/pageination";

export default function Brokers() {
    // Active brokers    
    const [activeBrokers, setActiveBrokers] = useState([]);
    const [searchActiveBrokers, setSearchActiveBrokers] = useState("");
    const [currentPageActiveBrokers, setCurrentPageActiveBrokers] = useState(1);
    const [rowsPerPageActiveBrokers] = useState(5);
    const [sortFieldActiveBroker, setSortFieldActiveBroker] = useState("host");
    const [sortDirectionActiveBroker, setSortDirectionActiveBroker] = useState("asc");

    // Inactive brokers
    const [inactiveBrokers, setInactiveBrokers] = useState([]);
    const [searchInactiveBrokers, setSearchInactiveBrokers] = useState("");
    const [currentPageInactiveBrokers, setCurrentPageInactiveBrokers] = useState(1);
    const [rowsPerPageInActiveBroker] = useState(5);
    const [sortFieldInActiveBroker, setSortFieldInActiveBroker] = useState("host");
    const [sortDirectionInActiveBroker, setSortDirectionInActiveBroker] = useState("asc");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


const filteredActiveBrokers = activeBrokers.filter(broker => 
    broker.id.toLowerCase().includes(searchActiveBrokers.toLowerCase()) ||
    broker.host.toLowerCase().includes(searchActiveBrokers.toLowerCase()) ||
    broker.port.toString().includes(searchActiveBrokers)
);  

const filteredInActiveBrokers = inactiveBrokers.filter(broker => 
    broker.id.toLowerCase().includes(searchInactiveBrokers.toLowerCase()) ||
    broker.host.toLowerCase().includes(searchInactiveBrokers.toLowerCase()) ||
    broker.port.toString().includes(searchInactiveBrokers)
);


const sortedActiveBrokers = sorting(filteredActiveBrokers, sortFieldActiveBroker, sortDirectionActiveBroker);

const sortedInactiveBrokers = sorting(filteredInActiveBrokers, sortFieldInActiveBroker, sortDirectionInActiveBroker);

const totalPagesActiveBrokers = Math.ceil(sortedActiveBrokers.length / rowsPerPageActiveBrokers);
const totalPagesInactiveBrokers = Math.ceil(sortedInactiveBrokers.length / rowsPerPageInActiveBroker);

    const paginatedActiveBrokers = sortedActiveBrokers.slice(
        (currentPageActiveBrokers - 1) * rowsPerPageActiveBrokers,
        currentPageActiveBrokers * rowsPerPageActiveBrokers
    );

    const paginatedInactiveBrokers = sortedInactiveBrokers.slice(
        (currentPageInactiveBrokers - 1) * rowsPerPageInActiveBroker,
        currentPageInactiveBrokers * rowsPerPageInActiveBroker
    );

    const handleSortWrapper = (field) => handleSort(field, sortFieldActiveBroker, setSortFieldActiveBroker, sortDirectionActiveBroker, setSortDirectionActiveBroker);
    const handleSortInActiveWrapper = (field) => handleSort(field, sortFieldInActiveBroker, setSortFieldInActiveBroker, sortDirectionInActiveBroker, setSortDirectionInActiveBroker);

useEffect(() => {
    fetchBrokers()
        .then(res => {
            const activeBrokers = Object.values(res.data.active || {});
            const inActiveBrokers = Object.values(res.data.inactive || {});
            setActiveBrokers(activeBrokers);
            setInactiveBrokers(inActiveBrokers);
            setLoading(false);
        })
        .catch(() => {
            setError("Failed to load brokers...");
            setLoading(false);
        });
}, []);


    return (
        <div>
            <input
                type="text"
                placeholder="Search active brokers..."
                value={searchActiveBrokers}
                onChange={(e) => {
                    setSearchActiveBrokers(e.target.value);
                    setCurrentPageActiveBrokers(1);
                }}
                className="mb-4 p-2 rounded bg-slate-700 text-white"
            />

            <table className="min-w-full bg-slate-800 text-gray-300">
                <thead>
                    <tr>
                        <th onClick={() => handleSortWrapper("id")} className="cursor-pointer">
                            ID {sortFieldActiveBroker === "id" ? (sortDirectionActiveBroker === "asc" ? "▲" : "▼") : ""}
                        </th>

                        <th onClick={() => handleSortWrapper("host")} className="cursor-pointer">
                            Host {sortFieldActiveBroker === "host" ? (sortDirectionActiveBroker === "asc" ? "▲" : "▼") : ""}
                        </th>

                        <th onClick={() => handleSortWrapper("port")} className="cursor-pointer">
                            Port {sortFieldActiveBroker === "port" ? (sortDirectionActiveBroker === "asc" ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">Loading Active brokers...</td>
                        </tr>
                    ) :  error ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">{error}</td>
                        </tr>
                    ) : (
                        paginatedActiveBrokers.map(data => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.host}</td>
                                <td>{data.port}</td>
                        </tr>
                    )))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    disabled={currentPageActiveBrokers === 1}
                    onClick={() => setCurrentPageActiveBrokers(p => p - 1)}
                >
                    Prev
                </button>

                <span>Page {currentPageActiveBrokers} / {totalPagesActiveBrokers}</span>

                <button
                    disabled={currentPageActiveBrokers === totalPagesActiveBrokers}
                    onClick={() => setCurrentPageActiveBrokers(p => p + 1)}
                >
                    Next
                </button>
            </div>

            {/* Inactive */}

            <input
                type="text"
                placeholder="Search inactive brokers..."
                value={searchInactiveBrokers}
                onChange={(e) => {
                    setSearchInactiveBrokers(e.target.value);
                    setCurrentPageInactiveBrokers(1);
                }}
                className="mb-4 p-2 rounded bg-slate-700 text-white"
            />

            <table className="min-w-full bg-slate-800 text-gray-300">
                <thead>
                    <tr>
                        <th onClick={() => handleSortInactiveBrokers("id")} className="cursor-pointer">
                            ID {sortFieldInActiveBroker === "id" ? (sortDirectionInActiveBroker === "asc" ? "▲" : "▼") : ""}
                        </th>

                        <th onClick={() => handleSortInactiveBrokers("host")} className="cursor-pointer">
                            Host {sortFieldInActiveBroker === "host" ? (sortDirectionInActiveBroker === "asc" ? "▲" : "▼") : ""}
                        </th>

                        <th onClick={() => handleSortInactiveBrokers("port")} className="cursor-pointer">
                            Port {sortFieldInActiveBroker === "port" ? (sortDirectionInActiveBroker === "asc" ? "▲" : "▼") : ""}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">Loading inactive brokers...</td>
                        </tr>
                    ) :  error ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4">{error}</td>
                        </tr>
                    ) : (
                        paginatedInactiveBrokers.map(data => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.host}</td>
                                <td>{data.port}</td>
                        </tr>
                    )))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    disabled={currentPageInactiveBrokers === 1}
                    onClick={() => setCurrentPageInactiveBrokers(p => p - 1)}
                >
                    Prev
                </button>

                <span>Page {currentPageInactiveBrokers} / {totalPagesInactiveBrokers}</span>

                <button
                    disabled={currentPageInactiveBrokers === totalPagesInactiveBrokers}
                    onClick={() => setCurrentPageInactiveBrokers(p => p + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}