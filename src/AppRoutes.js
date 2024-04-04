import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Match from './pages/Match'
import Profile from './pages/Profile'
import Story from './pages/Story'
import Chat from './pages/Chat/ChatList/index.jsx'
import ChatRoom from './pages/Chat/ChatRoom/index.jsx'
import Notification from './pages/Notification'
import Login from './pages/Login'

import MobileMenuBar from './components/MenuBar'
function loggedInPage(component) {
    return (
        <div className="App pl-6 pr-6 pt-6 relative">
            {component}
            <MobileMenuBar />
        </div>
    )
}
function loggedInPageWithNoMenuBar(component) {
    return <div className="App relative">{component}</div>
}
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={loggedInPage(<Match />)} />
            <Route path="stories" element={loggedInPage(<Story />)} />
            <Route path="chat" element={loggedInPage(<Chat />)} />
            <Route
                path="chat/:id"
                element={loggedInPageWithNoMenuBar(<ChatRoom />)}
            />
            <Route
                path="notifications"
                element={loggedInPage(<Notification />)}
            />
            <Route path="profile/:id" element={loggedInPage(<Profile />)} />
            <Route path="login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes
