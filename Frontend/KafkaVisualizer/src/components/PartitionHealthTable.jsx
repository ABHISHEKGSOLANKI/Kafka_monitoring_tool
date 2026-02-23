import { getPartitionHealth, getHealthColor } from "../utils/healthUtils";

export default function PartitionHealthTable({ partitions }) {
  return (
    <div className="mt-4">
      <h3>Partition Health</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Partition</th>
            <th>Leader</th>
            <th>Replicas</th>
            <th>ISR</th>
            <th>Size (MB)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {partitions.map((p) => {
            const status = getPartitionHealth(p);

            return (
              <tr key={p.partition}>
                <td>{p.partition}</td>
                <td>{p.leader}</td>
                <td>{p.replicas.join(", ")}</td>
                <td>{p.isr.join(", ")}</td>
                <td>{p.size}</td>

                <td style={{ color: getHealthColor(status), fontWeight: "bold" }}>
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}