import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';

import Login from './pages/Login';
import Signup from './pages/Signup';

import Home from './pages/Home';
import Business from './components/business';
import Personal from './components/personal';
import B_Download from './components/b_download';
import P_Download from './components/p_download';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="app">
      
        {/* RefrshHandler must be inside Router */}
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/home/business" element={<PrivateRoute element={<Business />} />} />
          <Route path="/home/personal" element={<PrivateRoute element={<Personal />} />} />
          <Route path="/home/b_download" element={<PrivateRoute element={<B_Download />} />} />
          <Route path="/home/p_download" element={<PrivateRoute element={<P_Download />} />} />
        </Routes>
      
    </div>
  );
}

export default App;
