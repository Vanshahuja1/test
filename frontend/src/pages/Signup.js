import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
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
                <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            placeholder="Enter your name..."
                            value={signupInfo.name}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={signupInfo.email}
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
                            value={signupInfo.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                        Signup
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup;
