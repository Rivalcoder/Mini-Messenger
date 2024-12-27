import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './chatapp.css'; // Import the CSS file

let socket;

function Chatapp() {
    const location = useLocation();
    const { username, room } = location.state;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket = io('http://localhost:5000');

        socket.emit('joinRoom', { username, room });

        socket.on('previousMessages', (previousMessages) => {
            console.log('Previous messages received:', previousMessages); // Log previous messages
            setMessages(previousMessages);
        });

        socket.on('message', (message) => {
            console.log('New message received:', message); // Log the message to verify reception
            setMessages((messages) => [...messages, message]);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [username, room]);

    function sendMessage(e) {
        e.preventDefault();
        if (message) {
            console.log(`Sending message: ${message}`);
            socket.emit('sendMessage', message);
            setMessage('');
        }
    }

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user === username ? 'user' : ''}`}>
                        <p>{message.user}: {message.text}</p>
                    </div>
                ))}
            </div>
            <form className="form-container" onSubmit={sendMessage}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chatapp;