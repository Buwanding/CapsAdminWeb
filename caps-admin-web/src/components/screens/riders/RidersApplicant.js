import React, { useState, useEffect } from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";
import defaultProfileLogo from "../../pictures/avatar.png"; // Import the default logo

// Define a UserCard component to display individual user information
const UserCard = ({ rider, onMoreInfo }) => {
  const { user, requirement_photos: documents } = rider; // Extract user and requirement_photos from the rider object

  return (
    <div className="border p-2 rounded-lg shadow-sm bg-white mb-4">
      <div className="flex items-center">
        <img
          src={user.avatar || defaultProfileLogo}
          alt="Avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-4">
          <p className="font-bold">{user.first_name}</p>
          <p className="text-gray-600">@{user.user_name}</p>
          <p className="text-xs"><span className={`${rider.verification_status === "Verified" ? "text-green-600" : "text-yellow-600"}`}>{rider.verification_status}</span></p>
        </div>
        <div className="ml-auto">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from bubbling up
              onMoreInfo(user); // Trigger the onMoreInfo callback
            }}
            className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-400 transition-colors"
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

  // Safely handle the case where `user.documents` might be undefined
  const documents = user.documents || [];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img
              src={user.avatar || defaultProfileLogo}
              alt="Avatar"
              className="h-32 w-32 rounded-full mx-auto" // Increased size
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{user.first_name}{user.last_name}</h2> {/* Increased font size */}
            <p className="text-gray-600 text-lg mb-4">@{user.user_name}</p>
            <h3 className="text-xl font-semibold mb-2">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <div key={index} className="bg-gray-200 p-4 rounded text-center">
                    <p className="text-gray-700">{doc}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No documents available</p>
              )}
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
  const [riders, setRiders] = useState([]); // State to store all fetched riders
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [searchInput, setSearchInput] = useState("");
  const [filteredRiders, setFilteredRiders] = useState([]);

  // Fetch users with "Rider" role from the API
  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const data = await userService.fetchRequirements();
        setRiders(data);
        setFilteredRiders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };

    fetchRiders();
  }, []);

  // Update filteredRiders whenever searchInput changes
  useEffect(() => {
    const filtered = riders.filter((rider) =>
      `${rider.user.first_name} ${rider.user.last_name} ${rider.user.user_name}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setFilteredRiders(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchInput, riders]);

  const clearSearch = () => {
    setSearchInput("");
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRiders = filteredRiders.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate Total Pages
  const totalPages = Math.ceil(filteredRiders.length / itemsPerPage);

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
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold">Rider Requirements</h1>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search Name or Username"
                  className="px-7 py-2 border rounded-lg"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="p-2">
              {currentRiders.map((rider, index) => (
                <UserCard
                  key={index}
                  rider={rider}
                  onMoreInfo={(user) => setSelectedUser(user)}
                />
              ))}
            </div>
          </main>
          {/* Footer with Pagination */}
          <footer className="bg-white p-2 shadow-md">
            <div className="flex justify-between items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`bg-gray-300 px-2 py-1 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Previous
              </button>
              <div className="flex gap-2">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-2 py-1 rounded ${number === currentPage ? 'cursor-not-allowed bg-gray-200' : 'bg-gray-300 font-bold'}`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`bg-gray-300 px-2 py-1 rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
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