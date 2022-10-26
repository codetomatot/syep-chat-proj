import React from 'react';
import { Route, Routes } from "react-router-dom";
// import { Switch }

import Landing from './components/Landing';
import Test from "./components/Test";
import Chats from "./components/Chats";
// import Chat from "./components/Chat";
import Info from './components/Info';


export default function MainRoutes(props) {
    return (
        <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/test" element={<Test /> } />
            <Route exact path="/chats" element={<Chats />} />
        </Routes>
    )
}