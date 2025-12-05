import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  // Redirect logged-in users to home
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl text-center">
        {/* Welcome Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to AuthApp 🚀
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          AuthApp is a simple, secure, and modern authentication system.  
          Login or signup to access protected pages like Home, Products, About, and Contact.
        </p>

        {/* Authentication Flow */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm text-left">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            🔐 How Authentication Works
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>1. Signup:</strong> Create an account with your email and password.
            </li>

            <li>
              <strong>2. Login:</strong> Verify your credentials securely.
            </li>

            <li>
              <strong>3. Token Generation:</strong> After login, a secure token (JWT) is issued.
            </li>

            <li>
              <strong>4. Auto Session:</strong> The token is stored for seamless access to protected pages.
            </li>

            <li>
              <strong>5. Protected Routes:</strong> Only authenticated users can view pages like Home, Products, About, and Contact.
            </li>

            <li>
              <strong>6. Logout:</strong> Logging out removes the token and ends your session.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
