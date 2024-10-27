import React, { useEffect, useState } from "react";
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import userService from "../../services";

export const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [counts, setCounts] = useState({
    active_riders: 0,
    disabled_riders: 0,
    customers: 0,
    completed_rides: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [displayedBookings, setDisplayedBookings] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [stats, setStats] = useState({
    weeklyEarnings: 0,
    monthlyEarnings: 0,
    avgRideDistance: 0,
    avgRideTime: 0,
  });
  const [areEarningsVisible, setAreEarningsVisible] = useState(true); // State for earnings visibility

  // Calculate page size based on screen height
  useEffect(() => {
    const calculatePageSize = () => {
      const rowHeight = 53;
      const tableContainer = document.querySelector(
        ".bookings-table-container"
      );
      if (tableContainer) {
        const availableHeight = tableContainer.clientHeight;
        const visibleRows = Math.floor(availableHeight / rowHeight);
        setPageSize(Math.max(visibleRows - 1, 3));
      }
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  // Update displayed bookings when data or page size changes
  useEffect(() => {
    setDisplayedBookings(recentBookings.slice(0, pageSize));
  }, [recentBookings, pageSize]);

  useEffect(() => {
    const fetchCounts = async () => {
      setIsLoading(true);
      try {
        const { counts: countsData, bookings: bookingsData } =
          await userService.getDashboardCounts();
        setCounts(countsData);
        setRecentBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 300000);
    return () => clearInterval(interval);
  }, []);

  const toggleEarningsVisibility = () => {
    setAreEarningsVisible((prev) => !prev);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen ">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100 overflow-hidden">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="animate__animated animate__fadeIn bg-yellow-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
              <h2 className="text-xl font-bold text-white mb-2">
                Active Riders
              </h2>
              <p className="text-4xl font-bold text-white mb-2">
                {counts.active_riders}
              </p>
              <p className="text-white text-opacity-90">Total Active Riders</p>
            </div>
            <div className="animate__animated animate__fadeIn bg-yellow-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
              <h2 className="text-xl font-bold text-white mb-2">
                Disabled Riders
              </h2>
              <p className="text-4xl font-bold text-white mb-2">
                {counts.disabled_riders}
              </p>
              <p className="text-white text-opacity-90">
                Total Disabled Riders
              </p>
            </div>
            <div className="animate__animated animate__fadeIn bg-yellow-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
              <h2 className="text-xl font-bold text-white mb-2">Customers</h2>
              <p className="text-4xl font-bold text-white mb-2">
                {counts.customers}
              </p>
              <p className="text-white text-opacity-90">
                Total Number of Customers
              </p>
            </div>
            <div className="animate__animated animate__fadeIn bg-yellow-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
              <h2 className="text-xl font-bold text-white mb-2">
                Completed Rides
              </h2>
              <p className="text-4xl font-bold text-white mb-2">
                {counts.completed_rides}
              </p>
              <p className="text-white text-opacity-90">
                Total Completed Rides
              </p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="animate__animated animate__fadeIn bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
                Earnings Overview
                <button
                  onClick={toggleEarningsVisibility}
                  className="text-blue-500 underline"
                >
                  {areEarningsVisible ? "Hide" : "Show"}
                </button>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Weekly Earnings</p>
                  <p className="text-2xl font-bold">
                    {areEarningsVisible
                      ? `₱1,00${stats.weeklyEarnings}`
                      : "****"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Monthly Earnings</p>
                  <p className="text-2xl font-bold">
                    {areEarningsVisible
                      ? `₱30,00${stats.monthlyEarnings}`
                      : "****"}
                  </p>
                </div>
              </div>
            </div>
            <div className="animate__animated animate__fadeIn bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Ride Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Avg. Distance</p>
                  <p className="text-2xl font-bold">
                    {stats.avgRideDistance} km
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Avg. Ride Time</p>
                  <p className="text-2xl font-bold">{stats.avgRideTime} min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white animate__animated animate__fadeIn rounded-lg shadow-lg p-6 flex flex-col h-[calc(100vh-540px)] min-h-[300px]">
            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
            <div className="bookings-table-container flex-grow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        #{booking.ride_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {booking.user
                          ? `${booking.user.first_name} ${booking.user.last_name}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {booking.rider
                          ? `${booking.rider.first_name} ${booking.rider.last_name}`
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "Canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ₱{booking.fare}
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
};
