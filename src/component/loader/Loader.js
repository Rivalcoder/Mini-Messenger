import React, {  useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./loader.css";

const Loader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, room } = location.state || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/app', {  state: { username:username, room: room }});
        }, 3000);

        return () => clearTimeout(timer);
    });

    return (
        <div className='load-body'>
            <h1 className=''>Loading...</h1>
            <div className='loader'></div>

        </div>
    );
};

export default Loader;