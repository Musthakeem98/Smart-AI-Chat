// src/Chat.js
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [type, setType] = useState("city");
  const [sessionId, setSessionId] = useState(generateSessionId());
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  function generateSessionId() {
    return Math.random().toString(36).substring(2, 10);
  }

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message and a loading placeholder for bot
    const newMessage = { user: input, response: "loading" };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Clear input immediately
    setInput("");

    const index = updatedMessages.length - 1;

    try {
      const response = await axios.post("http://localhost:5678/webhook-test/chat", {
        message: newMessage.user,
        type,
        sessionId,
        previousChats: messages.map(m => `${m.user}: ${m.response}`).join("\n"),
      });

      // Update last message with actual bot response
      updatedMessages[index].response = response.data.output;
      setMessages([...updatedMessages]);
    } catch (err) {
      console.error(err);
      updatedMessages[index].response = "Error: Backend is offline.";
      setMessages([...updatedMessages]);
    }
  };

  return (
    <div className="chat-container">
      <h2>React Chat Application</h2>

      <div className="chat-controls">
        <select
          value={type}
          onChange={e => {
            setType(e.target.value);
            setMessages([]);
            setSessionId(generateSessionId());
          }}
        >
          <option value="city">CityView AI</option>
          <option value="energy">Energy Bot</option>
          <option value="health">Health Bot</option>
        </select>
      </div>

      <div className="chat-area">
        {messages.map((m, i) => (
          <div key={i} className="chat-message">
            <div className="user-message">{m.user}</div>
            <div className={`bot-message`}>
              {m.response === "loading" ? (
                <span className="dots"></span>
              ) : (
                <ReactMarkdown>{m.response}</ReactMarkdown>
              )}
            </div>

          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
