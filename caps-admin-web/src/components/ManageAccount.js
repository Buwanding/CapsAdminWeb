import React, { useState } from "react";
import Header from "./parts/Header";

const ManageAccount = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = () => {
    // Update account logic
    if (newPassword === confirmPassword) {
      setMessage("Password updated successfully!");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Manage Account</h2>

          {message && (
            <div className="mb-4 text-green-600 text-center">{message}</div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-indigo-500 text-white py-3 px-6 rounded-md hover:bg-indigo-600 transition-colors w-full"
            onClick={handleUpdate}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
