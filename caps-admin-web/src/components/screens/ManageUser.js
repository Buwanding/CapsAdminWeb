import React, { useEffect, useState } from "react";
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";
import { ChevronDownIcon } from "@heroicons/react/solid";
import userService from "../../services";

const UserCard = ({ customer }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    try {
      setLoading(true); // Set loading state to true
      const newStatus = customer.status === "Active" ? "Disabled" : "Active";
      await userService.updateUserStatus(customer.user_id, newStatus);
      customer.status = newStatus;
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error(`Error updating user status for user ${customer.user_id}:`, error);
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <tr key={customer.user_id}>
      <td className="py-2 px-4 border-b border-gray-200">
        {customer.first_name} {customer.last_name}
      </td>
      <td className="py-2 px-4 border-b border-gray-200 flex justify-between">
        <button
          className={`${customer.status === "Active" ? "bg-red-500" : "bg-green-500"} text-white px-4 py-2 rounded flex items-center justify-center`}
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
            customer.status === "Active" ? "Disable" : "Enable"
          )}
        </button>
        <span
          className={`px-4 py-2 rounded ${customer.status === "Active" ? "text-green-600" : "text-red-600"} text-gray-400 font-bold`}
        >
          {customer.status}
        </span>
        <button className="ml-4">
          <ChevronDownIcon className="w-5 h-5 text-gray-800" />
        </button>
      </td>
    </tr>
  );
};

export const ManageUser = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await userService.fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("There was an error fetching the Customers!", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="p-4">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Users</h2>
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Search Names"
                    className="border border-gray-300 rounded-l px-4 py-2"
                  />
                  <button className="bg-gray-300 px-4 py-2 rounded-r">
                    Filter
                  </button>
                </div>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">
                      Customer Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <UserCard key={customer.user_id} customer={customer} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
