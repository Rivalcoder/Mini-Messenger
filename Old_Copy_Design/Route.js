import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page from "./component/login/Page";
import Loader from "./component/loader/Loader";
import ChatApp from "./component/chat/Chatapp";
export default  function Rout() {
    return (
        <BrowserRouter>        
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/loader" element={<Loader />}/>
                <Route path="/app" element={<ChatApp />} />
                <Route path="*" element={<h1 style={{color:'white'}}>404 Not Found</h1>} />
                
            </Routes>
        </BrowserRouter>
    );
}