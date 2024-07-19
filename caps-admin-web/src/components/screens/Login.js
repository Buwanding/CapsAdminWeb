// src/components/screens/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../pictures/Pick-Me-Up-Logo.png";
import API_URL from "../../api_url";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      const response = await axios.post(API_URL + "user/login", {
          email,
          password,
      });

      const { token, role } = response.data;

      if (role !== 1 && role !== 2) {
        setError("Unauthorized access");
        setIsLoading(false);
        return;
      }

      login(token, role);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
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
              className="bg-black text-white p-3 w-full rounded flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Log in'
              )}
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