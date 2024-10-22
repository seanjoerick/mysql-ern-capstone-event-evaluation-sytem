import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

const EditCriteriaModal = ({ criteria, onClose, onUpdateCriteria }) => {
  const [criteriaName, setCriteriaName] = useState(criteria?.criteria_name || '');
  const [maxScore, setMaxScore] = useState(criteria?.max_score || '');
  const [loading, setLoading] = useState(false);

  // Effect to update form when the criteria prop changes
  useEffect(() => {
    if (criteria) {
      setCriteriaName(criteria.criteria_name);
      setMaxScore(criteria.max_score);
    }
  }, [criteria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create updated criteria object with criteria_id
    const updatedCriteria = {
      ...criteria,
      criteria_name: criteriaName,
      max_score: maxScore,
    };

    await onUpdateCriteria(updatedCriteria);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-[550px] max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Criteria
            </h3>
            <button
              type="button"
              className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                <label className="block mb-2 text-sm font-medium text-gray-700">Criteria Name</label>
                <input
                  type="text"
                  value={criteriaName}
                  onChange={(e) => setCriteriaName(e.target.value)}
                  placeholder="Enter criteria name"
                  required
                  className="border rounded-lg w-full p-2"
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Max Score</label>
                <input
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(e.target.value)}
                  placeholder="Enter max score (10)"
                  required
                  className="border rounded-lg w-full p-2"
                  disabled={loading}
                  min="1"
                  max="10"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
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

export default EditCriteriaModal;
