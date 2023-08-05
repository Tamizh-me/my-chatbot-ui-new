// pages/index.js
import { useState } from "react";
import { client } from "@gradio/client";

export default function Home() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  async function sendMessage() {
    const app = await client(
      "https://inatomedu-tn-12-physics-chatbot.hf.space/"
    );
    const result = await app.predict(1, [inputMessage, "null"]);
    setChatHistory([...chatHistory, { user: inputMessage, bot: result?.data }]);
    setInputMessage("");
  }

  function clearChat() {
    setChatHistory([]);
  }

  return (
    <div>
      <h1>Physics Chatbot</h1>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <p>User: {message.user}</p>
            <p>Bot: {message.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Submit</button>
      <button onClick={clearChat}>Clear</button>
    </div>
  );
}
