import React, { useState } from 'react';
import '../index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/v1/login`, { email, password });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // ✅ Dispatch custom login event so Navbar updates immediately
        window.dispatchEvent(new Event("login"));

        // Optional: fetch user details
        let userData = null;
        try {
          const userDetails = await axios.get(`${API_BASE}api/v1/getUserDetail`, {
            headers: { Authorization: `Bearer ${response.data.token}` }
          });
          if (userDetails.data.success) userData = userDetails.data.user;
        } catch (err) {
          console.log("Error fetching user details:", err);
        }

        navigate('/HomePage', { state: userData });

      } else {
        setError(response.data.message || "Login failed.");
      }

    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Invalid credentials or server error.");
    }

    setLoading(false);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 px-4">
      <div className="bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Login to continue</p>

        {error && <p className="mb-4 text-red-500 text-center font-medium">{error}</p>}

        <form className="space-y-4" onSubmit={loginHandler}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-black text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-black text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-indigo-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-500 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg
            ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-600 active:bg-indigo-700"}`}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <span
            className="text-indigo-500 cursor-pointer hover:underline font-medium"
            onClick={() => navigate('/Signup')}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
