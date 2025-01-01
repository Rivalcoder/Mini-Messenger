import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = (props) => {

  return (
    <div>
      <p>QR Code Generator</p>
      <QRCodeCanvas value={props.roomid} />
    </div>
  );
};

export default QRCodeGenerator;
