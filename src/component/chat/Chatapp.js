import React, { useState, useEffect,useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCodeGenerator from '../qr/qr';
import io from 'socket.io-client';
import './chatapp.css';
import img1 from '../../Assets/icons/img1.jpg';
import img2 from '../../Assets/icons/img2.jpg';
import img3 from '../../Assets/icons/img3.jpg';
import img4 from '../../Assets/icons/img4.png';
import img5 from '../../Assets/icons/img5.jpg';
import img6 from '../../Assets/icons/img6.png'; 
import img7 from '../../Assets/icons/img7.jpg';

let socket;

function Chatapp() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username, room, random } = location.state;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const rand = [img1, img2, img3, img4, img5,img6,img7];
    const [users, setUsers] = useState([]);
    const [qrShow, setQr] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const messagesEndRef = useRef(null); // Ref for the end of the messages


    useEffect(() => {
        socket = io('wss://messenger-server-0h60.onrender.com/');

        socket.emit('joinRoom', { username, room });

        socket.on('previousMessages', (previousMessages) => {
            console.log('Previous messages received:', previousMessages);
            setMessages(previousMessages);
        });

        socket.on('User', (user) => {
            setUsers(user);
        });

        socket.on('message', (message) => {
            console.log('New message received:', message);
            setMessages((messages) => [...messages, message]);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [username, room]);

    useEffect(() => {
        // Scroll to the bottom of the messages container whenever messages update
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    function sendMessage(e) {
        e.preventDefault();
        if (message) {
            console.log(`Sending message: ${message}`);
            socket.emit('sendMessage', message);
            setMessage('');
        }
    }

    function handleLogout() {
        setMessages([]);
        setMessage('');
        socket.disconnect();
        socket.off();
        navigate('/', { replace: true });
    }

    function runQr() {
        setQr(!qrShow);
    }

    function toggleNavbar() {
        setIsNavbarOpen(!isNavbarOpen);
        
    }

    return (
        <div className="chat-body">

            <button className="navbar-btn" onClick={toggleNavbar}>{!isNavbarOpen ? '❌' : '⛩️'}</button>
                
                {/*Left Box*/}

                <div className={`navbar ${isNavbarOpen ? '' : 'hidden'}`}>
                    <h1>Chat Room Info ...</h1>
                    <img src={rand[random]} alt="logo" className="logo" />
                    <p className='username'>{username}</p>
                    <p className='room-id'>Room-Tag:{room}</p>
                    <h3>Joined-Participants..</h3>
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                    <button className='logout' onClick={handleLogout}>Logout</button>
                    <button className='qr-btn' onClick={runQr}>QR Code Generate</button>
                    {qrShow && <QRCodeGenerator roomid={room} />}
                </div>

                {/*Right Box*/}

                <div className="chat-container">
                    <h1>Welcome to the chat room</h1>

                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div key={index} className={`message  ${message.user===username ?'user':''}`}>
                                <p>{message.user}</p>
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
                        <button  type="submit">Send</button>
                    </form>
                </div>
        </div>
    );
}

export default Chatapp;
