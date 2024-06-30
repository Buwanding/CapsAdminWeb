import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const Sidebar = () => {
  return (
    <div className="bg-yellow-500 w-64 h-screen">
      <div className="p-4 flex items-center space-x-2">
        <img src="path_to_logo_image" alt="Logo" className="h-10 w-10" />
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
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Rider 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Rider 2
                </a>
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
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Booking 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Booking 2
                </a>
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
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Customer 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                  Customer 2
                </a>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Sidebar;
