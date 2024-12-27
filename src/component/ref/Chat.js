import React, { useState } from "react";
import "./chat.css";

function Chat() {
    const [message, chatbox] = useState([]);
    const [inputbox, setInputValue] = useState("");
    function send() {
        chatbox([...message, inputbox]);
        setInputValue("");
        console.log(inputbox);
    }
    
  return (
    <div className="chat">
      <div className="chat-container">
        <h1>Chat-Room</h1>
        <div className="chat-box">
            <h2>Chat-Box</h2>            
            {message.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
        </div>
        <div>
        <input type="text" placeholder="Enter Here.." value={inputbox} onChange={(e) => setInputValue(e.target.value)} ></input>
        <button onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
export default Chat;