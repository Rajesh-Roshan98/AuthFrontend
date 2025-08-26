import React, { useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ formType, setFormType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/HomePage");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 px-4">
      <div className="bg-white bg-opacity-95 rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        {formType === "Login" ? (
          <Login />
        ) : formType === "Signup" ? (
          <Signup setFormType={setFormType} />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">
              Welcome to AuthApp 🎉
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              This is your authentication landing page.  
              You can <span className="font-semibold text-indigo-600">Signup</span> 
              to create an account or <span className="font-semibold text-indigo-600">Login</span> 
              if you already have one.
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6 text-left">
              <h2 className="text-lg font-semibold text-indigo-600 mb-3">
                🔑 How It Works
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  <span className="font-medium">Signup:</span> Register with
                  email & password.
                </li>
                <li>
                  <span className="font-medium">Login:</span> Get access with
                  secure credentials.
                </li>
                <li>
                  <span className="font-medium">Session:</span> A token keeps
                  you logged in until logout.
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
