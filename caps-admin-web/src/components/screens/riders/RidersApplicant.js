import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";

const users = [
  // Add more users if needed
  {
    name: "Sonny Ali",
    username: "SonnyAli",
    avatar: "path_to_avatar", // Replace with actual path
    documents: [
      "Motor Picture",
      "ROCR",
      "Certificate of Registration",
      "Driver License",
      "TPL Insurance",
      "Barangay Clearance",
      "Police Clearance",
      "Motor Picture with Plate Number",
    ],
  },
  {
    name: "Tracy Moreno",
    username: "TracyMoreno",
    avatar: "path_to_avatar", // Replace with actual path
    documents: [
      "Motor Picture",
      "ROCR",
      "Certificate of Registration",
      "Driver License",
      "TPL Insurance",
      "Barangay Clearance",
      "Police Clearance",
      "Motor Picture with Plate Number",
    ],
  },
  // Add more users if needed
];

const UserCard = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
      <div className="flex items-center mb-4">
        <img
          src={user.avatar}
          alt="Avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-4">
          <p className="font-bold">{user.name}</p>
          <p className="text-gray-600">@{user.username}</p>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500"
          >
            {isCollapsed ? (
              <ChevronDownIcon className="w-6 h-6" />
            ) : (
              <ChevronUpIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="grid grid-cols-3 gap-4">
          {user.documents.map((doc, index) => (
            <div key={index} className="bg-gray-300 p-4 rounded text-center">
              {doc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const RidersApplicant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate Total Pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Generate Page Numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="flex">
            <div className="flex-1">
              <div className="p-4">
                {currentUsers.map((user, index) => (
                  <UserCard key={index} user={user} />
                ))}
              </div>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="mt-6 flex flex-col items-center">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded ${number === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-200'}`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
            <span className="text-center">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};
