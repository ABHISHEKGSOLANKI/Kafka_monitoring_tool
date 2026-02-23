import { useEffect, useState } from "react";

export default function useKafkaStream(topic) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws/${topic}`);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [msg, ...prev.slice(0, 100)]);
    };

    return () => ws.close();
  }, [topic]);

  return messages;
}
