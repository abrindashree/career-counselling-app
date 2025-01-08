import React, { useState } from "react";
import Message from "./Message";
import { useLocation } from "react-router-dom";

function ChatBox() {
  const location = useLocation();
  const user = location.state?.user;
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];

    // Simulate bot response
    setTimeout(() => {
      const botReply = { sender: "bot", text: "This is a simulated response." };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="home-container">
      <h1>Hello {user}</h1>
      <div className="history">
        {/* <h1>history</h1> */}
      </div>
      <div className="chat-box">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
    </div>
  );
}

export default ChatBox;
