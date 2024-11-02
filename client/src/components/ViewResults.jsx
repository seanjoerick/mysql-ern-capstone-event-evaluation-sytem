import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Radar } from 'react-chartjs-2'; 
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'; 
import useEvaluationResults from '../hooks/useEvaluationResults';

// Registering the chart components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ViewResults = ({ event, onBack }) => {
  const { event_id, event_title, end_date } = event || {};
  const { evaluationResults, loading, error } = useEvaluationResults(event_id);

  // Use evaluation results from the API
  const criteriaData = evaluationResults?.criteria || [];
  const overallAverageScore = evaluationResults?.overall_average_score;
  const ratingDescription = evaluationResults?.rating;
  const studentCount = evaluationResults?.student_count;

 // Data for the radar chart with multiple colors
const colors = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(199, 199, 199, 0.6)',
  'rgba(83, 102, 255, 0.6)',
  'rgba(200, 99, 132, 0.6)',
  'rgba(100, 206, 86, 0.6)',
];
const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(199, 199, 199, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(200, 99, 132, 1)',
  'rgba(100, 206, 86, 1)',
];

const chartData = {
  labels: criteriaData.map(result => result.criteria_name),
  datasets: [
    {
      label: 'Scores',
      data: criteriaData.map(result => result.average_score),
      backgroundColor: colors,
      borderColor: borderColors,
      borderWidth: 2,
      fill: true,
    },
  ],
};


  // Options for the radar chart with scale limits
  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        min: 1,
        max: 5, 
        ticks: {
          stepSize: 1, 
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const getSatisfactionDescription = (score) => {
    if (score >= 4.5) {
      return 'Very Satisfied';
    } else if (score >= 3.5) {
      return 'Satisfied';
    } else if (score >= 2.5) {
      return 'Neutral';
    } else if (score >= 1.5) {
      return 'Dissatisfied';
    } else {
      return 'Very Dissatisfied';
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Column for Results */}
      <div className="w-full md:w-2/3 p-4">
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
        {criteriaData.length === 0 && !loading && !error && (
          <div className="flex justify-center items-center h-32 text-gray-500">
            <p>No evaluation available.</p>
          </div>
        )}

        {/* Render Table Only If There Are Criteria Data */}
        {criteriaData.length > 0 && (
          <div className="relative overflow-y-auto max-h-[600px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 w-1/2">Criteria Name</th>
                  <th scope="col" className="px-6 py-4 w-1/2">Scale</th>
                </tr>
              </thead>
              <tbody>
                {criteriaData.map((result, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                    <td className="px-6 py-4">{result.criteria_name}</td>
                    <td className="px-6 py-4">{getSatisfactionDescription(result.average_score)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Right Column for Summary */}
      <div className="w-full md:w-1/3 p-4 bg-gray-50 shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-4">Summary</h3>
        <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Detail</th>
                <th scope="col" className="px-6 py-4">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Average Rating</td>
                <td 
                  className={`px-6 py-4 font-extrabold ${
                    overallAverageScore >= 4.5 ? 'text-green-600' :
                    overallAverageScore >= 3.5 ? 'text-blue-500' :
                    overallAverageScore >= 2.5 ? 'text-yellow-500' :
                    overallAverageScore >= 1.5 ? 'text-orange-500' :
                    overallAverageScore >= 1 ? 'text-red-600' : ''
                  }`}>
                  {overallAverageScore !== null ? overallAverageScore : '-'}
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Rating</td>
                <td className="px-6 py-4">{ratingDescription || '-'}</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Year</td>
                <td className="px-6 py-4">{new Date(end_date).getFullYear()}</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Date</td>
                <td className="px-6 py-4">{new Date(end_date).toLocaleDateString()}</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Evaluate</td>
                <td className="px-6 py-4">{studentCount || 0} Students</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Radar Chart Below the Summary Table */}
        <div className="mt-4">
          <Radar data={chartData} options={chartOptions} /> {/* Radar component */}
        </div>
      </div>
    </div>
  );
};

export default ViewResults;
