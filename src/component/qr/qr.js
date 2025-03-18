import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './qr-styles.css';

const QRCodeGenerator = ({ roomid, username }) => {
  // Create a QR code that contains both the room ID and username
  const qrValue = JSON.stringify({
    room: roomid,
    username: username || 'Guest' // Default to Guest if username is not provided
  });

  return (
    <div className="qr-container">
      <p className="qr-title">Room QR Code</p>
      <div className="qr-code-wrapper">
        <QRCodeCanvas 
          value={qrValue} 
          size={180}
          bgColor="#ffffff"
          fgColor="#5964e0"
          level="H"
          includeMargin={true}
        />
      </div>
      <p className="qr-instructions">Scan to join room #{roomid}</p>
    </div>
  );
};

export default QRCodeGenerator;