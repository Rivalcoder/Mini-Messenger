import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page from "./component/login/Page";
import Loader from "./component/loader/Loader";
import Chat from "./component/ref/Chat";
import ChatApp from "./component/chat/Chatapp";
export default  function Rout() {
    return (
        <BrowserRouter>        
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/load" element={<ChatApp />}/>
                <Route path="/loader" element={<Loader />}/>
                <Route path="/chat" element={<Chat />} />
                <Route path="/app" element={<ChatApp />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
                
            </Routes>
        </BrowserRouter>
    );
}