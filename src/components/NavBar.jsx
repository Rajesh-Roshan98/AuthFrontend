import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loggingOut, setLoggingOut] = useState(false);

  // Listen for token changes or custom login event
  useEffect(() => {
    const updateLogin = () => setIsLoggedIn(!!localStorage.getItem("token"));

    window.addEventListener("storage", updateLogin); // For other tabs
    window.addEventListener("login", updateLogin);   // Custom login event

    updateLogin(); // check immediately on mount

    return () => {
      window.removeEventListener("storage", updateLogin);
      window.removeEventListener("login", updateLogin);
    };
  }, []);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      console.clear();
      setIsLoggedIn(false);
      navigate("/");
      setLoggingOut(false);
    }, 500);
  };

  return (
    <>
      {/* Global Spinner Overlay */}
      {loggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <nav className="bg-white shadow-md h-16 w-full flex justify-between items-center px-6 sticky top-0 z-50">
        {/* Left - Logo */}
        <div className="text-2xl font-bold text-indigo-700 tracking-wide cursor-pointer">
          <Link to="/">AuthApp</Link>
        </div>

        {/* Middle - Links */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
          <li><Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link></li>
          <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
        </ul>

        {/* Right - Auth Buttons / Logout */}
        <div className="flex gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1.5 rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-200"
              disabled={loggingOut}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-full shadow-md transition transform hover:scale-105"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-1.5 rounded-full shadow-md transition transform hover:scale-105"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
