import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userService from "../../../services";

const AddAdminForm = ({ setShowForm, setAdmin, editingAdminId }) => {
  const [userData, setUserData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: null, // Initialize with null
    email: "",
    password: "",
    repassword: "",
    mobile_number: "",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      if (editingAdminId) {
        try {
          const response = await userService.getAdminById(editingAdminId);
          const adminData = response.data;
          setUserData({
            user_name: adminData.user_name,
            first_name: adminData.first_name || "",
            last_name: adminData.last_name || "",
            gender: adminData.gender || "",
            date_of_birth: adminData.date_of_birth ? new Date(adminData.date_of_birth) : null,
            email: adminData.email || "",
            password: "", // Clear password fields when editing
            repassword: "",
            mobile_number: adminData.mobile_number || "",
          });
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      }
    };

    fetchAdminData();
  }, [editingAdminId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setUserData((prevState) => ({ ...prevState, date_of_birth: date }));
  };

  const handleAddOrEditAdmin = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(userData).some((field) => field === "")) {
        alert("Please input all required data");
        return;
      }

      if (userData.password !== userData.repassword) {
        alert("Passwords do not match");
        return;
      }

      const adminData = {
        ...userData,
        date_of_birth: userData.date_of_birth ? userData.date_of_birth.toISOString().split("T")[0] : null,
        role_id: 2,
      };

      delete adminData.repassword;

      let response;
      if (editingAdminId) {
        response = await userService.updateAdmin(editingAdminId, adminData);
      } else {
        response = await userService.signup(adminData);
      }

      console.log("Response:", response);

      // Handle the success response and show the success message
      alert(editingAdminId ? "Successfully edited Admin" : "Successfully added new Admin");
      setShowForm(false);

      // Refresh the list of admins
      const updatedAdminList = await userService.fetchAdmin();
      setAdmin(updatedAdminList);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
      <h2 className="text-xl font-bold mb-4">{editingAdminId ? "Edit Admin" : "New Admin"}</h2>
      <form onSubmit={handleAddOrEditAdmin}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="user_name"
            value={userData.user_name}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender:</label>
          <select
            name="gender"
            value={userData.gender}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth:</label>
          <DatePicker
            selected={userData.date_of_birth}
            onChange={handleDateChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            name="repassword"
            value={userData.repassword}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number:</label>
          <input
            type="tel"
            name="mobile_number"
            value={userData.mobile_number}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
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
            {editingAdminId ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;
