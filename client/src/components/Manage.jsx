import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useGetCriteriaById from '../hooks/useGetCriteriaById';
import AddCriteria from './AddCriteria';
import EditCriteriaModal from './EditCriteria';
import toast from 'react-hot-toast';

const Manage = ({ event, onBack }) => {
  const { event_id, event_title } = event || {};
  const { criteria, setCriteria, loading, error } = useGetCriteriaById(event_id);
  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
  const [showEditCriteriaModal, setShowEditCriteriaModal] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [criteriaToDelete, setCriteriaToDelete] = useState(null);

  const handleAddCriteria = async (newCriteria) => {
    setLoadingEvent(true);
    try {
      const res = await fetch(`/api/event/criteria/${event_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCriteria),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(data.message);
      setCriteria((prev) => [
        ...prev,
        { criteria_name: newCriteria.criteria_name, max_score: newCriteria.max_score },
      ]);
      setShowAddCriteriaModal(false);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error adding criteria:', error);
    } finally {
      setLoadingEvent(false);
    }
  };

  const handleUpdateCriteria = async (updatedCriteria) => {
    console.log(updatedCriteria.criteria_id);
    try {
      const res = await fetch(`/api/event/criteria/update/${updatedCriteria.criteria_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCriteria),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setCriteria((prevCriteria) =>
        prevCriteria.map((criteria) =>
          criteria.criteria_id === updatedCriteria.criteria_id ? updatedCriteria : criteria
        )
      );
      toast.success(data.message);
      setShowEditCriteriaModal(false);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error updating criteria:', error);
    } finally {
      setShowEditCriteriaModal(false);
    }
  };

  const handleDeleteCriteria = async () => {
    if (!criteriaToDelete) return;
    try {
      const res = await fetch(`/api/event/criteria/delete/${criteriaToDelete.criteria_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete criteria');

      toast.success(data.message);

      setCriteria((prevCriteria) => prevCriteria.filter((c) => c.criteria_id !== criteriaToDelete.criteria_id));
      setShowDeleteModal(false);
      setCriteriaToDelete(null);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error deleting criteria:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <button
          className="mt-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        </button>
        <h2 className="text-3xl font-extrabold text-gray-800">{event_title}</h2>
        <div className="flex items-center">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => setShowAddCriteriaModal(true)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Criteria
          </button>
        </div>
      </div>
      <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600" role="status" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-32 text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : criteria.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            <p>No criteria available.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/4">Criteria Name</th>
                <th scope="col" className="px-6 py-4 w-1/4">Max Score</th>
                <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criteria) => (
                <tr key={criteria.criteria_id} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{criteria.criteria_name}</td>
                  <td className="px-6 py-4">{criteria.max_score}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={() => {
                        setSelectedCriteria(criteria);
                        setShowEditCriteriaModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={() => {
                        setCriteriaToDelete(criteria);
                        setShowDeleteModal(true);
                      }}
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

      {/* Add Criteria Modal */}
      {showAddCriteriaModal && <AddCriteria onAddCriteria={handleAddCriteria} onClose={() => setShowAddCriteriaModal(false)} />}

      {showEditCriteriaModal && (
        <EditCriteriaModal
          criteria={selectedCriteria}
          onUpdateCriteria={handleUpdateCriteria}
          onClose={() => setShowEditCriteriaModal(false)}
        />
      )}

      {/* Delete Event Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-sm text-gray-600">Are you sure you want to delete this question?</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={handleDeleteCriteria}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
