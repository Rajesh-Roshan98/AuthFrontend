import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [formType, setFormType] = useState(null); // null = show default landing page

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Navbar */}
      <Navbar setFormType={setFormType} />

      {/* Main Content */}
      <div className="flex-grow w-full h-full">
        <Routes>
          {/* Landing Page (Default) */}
          <Route
            path="/"
            element={<LandingPage formType={formType} setFormType={setFormType} />}
          />

          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup setFormType={setFormType} />} />

          {/* Protected Pages */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all → redirect to landing page */}
          <Route
            path="*"
            element={<LandingPage formType={formType} setFormType={setFormType} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
