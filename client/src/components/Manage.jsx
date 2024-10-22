import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useGetCriteriaById from '../hooks/useGetCriteriaById';
import AddCriteria from './AddCriteria';
import toast from 'react-hot-toast';

const Manage = ({ event, onBack }) => {
  const { event_id, event_title } = event || {};
  const { criteria, setCriteria, loading, error } = useGetCriteriaById(event_id);
  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);

  const handleAddQuestions = async (newQuestions) => {
    setLoadingEvent(true);
    try {
      const res = await fetch(`/api/event/criteria/${event_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestions),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(data.message);
      setCriteria((prev) => [...prev, { criteria_name: newQuestions.criteria_name, max_score: newQuestions.max_score }]);
      setShowAddCriteriaModal(false);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error adding criteria:', error);
    } finally {
      setLoadingEvent(false);
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
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Question
          </button>
        </div>
      </div>
      <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar"> {/* Increased max height for more rows */}
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
                      onClick={() => handleEditCriteria(criteria)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
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
      {showAddCriteriaModal && <AddCriteria onAddCriteria={handleAddQuestions} onClose={() => setShowAddCriteriaModal(false)} />}
    </div>
  );
};

export default Manage;
