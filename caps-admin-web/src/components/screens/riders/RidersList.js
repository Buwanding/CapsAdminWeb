import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import API_URL from "../../../api_url";


const RidersList = () => {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await axios.get(API_URL+ 'user/riders');
        setRiders(response.data);
      } catch (error) {
        console.error("There was an error fetching the riders!", error);
      }
    };

    fetchRiders();
  }, []);

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1">
        <Header />
        <main className="p-4">
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
                    <td className="px-4 py-2">{rider.first_name} {rider.last_name}</td>
                    <td className="px-4 py-2">{rider.mobile_number}</td>
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
