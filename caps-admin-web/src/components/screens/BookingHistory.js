import React from 'react'
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";

export const BookingHistory = () => {
  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="p-4">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Booking History</h2>
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
                      Customer
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Rider
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">Date</th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Start Destination
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      End Destination
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      customer: "Fay Walker",
                      rider: "Eve Key",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Complete",
                    },
                    {
                      customer: "Jude Ortega",
                      rider: "Wade Orr",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Complete",
                    },
                    {
                      customer: "Bella Mejia",
                      rider: "Julie Small",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Complete",
                    },
                    {
                      customer: "Leyton Little",
                      rider: "Chaim Nichols",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Cancel",
                    },
                    {
                      customer: "Yousuf Farmer",
                      rider: "Cassius Mcdonald",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Cancel",
                    },
                    {
                      customer: "Tobias Dyer",
                      rider: "Layla Carroll",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Complete",
                    },
                    {
                      customer: "Benedict Sandoval",
                      rider: "Emmy Summers",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Complete",
                    },
                    {
                      customer: "Pearl Stark",
                      rider: "Stella Mullins",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Complete",
                    },
                    {
                      customer: "Aqsa Scott",
                      rider: "Olivier Figueroa",
                      date: "Dec 5",
                      start: "BARRA",
                      end: "USPT",
                      status: "Complete",
                    },
                  ].map((booking, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {booking.customer}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {booking.rider}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {booking.date}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {booking.start}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {booking.end}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {booking.status}
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
