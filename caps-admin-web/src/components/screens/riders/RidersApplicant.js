import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";

const users = [
  {
    name: "Sonny Ali",
    username: "SonnyAli",
    avatar: "path_to_avatar", // Replace with actual path
    documents: [
      "Motor Picture",
      "ROCR",
      "Certificate of Registration",
      "Driver License",
      "TPL Insurance",
      "Barangay Clearance",
      "Police Clearance",
      "Motor Picture with Plate Number",
    ],
  },
  {
    name: "Tracy Moreno",
    username: "TracyMoreno",
    avatar: "path_to_avatar", // Replace with actual path
    documents: [
      "Motor Picture",
      "ROCR",
      "Certificate of Registration",
      "Driver License",
      "TPL Insurance",
      "Barangay Clearance",
      "Police Clearance",
      "Motor Picture with Plate Number",
    ],
  },
];

const UserCard = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white mb-4">
      <div className="flex items-center mb-4">
        <img
          src={user.avatar}
          alt="Avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-4">
          <p className="font-bold">{user.name}</p>
          <p className="text-gray-600">@{user.username}</p>
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
          {user.documents.map((doc, index) => (
            <div key={index} className="bg-gray-300 p-4 rounded text-center">
              {doc}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const RidersApplicant = () => {
  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1">
        <Header />
        <main className="p-4">
          <div className="flex">
            <div className="flex-1">
              <div className="p-4">
                {users.map((user, index) => (
                  <UserCard key={index} user={user} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
