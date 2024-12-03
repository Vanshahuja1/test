import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-500">HisabBook</h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2">
          Simplify Your Business & Personal Accounting
        </p>
        <p className="text-sm md:text-base text-gray-400 mt-1">
          Track expenses, generate receipts, and download PDFs with ease.
        </p>
      </header>

      <div className="flex flex-wrap gap-6">
        <button
          onClick={() => navigate('/home/business')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Business (व्यापार)
        </button>
        <button
          onClick={() => navigate('/home/personal')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Personal (निजी)
        </button>
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href="https://www.instagram.com/pooja__devrari/"
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
    </div>
  );
};

export default Home;
