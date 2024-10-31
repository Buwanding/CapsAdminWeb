import React, { useEffect, useState } from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";
import AddAdminForm from "./AddAdminForm";

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
        <p className="text-gray-500 font-bold">{admin.email}</p>
        <p className="text-gray-500 font-bold">{admin.mobile_number}</p>
        <p className="text-gray-500 font-bold">
          Status: <span className={`${admin.status === "Active" ? "text-green-600" : "text-red-600"}`}>
            {admin.status}
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <button
          className={`${admin.status === "Active" ? "bg-red-500" : "bg-green-500"} text-white py-1 px-2 rounded mb-2 flex items-center justify-center`}
          onClick={handleStatusChange}
          disabled={loading}
        >
          {loading ? "Loading..." : (admin.status === "Active" ? "Disable" : "Enable")}
        </button>
        <button
          className="bg-yellow-500 text-white py-1 px-5 rounded flex items-center justify-center"
          onClick={() => onEdit(admin.user_id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const ManageAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    fetchAdmins(); // Refresh the admin list

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const adminList = await userService.fetchAdmin();
      setAdmins(adminList);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
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
    <div className="flex min-h-screen">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="flex">
            <div className="flex-1">
              <header className="bg-black text-white flex items-center justify-between p-4">
                <h1 className="font-bold text-xl">Admin Users</h1>
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
                    setAdmins={setAdmins}
                    editingAdminId={editingAdminId}
                    editingAdmin={admins.find((a) => a.user_id === editingAdminId)}
                    onSuccess={handleSuccess}
                  />
                )}
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="loader">Loading...</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {admins.map((adminUser) => (
                      <UserCard
                        key={adminUser.user_id}
                        admin={adminUser}
                        onStatusChange={handleStatusChange}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ManageAdmin;
