import React, {useEffect, useState } from 'react'
import {fetchWithToken} from '../../../utils/util'
import  {useAuth} from '../../../components/AuthContext'

const Chat = () => {
    //const [currentUserId, setCurrentUserId] = useState()
    const [matchedUsers, setMatchedUsers] = useState([])
    const { currentUserId } = useAuth()

    //const { currentUserId } = useAuth()
    console.log("currentUserId in chat", currentUserId)
    console.log("url to fetch", `/localhost:8080/matches/${currentUserId}`)

    useEffect(() => {
        fetchWithToken(`http://localhost:8080/matches/${currentUserId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data)
                setMatchedUsers(data)
            })
    },[currentUserId])

    console.log("matchedUsers", matchedUsers)
    return (
        <div className="h-screen overflow-auto no-scrollbar">
            <div className="text-md font-bold">Messages</div>
            <div className="flex-1 mt-2 pb-28">
                {matchedUsers.length > 0 ? matchedUsers.map(({ id,imageUrls, nickname, userId,lastestMessage}, index) => {
                    return (
                        <div
                            className="flex mt-6"
                            key={index}
                            onClick={() => {
                                window.location.href = `/chat/${userId}`
                            }}
                        >
                            <div
                                className="flex h-20 w-20 rounded-full bg-no-repeat bg-cover mr-3"
                                style={{
                                    backgroundImage: `url(${JSON.parse(imageUrls)[0]})`,
                                }}
                            ></div>
                            <div className="flex h-20 flex-col border-gray-400 justify-top flex-grow border-b">
                                <div className="font-bold text-xl"> {nickname}</div>
                                <div className="text-gray-500 "> {lastestMessage.length>0?lastestMessage:
                                "Click to start chatting!"}</div>
                            </div>
                        </div>
                    )
                }):<div>no matched users yet, start swiping!</div>}
            </div>
        </div>
    )
}

export default Chat
