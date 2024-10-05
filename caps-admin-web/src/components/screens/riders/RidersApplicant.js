import React, { useState, useEffect } from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";
import { API_URL, img_url } from "../../../api_url";
import defaultProfileLogo from "../../pictures/avatar.png"; // Import the default logo
import { X } from 'react-feather';

// Define a UserCard component to display individual user information
const UserCard = ({ rider, onMoreInfo }) => {
  const { user, requirementphotos, verification_status } = rider; // Extract user and requirement_photos from the rider object

  const getStatusColor = (status) => {
    switch (status) {
      case "Unverified": return "text-orange-600";
      case "Pending": return "text-yellow-600";
      case "Verified": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const statusColor = getStatusColor(verification_status);

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
          <p className="text-xs"><span className={statusColor}>{verification_status}</span></p>
        </div>
        <div className="ml-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoreInfo(user, requirementphotos, verification_status);
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

const Modal = ({ verification_status, user, requirementphotos, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(verification_status);

  if (!user) return null;

  const BASE_URL = `${img_url}/storage/`;

  const requirementMapping = {
    1: "Motorcycle Picture",
    2: "ROCR",
    3: "OR Expiration Date",
    4: "COR",
    5: "Drivers License",
    6: "Drivers License Number",
    7: "License Expiration Date",
    8: "TPL Insurance",
    9: "Barangay Clearance",
    10: "Police Clearance",
    11: "Plate Number",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Unverified": return "text-orange-600";
      case "Pending": return "text-yellow-600";
      case "Verified": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const handleVerify = () => {
  };

  const renderRequirement = (photo) => {
    const fullUrl = `${BASE_URL}${photo.photo_url}`;
    const isTextRequirement = [3, 6, 7, 11].includes(photo.requirement_id);
    
    const handleImageClick = () => {
      if (!isTextRequirement) {
        setSelectedImage(fullUrl);
      }
    };

    return (
      <div key={photo.requirement_id} className="bg-gray-200 p-4 rounded text-center">
        <p className="text-gray-700">{requirementMapping[photo.requirement_id]}</p>
        {isTextRequirement ? (
          <p className="mt-2 text-lg font-semibold">{photo.photo_url}</p>
        ) : (
          <img
            src={fullUrl}
            alt={requirementMapping[photo.requirement_id]}
            className="w-full h-auto rounded cursor-pointer"
            onClick={handleImageClick}
          />
        )}
      </div>
    );
  };

  const statusColor = getStatusColor(currentStatus);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img
              src={user.avatar || defaultProfileLogo}
              alt="Avatar"
              className="h-32 w-32 rounded-full mx-auto"
            />
          </div>
          <div className="text-center md:text-left flex-grow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-bold">{user.first_name} {user.last_name}</h2>
              {currentStatus !== "Verified" && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              )}
            </div>
            <p className="text-xs"><span className={statusColor}>{currentStatus}</span></p>
            <p className="text-gray-600 text-lg mb-1">{user.user_name}</p>
            <p className="text-gray-600 text-lg mb-1">{user.mobile_number}</p>
            <p className="text-gray-600 text-lg mb-1">{user.email}</p>
            <h3 className="text-xl font-semibold mb-2">Requirements</h3>
            <div className="max-h-60 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {requirementphotos && requirementphotos.length > 0 ? (
                  requirementphotos.map(renderRequirement)
                ) : (
                  <p className="text-gray-600">No requirements available</p>
                )}
              </div>
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

      {selectedImage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
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
      `${rider.user.first_name} ${rider.user.last_name} ${rider.user.user_name}${rider.user.user_name}${rider.verification_status}`
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
                  onMoreInfo={() => setSelectedUser({ verification_status: rider.verification_status, user: rider.user, requirementphotos: rider.requirementphotos })}
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
      <Modal 
        user={selectedUser?.user} 
        requirementphotos={selectedUser?.requirementphotos} 
        onClose={() => setSelectedUser(null)} 
      />
</div>
  );
};