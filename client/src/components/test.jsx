
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useGetEvents from '../hooks/useGetEvents';
import EventModal from '../components/EventModal';
import EditEventModal from '../components/EventEditModal';
import toast from 'react-hot-toast';

export default function Events() {
  const { events, setEvents, count, loading, error } = useGetEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false); // State for Edit Modal
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the event to be edited
  const [loadingEvent, setLoadingEvent] = useState(false);

  const filteredEvents = events.filter(event =>
    event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredEvents.length / itemsPerPage), 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddEvent = async (newEvent) => {
    setLoadingEvent(true);
    try {
      const res = await fetch('/api/event/create', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(data.message);
      setEvents(prev => [...prev, data.event]);
      setShowAddEventModal(false);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error adding event:', error);
    } finally {
      setLoadingEvent(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const res = await fetch(`/api/event/delete/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete event');

      setEvents(prevEvents => prevEvents.filter(event => event.event_id !== eventId));
      toast.success(data.message);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    setLoadingEvent(true); // Start loading
    try {
      const res = await fetch(`/api/event/update/${updatedEvent.event_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setEvents(prevEvents => prevEvents.map(event => event.event_id === updatedEvent.event_id ? updatedEvent : event));
      toast.success(data.message);
      setShowEditEventModal(false);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error updating event:', error);
    } finally {
      setLoadingEvent(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <div className="flex items-center">
          <label className="input input-bordered flex items-center gap-2 mr-4">
            <input 
              type="text" 
              className="grow" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
            </svg>
          </label>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => setShowAddEventModal(true)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> ADD EVENT
          </button>
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
                <th scope="col" className="px-6 py-4 w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedEvents.map((event) => (
                <tr key={event.event_id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{event.event_title}</td>
                  <td className="px-6 py-4">{event.event_description}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEditEventModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteEvent(event.event_id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Add Event Modal */}
      {showAddEventModal && (
        <EventModal
          onClose={() => setShowAddEventModal(false)}
          onAddEvent={handleAddEvent}
          loading={loadingEvent}
        />
      )}

      {/* Edit Event Modal */}
      {showEditEventModal && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => {
            setShowEditEventModal(false);
            setSelectedEvent(null); // Clear selected event when closing modal
          }}
          onUpdateEvent={handleUpdateEvent}
          loading={loadingEvent}
        />
      )}
    </div>
  );
}
