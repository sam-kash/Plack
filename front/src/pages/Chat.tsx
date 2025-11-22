import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { connectSocket } from "../socket/socket";
import { api } from "../api/client";

interface IMessage {
  _id?: string;
  userId: string;
  text: string;
  createdAt?: string;
}

export default function Chat() {
  const { channelId } = useParams();
  const socketRef = useRef<any>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socketRef.current = connectSocket();

    socketRef.current.emit("join_channel", channelId);

    // Listen for live messages
    socketRef.current.on("new_message", (msg: IMessage) => {
      setMessages(prev => [...prev, msg]);
    });

    // Load previous messages
    loadMessages();

    return () => {
      socketRef.current.off("new_message");
    };
  }, [channelId]);

  const loadMessages = async () => {
    try {
      const res = await api.get<IMessage[]>(`/messages/${channelId}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    socketRef.current.emit("send_message", {
      channelId,
      userId: localStorage.getItem("userId"),
      text,
    });

    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat</h1>

      <div style={{
        border: "1px solid #ccc",
        height: 300,
        padding: 10,
        overflowY: "auto"
      }}>
        {messages.length === 0 && <p>No messages yet...</p>}

        {messages.map((msg, i) => (
          <div key={msg._id ?? i}>
            <strong>{msg.userId}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: 8 }}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
