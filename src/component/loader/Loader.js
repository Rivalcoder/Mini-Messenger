import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./loader.css";

function Loader() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            navigate('/app');
        }, 3000); 

        return () => clearTimeout(timer); 
    }, [navigate]);

    return (
        <div className="load-body">
            {loading ? (
                <>
                    <h1>Loading...</h1>
                    <div className="loader"></div>
                </>
            ) : null}
        </div>
    );
}

export default Loader;