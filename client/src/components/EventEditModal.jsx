import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";

const EditEventModal = ({ event, onClose, onUpdateEvent }) => {
  const [eventTitle, setEventTitle] = useState(event?.event_title || '');
  const [eventDescription, setEventDescription] = useState(event?.event_description || '');
  const [startDate, setStartDate] = useState(event?.start_date || '');
  const [endDate, setEndDate] = useState(event?.end_date || '');
  const [loading, setLoading] = useState(false);

  // Effect to update form when the event prop changes
  useEffect(() => {
    if (event) {
      setEventTitle(event.event_title);
      setEventDescription(event.event_description);
      setStartDate(event.start_date);
      setEndDate(event.end_date);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const updatedEvent = {
      ...event,
      event_title: eventTitle,
      event_description: eventDescription,
      start_date: startDate,
      end_date: endDate,
    };
    
    await onUpdateEvent(updatedEvent);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-[550px] max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              EDIT EVENT
            </h3>
            <button
              type="button"
              className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={loading ? null : onClose}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Event Title</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event title"
                  required
                  className="border rounded-lg w-full p-2"
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Event Description</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Enter event description"
                  required
                  className="border rounded-lg w-full p-2"
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border rounded-lg w-full p-2"
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded-lg w-full p-2"
                  disabled={loading}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span> {/* Loading spinner */}
                      <span className="ml-2">Updating...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      Update 
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;

