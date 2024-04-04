import { BellIcon } from '@heroicons/react/24/outline'
import { useWebSocket } from './WebSocketContext'

const NotificationLink = () => {
    const { notifications } = useWebSocket()

    return (
        <span
            className={`relative h-9 w-9 rounded-full flex items-center justify-center bg-[color:white] shadow-md`}
            onClick={() => {
                window.location.href = '/notifications'
            }}
        >
            {notifications && notifications.length > 0 && (
                <span
                    className={`h-3 w-3 absolute top-0 right-0 rounded-full bg-purple-bell`}
                ></span>
            )}
            <BellIcon className="h-6 w-6 text-black right-0" />
        </span>
    )
}
export default NotificationLink
