import React from 'react'
import Sidenav from '../parts/Sidenav'
import Header from '../parts/Header'
export const Dashboard = () => {
  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Active Riders</h2>
              <p className="text-4xl">170</p>
              <p className="text-lg">Active Riders</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Disable Riders</h2>
              <p className="text-4xl">5</p>
              <p className="text-lg">Disable Riders</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Customers</h2>
              <p className="text-4xl">359</p>
              <p className="text-lg">Customer</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Booking Data</h2>
              <p className="text-4xl">1879</p>
              <p className="text-lg">Customer</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
