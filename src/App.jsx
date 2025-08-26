import { Route, Routes } from "react-router-dom"
import Navbar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Logout from "./components/Logout"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ProductsPage from "./pages/ProductsPage"
import { useState } from "react";

function App() {
  const [formType, setFormType] = useState("");
  return (
    <>
      <div className="w-screen h-screen flex flex-col mx-auto">
        <div className="w-full">
          <Navbar setFormType={setFormType} />
        </div>
        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
