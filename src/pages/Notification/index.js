import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import NotificationList from './NotificationList'
import { useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { useWebSocket } from '../../components/WebSocketContext'

const Notification = () => {
    const { authToken } = useAuth()
    const { notifications, fetchNotifications } = useWebSocket()

    const updateNotificationStatus = async (senderId, receiverId) => {
        try {
            const response = await fetch(
                `http://localhost:8082/notifications?senderId=${senderId}&receiverId=${receiverId}`,
                {
                    method: 'PATCH',
                }
            )
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            console.log(
                `Successfully update notifications status, ${senderId}, ${receiverId}`
            )
        } catch (error) {
            console.error('Updating notification failed', error)
        }
    }

    const onClickNotification = async (receiverId, senderId) => {
        await updateNotificationStatus(senderId, receiverId)

        await fetchNotifications(receiverId)

        window.location.href = '/chat/' + senderId
    }

    useEffect(() => {
        if (authToken) {
            const decodedToken = jwtDecode(authToken)
            const userId = decodedToken.userId
            fetchNotifications(userId)
        }
    }, [authToken])

    return (
        <div>
            <ChevronLeftIcon
                className="h-7 w-7"
                onClick={() => {
                    window.history.back()
                }}
            />
            <div className="text-3xl font-bold mb-4">Notification</div>

            {notifications && notifications.length > 0 && (
                <NotificationList
                    notifications={notifications}
                    onClickNotification={onClickNotification}
                />
            )}
            {notifications && notifications.length === 0 && (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
                    <p className="text-gray-700 text-lg">
                        You have no new notifications at the moment.
                    </p>
                </div>
            )}
        </div>
    )
}
export default Notification
