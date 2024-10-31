import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import useGetEvents from '../hooks/useGetEvents';
import EventModal from '../components/EventModal';
import EditEventModal from '../components/EventEditModal';
import toast from 'react-hot-toast';

export default function Events() {
    const { events, setEvents, loading, error } = useGetEvents();
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    // Filter events based on the search term
    const filteredEvents = events.filter(event =>
        event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.event_description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const handleUpdateEvent = async (updatedEvent) => {
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
            setShowEditEventModal(false);
        }
    };

    const handleDeleteEvent = async () => {
        if (!eventToDelete) return;
        try {
            const res = await fetch(`/api/event/delete/${eventToDelete.event_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to delete event');

            setEvents(prevEvents => prevEvents.filter(event => event.event_id !== eventToDelete.event_id));
            toast.success(data.message);
            setShowDeleteModal(false);
            setEventToDelete(null);
        } catch (error) {
            toast.error(`${error.message}`);
            console.error('Error deleting event:', error);
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16  16"
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
                    <button
                        type="button"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => setShowAddEventModal(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" /> EVENT
                    </button>
                </div>
            </div>

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
                    <p>No events available.</p>
                </div>
            )}
            
      {/* Events Table */}
      <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
      {filteredEvents.length > 0 && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 w-1/4">Event Title</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Description</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Start Date</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Date Finished</th>
                    <th scope='col' className='px-6 py-4 w-1/4'>Status</th>
                    <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredEvents.map((event) => (
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
                            <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"
                                onClick={() => {
                                    setSelectedEvent(event);
                                    setShowEditEventModal(true);
                                }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                                onClick={() => {
                                    setEventToDelete(event);
                                    setShowDeleteModal(true);
                                }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </div>

            {/* Modals */}
            {showAddEventModal && (
                <EventModal
                    onClose={() => setShowAddEventModal(false)}
                    onAddEvent={handleAddEvent}
                    loading={loadingEvent}
                />
            )}
            {showEditEventModal && (
                <EditEventModal
                    event={selectedEvent}
                    onClose={() => setShowEditEventModal(false)}
                    onUpdateEvent={handleUpdateEvent}
                    loading={loadingEvent}
                />
            )}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p>Are you sure you want to delete the event titled "{eventToDelete?.event_title}"?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleDeleteEvent}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
