import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import { X, Camera } from 'lucide-react';
import './qr-styles.css';

const QRScanner = ({ onClose, onRoomDetected }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const [scanError, setScanError] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize the QR scanner
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          try {
            // Parse the QR code data
            const data = JSON.parse(result.data);
            
            // Check if the QR code contains valid room information
            if (data && data.room) {
              // Use the username from QR code or default to null (will be filled by user)
              const username = null;
              const room = data.room;
              
              // Stop scanning
              setScanning(false);
              
              if (username) {
                // If username is in QR, we can proceed directly to loader/chat
                onClose();
                // Generate a random avatar index
                const random = Math.floor(Math.random() * 9);
                navigate('/loader', { state: { username, room, random } });
              } else {
                // If only room is in QR, close scanner and fill room field
                if (onRoomDetected) {
                  onRoomDetected(room);
                }
                onClose();
              }
            } else {
              setScanError('Invalid QR code format');
            }
          } catch (error) {
            setScanError('Could not parse QR code data');
          }
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 3,
        }
      );

      // Start scanning
      scannerRef.current.start().catch(error => {
        setScanError(`Camera error: ${error.message}`);
      });
    }

    // Cleanup function
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
      }
    };
  }, [navigate, onClose, onRoomDetected]);

  return (
    <div className="qr-scanner-container">
      <div className="qr-scanner-header">Scan QR Code</div>
      
      <div className="qr-scanner-frame">
        <video ref={videoRef} className="qr-video" />
        <div className="qr-scanner-overlay"></div>
      </div>
      
      {scanError ? (
        <p className="qr-scanner-instructions" style={{ color: '#ff6b6b' }}>
          {scanError}
        </p>
      ) : (
        <p className="qr-scanner-instructions">
          {scanning ? 'Position the QR code within the frame to scan and join a room' : 'QR code detected! Processing...'}
        </p>
      )}
      
      <button className="qr-scanner-close" onClick={onClose}>
        <X size={16} style={{ marginRight: '4px' }} /> Close Scanner
      </button>
    </div>
  );
};

export default QRScanner;