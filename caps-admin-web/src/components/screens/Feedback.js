import React, { useEffect, useState } from 'react';
import Sidenav from "../parts/Sidenav";
import Header from "../parts/Header";
import userService from '../../services';

export const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await userService.fetchFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error("There was an error fetching the feedbacks!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Filter feedbacks based on search input
  const filteredFeedbacks = feedbacks.filter((feedback) =>
    `${feedback.sender_first_name || ''} ${feedback.sender_last_name || ''}`
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate Total Pages
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

  // Generate Page Numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="px-4 py-2 bg-gray-200 rounded-lg">
                  Filter
                </button>
              </div>
            </div>
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : (
              <>
                <table className="w-full bg-gray-100 rounded-lg shadow">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-4 text-left">Sender</th>
                      <th className="p-4 text-left">Comment</th>
                      <th className="p-4 text-left">Recipient</th>
                      <th className="p-4 text-left">Sender Type</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Ride ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(feedback => (
                      <tr className="bg-white border-b" key={feedback.feedback_id}>
                        <td className="p-4">
                          {feedback.sender_first_name && feedback.sender_last_name
                            ? `${feedback.sender_first_name} ${feedback.sender_last_name}`
                            : 'N/A'}
                        </td>
                        <td className="p-4">{feedback.comment || 'N/A'}</td>
                        <td className="p-4">
                          {feedback.recipient_first_name && feedback.recipient_last_name
                            ? `${feedback.recipient_first_name} ${feedback.recipient_last_name}`
                            : 'N/A'}
                        </td>
                        <td className="p-4">{feedback.sender_type ? feedback.sender_type.split('\\').pop() : 'N/A'}</td>
                        <td className="p-4">{feedback.created_at ? new Date(feedback.created_at).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-4">{feedback.ride_id || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="flex flex-col items-center mt-4 p-4">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Previous
                    </button>
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded ${number === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-200'}`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Next
                    </button>
                  </div>
                  <span className="flex items-center">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
