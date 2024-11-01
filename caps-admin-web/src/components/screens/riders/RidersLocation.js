import React from 'react'
import Sidenav from '../../parts/Sidenav';
import Header from '../../parts/Header';

function RidersLocation() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidenav />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-grow p-6 bg-gray-50">
            <h1 className="text-2xl font-bold">Riders Location</h1>
            <div className="flex">
              <input
                type="text"
                placeholder="Search Names"
                className="border border-gray-300 rounded-l px-4 py-2"
                value={""}
                onChange={""}
              />
              <button className="bg-gray-300 px-4 py-2 rounded-r" onClick={""}>
                Filter
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default RidersLocation