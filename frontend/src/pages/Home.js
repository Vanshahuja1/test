import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  
  const navigate = useNavigate();

  // Set logged-in user from localStorage
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);



  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="text-center mb-8 p-4 bg-gray-800 shadow-md">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-500">HisabBook</h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2">
          Welcome {loggedInUser || 'Guest'}! Simplify Your Business & Personal Accounting
        </p>
      </header>

      {/* Navigation Section */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => navigate('/business')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Business (व्यापार)
        </button>
        <button
          onClick={() => navigate('/personal')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Personal (निजी)
        </button>
      </div>

      

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        Logout
      </button>

      {/* Footer Section */}
      <footer className="mt-auto text-center text-gray-400 text-sm p-4 bg-gray-800">
        <div className="flex items-center justify-center gap-4 mb-2">
          <a
            href="https://www.instagram.com/vansh_ahuja1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://github.com/Vanshahuja1/HisabBook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/vanshahuja01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
        <p>Built with ❤️ by <span className="text-blue-400">Vansh Ahuja</span></p>
        <p>using React & TailwindCSS</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Home;
