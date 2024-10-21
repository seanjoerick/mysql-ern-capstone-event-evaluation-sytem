import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Manage = ({ onBack }) => {
  const [criteriaList, setCriteriaList] = useState([
    {
      criteria_id: 1,
      criteria_name: "Organization",
      max_score: 10
    },
    {
      criteria_id: 2,
      criteria_name: "Speaker Quality",
      max_score: 10
    },
    {
      criteria_id: 3,
      criteria_name: "Content Relevance",
      max_score: 10
    },
    {
      criteria_id: 4,
      criteria_name: "Engagement",
      max_score: 10
    },
    {
      criteria_id: 5,
      criteria_name: "Logistics",
      max_score: 10
    }
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Criteria</h2>
        <div className="flex items-center">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Add Questions
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        {criteriaList.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            <p>No criteria available.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/4">Criteria ID</th>
                <th scope="col" className="px-6 py-4 w-1/4">Criteria Name</th>
                <th scope="col" className="px-6 py-4 w-1/4">Max Score</th>
                <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {criteriaList.map((criteria) => (
                <tr key={criteria.criteria_id} className="odd:bg-white even:bg-gray-50 border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {criteria.criteria_id}
                  </th>
                  <td className="px-6 py-4">{criteria.criteria_name}</td>
                  <td className="px-6 py-4">{criteria.max_score}</td>
                  <td className="px-6 py-4 flex space-x-2 justify-center">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {/* Add other action buttons as needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button 
        className="mt-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
        onClick={onBack} // Call the onBack function passed as a prop
      >
        Back to Events List
      </button>
    </div>
  );
};

export default Manage;


