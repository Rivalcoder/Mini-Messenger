import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../qr/qr-reader';
import { QrCode } from 'lucide-react';
import "./page.css";

function Page() {
    const [val, setVal] = useState('');
    const [room, setRoom] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const navigate = useNavigate();
    const random = Math.floor(Math.random() * 9);

    function handleClick() {
        if (val === '' || room === '') {
            alert('Please Enter the Details..');
            return;
        } else {
            alert("Welcome " + val + " to Room " + room);
            navigate('/loader', { state: { username: val, room: room, random: random }});
        }
    }

    const toggleScanner = () => {
        setShowScanner(!showScanner);
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
                
                <form className="login-form">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Username" 
                            onChange={(e) => { setVal(e.target.value) }}
                        />
                        <div className="input-highlight"></div>
                    </div>
                    
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Create or Join Room" 
                            onChange={(e) => { setRoom(e.target.value) }}
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
                        >
                            Reset
                        </button>
                    </div>
                </form>
                
                <button className="qr-scan-button" onClick={toggleScanner}>
                    <QrCode size={18} />
                    Scan QR Code
                </button>
                
                <p className="help-text">
                    Need Help? <a href='https://github.com/Rivalcoder' className="help-link">Ref</a>
                </p>
            </div>
            
            {showScanner && (
                <QRScanner onClose={toggleScanner} />
            )}
        </div>
    );
}

export default Page;