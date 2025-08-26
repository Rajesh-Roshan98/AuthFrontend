import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
  <div className="flex flex-col items-center justify-center h-full p-6 overflow-hidden">
      <h1 className="text-3xl font-bold mb-4">Welcome to AuthApp 🎉</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        This is the Home Page. It is visible to <span className="font-semibold text-indigo-600">all users</span>, 
        whether logged in or not.
      </p>

      <div className="text-left mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-2">📝 How Login & Signup Works</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <span className="font-semibold">Signup:</span> New users can create an account by providing 
            their details (like name, email, and password). Once signed up, your account is created in 
            the system.
          </li>
          <li>
            <span className="font-semibold">Login:</span> Existing users can log in using their email 
            and password. After successful login, you’ll receive a secure token that allows you to 
            access protected pages.
          </li>
          <li>
            <span className="font-semibold">Logout:</span> You can log out anytime, which clears your 
            session and takes you back to public pages.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
