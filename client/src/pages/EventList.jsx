import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useGetEvents from '../hooks/useGetEvents';
import toast from 'react-hot-toast';

export default function EventList() {
  const { events, setEvents, loading, error } = useGetEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter events based on the search term
  const filteredEvents = events.filter(event =>
    event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total pages based on filtered results
  const totalPages = Math.max(Math.ceil(filteredEvents.length / itemsPerPage), 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the displayed events based on the current page
  const displayedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Events list</h2>
        <div className="flex items-center">
          <label className="input input-bordered flex items-center gap-2 mr-4">
            <input 
              type="text" 
              className="grow" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      {/* Events Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-32 text-red-500">
            <p>{error}</p>
          </div>
        ) : filteredEvents.length === 0 ? ( 
          <div className="flex justify-center items-center h-32 text-gray-500">
            <p>No events available.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/4">Event Title</th>
                <th scope="col" className="px-6 py-4 w-1/4">Description</th>
                <th scope="col" className="px-6 py-4 w-1/4">Start Date</th>
                <th scope="col" className="px-6 py-4 w-1/4">End Date</th>
                <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEvents.map((event) => (
                <tr key={event.event_id} className="odd:bg-white even:bg-gray-50 border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {event.event_title}
                  </th>
                  <td className="px-6 py-4">{event.event_description}</td>
                  <td className="px-6 py-4">
                    {new Date(event.start_date).toLocaleDateString(undefined, {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                     hour: '2-digit',
                     minute: '2-digit',
                     hour12: true
                    })}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(event.end_date).toLocaleDateString(undefined, {
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                     hour: '2-digit',
                     minute: '2-digit',
                     hour12: true
                    })}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-1.5 py-1">
                      Manage
                    </button>
                    <button className="w-32 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-1.5 py-1">
                      View Result
                    </button>
                    <button className="w-32 text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-1.5 py-1">
                      View Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
