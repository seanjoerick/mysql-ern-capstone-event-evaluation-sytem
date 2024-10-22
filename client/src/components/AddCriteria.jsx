import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AddCriteria = ({ onClose, onAddCriteria }) => {
  const [criteriaName, setCriteriaName] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newQuestions = {
      criteria_name: criteriaName,
      max_score: maxScore,
    };

    await onAddCriteria(newQuestions);
    setLoading(false);

    // Reset form fields
    setCriteriaName('');
    setMaxScore('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-[550px] max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              ADD QUESTION
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Question</label>
                <input
                  type="text"
                  value={criteriaName}
                  onChange={(e) => setCriteriaName(e.target.value)}
                  placeholder="Enter question"
                  required
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Max Score</label>
                <input
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(e.target.value)}
                  placeholder="Enter score"
                  required
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading} // Disable button while loading
                  className={`text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  {loading ? 'Adding...' : 'Add Question'}
                </button>
                {loading && (
                  <span className="loading loading-spinner ml-2"></span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for better validation
AddCriteria.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddCriteria: PropTypes.func.isRequired,
};

export default AddCriteria;
