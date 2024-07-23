import React, { useEffect, useState } from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";

const UserCard = ({ admin, onStatusChange }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    try {
      setLoading(true); // Set loading state to true
      const newStatus = admin.status === "Active" ? "Disabled" : "Active";
      await userService.updateAdminStatus(admin.user_id, newStatus);
      onStatusChange(admin.user_id, newStatus);
    } catch (error) {
      console.error(`Error updating user status for user ${admin.user_id}:`, error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4 flex items-center">
      <img src="" alt="Avatar" className="h-12 w-12 rounded-full" />
      <div className="ml-4 flex-1">
        <p className="font-bold">{admin.first_name} {admin.last_name}</p>
        <p className="text-gray-400 font-bold">
          Status: <span className={`${admin.status === "Active" ? "text-green-600" : "text-red-600"}`}>
            {admin.status}
          </span>
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          className={`${admin.status === "Active" ? "bg-red-500" : "bg-green-500"} text-white py-1 px-2 rounded flex items-center justify-center`}
          onClick={handleStatusChange}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            admin.status === "Active" ? "Disable" : "Enable"
          )}
        </button>
      </div>
    </div>
  );
};

const AddAdminForm = ({ setShowForm }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
      <h2 className="text-xl font-bold mb-4">New Admin</h2>
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
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await userService.fetchAdmin();
        setAdmin(data);
      } catch (error) {
        console.error("There was an error fetching the Admins!", error);
      }
    };

    fetchAdmin();
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    console.log("handleStatusChange called with:", userId, newStatus);
    setAdmin(prevAdmin => {
      const newAdmin = prevAdmin.map(admin => 
        admin.user_id === userId ? {...admin, status: newStatus} : admin
      );
      return newAdmin;
    });
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="flex">
            <div className="flex-1">
              <header className="bg-black text-white flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white-500 font-bold text-xl">
                    Admin Users
                  </span>
                </div>
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                  onClick={() => setShowForm(true)}
                >
                  Add New
                </button>
              </header>
              <div className="p-4">
                {showForm ? (
                  <AddAdminForm setShowForm={setShowForm} />
                ) : (
                  admin.map((adminUser, index) => (
                    <UserCard key={index} admin={adminUser} onStatusChange={handleStatusChange} />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageAdmin;
