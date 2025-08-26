import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Remove all localStorage data
    console.clear(); // Clear console logs
    navigate("/");
  };

  return (
    <div className="overflow-hidden">
      <button
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
