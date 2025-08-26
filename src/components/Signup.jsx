import React, { useState } from "react";
import '../index.css';
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, User, Hash} from "lucide-react";

const Signup = () => {
  const [step, setStep] = useState(1); // step 1 = email+OTP, step 2 = signup details
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  // 1️⃣ Send OTP
  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/sendotp", { email });
      alert("OTP sent to your email!");
      setOtpSent(true); // now show OTP input
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP!");
    }
  };

  // 2️⃣ Move to signup form after entering OTP
  const handleOtpNext = () => {
    if (!otp) {
      alert("Please enter the OTP sent to your email.");
      return;
    }
    setStep(2); // move to signup form
  };

  // 3️⃣ Complete Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/signup", {
        firstName,
        middleName,
        lastName,
        role,
        email,
        password,
        otp
      });
      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
  <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800">
  <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md max-h-screen overflow-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">
          {step === 1 ? "Verify Your Email" : "Complete Your Signup"}
        </h2>

        {/* STEP 1: Email + OTP */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Show Send OTP button initially */}
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
              >
                Send OTP
              </button>
            )}

            {/* After OTP is sent → Show OTP input + Next button */}
            {otpSent && (
              <>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                <button
                  onClick={handleOtpNext}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                >
                  Next
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 2: Signup Form */}
        {step === 2 && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {/* Hidden OTP field for backend verification */}
            <input type="hidden" value={otp} name="otp" />
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
            >
              Create Account
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
