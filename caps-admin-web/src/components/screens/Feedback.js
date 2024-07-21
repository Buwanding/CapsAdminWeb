import React from 'react'
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";


export const Feedback = () => {

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Feedback</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search Names"
                  className="px-4 py-2 border rounded-lg"
                />
                <button className="px-4 py-2 bg-gray-200 rounded-lg">
                  Filter
                </button>
              </div>
            </div>
            <table className="w-full bg-gray-100 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Reporter Name</th>
                  <th className="p-4 text-left">Reported Name</th>
                  <th className="p-4 text-left">Customer/Rider</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="p-4">
                    Rider is not friendly and drop on wrong location
                  </td>
                  <td className="p-4">Tadgh Masaharu</td>
                  <td className="p-4">Hiroki Augusta</td>
                  <td className="p-4">Customer</td>
                  <td className="p-4">5.12.2024</td>
                  <td className="p-4">Baluulang</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="p-4">Customer did not play well</td>
                  <td className="p-4">Tadgh Masaharu</td>
                  <td className="p-4">Hiroki Augusta</td>
                  <td className="p-4">Rider</td>
                  <td className="p-4">5.12.2024</td>
                  <td className="p-4">Baluulang</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4">
                    Rider is very responsible and friendly
                  </td>
                  <td className="p-4">Tadgh Masaharu</td>
                  <td className="p-4">Hiroki Augusta</td>
                  <td className="p-4">Customer</td>
                  <td className="p-4">5.12.2024</td>
                  <td className="p-4">Baluulang</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
