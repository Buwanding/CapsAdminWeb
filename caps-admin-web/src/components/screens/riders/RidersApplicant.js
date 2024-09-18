import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";

// Define a UserCard component to display individual user information
const UserCard = ({ rider }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user, requirement_photos: documents } = rider; // Extract user and requirement_photos from the rider object

  return (
    <div className="border p-3 rounded-lg shadow-sm bg-white mb-2">
      <div className="flex items-center mb-2">
        {/* If you don't have avatars, provide a placeholder */}
        <img
          src={user.avatar || "placeholder-image-url"} // Replace "placeholder-image-url" with the actual path if needed
          alt="Avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-8">
          <p className="font-semibold text-sm">{user.first_name} {user.last_name}</p>
          <p className="text-gray-600 text-xs">@{user.user_name}</p>
          <p className="text-xs"><span className={`${rider.verification_status === "Verified" ? "text-green-600" : "text-yellow-600"}`}>{rider.verification_status}</span></p>
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
          {/* Ensure each document is displayed correctly */}
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="bg-gray-300 p-4 rounded text-center">
                <img src={doc.photo_url} alt={`Document ${index + 1}`} />
              </div>
            ))
          ) : (
            <p>No documents available</p>
          )}
        </div>
      )}
    </div>
  );
};

// Main component
export const RidersApplicant = () => {
  const [riders, setRiders] = useState([]); // State to store the fetched riders
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Fetch users with "Rider" role from the API
  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const data = await userService.fetchRequirements();
        setRiders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };

    fetchRiders();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRiders = riders.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate Total Pages
  const totalPages = Math.ceil(riders.length / itemsPerPage);

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
                {currentRiders.map((rider, index) => (
                  <UserCard key={index} rider={rider} />
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
