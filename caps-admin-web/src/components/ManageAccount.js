import React, { useState } from "react";
import Header from "./parts/Header";

const ManageAccount = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode

  const handleUpdate = () => {
    if (newPassword === confirmPassword) {
      setMessage("Password updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
    handleUpdate(); // Call the save logic here
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
            <label
              className="block text-gray-700 mb-2"
              htmlFor="profile-picture"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mb-2"
              disabled={!isEditMode} // Disable file input unless in edit mode
            />
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="h-32 w-32 rounded-full mb-4 mx-auto"
              />
            )}
          </div>

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
              disabled={!isEditMode} // Disable input unless in edit mode
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
              disabled={!isEditMode} // Disable input unless in edit mode
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
              disabled={!isEditMode} // Disable input unless in edit mode
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
              disabled={!isEditMode} // Disable input unless in edit mode
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
              disabled={!isEditMode} // Disable input unless in edit mode
            />
          </div>

          {isEditMode ? (
            <button
              className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors w-full"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors w-full"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
