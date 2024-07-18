import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import logo from "../pictures/Pick-Me-Up-Logo.png";
import UserIcon from "../pictures/User-icon.png";
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
  
      // Make a POST request to the logout endpoint
      await axios.post('http://192.168.133.124:8000/api/user/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Clear the token and role from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
  
      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle any errors (e.g., show an error message to the user)
    }
  };

  return (
    <header className="bg-black text-white flex items-center justify-between p-4">
      <div className="p-4 flex items-center space-x-2">
        {/* <img src={logo} alt="Logo" className="h-10 w-10" />
        <span className="text-white font-bold text-xl">PickMeUp</span> */}
      </div>
      <div className="relative">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="flex items-center space-x-2">
                <span>ADMIN</span>
                <ChevronDownIcon
                  className={`w-5 h-5 ${open ? "transform rotate-180" : ""}`}
                />
                <img
                  src={UserIcon}
                  alt="User Icon"
                  className="h-6 w-6 rounded-full"
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-[#343536] shadow-lg rounded-lg overflow-hidden">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 ${
                        active ? "bg-gray-300" : ""
                      }`}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 ${
                        active ? "bg-gray-300" : ""
                      }`}
                    >
                      Manage Account
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={handleLogout}
                      className={`block px-4 py-2 ${
                        active ? "bg-gray-300" : ""
                      }`}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </>
          )}
        </Menu>
      </div>
    </header>
  );
};

export default Header;
