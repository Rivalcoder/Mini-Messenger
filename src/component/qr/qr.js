import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = (props) => {

  return (
    <div>
      <p>QR Code For Room</p>
      <QRCodeCanvas value={props.roomid} />
    </div>
  );
};

export default QRCodeGenerator;
