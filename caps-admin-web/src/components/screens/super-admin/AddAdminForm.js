import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userService from "../../../services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAdminForm = ({ setShowForm, setAdmin, editingAdminId, editingAdmin, onSuccess }) => {
  const [errors, setErrors] = useState({});

  const mapGender = (gender) => {
    const genderMap = {
      "M": "Male",
      "F": "Female",
    };
    return genderMap[gender] || gender;
  };

  const [userData, setUserData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: null,
    email: "",
    password: "",
    repassword: "",
    mobile_number: "",
  });

  useEffect(() => {
    if (editingAdmin) {
      setUserData({
        user_name: editingAdmin.user_name || "",
        first_name: editingAdmin.first_name || "",
        last_name: editingAdmin.last_name || "",
        gender: mapGender(editingAdmin.gender) || "",
        date_of_birth: editingAdmin.date_of_birth ? new Date(editingAdmin.date_of_birth) : null,
        email: editingAdmin.email || "",
        mobile_number: editingAdmin.mobile_number || "",
      });
    }
  }, [editingAdmin]);

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
      const adminData = {
        ...userData,
        date_of_birth: userData.date_of_birth ? userData.date_of_birth.toISOString().split('T')[0] : null,
        role_id: 2,
      };
  
      delete adminData.repassword;
  
      let response;
      if (editingAdminId) {
        response = await userService.updateAdmin(editingAdmin, adminData);
      } else {
        if (Object.values(userData).some((field) => field === "")) {
          setErrors({ general: "Please input all required data" });
          return;
        }
  
        if (userData.password !== userData.repassword) {
          setErrors({ password: "Passwords do not match" });
          return;
        }
        response = await userService.signup(adminData);
      }  
  
      setErrors({});
      
      toast.success(editingAdminId ? "Successfully edited Admin" : "Successfully added new Admin", {
        autoClose: 3000, // Stay visible for 3 seconds
      });

      setShowForm(false);

      // Update admin list
      const updatedAdminList = await userService.fetchAdmin();
      setAdmin(updatedAdminList);
  
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        console.error("Validation errors:", validationErrors);
        setErrors(validationErrors);
      }
    }
  };
  
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
      <h2 className="text-xl font-bold mb-4">{editingAdminId ? "Edit Admin" : "New Admin"}</h2>
      <form onSubmit={handleAddOrEditAdmin}>
        {errors.general && <div className="text-red-500 mb-2">{errors.general}</div>}
        <div className="flex mb-4">
          <div className="flex-1 mr-2">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
            />
            {errors.first_name && <div className="text-red-500">{errors.first_name}</div>}
          </div>
          <div className="flex-1 ml-2">
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
            />
            {errors.last_name && <div className="text-red-500">{errors.last_name}</div>}
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex-1 mr-2">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              name="user_name"
              value={userData.user_name}
              className="border rounded w-full py-2 px-3 text-gray-700"
              onChange={handleChange}
            />
            {errors.user_name && <div className="text-red-500">{errors.user_name}</div>}
          </div>
          <div className="flex-1 ml-2">
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
            {errors.gender && <div className="text-red-500">{errors.gender}</div>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth:</label>
          <DatePicker
            selected={userData.date_of_birth}
            onChange={handleDateChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.date_of_birth && <div className="text-red-500">{errors.date_of_birth}</div>}
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
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>
        {!editingAdminId && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                className="border rounded w-full py-2 px-3 text-gray-700"
                onChange={handleChange}
              />
              {errors.password && <div className="text-red-500">{errors.password}</div>}
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
              {errors.repassword && <div className="text-red-500">{errors.repassword}</div>}
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number:</label>
          <input
            type="tel"
            name="mobile_number"
            value={userData.mobile_number}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
          />
          {errors.mobile_number && <div className="text-red-500">{errors.mobile_number}</div>}
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
            {editingAdminId ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;
