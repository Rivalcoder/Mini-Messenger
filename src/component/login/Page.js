import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./page.css";
import Fall from "../Falling/fall";

// import QRCodeReader from '../qr/qr-reader';
function Page() {
    const [val, setVal] = useState('');
    const [room, setRoom] = useState('');
    const navigate = useNavigate();
    const random=Math.floor(Math.random()*9);

    function handleClick() {
        if (val === '' || room === '') {
            alert('Please Enter the Details..');
            return;
        } else {
            alert("Welcome " + val + " to Room " + room);
            navigate('/loader', { state: { username: val, room: room ,random :random}});
        }
    }

    return (
        <div>
        <Fall />
        <div className="login">
            <div className="Container">
                <form>
                    <h2 className="nothing">Welcome </h2>
                    <input type="text" className="box" placeholder="Username.." onChange={(e) => { setVal(e.target.value) }}></input>
                    <input type="text" className="box" placeholder="Create or Join Room.." onChange={(e) => { setRoom(e.target.value) }} ></input>
                    <div className="row">
                        <button type="button" onClick={handleClick}>Connect</button>
                        <button type="reset">Reset</button>
                    </div>
                    {/* {<QRCodeReader />} */}
                </form>
                <p className="ref">Need Help ? <a href='https://github.com/Rivalcoder'>Ref</a></p>
            </div>
        </div>
     </div>
    )
}

export default Page;