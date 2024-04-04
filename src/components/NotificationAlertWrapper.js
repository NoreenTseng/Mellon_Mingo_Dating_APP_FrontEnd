import React, { useState, useEffect } from 'react'
import NotificationAlert from './NotificationAlert'
import { useWebSocket } from './WebSocketContext'
import { useLocation } from 'react-router-dom'

const NotificationAlertWrapper = () => {
    const location = useLocation()

    const [showNotification, setShowNotification] = useState(false)
    const [notification, setNotification] = useState(null)
    const { matchNotification, chatNotification } = useWebSocket()

    useEffect(() => {
        if (
            matchNotification &&
            location.pathname !== `/chat/${matchNotification.senderId}`
        ) {
            setNotification(matchNotification)
            setShowNotification(true)
        }
    }, [matchNotification, location.pathname])

    useEffect(() => {
        if (
            chatNotification &&
            location.pathname !== `/chat/${chatNotification.senderId}`
        ) {
            setNotification(chatNotification)
            setShowNotification(true)
        }
    }, [chatNotification, location.pathname])

    return (
        <div>
            {showNotification && (
                <NotificationAlert
                    message={notification.content}
                    onClose={() => setShowNotification(false)}
                    senderId={notification.senderId}
                />
            )}
        </div>
    )
}

export default NotificationAlertWrapper
