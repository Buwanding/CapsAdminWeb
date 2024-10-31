import React, { useEffect, useState } from "react";
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";
import { ChevronDownIcon } from "@heroicons/react/solid";
import userService from "../../services";
import swal from 'sweetalert2';

const UserCard = ({ customer, handleStatusChange, loadingUserId, openModal }) => {
  const isLoading = loadingUserId === customer.user_id;
  
  return (
    <tr key={customer.user_id}>
      <td className="py-0.5 px-4">
        {customer.first_name} {customer.last_name}
      </td>
      <td className="py-0.5 px-4 text-center">
        <span
          className={`px-4 py-2 rounded ${
            customer.status === "Active" ? "text-green-600" : "text-red-600"
          } text-gray-400 font-bold`}
        >
          {customer.status}
        </span>
      </td>

      <td className="py-0.5 px-4 text-right">
        <button
          className={`${
            customer.status === "Active" ? "bg-red-500" : "bg-green-500"
          } text-white px-2 py-1 rounded`}
          onClick={() => handleStatusChange(customer)}
          disabled={isLoading}
        >
          {isLoading ? (
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
          ) : customer.status === "Active" ? (
            "Disable"
          ) : (
            "Enable"
          )}
        </button>
      </td>

      <td className="py-0.5 px-4 text-center">
        <button
          className="bg-gray-700 text-white font-bold py-1 px-3 rounded hover:bg-gray-400"
          onClick={() => openModal(customer)}
        >
          Info
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
  const [customersPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingUserId, setLoadingUserId] = useState(null); // Track loading for each user
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await userService.fetchCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("There was an error fetching the Customers!", error);
      } finally {
        setLoading(false);
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
    setCurrentPage(1);
  };

  const handleStatusChange = async (customer) => {
    try {
      setLoadingUserId(customer.user_id);
      const newStatus = customer.status === "Active" ? "Disabled" : "Active";
      const response = await userService.updateUserStatus(customer.user_id, newStatus);
  
      customer.status = newStatus;
      setFilteredCustomers([...filteredCustomers]);
  
      const { first_name, last_name } = response.user;
      swal.fire({
        title: `Customer ${first_name} ${last_name} Status Successfully Updated`,
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(`Error updating user status for user ${customer.user_id}:`, error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Sidenav className="fixed" />
      <div className="flex-grow flex flex-col">
        <Header className="fixed" />
        <main className="flex-grow bg-gray-100">
          <div className="p-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-2 border-b border-gray-200">
                <h2 className="text-xl font-bold">Users</h2>
                <div className="flex">
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
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <svg
                    className="animate-spin h-10 w-10 text-gray-500"
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
                </div>
              ) : (
                <table className="animate__animated animate__fadeIn min-w-full bg-white table-auto">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">
                        Customer Name
                      </th>
                      <th className="px-4 border-b border-gray-200 py-2 text-center ">
                        Status
                      </th>
                      <th className="px-4 border-b border-gray-200 py-2 text-right ">
                        Action
                      </th>
                      <th className="px-4 border-b border-gray-200 py-2 ">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.map((customer) => (
                      <UserCard
                        key={customer.user_id}
                        customer={customer}
                        handleStatusChange={handleStatusChange}
                        loadingUserId={loadingUserId}
                        openModal={openModal}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
        <footer className="bg-white p-2 shadow-md">
          <div className="flex justify-between items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-gray-300 px-2 py-1 rounded-md text-sm ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Prev
            </button>
            <span className="text-gray-600 text-sm font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`bg-gray-300 px-2 py-1 rounded-md text-sm ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
