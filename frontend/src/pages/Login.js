import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = 'http://localhost:8080/auth/login';
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                localStorage.setItem('token', result.jwtToken);
                localStorage.setItem('loggedInUser', result.name);
                setTimeout(() => navigate('/home'), 1000);
                console.log('Success hogya bhaiiiiiiiiii');
            } else {
                handleError(result.message || result.error?.details[0]?.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={loginInfo.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            value={loginInfo.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;
