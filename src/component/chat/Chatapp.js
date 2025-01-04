import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCodeGenerator from '../qr/qr';
import io from 'socket.io-client';
import './chatapp.css';
import img1 from '../../Assets/icons/img1.png';
import img2 from '../../Assets/icons/img2.png';
import img3 from '../../Assets/icons/img3.png';
import img4 from '../../Assets/icons/img4.png';
import img5 from '../../Assets/icons/img5.png';
import img6 from '../../Assets/icons/img6.png'; 
import img7 from '../../Assets/icons/img7.png';
import img8 from '../../Assets/icons/img8.png'; 
import img9 from '../../Assets/icons/img9.png';
import menu from '../../Assets/menu.png';
import close from '../../Assets/close.png';

let socket;

function Chatapp() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username, room, random } = location.state || {};
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const rand = [img1, img2, img3, img4, img5, img6, img7,img8,img9];
    const [users, setUsers] = useState([]);
    const [qrShow, setQr] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const messagesEndRef = useRef(null);

    // Initialize socket and handle events
    useEffect(() => {
        socket = io('wss://messenger-server-0h60.onrender.com/');

        socket.emit('joinRoom', { username, room });

        socket.on('previousMessages', (previousMessages) => {
            setMessages(previousMessages);
        });

        socket.on('User', (user) => {
            setUsers(user);
        });

        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message]);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [username, room]);

    // Scroll to the latest message when messages update
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    
    if (!username || !room) {
        navigate('/', { replace: true });
        return(<center><h1 style={{color:'whitesmoke'}}>Please Login to Continue</h1></center>);
    }

    // Send message handler
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('sendMessage', message.trim());
            setMessage('');
        }
    };

    // Handle logout
    const handleLogout = () => {
        setMessages([]);
        setMessage('');
        socket.disconnect();
        socket.off();
        navigate('/', { replace: true });
    };

    // Toggle QR code display
    const runQr = () => {
        setQr(!qrShow);
    };

    // Toggle navbar visibility
    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Render the chat app
    return (
        <div className="chat-body">
            {/* Left Box */}
            <div className={`navbar ${isNavbarOpen ? '' : 'hidden'}`}>
                <h2 className="heading0">Chat Room Info ...</h2>
                <img src={rand[random]} alt="logo" className="logo" />
                <p className="username">{username}</p>
                <p className="room-id">Room-Tag: {room}</p>
                <h3 className="header-par">Joined-Participants..</h3>
                <ul className="list-par">
                    {users.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
                <button className="logout" onClick={handleLogout}>
                    Logout
                </button>
                <button className="qr-btn" onClick={runQr}>
                    QR Code Generate
                </button>
                <div className="qr">{qrShow && <QRCodeGenerator roomid={room} />}</div>
            </div>

            {/* Right Box */}
            <div className="chat-container">
                <button className="navbar-btn" onClick={toggleNavbar}>
                    {isNavbarOpen ? (
                        <img className="menu" src={menu} alt="Menu Icon" />
                    ) : (
                        <img className="menu" src={close} alt="Close Icon" />
                    )}
                </button>
                <h1 className="heading animate__backInDown">Welcome to chat room</h1>

                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${
                                message.user === username ? 'user' : ''
                            }`}
                        >
                            <p className="username-col">{message.user}</p>
                            <p>{message.text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
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
        </div>
    );
}

export default Chatapp;
