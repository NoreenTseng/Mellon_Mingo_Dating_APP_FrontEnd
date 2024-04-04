import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useAuth } from '../../components/AuthContext'
const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false)
    const { authToken } = useAuth()
    if (authToken) {
        window.location.href = '/'
    }
    return (
        <div>
            <div className="bg-login-bg h-screen">
                <img
                    className="w-screen"
                    src="../images/login/Avatar.png"
                    alt="avatar"
                />
                <p className="text-center text-2xl font-bold font-sans">
                    Meet New People At CMU-SV
                </p>
                {!isRegistering ? (
                    <LoginForm setIsRegistering={setIsRegistering} />
                ) : (
                    <RegisterForm setIsRegistering={setIsRegistering} />
                )}
                )
            </div>
        </div>
    )
}
export default Login
