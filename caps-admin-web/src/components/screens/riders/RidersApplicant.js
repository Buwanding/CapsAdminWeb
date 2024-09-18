import React, { useState } from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";

// Sample data for users
const users = [
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
];

const UserCard = ({ user, onMoreInfo }) => {
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
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from bubbling up
              onMoreInfo(user); // Trigger the onMoreInfo callback
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};


const Modal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="h-24 w-24 rounded-full mx-auto mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600 text-lg mb-4">@{user.username}</p>
            <h3 className="text-xl font-semibold mb-2">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.documents.map((doc, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded text-center">
                  <p className="text-gray-700">{doc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};


export const RidersApplicant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user

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
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidenav />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-grow p-4 bg-gray-100">
            <div className="p-4">
              {currentUsers.map((user, index) => (
                <UserCard
                  key={index}
                  user={user}
                  onMoreInfo={(user) => setSelectedUser(user)}
                />
              ))}
            </div>
          </main>
          {/* Footer with Pagination */}
          <footer className="bg-white p-4 shadow-md">
            <div className="flex justify-between items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`bg-gray-300 px-4 py-2 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
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
                className={`bg-gray-300 px-4 py-2 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Next
              </button>
            </div>
          </footer>
        </div>
      </div>
      {/* Modal for User Details */}
      <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};
