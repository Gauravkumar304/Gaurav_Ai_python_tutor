"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "system", content: "Hello! I am your Python tutor. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post("/api/chat", { messages: newMessages });
      setMessages([...newMessages, { role: "assistant", content: response.data.reply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl h-[90vh] bg-white shadow-lg rounded-xl flex flex-col p-6">
        
        {/* Chat Header */}
        <div className="text-center font-semibold text-xl pb-4 border-b">Python AI Tutor</div>

        {/* Chat Messages (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-lg shadow-md max-w-[75%] ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <strong>{msg.role === "user" ? "You" : "Tutor"}:</strong> {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box & Send Button */}
        <div className="flex items-center gap-3 border-t pt-3">
          <input
            ref={inputRef}
            className="flex-1 p-3 border rounded-lg text-black outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me a Python question.."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleSend}
          > 
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
