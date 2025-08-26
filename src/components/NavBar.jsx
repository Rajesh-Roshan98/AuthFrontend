import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ setFormType }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    checkToken(); // check immediately
    return () => window.removeEventListener("storage", checkToken);
  });

  const handleLogin = () => {
    setFormType("Login");
    navigate("/Login");
  };

  const handleSignup = () => {
    setFormType("Signup");
    navigate("/Signup");
  };

  return (
  <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-md h-16 w-full flex justify-between items-center px-6 sticky top-0 z-50 overflow-hidden">
      {/* Left - Logo / Brand */}
      <div className="text-2xl font-bold text-white tracking-wide cursor-pointer">
        <Link to="/HomePage">AuthApp</Link>
      </div>

      {/* Middle - Links */}
      <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
        <li>
          <Link to="/HomePage" className="hover:text-white transition-colors">Home</Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </li>
      </ul>

      {/* Right - Auth buttons */}
      <div className="flex gap-3">
        {isLoggedIn ? (
          <Logout />
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
