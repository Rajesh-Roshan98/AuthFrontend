import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/getUserDetail`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success && response.data.user) {
          setUser(response.data.user);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-500">
            Loading user data...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null; // extra safety

  const fullName = `${user.firstName || ""} ${user.middleName ? user.middleName + " " : ""}${user.lastName || ""}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {fullName} 👋</h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center space-y-3">
        <p className="text-lg">
          <span className="font-semibold text-indigo-600">Name:</span> {fullName}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-indigo-600">Email:</span> {user.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-indigo-600">Role:</span> {user.role}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
