import React from 'react'
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";
import { ChevronDownIcon } from "@heroicons/react/solid";
export const ManageUser = () => {
  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1">
        <Header />
        <main className="p-4">
          <div className="p-4">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Users</h2>
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Search Names"
                    className="border border-gray-300 rounded-l px-4 py-2"
                  />
                  <button className="bg-gray-300 px-4 py-2 rounded-r">
                    Filter
                  </button>
                </div>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">
                      Customer Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Eve Key", status: "Blocked" },
                    { name: "Wade Orr", status: "Active" },
                    { name: "Julie Small", status: "Active" },
                    { name: "Chaim Nichols", status: "Active" },
                    { name: "Cassius Mcdonald", status: "Active" },
                    { name: "Layla Carroll", status: "Active" },
                    { name: "Emmy Summers", status: "Active" },
                  ].map((user, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {user.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 flex justify-between">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded">
                          {user.status === "Blocked" ? "Unblock" : "Block"}
                        </button>
                        <span
                          className={`px-4 py-2 rounded ${
                            user.status === "Blocked"
                              ? "bg-red-500 text-white"
                              : "bg-gray-800 text-white"
                          }`}
                        >
                          {user.status}
                        </span>
                        <button className="ml-4">
                          <ChevronDownIcon className="w-5 h-5 text-gray-800" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
