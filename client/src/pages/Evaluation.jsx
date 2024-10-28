import React, { useState } from 'react';
import useGetEvents from '../hooks/useGetEvents';
import Manage from '../components/Manage';
import ViewFeedback from '../components/ViewFeedback';
import ViewResults from '../components/ViewResults';

export default function Evaluation() {
  const { events, loading, error } = useGetEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [showManageEvent, setShowManageEvent] = useState(false);
  const [showViewFeedback, setShowViewFeedback] = useState(false);
  const [showViewResults, setShowViewResults] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter events based on the search term
  const filteredEvents = events.filter(event =>
    event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleManageClick = (event) => {
    setSelectedEvent(event);
    setShowManageEvent(true);
    setShowViewFeedback(false);
    setShowViewResults(false);
  };

  const handleViewFeedbackClick = (event) => {
    setSelectedEvent(event);
    setShowViewFeedback(true);
    setShowManageEvent(false);
    setShowViewResults(false); 
  };

  const handleViewResultsClick = (event) => {
    setSelectedEvent(event);
    setShowViewResults(true);
    setShowManageEvent(false);
    setShowViewFeedback(false);
  };

  const handleBackToList = () => {
    setShowManageEvent(false);
    setShowViewFeedback(false);
    setShowViewResults(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-6">
      {showManageEvent ? (
        <Manage event={selectedEvent} onBack={handleBackToList} />
      ) : showViewFeedback ? (
        <ViewFeedback event={selectedEvent} onBack={handleBackToList} />
      ) : showViewResults ? (
        <ViewResults event={selectedEvent} onBack={handleBackToList} />
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
            <h2 className="text-2xl font-bold">Event Evaluation</h2>
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

          {loading && (
            <div className="flex justify-center items-center h-32">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600" role="status" />
            </div>
          )}
          {error && (
            <div className="flex justify-center items-center h-32 text-red-500">
              <p>{error}</p>
            </div>
          )}
          {filteredEvents.length === 0 && !loading && !error && (
            <div className="flex justify-center items-center h-32 text-gray-500">
              <p>No events available.</p>
            </div>
          )}

          <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
            {filteredEvents.length > 0 && (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 w-1/5">Event Title</th>
                    <th className="px-6 py-4 w-1/5">Description</th>
                    <th className="px-6 py-4 w-1/5">Start date</th>
                    <th className="px-6 py-4 w-1/5">Date Finished</th>
                    <th className="px-6 py-4 w-1/5">Status</th>
                    <th className="px-6 py-4 w-1/5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr key={event.event_id} className="odd:bg-white even:bg-gray-50 border-b">
                      <th className="px-6 py-4 font-medium text-gray-900">
                        {event.event_title}
                      </th>
                      <td className="px-6 py-4">{event.event_description}</td>
                      <td className="px-6 py-4">
                        {new Date(event.created_at).toLocaleDateString(undefined, {
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
                      <td className="px-6 py-4">
                        <span className={`font-medium 
                          ${event.status === 'active' ? 'text-orange-500' :
                            event.status === 'ongoing' ? 'text-blue-500' :
                              event.status === 'completed' ? 'text-green-500' :
                                event.status === 'cancelled' ? 'text-red-500' : ''}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button
                          className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-1.5 py-1"
                          onClick={() => handleManageClick(event)}
                        >
                          Manage
                        </button>
                        <button
                          className="w-32 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-1.5 py-1"
                          onClick={() => handleViewFeedbackClick(event)}
                        >
                          View Feedback
                        </button>
                        <button
                          className="w-32 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-1.5 py-1"
                          onClick={() => handleViewResultsClick(event)}
                        >
                          View Results
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
