import React, { useState } from "react";
import Header from "../../parts/Header";
import Sidenav from "../../parts/Sidenav";

function RidersPayment() {
  const [riderName, setRiderName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [message, setMessage] = useState("");

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setMessage(
      `Payment of $${paymentAmount} to ${riderName} on ${paymentDate} has been recorded.`
    );
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidenav />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-grow p-4 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Rider Payments
            </h1>

            {/* Success message */}
            {message && (
              <div className="mb-4 text-green-600 text-center font-semibold">
                {message}
              </div>
            )}

            {/* Form to record payment */}
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="riderName">
                  Rider Name
                </label>
                <input
                  type="text"
                  id="riderName"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
                  value={riderName}
                  onChange={(e) => setRiderName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="paymentAmount"
                >
                  Payment Amount
                </label>
                <input
                  type="number"
                  id="paymentAmount"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="paymentDate"
                >
                  Payment Date
                </label>
                <input
                  type="date"
                  id="paymentDate"
                  className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-500"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white py-3 px-6 rounded-md hover:bg-indigo-600 transition-colors w-full"
              >
                Record Payment
              </button>
            </form>

            {/* Riders Payment List */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">
                Rider Payment History
              </h2>
              <ul className="list-disc list-inside">
                <li>John Doe - $150 - 2024-10-01</li>
                <li>Jane Smith - $200 - 2024-09-25</li>
                <li>Michael Brown - $180 - 2024-09-18</li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default RidersPayment;
