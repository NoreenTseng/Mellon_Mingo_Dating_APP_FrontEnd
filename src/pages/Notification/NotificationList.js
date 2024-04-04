import React from 'react'
import NotificationItem from './NotificationItem'

const NotificationList = ({ notifications, onClickNotification }) => {
    return (
        <div className="space-y-2">
            {notifications.map((notification, index) => (
                <NotificationItem
                    key={index}
                    notification={notification}
                    onClickNotification={onClickNotification}
                />
            ))}
        </div>
    )
}

export default NotificationList
