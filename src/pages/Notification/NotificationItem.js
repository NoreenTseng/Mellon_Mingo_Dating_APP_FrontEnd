import React from 'react'

const NotificationItem = ({ notification, onClickNotification }) => {
    let title = 'Dummy Title'
    if (notification.type === 'CHAT') {
        title = 'New Chat Message!'
    } else if (notification.type === 'MATCH') {
        title = 'New Match!'
    }

    return (
        <div
            className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
            role="alert"
            onClick={() => {
                onClickNotification(
                    notification.receiverId,
                    notification.senderId
                )
            }}
        >
            <strong className="font-bold">{title}</strong>
            <span className="block sm:inline">{notification.content}</span>
        </div>
    )
}

export default NotificationItem
