import React from 'react';
import useGetFeedback from '../hooks/useGetFeedback';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewFeedback = ({ event, onBack }) => {
  const { event_id, event_title, end_date } = event || {};
  const { feedback, loading, error } = useGetFeedback(event_id); 

  return (
    <div>
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
      </div>

      {/* Render feedback list, loading state, etc. */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600" role="status" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : feedback.length === 0 ? (
        <div className="text-gray-500 text-center">No feedback yet for this event.</div>
      ) : (
        <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-4 text-center text-lg">Feedback</th>
            </tr>
            </thead>
            <tbody>
              {feedback.map((feedbackText, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{feedbackText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewFeedback;
