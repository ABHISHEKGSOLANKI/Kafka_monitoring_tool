import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function PartitionSizeChart({ partitions }) {
  return (
    <div className="mt-5">
      <h3>Partition Size Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={partitions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="partition" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="size" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}