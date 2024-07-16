import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import logo from "./pictures/Pick-Me-Up-Logo.png";

const users = [
  {
    name: "Ileana Mai",
    status: "active",
  },
  {
    name: "Conchúr Regina",
    status: "active",
  },
  {
    name: "Raphael Gioachino",
    status: "deactivated",
  },
  {
    name: "Tadgh Masaharu",
    status: "deactivated",
  },
];

const UserCard = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4 flex items-center">
      <img src={avatar} alt="Avatar" className="h-12 w-12 rounded-full" />
      <div className="ml-4 flex-1">
        <p className="font-bold">{user.name}</p>
        <p className="text-gray-600">Status: {user.status}</p>
      </div>
      <div className="flex space-x-2">
        <button className="bg-green-500 text-white py-1 px-2 rounded">
          Enable
        </button>
        <button className="bg-red-500 text-white py-1 px-2 rounded">
          Disable
        </button>
      </div>
    </div>
  );
};

const AddAdminForm = ({ setShowForm }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
      <h2 className="text-xl font-bold mb-4">New Super Admin</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-700"
            defaultValue="Super-admin-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="border rounded w-full py-2 px-3 text-gray-700"
            defaultValue="************"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            className="border rounded w-full py-2 px-3 text-gray-700"
            defaultValue="************"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="border rounded w-full py-2 px-3 text-gray-700"
            defaultValue="Super-admin-1@gmail.com"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-500 text-white py-1 px-4 rounded"
            onClick={() => setShowForm(false)}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const ManageAdmin = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex">
      <nav className="bg-gray-800 text-white w-64 h-screen p-4">
        <ul>
          <li className="mb-2">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="mb-2">
            <a href="/users">Users</a>
          </li>
          <li className="mb-2">
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
      <div className="flex-1">
        <header className="bg-black text-white flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-yellow-500 font-bold text-xl">PickMeUp</span>
          </div>
          <button
            className="bg-blue-500 text-white py-1 px-4 rounded"
            onClick={() => setShowForm(true)}
          >
            Add New
          </button>
        </header>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Admin Users</h2>
          {showForm ? (
            <AddAdminForm setShowForm={setShowForm} />
          ) : (
            users.map((user, index) => <UserCard key={index} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
