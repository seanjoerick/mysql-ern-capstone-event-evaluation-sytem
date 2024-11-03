import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import useEventCriteria from '../hooks/useEventCriteria';
import toast from 'react-hot-toast';

const StudEvaluate = ({ event, onBack, onSubmitSuccess }) => {
  const { event_id, event_title, end_date } = event || {};
  const { criteria } = useEventCriteria(event_id);
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (criteriaId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [criteriaId]: rating,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(ratings).length !== criteria.length || !feedback.trim()) {
      toast.error('Please rate all criteria and provide feedback before submitting.');
      return;
    }

    // Prepare data for submission
    const scores = Object.entries(ratings).map(([criteriaId, score]) => ({
      criteriaId: parseInt(criteriaId),
      score,
    }));

    try {
      const response = await fetch('/api/event/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event_id,
          scores,
          feedbackText: feedback,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit evaluation.');
      const data = await response.json();
      toast.success(data.message);
      onSubmitSuccess(event_id);

      onBack();
      setRatings({});
      setFeedback('');
    } catch (error) {
      toast.error(error.message);
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

        <div className="text-center w-full">
          <h2 className="text-3xl font-extrabold text-gray-800">{event_title}</h2>
          <p className="text-lg text-gray-600">
            {new Date(end_date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Rating Legend */}
      <div className="mt-4 p-4 border border-gray-300 rounded-md">
        <h3 className="font-semibold">Rating Legend:</h3>
        <ul className="list-disc pl-5">
          <li>
            <FontAwesomeIcon icon={solidStar} className="text-gray-400" /> (5) - Very Satisfied: Exceeded all expectations
          </li>
          <li>
            <FontAwesomeIcon icon={solidStar} className="text-gray-400" /> (4) - Satisfied: Met most expectations
          </li>
          <li>
            <FontAwesomeIcon icon={solidStar} className="text-gray-400" /> (3) - Neutral: Met basic expectations
          </li>
          <li>
            <FontAwesomeIcon icon={solidStar} className="text-gray-400" /> (2) - Dissatisfied: Below average; significant issues
          </li>
          <li>
            <FontAwesomeIcon icon={solidStar} className="text-gray-400" /> (1) - Very Dissatisfied: Did not meet expectations
          </li>
        </ul>
      </div>

      <table className="w-full text-sm text-gray-500 mt-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 w-1/4">Criteria Name</th>
            <th scope="col" className="px-6 py-4 w-1/4">Rating</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {criteria.map((crit, index) => (
            <tr key={`${crit.criteria_id}-${index}`} className="border-b">
              <td className="px-6 py-4 font-medium">{crit.criteria_name}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((starRating) => (
                    <label key={starRating} className="cursor-pointer">
                      <input
                        type="radio"
                        name={`rating_${crit.criteria_id}`}
                        value={starRating}
                        checked={ratings[crit.criteria_id] === starRating}
                        onChange={() => handleRatingChange(crit.criteria_id, starRating)}
                        className="hidden"
                      />
                      <FontAwesomeIcon
                        icon={ratings[crit.criteria_id] >= starRating ? solidStar : regularStar}
                        className="text-gray-800 text-2xl"
                      />
                    </label>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Single Feedback Textarea */}
      <div className="mt-4">
        <textarea
          className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          placeholder="Enter your feedback for this event"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <p className="text-sm text-gray-600 mt-2">Please provide any additional comments or feedback.</p>
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-center">
        <button
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={handleSubmit}
        >
          Submit Evaluation
        </button>
      </div>
    </div>
  );
};

export default StudEvaluate;
