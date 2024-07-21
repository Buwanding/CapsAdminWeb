import React, { useEffect, useState } from 'react';
import Sidenav from '../parts/Sidenav';
import Header from '../parts/Header';
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from 'react-router-dom';
import userService from '../../services';


export const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [counts, setCounts] = useState({
    active_riders: 0,
    disabled_riders: 0,
    customers: 0,
    completed_rides: 0,
  });

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const data = await userService.getDashboardCounts();
        setCounts(data);
      } catch (error) {
        console.error('There was an error fetching the counts!', error);
      }
    };

    fetchDashboardCounts();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Active Riders</h2>
              <p className="text-4xl">{counts.active_riders}</p>
              <p className="text-lg">Total Active Riders</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Disable Riders</h2>
              <p className="text-4xl">{counts.disabled_riders}</p>
              <p className="text-lg">Total Disabled Riders</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Customers</h2>
              <p className="text-4xl">{counts.customers}</p>
              <p className="text-lg">Total Number of Customer</p>
            </div>
            <div className="bg-yellow-500 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Booking Data</h2>
              <p className="text-4xl">{counts.completed_rides}</p>
              <p className="text-lg">Total Completed Rides</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}