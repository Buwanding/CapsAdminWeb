import React, { useContext, useState, Fragment, useEffect } from "react";
import { Menu, Dialog, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import UserIcon from "../pictures/User-icon.png";
import userService from "../../services";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isSideBarMenuOpen, setIsSideBarMenuOpen } = useContext(AuthContext);

  // Add useEffect for handling responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // 768px is Tailwind's md breakpoint
      if (window.innerWidth >= 768) {
        setIsSideBarMenuOpen(false);
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSideBarMenuOpen]);

  const handleLogout = async () => {
    try {
      await userService.logout();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button */}
          <div className="flex items-center space-x-2 ">
            <div
              onClick={() => setIsSideBarMenuOpen(!isSideBarMenuOpen)}
              className={`p-2 ${isSideBarMenuOpen ? "ml-60" : "justify-start"} hover:bg-[#C8A400] rounded-full cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>

          {/* Right side - User Menu */}
          <div className="relative">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 p-2 hover:bg-[#C8A400] rounded-lg">
                <span className="hidden sm:block">ADMIN</span>
                <ChevronDownIcon className="h-5 w-5" />
                <img
                  src={UserIcon}
                  alt="User Icon"
                  className="h-6 w-6 rounded-full"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-[#343536] rounded-lg shadow-lg overflow-hidden z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/manageacc")}
                        className={`block w-full text-left px-4 py-2 text-white ${
                          active ? "bg-gray-600" : ""
                        }`}
                      >
                        Manage Account
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className={`block w-full text-left px-4 py-2 text-white ${
                          active ? "bg-gray-600" : ""
                        }`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm Logout
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to log out?
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => {
                      handleLogout();
                      setIsModalOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
};

export default Header;