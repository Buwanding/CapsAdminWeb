// src/components/screens/Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../pictures/Pick-Me-Up-Logo.png";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login validation here
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-row items-center">
        <div className="w-full max-w-sm mr-8">
          <h1 className="text-3xl font-bold mb-8">Admin</h1>
          <input
            className="border p-3 mb-4 w-full rounded"
            type="text"
            placeholder="Enter username here"
          />
          <input
            className="border p-3 mb-6 w-full rounded"
            type="password"
            placeholder="Enter password here"
          />
          <button
            className="bg-black text-white p-3 w-full rounded"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>

        <div>
          <img src={logo} alt="PMU Logo" className="w-48 h-48" />
        </div>
      </div>
    </div>
  );
};

export default Login;
