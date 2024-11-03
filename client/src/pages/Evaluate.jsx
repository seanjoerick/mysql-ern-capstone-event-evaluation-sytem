import React, { useState, useEffect } from 'react';
import useEventsWith10Criteria from '../hooks/useGetEventsWith10Criteria';
import StudEvaluate from '../components/StudEvaluate';

export default function Evaluate() {
  const { events, loading, error } = useEventsWith10Criteria();
  const [showManageEvent, setShowManageEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submittedEventIds, setSubmittedEventIds] = useState([]);
  const [lastEvaluation, setLastEvaluation] = useState(null);

  useEffect(() => {
    const fetchSubmittedEvents = async () => {
      const response = await fetch('/api/event/evaluations/submitted/get');
      if (response.ok) {
        const data = await response.json();
        setSubmittedEventIds(data.submittedEventIds);
        
        // Set the last evaluation details if available
        if (data.submittedEventIds.length > 0) {
          const lastEventId = data.submittedEventIds[data.submittedEventIds.length - 1];
          const lastEvent = events.find(event => event.event_id === lastEventId);
          setLastEvaluation(lastEvent);
        }
      }
    };

    fetchSubmittedEvents();
  }, [events]);

  const filteredEvents = events.filter(event => 
    event.status === 'completed' && !submittedEventIds.includes(event.event_id)
  );

  const handleManageClick = (event) => {
    setSelectedEvent(event);
    setShowManageEvent(true);
  };

  const handleBackToList = () => {
    setShowManageEvent(false);
    setSelectedEvent(null);
  };

  const handleSubmitSuccess = (eventId) => {
    setSubmittedEventIds((prevIds) => [...prevIds, eventId]);
    
    // Update last evaluation with the newly submitted event
    const submittedEvent = events.find(event => event.event_id === eventId);
    setLastEvaluation(submittedEvent);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col justify-between">
      <div>
        <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">Evaluate</h2>
        
        {showManageEvent ? (
          <StudEvaluate 
            event={selectedEvent} 
            onBack={handleBackToList} 
            onSubmitSuccess={handleSubmitSuccess}
          />
        ) : (
          <div>
            {/* Loading, Error, and Empty State Messages */}
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
                <p>No evaluations available.</p>
              </div>
            )}

            {/* Events Table */}
            {filteredEvents.length > 0 && (
              <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 w-1/5">Event Title</th>
                      <th className="px-6 py-4 w-1/5">Description</th>
                      <th className="px-6 py-4 w-1/5">Date Finished</th>
                      <th className="px-6 py-4 w-1/5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event, index) => (
                      <tr key={`${event.event_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
                        <th className="px-6 py-4 font-medium text-gray-900">
                          {event.event_title}
                        </th>
                        <td className="px-6 py-4">{event.event_description}</td>
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
                          <button
                            className="w-32 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-1.5 py-1"
                            onClick={() => handleManageClick(event)}
                          >
                            Evaluate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Last Evaluation Section at the Bottom */}
      {lastEvaluation && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Last Submitted Evaluated</h3>
          <p className="text-gray-700 mb-2">
            <strong>Event Title:</strong> {lastEvaluation.event_title}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Description:</strong> {lastEvaluation.event_description}
          </p>
          <p className="text-gray-700">
            <strong>Date Finished:</strong> {new Date(lastEvaluation.end_date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
      )}
    </div>
  );
}
