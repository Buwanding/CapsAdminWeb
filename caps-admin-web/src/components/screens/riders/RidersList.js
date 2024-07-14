import React from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";

const riders = [
  { name: "Thad Huber", phone: "+1 (143) 666-4411", status: "Active" },
  { name: "Bethany Marquez", phone: "+1 (828) 738-0421", status: "Active" },
  { name: "Erin Flowers", phone: "+1 (927) 648-1327", status: "Active" },
  {
    name: "Gil Vincent",
    phone: "+1 (785) 353-7165",
    status: "Disable for 12 hours",
  },
  {
    name: "Jayne Oliver",
    phone: "+1 (573) 719-7080",
    status: "Disable for 42 hours",
  },
  { name: "Sonny Ali", phone: "+1 (209) 973-0709", status: "Active" },
  {
    name: "Tracy Moreno",
    phone: "+1 (837) 677-2597",
    status: "Disable for 100 hours",
  },
];

const RidersList = () => {
  return (
    <div className="flex h-screen">
      <Sidenav />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow p-6 bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">RIDERS LIST</h1>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search Names"
                  className="px-4 py-2 border rounded-lg"
                />
                <button className="px-4 py-2 border rounded-lg">Filter</button>
              </div>
            </div>
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{rider.name}</td>
                    <td className="px-4 py-2">{rider.phone}</td>
                    <td className="px-4 py-2">
                      {rider.status === "Active" ? (
                        <span className="inline-flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          <span>{rider.status}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          <span>{rider.status}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex items-center space-x-4">
              <input type="time" className="border rounded-lg px-4 py-2" />
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                Disable
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                Activate Rider
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RidersList;
