import React, { useState, useRef, useEffect } from 'react'
import ChatRoomHeader from '../ChatRoomHeader'
import { ArrowSmallUpIcon } from '@heroicons/react/24/solid'
import ImageUploader from '../../../components/ImageUploader'
import { fetchWithToken, ifToday, timeWithMinute } from '../../../utils/util'
import { useWebSocket } from '../../../components/WebSocketContext'
import { useAuth } from '../../../components/AuthContext'
const ChatRoom = () => {
    const userId = window.location.pathname.split('/').pop()
    const [receiverName, setReceiverName] = useState('')
    const [receiverImgUrl, setReceiverImgUrl] = useState('')
    useEffect(() => {
        fetchWithToken(`http://localhost:8080/profiles/user/${userId}`)
            .then((res) => res.json())
            .then((res) => {
                setReceiverName(res.nickname)
                setReceiverImgUrl(JSON.parse(res.imageUrls)[0])
            })
            .catch((err) => {
                console.log(err)
            })
    })

    const receiverUserId = window.location.pathname.split('/').pop()
    const [uploadedImgUrl, setUploadedImgUrl] = useState('')
    const { currentUserId } = useAuth()
    const { chatNotification } = useWebSocket()

    console.log('-------chatttttt message-------------', chatNotification)
    const [messageData, setMessageData] = useState([])
    useEffect(() => {
        if (
            chatNotification &&
            chatNotification.senderId === Number(receiverUserId)
        ) {
            fetchRoomData()
        }
    }, [JSON.stringify(chatNotification)])
    const fetchRoomData = async () => {
        fetchWithToken(
            `http://localhost:8080/messages/${receiverUserId}/${currentUserId}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setMessageData(
                    data.map((item) => ({
                        ...item,
                        timestamp: new Date(item.timestamp).getTime(),
                    }))
                )
            })
    }
    useEffect(() => {
        currentUserId && fetchRoomData()
    }, [currentUserId])
    const [newMessage, setNewMessage] = useState('')
    const containerRef = useRef(null)
    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSendMessage = async () => {
        if (newMessage) {
            await fetchWithToken('http://localhost:8080/messages', {
                method: 'POST',
                body: JSON.stringify({
                    senderId: currentUserId,
                    receiverId: Number(receiverUserId),
                    content: newMessage,
                    contentType: 'text',
                }),
            })
        }
        if (uploadedImgUrl) {
            await fetchWithToken('http://localhost:8080/messages', {
                method: 'POST',
                body: JSON.stringify({
                    senderId: currentUserId,
                    receiverId: Number(receiverUserId),
                    content: uploadedImgUrl,
                    contentType: 'image',
                }),
            })
        }
        if (uploadedImgUrl) {
            setMessageData([
                ...messageData,
                {
                    content: uploadedImgUrl,
                    contentType: 'image',
                    senderId: currentUserId,
                    timestamp: new Date().valueOf().toString(),
                },
            ])
            setUploadedImgUrl('')
            setTimeout(() => scrollToTop(), 300)
        }
        if (newMessage) {
            setMessageData([
                ...messageData,
                {
                    content: newMessage,
                    contentType: 'text',
                    senderId: currentUserId,
                    timestamp: new Date().valueOf().toString(),
                },
            ])
            setNewMessage('')
            setTimeout(() => scrollToTop(), 300)
        }
    }
    useEffect(() => {
        scrollToTop()
    }, [messageData])
    const scrollToTop = () => {
        if (containerRef.current) {
            const container = containerRef.current
            const scrollToPosition =
                container.scrollHeight - container.clientHeight
            container.scrollTo({
                top: scrollToPosition,
                behavior: 'auto',
            })
        }
    }
    return (
        <div className="flex h-screen">
            <ChatRoomHeader
                receiverName={receiverName}
                receiverImgUrl={receiverImgUrl}
            />
            <div
                className="mt-20 p-6 pb-12 overflow-y-scroll w-full"
                ref={containerRef}
            >
                {messageData.map(
                    ({ content, contentType, senderId, timestamp }, index) => {
                        return (
                            <div key={index}>
                                {(index === 0 ||
                                    +timestamp -
                                        +messageData[index - 1]?.timestamp >
                                        1000 * 60 * 24 * 60) && (
                                    <div className="text-center text-gray-500 text-xs mb-4">
                                        {ifToday(+timestamp)
                                            ? 'Today'
                                            : new Date(
                                                  +timestamp
                                              ).toLocaleDateString()}
                                    </div>
                                )}

                                <div className="flex-1 overflow-y-auto">
                                    <div className="flex items-center mb-4">
                                        {senderId !== currentUserId && (
                                            <>
                                                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                                                    <img
                                                        className="rounded-full w-10 h-10"
                                                        src={receiverImgUrl}
                                                        alt={receiverName}
                                                    />
                                                </div>
                                                <div className="flex w-auto bg-gray-200 text-black p-4 pb-5 pr-8 rounded-lg mb-2 relative">
                                                    <div className="inline-block w-auto">
                                                        {contentType ===
                                                            'image' && (
                                                            <img
                                                                src={content}
                                                                alt=""
                                                            />
                                                        )}
                                                        {contentType ===
                                                            'text' && content}
                                                    </div>

                                                    <div className="text-gray-500 w-auto absolute right-0 mb-1 mr-3 bottom-0 text-xs">
                                                        {timeWithMinute(
                                                            +timestamp
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center flex-row-reverse mb-4">
                                    {senderId === currentUserId && (
                                        <div className="flex w-auto bg-purple-bell text-white p-4 pb-5 pr-8  rounded-lg mb-2 relative">
                                            <div className="inline-block w-auto">
                                                {contentType === 'image' && (
                                                    <img src={content} alt="" />
                                                )}
                                                {contentType === 'text' &&
                                                    content}
                                            </div>

                                            <div className="text-gray-100 w-auto absolute right-0 mb-1 mr-3 bottom-0 text-xs">
                                                {timeWithMinute(+timestamp)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                )}
            </div>

            <div className="pb-4 bg-purple-bg w-full left-0 flex items-center border-t p-2 fixed bottom-0">
                <ImageUploader
                    uploadedImgUrl={uploadedImgUrl}
                    setUploadedImgUrl={setUploadedImgUrl}
                />
                <div className="w-full mx-2">
                    <input
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                        type="text"
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        placeholder="Message"
                        autoFocus
                    />
                </div>

                <div>
                    <button
                        className="inline-flex  bg-purple-bell text-white rounded-full p-2"
                        type="button"
                        onClick={handleSendMessage}
                    >
                        <ArrowSmallUpIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ChatRoom
