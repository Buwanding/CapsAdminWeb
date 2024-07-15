import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import logo from "../pictures/Pick-Me-Up-Logo.png";
import { useNavigate } from "react-router-dom";

const Sidenav = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(item);
  };

  return (
    <div className="bg-yellow-500 w-64 h-screen">
      <div className="p-4 flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <span className="text-white font-bold text-xl">PickMeUp</span>
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleClick("/dashboard")}
          className="block w-full text-left px-4 py-2 text-black bg-yellow-500 hover:bg-yellow-600"
        >
          Dashboard
        </button>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between items-center p-4 text-white bg-black">
                <span>Riders</span>
                <ChevronDownIcon
                  className={`w-5 h-5 ${open ? "transform rotate-180" : ""}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="bg-gray-800 text-white">
                <button
                  onClick={() => handleClick("/riderslist")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Rider Status
                </button>
                <button
                  onClick={() => handleClick("/ridersapplicant")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Rider Applicant
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between items-center p-4 text-white bg-black mt-2">
                <span>Booking</span>
                <ChevronDownIcon
                  className={`w-5 h-5 ${open ? "transform rotate-180" : ""}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="bg-gray-800 text-white">
                <button
                  onClick={() => handleClick("/bookinghistory")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Booking History
                </button>
                <button
                  onClick={() => handleClick("Booking 2")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Booking 2
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex justify-between items-center p-4 text-white bg-black mt-2">
                <span>Customers</span>
                <ChevronDownIcon
                  className={`w-5 h-5 ${open ? "transform rotate-180" : ""}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="bg-gray-800 text-white">
                <button
                  onClick={() => handleClick("Customer 1")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Customer 1
                </button>
                <button
                  onClick={() => handleClick("Customer 2")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Customer 2
                </button>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <button
          onClick={() => handleClick("/manageuser")}
          className="block w-full text-left px-4 py-2 text-black bg-yellow-500 hover:bg-yellow-600"
        >
          Manage Users
        </button>
        <button
          onClick={() => handleClick("/feedback")}
          className="block w-full text-left px-4 py-2 text-black bg-yellow-500 hover:bg-yellow-600"
        >
          Feedback
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
