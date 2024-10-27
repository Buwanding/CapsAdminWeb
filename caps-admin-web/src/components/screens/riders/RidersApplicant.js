import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";
import { img_url } from "../../../api_url";
import defaultProfileLogo from "../../pictures/avatar.png";
import { X, Loader } from "react-feather";

// UserCard component
const UserCard = ({ rider, onMoreInfo }) => {
  const { user, requirementphotos, verification_status } = rider;

  const getStatusColor = (status) => {
    switch (status) {
      case "Unverified":
        return "text-orange-600";
      case "Pending":
        return "text-yellow-600";
      case "Verified":
        return "text-green-600";
      default:
        return "text-gray-600";
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
          <p className="text-xs">
            <span className={statusColor}>{verification_status}</span>
          </p>
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

// Modal component
const Modal = ({
  verification_status,
  user,
  requirementphotos,
  onClose,
  onVerifyClick,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      case "Unverified":
        return "text-orange-600";
      case "Pending":
        return "text-yellow-600";
      case "Verified":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const handleVerificationToggle = async () => {
    setIsLoading(true);
    try {
      onVerifyClick(user.user_id, verification_status);
    } catch (error) {
      console.error("Error toggling verification status:", error);
    } finally {
      setIsLoading(false);
    }
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
      <div
        key={photo.requirement_id}
        className="bg-gray-200 p-4 rounded text-center"
      >
        <p className="text-gray-700">
          {requirementMapping[photo.requirement_id]}
        </p>
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

  const statusColor = getStatusColor(verification_status);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-40">
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
              <h2 className="text-3xl font-bold">
                {user.first_name} {user.last_name}
              </h2>
              <button
                className={`px-4 py-2 rounded transition-colors ${
                  verification_status === "Verified"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                } flex items-center justify-center`}
                onClick={handleVerificationToggle}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mr-2" size={16} />
                ) : null}
                {verification_status === "Verified" ? "Unverify" : "Verify"}
              </button>
            </div>
            <p className="text-xs">
              <span className={statusColor}>{verification_status}</span>
            </p>
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
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

// Main Component
export const RidersApplicant = () => {
  const [riders, setRiders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRiders, setFilteredRiders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateItemsPerPage = () => {
    const headerHeight = document.querySelector("header").offsetHeight || 64; // Use default if not found
    const footerHeight = document.querySelector("footer").offsetHeight || 48; // Use default if not found
    const cardHeight = 50; // Average height of a UserCard
    const padding = 20; // Extra padding

    const availableHeight =
      window.innerHeight - (headerHeight + footerHeight + padding);
    return Math.max(1, Math.floor(availableHeight / cardHeight));
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const data = await userService.fetchRequirements();
        setRiders(data);
        setFilteredRiders(data);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };

    fetchRiders();
  }, []);

  useEffect(() => {
    const filtered = riders.filter((rider) =>
      `${rider.user.first_name} ${rider.user.last_name} ${rider.user.user_name}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setFilteredRiders(filtered);
    setCurrentPage(1);
  }, [searchInput, riders]);

  const totalPages = Math.ceil(filteredRiders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRiders = filteredRiders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const sortRiders = (ridersList) => {
      const order = { Pending: 0, Verified: 1, Unverified: 2 };
      return ridersList.sort(
        (a, b) => order[a.verification_status] - order[b.verification_status]
      );
    };

  useEffect(() => {
    const filtered = riders.filter((rider) =>
      `${rider.user.first_name} ${rider.user.last_name} ${rider.user.user_name}${rider.verification_status}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    const sortedFiltered = sortRiders(filtered);
    setFilteredRiders(sortedFiltered);
    setCurrentPage(1);
  }, [searchInput, riders]);

  const clearSearch = () => {
    setSearchInput("");
  };


  const handleStatusChange = async (userId, newStatus) => {
    setRiders((prevRiders) => {
      const updatedRiders = prevRiders.map((rider) =>
        rider.user.user_id === userId
          ? { ...rider, verification_status: newStatus }
          : rider
      );
      return sortRiders(updatedRiders);
    });

    setFilteredRiders((prevFilteredRiders) => {
      const updatedFilteredRiders = prevFilteredRiders.map((rider) =>
        rider.user.user_id === userId
          ? { ...rider, verification_status: newStatus }
          : rider
      );
      return sortRiders(updatedFilteredRiders);
    });

    setSelectedUser((prev) => {
      if (prev && prev.user.user_id === userId) {
        return {
          ...prev,
          verification_status: newStatus,
        };
      }
      return prev;
    });
  };

  const handleVerifyClick = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Verified" ? "Pending" : "Verified";
    setVerificationData({
      userId,
      currentStatus,
      newStatus,
    });
    setIsModalOpen(true);
  };

  const handleVerificationConfirm = async () => {
    if (!verificationData) return;

    setIsLoading(true);
    try {
      const response = await userService.verifyRider(
        verificationData.userId,
        verificationData.newStatus
      );

      if (response) {
        await handleStatusChange(
          verificationData.userId,
          verificationData.newStatus
        );
      }
    } catch (error) {
      console.error("Error updating verification status:", error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setVerificationData(null);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow">
          <Sidenav />
          <div className="flex flex-col w-full">
            <Header />
            <main className="flex-grow p-4 bg-gray-100 overflow-auto">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold">Rider Requirements</h1>
                <input
                  type="text"
                  placeholder="Search Name or Username"
                  className="px-4 py-2 border rounded-lg"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <div className="p-2">
                {currentRiders.map((rider, index) => (
                  <UserCard
                    key={index}
                    rider={rider}
                    onMoreInfo={() => setSelectedUser(rider)}
                  />
                ))}
              </div>
            </main>
            <footer className="bg-white p-2 shadow-md">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`bg-gray-300 px-2 py-1 rounded ${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`px-2 py-1 rounded ${
                        i + 1 === currentPage
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`bg-gray-300 px-2 py-1 rounded ${
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </footer>
          </div>
        </div>
        {/* Modal component for selected user */}
        {selectedUser && (
          <Modal
            user={selectedUser.user}
            requirementphotos={selectedUser.requirementphotos}
            verification_status={selectedUser.verification_status}
            onClose={() => setSelectedUser(null)}
            onStatusChange={handleStatusChange}
            onVerifyClick={handleVerifyClick}
          />
        )}
        {/* Confirmation Modal */}
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-gray-900"
                        >
                          Confirm{" "}
                          {verificationData?.newStatus === "Verified"
                            ? "Verification"
                            : "Unverification"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to{" "}
                            {verificationData?.newStatus === "Verified"
                              ? "verify"
                              : "unverify"}{" "}
                            this rider? This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:col-start-2"
                        onClick={handleVerificationConfirm}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader className="animate-spin mr-2" size={16} />
                        ) : null}
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
};