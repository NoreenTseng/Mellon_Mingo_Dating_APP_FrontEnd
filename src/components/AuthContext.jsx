import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { fetchWithToken } from '../utils/util'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)
    const [currentUserName, setCurrentUserName] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuthToken(token)
            try {
                const decodedToken = jwtDecode(token)
                console.log('UserID:', token, decodedToken)
                setCurrentUserId(decodedToken?.userId)
                setCurrentUserName(decodedToken?.sub)
            } catch (error) {
                localStorage.removeItem('token')
                window.location.href = '/login'
            }
        } else {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        currentUserId &&
            fetchWithToken(
                `http://localhost:8080/profiles/user/${currentUserId}`
            ).then((res) => {
                if (res.status === 404) {
                    navigate('/profile/edit')
                }
            })
    }, [currentUserId])

    const contextValue = {
        authToken,
        setAuthToken,
        currentUserId,
        currentUserName,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
