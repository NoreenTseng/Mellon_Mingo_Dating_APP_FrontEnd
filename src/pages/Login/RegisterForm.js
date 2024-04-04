import React, { useState } from 'react'
const RegisterForm = ({ setIsRegistering }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
            alert('All fields are required')
            return
        }
        // Handle registration logic here
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.username) {
                    alert('Registration successful!') // Display success alert
                    window.location.href = '/login'
                } else {
                    alert('Registration failed!') // Display error alert if registration failed
                }
            })
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="mt-2 rounded px-8 pt-6 pb-8 mb-4"
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
                    required
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
                    required
                    id="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="italic text-grey py-2 px-4 rounded focus:outline-none"
                    onClick={() => setIsRegistering(false)}
                >
                    Sign In
                </button>
                <button
                    className="bg-purple-button_bg text-[color:white] font-bold py-2 px-4 rounded-full"
                    type="submit"
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
}
export default RegisterForm
