import React, { useEffect, useState } from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";
import AddAdminForm from "./AddAdminForm"; // Import the AddAdminForm component

const UserCard = ({ admin, onStatusChange, onEdit }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      const newStatus = admin.status === "Active" ? "Disabled" : "Active";
      await userService.updateAdminStatus(admin.user_id, newStatus);
      onStatusChange(admin.user_id, newStatus);
    } catch (error) {
      console.error(`Error updating user status for user ${admin.user_id}:`, error);
    } finally {
      setLoading(false);
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
      <div className="flex flex-col items-center">
        <button
          className="bg-yellow-500 text-white py-1 px-5 rounded mb-2 flex items-center justify-center"
          onClick={() => onEdit(admin.user_id)}
        >
          Edit
        </button>
        <button
          className={`${admin.status === "Active" ? "bg-red-500" : "bg-green-500"} text-white py-1 px-2 rounded flex items-center justify-center`}
          onClick={handleStatusChange}
          disabled={loading}
        >
          {loading ? "Loading..." : (admin.status === "Active" ? "Disable" : "Enable")}
        </button>
      </div>
    </div>
  );
};

const ManageAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [editingAdminId, setEditingAdminId] = useState(null);

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
    setAdmin((prevAdmin) =>
      prevAdmin.map((admin) =>
        admin.user_id === userId ? { ...admin, status: newStatus } : admin
      )
    );
  };

  const handleEdit = (userId) => {
    setEditingAdminId(userId);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingAdminId(null);
    setShowForm(true);
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
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={handleAddNew}
                >
                  Add Admin
                </button>
              </header>

              <div className="p-4">
                {showForm && (
                  <AddAdminForm
                    setShowForm={setShowForm}
                    setAdmin={setAdmin}
                    editingAdminId={editingAdminId}
                  />
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {admin.map((adminUser) => (
                    <UserCard
                      key={adminUser.user_id}
                      admin={adminUser}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageAdmin;
