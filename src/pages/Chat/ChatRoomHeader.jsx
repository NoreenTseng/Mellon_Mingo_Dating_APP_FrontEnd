import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
const ChatRoomHeader = ({ receiverName, receiverImgUrl }) => {
    return (
        <div className="bg-purple-bg fixed z-30 w-screen left-0 top-0 pt-4 pb-4 border-b-2">
            <ChevronLeftIcon
                className="h-7 w-7 absolute left-3"
                onClick={() => {
                    window.location.href = '/chat'
                }}
            />
            <div className="flex justify-center items-center">
                <div className="flex items-center">
                    <div
                        className="flex h-10 w-10 rounded-md bg-no-repeat bg-cover mr-3"
                        style={{ backgroundImage: `url(${receiverImgUrl})` }}
                    ></div>
                    <div className="flex flex-col">
                        <div className="text-md font-bold">{receiverName}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatRoomHeader
