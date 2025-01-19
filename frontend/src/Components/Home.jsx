import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { useLocation } from "react-router-dom";

function ChatBox() {
  const location = useLocation();
  const navigate = useNavigate()
  const user = location.state?.user;
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("jwtToken");
    if(!isAuthenticated){
      navigate("/login")
    } 
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
    navigate("/login")
  }

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: input }];
    
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
        <div className="header">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
