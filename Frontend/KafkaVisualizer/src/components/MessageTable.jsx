export default function MessageTable({ messages }) {
  return (
    <table className="msg-table">
      <thead>
        <tr>
          <th>Offset</th>
          <th>Key</th>
          <th>Value</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((m, i) => (
          <tr key={i}>
            <td>{m.offset}</td>
            <td>{m.key}</td>
            <td>{JSON.stringify(m.value)}</td>
            <td>{new Date(m.timestamp).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
