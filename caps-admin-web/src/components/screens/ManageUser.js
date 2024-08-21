import React, { useEffect, useState } from "react";
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";
import { ChevronDownIcon } from "@heroicons/react/solid";
import userService from "../../services";

const UserCard = ({ customer, handleStatusChange, loading }) => {
  return (
    <tr key={customer.user_id}>
      <td className="py-2 px-4 border-b border-gray-200">
        {customer.first_name} {customer.last_name}
      </td>
      <td className="py-2 px-4 border-b border-gray-200 flex justify-between items-center">
        <button
          className={`${customer.status === "Active" ? "bg-red-500" : "bg-green-500"} text-white px-4 py-2 rounded flex items-center justify-center`}
          onClick={() => handleStatusChange(customer)}
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
  const [searchInput, setSearchInput] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await userService.fetchCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("There was an error fetching the Customers!", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleFilter = () => {
    const filtered = customers.filter((customer) =>
      `${customer.first_name} ${customer.last_name}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleStatusChange = async (customer) => {
    try {
      setLoading(true);
      const newStatus = customer.status === "Active" ? "Disabled" : "Active";
      await userService.updateUserStatus(customer.user_id, newStatus);
      customer.status = newStatus;
      setFilteredCustomers([...filteredCustomers]);
      setLoading(false);
    } catch (error) {
      console.error(`Error updating user status for user ${customer.user_id}:`, error);
      setLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate Total Pages
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  // Generate Page Numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex overflow-hidden">
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
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button 
                    className="bg-gray-300 px-4 py-2 rounded-r"
                    onClick={handleFilter}
                  >
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
                  {currentCustomers.map((customer) => (
                    <UserCard
                      key={customer.user_id}
                      customer={customer}
                      handleStatusChange={handleStatusChange}
                      loading={loading}
                    />
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col items-center mt-4 p-4">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded ${number === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-200'}`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Next
                  </button>
                </div>
                <span className="flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
