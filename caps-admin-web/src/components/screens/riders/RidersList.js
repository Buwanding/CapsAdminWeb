import React, { useEffect, useState } from "react";
import Sidenav from "../../parts/Sidenav";
import Header from "../../parts/Header";
import userService from "../../../services";

const RidersList = () => {
  const [riders, setRiders] = useState([]);
  const [selectedRiders, setSelectedRiders] = useState([]);
  const [loadingActivate, setLoadingActivate] = useState(false);
  const [loadingDisable, setLoadingDisable] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRiders, setFilteredRiders] = useState([]);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const data = await userService.fetchRiders();
        setRiders(data);
        setFilteredRiders(data);
      } catch (error) {
        console.error("There was an error fetching the riders!", error);
      }
    };

    fetchRiders();
  }, []);

  const handleSelectRider = (riderId) => {
    setSelectedRiders((prevSelectedRiders) => {
      if (prevSelectedRiders.includes(riderId)) {
        return prevSelectedRiders.filter((id) => id !== riderId);
      } else {
        return [...prevSelectedRiders, riderId];
      }
    });
  };

  const handleActivateRiders = async () => {
    setLoadingActivate(true);
    try {
      await Promise.all(
        selectedRiders.map((riderId) =>
          userService.updateUserStatus(riderId, "Active")
        )
      );
      setRiders((prevRiders) =>
        prevRiders.map((rider) =>
          selectedRiders.includes(rider.user_id)
            ? { ...rider, status: "Active" }
            : rider
        )
      );
      setSelectedRiders([]);
    } catch (error) {
      console.error("Error activating riders:", error);
    } finally {
      setLoadingActivate(false);
    }
  };

  const handleDisableRiders = async () => {
    setLoadingDisable(true);
    try {
      await Promise.all(
        selectedRiders.map((riderId) =>
          userService.updateUserStatus(riderId, "Disabled")
        )
      );
      setRiders((prevRiders) =>
        prevRiders.map((rider) =>
          selectedRiders.includes(rider.user_id)
            ? { ...rider, status: "Disabled" }
            : rider
        )
      );
      setSelectedRiders([]);
    } catch (error) {
      console.error("Error disabling riders:", error);
    } finally {
      setLoadingDisable(false);
    }
  };

  const isAnySelectedActive = selectedRiders.some((riderId) => {
    const rider = riders.find((r) => r.user_id === riderId);
    return rider?.status === "Active";
  });

  const isAnySelectedDisabled = selectedRiders.some((riderId) => {
    const rider = riders.find((r) => r.user_id === riderId);
    return rider?.status === "Disabled";
  });

  const handleFilter = () => {
    const filtered = riders.filter((rider) =>
      `${rider.first_name} ${rider.last_name}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setFilteredRiders(filtered);
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-grow p-4 bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">RIDERS LIST</h1>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Search Names"
                  className="px-4 py-2 border rounded-lg"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  className="px-4 py-2 border rounded-lg"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRiders(riders.map((rider) => rider.user_id));
                        } else {
                          setSelectedRiders([]);
                        }
                      }}
                      checked={
                        selectedRiders.length === riders.length &&
                        riders.length > 0
                      }
                    />
                  </th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Verification</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiders.map((rider) => (
                  <tr key={rider.user_id} className="border-t">
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedRiders.includes(rider.user_id)}
                        onChange={() => handleSelectRider(rider.user_id)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      {rider.first_name} {rider.last_name}
                    </td>
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
                    <td className="px-4 py-2">
                      {rider.rider?.verification_status === "Verified" ? (
                        <span className="inline-flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex items-center space-x-4">
              <button
                className={`${
                  loadingDisable
                    ? "bg-red-700"
                    : isAnySelectedDisabled
                    ? "bg-red-300"
                    : "bg-red-500 hover:bg-red-700"
                } text-white font-bold py-2 px-4 rounded-full`}
                onClick={handleDisableRiders}
                disabled={isAnySelectedDisabled || loadingDisable}
              >
                {loadingDisable ? "Disabling..." : "Disable"}
              </button>
              <button
                className={`${
                  loadingActivate
                    ? "bg-green-700"
                    : isAnySelectedActive
                    ? "bg-green-300"
                    : "bg-green-500 hover:bg-green-700"
                } text-white font-bold py-2 px-4 rounded-full`}
                onClick={handleActivateRiders}
                disabled={isAnySelectedActive || loadingActivate}
              >
                {loadingActivate ? "Activating..." : "Activate Rider"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RidersList;
