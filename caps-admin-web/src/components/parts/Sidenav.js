import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import logo from "../pictures/Pick-Me-Up-Logo.png";

const Sidenav = () => {
  const handleClick = (item) => {
    console.log(`${item} clicked`);
  };

  return (
    <div className="bg-yellow-500 w-64 h-screen">
      <div className="p-4 flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <span className="text-white font-bold text-xl">PickMeUp</span>
      </div>
      <div className="mt-4">
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
                  onClick={() => handleClick("Rider 1")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Rider 1
                </button>
                <button
                  onClick={() => handleClick("Rider 2")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Rider 2
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
                  onClick={() => handleClick("Booking 1")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Booking 1
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
          onClick={() => handleClick("Manage Users")}
          className="block w-full text-left px-4 py-2 text-black bg-yellow-500 hover:bg-yellow-600"
        >
          Manage Users
        </button>
        <button
          onClick={() => handleClick("Feedback")}
          className="block w-full text-left px-4 py-2 text-black bg-yellow-500 hover:bg-yellow-600"
        >
          Feedback
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
