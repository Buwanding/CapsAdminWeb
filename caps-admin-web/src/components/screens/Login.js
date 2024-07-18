// src/components/screens/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../pictures/Pick-Me-Up-Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://192.168.133.124:8000/api/user/login", {
        email,
        password,
      });
  
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
  
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err); // This will log the full error object
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-row items-center">
        <div className="w-full max-w-sm mr-8">
          <h1 className="text-3xl font-bold mb-8">Admin</h1>
          <form onSubmit={handleLogin}>
            <input
              className="border p-3 mb-4 w-full rounded"
              type="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="border p-3 mb-6 w-full rounded"
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-black text-white p-3 w-full rounded"
            >
              Log in
            </button>
          </form>
        </div>

        <div>
          <img src={logo} alt="PMU Logo" className="w-48 h-48" />
        </div>
      </div>
    </div>
  );
};

export default Login;