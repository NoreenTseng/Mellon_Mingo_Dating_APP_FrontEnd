import React, { useState } from 'react'

const LoginForm = ({ setIsRegistering }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
            alert('All fields are required')
            return
        }
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    return res.text()
                } else {
                    alert('Username or password is incorrect.')
                }
            })
            .then((data) => {
                data && localStorage.setItem('token', data)
                window.location.href = '/'
            })
    }
    return (
        <form
            className="mt-2 rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex justify-center">
                <button
                    className="bg-purple-button_bg text-[color:white] font-bold py-2 px-4 rounded-full"
                    type="submit"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    className="italic text-grey py-2 px-4 rounded focus:outline-none"
                    onClick={() => setIsRegistering(true)}
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
}
export default LoginForm
