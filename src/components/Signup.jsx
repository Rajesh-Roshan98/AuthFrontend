import React, { useState, useEffect } from "react";
import '../index.css';
import axios from "axios";
import { Mail, Lock, User, Hash, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Load Backend URL from .env
const API_BASE = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  // OTP countdown timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email.");
    setLoadingOtp(true);
    try {
      await axios.post(`${API_BASE}/api/v1/sendotp`, { email });
      toast.success("OTP sent successfully!");
      setOtpSent(true);
      setOtpTimer(60);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send OTP!");
    } finally {
      setLoadingOtp(false);
    }
  };

  // Verify OTP
  const handleOtpNext = async () => {
    if (!otp) return toast.error("Please enter the OTP.");
    setLoadingNext(true);
    try {
      const response = await axios.post(`${API_BASE}/api/v1/verifyotp`, { email, otp });
      if (response.data.success) {
        setStep(2);
        toast.success("OTP verified successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoadingNext(false);
    }
  };

  // Signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !role || !email || !password || !otp) {
      return toast.error("Please fill all required fields.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (password.length < 6 || !/\d/.test(password)) {
      return toast.error("Password must be at least 6 characters and contain a number.");
    }

    setLoadingSignup(true);
    try {
      await axios.post(`${API_BASE}/api/v1/signup`, {
        firstName, middleName, lastName, role, email, password, otp
      });
      toast.success("Account created successfully!");
      setTimeout(() => window.location.href = "/login", 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed!");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800">
      <Toaster position="top-right" />
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          {step === 1 ? "Verify Your Email" : "Complete Your Signup"}
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent || loadingOtp}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {!otpSent && (
              <button
                onClick={handleSendOtp}
                disabled={loadingOtp}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                  loadingOtp ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                {loadingOtp ? (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : "Send OTP"}
              </button>
            )}

            {otpSent && (
              <>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={handleOtpNext}
                    disabled={loadingNext}
                    className={`w-1/2 py-2 px-4 rounded-lg text-white ${
                      loadingNext ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {loadingNext ? (
                      <div className="flex justify-center">
                        <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : "Next"}
                  </button>

                  <button
                    onClick={handleSendOtp}
                    disabled={otpTimer > 0 || loadingOtp}
                    className={`w-1/2 ml-2 py-2 px-4 rounded-lg text-white ${
                      otpTimer > 0 || loadingOtp ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                    }`}
                  >
                    {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">Teacher</option>
              <option value="Manager">Student</option>
            </select>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <input type="hidden" value={otp} name="otp" />

            <button
              type="submit"
              disabled={loadingSignup}
              className={`w-full py-2 px-4 rounded-lg text-white ${
                loadingSignup ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
              }`}
            >
              {loadingSignup ? (
                <div className="flex justify-center">
                  <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : "Create Account"}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <span
            className="text-indigo-500 cursor-pointer hover:underline"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
