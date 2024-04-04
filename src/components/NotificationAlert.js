import React from 'react'

const NotificationAlert = ({ message, onClose, senderId }) => {
    const onGo = () => {
        onClose()
        window.location.href = '/chat/' + senderId
    }

    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-yellow-300 px-4 py-2 rounded-b-md shadow-lg z-50 w-3/4">
            <div className="flex justify-between items-center">
                <div>
                    <p>{message}</p>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={onGo}
                        className="bg-transparent text-black font-semibold py-1 px-2 border border-black rounded mr-2"
                    >
                        Go
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-transparent text-black font-semibold py-1 px-2 border border-black rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotificationAlert
