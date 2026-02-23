import BrokerCard from "../components/BrokersCard";
import ProducersCard from "../components/ProducersCard";
import TopicsCard from "../components/TopicsCard";
import ConsumersCard from "../components/ConsumersCard";

export default function Dashboard() {

  return (
    <div className="grid grid-cols-12 gap-6">

      {/* Top Metrics */}
      <BrokerCard />
      <TopicsCard />
      <ProducersCard />
      <ConsumersCard />

      <div className="col-span-12 md:col-span-6 xl:col-span-3 bg-slate-800 text-gray-200 rounded-xl p-5 shadow">
        <h3 className="text-sm text-gray-400">Lag</h3>
        <div className="text-3xl font-semibold mt-2">120</div>
      </div>

      {/* Main Graph */}
      <div className="col-span-12 xl:col-span-8 bg-slate-800 text-gray-200 rounded-xl p-6 shadow min-h-80">
        <h3 className="text-gray-400">Throughput Graph</h3>
      </div>

      {/* Side Panels */}
      <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-slate-800 text-gray-200 rounded-xl p-6 shadow min-h-80">
        <h3 className="text-gray-400">Partition Health</h3>
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-slate-800 text-gray-200 rounded-xl p-6 shadow min-h-80">
        <h3 className="text-gray-400">Recent Messages</h3>
      </div>

    </div>
  );
}
