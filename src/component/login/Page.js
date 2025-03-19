import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../qr/qr-reader';
import { QrCode } from 'lucide-react';
import "./page.css";

function Page() {
    const [val, setVal] = useState('');
    const [room, setRoom] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [focusInput, setFocusInput] = useState(false);
    const navigate = useNavigate();
    const random = Math.floor(Math.random() * 9);

    // Focus on username input when room is auto-filled
    useEffect(() => {
        if (focusInput) {
            const usernameInput = document.querySelector('input[placeholder="Username"]');
            if (usernameInput) {
                usernameInput.focus();
                setFocusInput(false);
            }
        }
    }, [focusInput]);

    function handleClick() {
        if (val === '' || room === '') {
            alert('Please Enter the Details..');
            return;
        } else {
            navigate('/loader', { state: { username: val, room: room, random: random }});
        }
    }

    const toggleScanner = () => {
        setShowScanner(!showScanner);
    };

    // Handle room detection from QR
    const handleRoomDetected = (detectedRoom) => {
        setRoom(detectedRoom);
        setFocusInput(true);
        // Show toast or notification
        const roomInput = document.querySelector('input[placeholder="Create or Join Room"]');
        if (roomInput) {
            roomInput.classList.add('highlight-animation');
            setTimeout(() => {
                roomInput.classList.remove('highlight-animation');
            }, 1500);
        }
    };

    // Handle enter key for quick submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && val && room) {
            handleClick();
        }
    };

    return (
        <div className="login-container">
            <div className="animated-background">
                <div className="light-beam"></div>
                <div className="particles"></div>
            </div>
            
            <div className="login-card">
                <div className="card-header">
                    <h2>Welcome</h2>
                    <div className="card-decoration"></div>
                </div>
                
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Username" 
                            value={val}
                            onChange={(e) => { setVal(e.target.value) }}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="input-highlight"></div>
                    </div>
                    
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Create or Join Room" 
                            value={room}
                            onChange={(e) => { setRoom(e.target.value) }}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="input-highlight"></div>
                    </div>
                    
                    <div className="button-group">
                        <button 
                            type="button" 
                            className="btn connect-btn" 
                            onClick={handleClick}
                        >
                            Connect
                        </button>
                        <button 
                            type="reset" 
                            className="btn reset-btn"
                            onClick={() => {
                                setVal('');
                                setRoom('');
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </form>
                <div className='scan-btn'>
                <button className="qr-scan-button" onClick={toggleScanner}>
                    <QrCode size={18} />
                    Scan QR Code
                </button>
                </div>
                
                <p className="help-text">
                    Need Help? <a href='https://github.com/Rivalcoder' className="help-link">Ref</a>
                </p>
            </div>
            
            {showScanner && (
                <QRScanner 
                    onClose={toggleScanner} 
                    onRoomDetected={handleRoomDetected}
                />
            )}
        </div>
    );
}

export default Page;