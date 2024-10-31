import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import useEventCriteria from '../hooks/useEventCriteria'; 
import toast, { Toaster } from 'react-hot-toast';

const Manage = ({ event, onBack }) => {
  const { event_id, event_title, end_date } = event || {};
  const { criteria, loading, error, setCriteria } = useEventCriteria(event_id); 
  const [newCriteria, setNewCriteria] = useState({
    criteria_name: '',
    max_score: 5,
  });
  const [selectedCriteria, setSelectedCriteria] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const requiredCriteriaCount = 10;

  const handleAddCriteria = async () => {
    try {
      const response = await fetch(`/api/event/criteria/${event_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCriteria),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const addedCriteria = data.criteria;
  
        toast.success(data.message);
        setCriteria(prev => [
          ...prev,
          {
            criteria_id: addedCriteria.id,
            criteria_name: addedCriteria.name,
            max_score: addedCriteria.max_score,
          },
        ]);
  
        setNewCriteria({ criteria_name: '', max_score: 5 });
        toggleModal();
      } else {
        toast.error(data.error || 'An error occurred while adding criteria.'); 
        setNewCriteria({ criteria_name: '', max_score: 5 });
        toggleModal();
      }
    } catch (err) {
      console.error(err);
      toggleModal();
    }
  };

  const handleEditCriteria = async () => {
    try {
      const existingCriteria = criteria.find(c => c.criteria_id === selectedCriteria.criteria_id);
      if (existingCriteria && 
          (existingCriteria.criteria_name === selectedCriteria.criteria_name && 
           existingCriteria.max_score === selectedCriteria.max_score)) {
        toast.error('No changes made to the criteria.');
        toggleModal();
        return;
      }
  
      const response = await fetch(`/api/event/criteria/update/${selectedCriteria.criteria_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCriteria),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setCriteria(prev => 
          prev.map(criteria => 
            criteria.criteria_id === data.criteria.criteria_id 
              ? { ...criteria, criteria_name: data.criteria.criteria_name, max_score: data.criteria.max_score }
              : criteria
          )
        );
  
        toast.success(data.message);
        setSelectedCriteria(null);
        setIsEditMode(false);
        toggleModal();
      } else {
        toast.error(data.error || 'Failed to update criteria.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error occurred while updating criteria.');
    }
  };
  
  const handleDeleteCriteria = async (criteriaId) => {
    try {
      const response = await fetch(`/api/event/criteria/delete/${criteriaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCriteria(prev => prev.filter(crit => crit.criteria_id !== criteriaId));
        toast.success('Criteria deleted successfully!');
      } else {
        toast.error('Failed to delete criteria.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error occurred while deleting criteria.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setNewCriteria({ criteria_name: '', max_score: 5 });
      setSelectedCriteria(null);
      setIsEditMode(false);
    }
  };

  const prepareEditCriteria = (criteria) => {
    setSelectedCriteria(criteria);
    setIsEditMode(true);
    setNewCriteria({ criteria_name: criteria.criteria_name, max_score: criteria.max_score });
    toggleModal(); 
  };

  return (
    <div>
      <Toaster />
      
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        
        <button
          className="mt-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        </button>
        <div className="text-center w-full">
          <h2 className="text-3xl font-extrabold text-gray-800">{event_title}</h2>
          <p className="text-lg text-gray-600">
            {new Date(end_date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="text-white bg-gray-700 hover:gray-blue-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={toggleModal} 
            disabled={criteria.length >= requiredCriteriaCount} 
          >
            <span className="flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> 
              CRITERIA
            </span>
          </button>
        </div>
      </div>
      
      {/* Reminder Message */}
      {criteria.length < requiredCriteriaCount && (
        <div className="text-red-600 text-center font-bold mb-4">
          Please add more criteria. A total of 10 criteria are required for this event.
        </div>
      )}
            
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">{isEditMode ? 'Edit Criteria' : 'Add New Criteria'}</h3>

            <label className="block text-sm font-medium text-gray-700">Criteria Name</label>
            <input
              type="text"
              value={isEditMode ? selectedCriteria.criteria_name : newCriteria.criteria_name}
              onChange={(e) => isEditMode ? setSelectedCriteria({ ...selectedCriteria, criteria_name: e.target.value }) : setNewCriteria({ ...newCriteria, criteria_name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter criteria name"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">Max Score</label>
            <input
              type="number"
              value={isEditMode ? selectedCriteria.max_score : newCriteria.max_score}
              onChange={(e) => isEditMode ? setSelectedCriteria({ ...selectedCriteria, max_score: parseInt(e.target.value) }) : setNewCriteria({ ...newCriteria, max_score: parseInt(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter max score (default 5)"
            />

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="text-gray-700 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
               onClick={isEditMode ? handleEditCriteria : handleAddCriteria}
               className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
              >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              {isEditMode ? 'Update' : 'Criteria'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render criteria list, loading state, etc. */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600" role="status" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : criteria.length === 0 ? (
        <div className="text-gray-500 text-center">No criteria available for this event.</div>
      ) : (
        <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
              <th scope="col" className="px-6 py-4 w-1/3.5">Criteria number</th>
                <th scope="col" className="px-6 py-4 w-1/3.5">Criteria Name</th>
                <th scope="col" className="px-6 py-4 w-1/3.5">Max Score</th>
                <th scope="col" className="px-6 py-4 w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((crit, index) => (
                <tr key={`${crit.criteria_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{crit.criteria_name}</td>
                  <td className="px-6 py-4">{crit.max_score}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={() => prepareEditCriteria(crit)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={() => handleDeleteCriteria(crit.criteria_id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Manage;
