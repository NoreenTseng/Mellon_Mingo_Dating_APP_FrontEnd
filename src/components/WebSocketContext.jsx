import React, { createContext, useContext, useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'
import { useAuth } from './AuthContext'
import { jwtDecode } from 'jwt-decode'

const WebSocketContext = createContext(null)

export const WebSocketProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const [chatNotification, setChatNotification] = useState(null)
    const [matchNotification, setMatchNotification] = useState(null)

    const fetchNotifications = async (receiverId) => {
        try {
            const response = await fetch(
                `http://localhost:8082/notifications?status=CREATED&receiverId=${receiverId}`
            )
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setNotifications(data)
        } catch (error) {
            console.error('Fetching notifications failed', error)
        }
    }

    const { authToken } = useAuth()
    useEffect(() => {
        if (!authToken) {
            console.log('No token found, user is not logged in yet.')
            return
        } else {
            console.log('Token is detected, user is logged in')
        }

        try {
            const decodedToken = jwtDecode(authToken)
            const userId = decodedToken.userId

            const stompClient = new Client({
                brokerURL: 'ws://localhost:8082/ws',
                debug: function (str) {
                    console.log(str)
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            })

            const onNotificationReceived = (payload) => {
                let notification = JSON.parse(payload.body)

                console.log(notification)

                if (notification.type === 'CHAT') {
                    setChatNotification(notification)
                } else if (notification.type === 'MATCH') {
                    setMatchNotification(notification)
                } else {
                    console.error('Unsupported notification', notification)
                }
            }

            stompClient.onConnect = (frame) => {
                // Do something, all subscribes must be done is this callback
                // This is needed because this will be executed after a (re)connect

                stompClient.subscribe(
                    `/topic/${userId}`,
                    onNotificationReceived
                )

                // Tell your userId to the server
                stompClient.publish({
                    destination: '/app/user-connected',
                    body: JSON.stringify({ senderId: userId }),
                })
            }

            stompClient.onStompError = (frame) => {
                // Will be invoked in case of error encountered at Broker
                // Bad login/passcode typically will cause an error
                // Complaint brokers will set `message` header with a brief message. Body may contain details.
                // Compliant brokers will terminate the connection after any error
                console.log(
                    'Broker reported error: ' + frame.headers['message']
                )
                console.log('Additional details: ' + frame.body)
            }

            stompClient.activate()

            fetchNotifications(userId)

            // Clean up on unmount
            return () => {
                stompClient.deactivate()
            }
        } catch (error) {
            console.log('Invalid token', error)
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
    }, [authToken])

    const contextValue = {
        chatNotification,
        setChatNotification,
        matchNotification,
        setMatchNotification,
        notifications,
        fetchNotifications,
    }

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocket = () => useContext(WebSocketContext)
