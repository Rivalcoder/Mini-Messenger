import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js'; // Import the worker script

const QRCodeReader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const videoElem = document.getElementById('qr-video');
    const qrScanner = new QrScanner(
      videoElem,
      (result) => {
        console.log('Decoded content:', result.data);
        const { username, room } = JSON.parse(result.data);
        navigate('/chat', { state: { username, room } });
      },
      { returnDetailedScanResult: true }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, [navigate]);

  return (
    <div>
      <h1>QR Code Reader</h1>
      <video id="qr-video" style={{ width: '100%' }}></video>
    </div>
  );
};

export default QRCodeReader;
