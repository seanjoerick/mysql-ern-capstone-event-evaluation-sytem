import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewResults = ({ event, onBack }) => {
  const { event_id, event_title, end_date } = event || {};

  // Sample data for criteria and scores
  const sampleResults = [
    { criteriaName: 'Quality of Presentation', score: 4.8 },
    { criteriaName: 'Engagement', score: 4.5 },
    { criteriaName: 'Content Relevance', score: 4.7 },
    { criteriaName: 'Speaker Knowledge', score: 4.9 },
    { criteriaName: 'Overall Satisfaction', score: 4.6 },
    { criteriaName: 'Overall Satisfaction', score: 4.6 },
    { criteriaName: 'Overall Satisfaction', score: 4.6 },
    { criteriaName: 'Overall Satisfaction', score: 4.6 },
    { criteriaName: 'Overall Satisfaction', score: 4.6 },
    { criteriaName: 'Overall Satisfaction', score: 4.6 },
    
  ];

  // Calculate average rating
  const averageRating = (sampleResults.reduce((acc, item) => acc + item.score, 0) / sampleResults.length).toFixed(1);

  // Data for the bar chart
  const chartData = {
    labels: sampleResults.map(result => result.criteriaName),
    datasets: [
      {
        label: 'Scores',
        data: sampleResults.map(result => result.score),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
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
          <div className="flex items-center"></div>
        </div>

        <div className="relative overflow-y-auto max-h-[600px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/2">Criteria Name</th>
                <th scope="col" className="px-6 py-4 w-1/2">Score</th>
              </tr>
            </thead>
            <tbody>
              {sampleResults.map((result, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{result.criteriaName}</td>
                  <td className="px-6 py-4">{result.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <td className="px-6 py-4 font-extrabold text-green-600">{averageRating}</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Rating</td>
                <td className="px-6 py-4">Very Good</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Year</td>
                <td className="px-6 py-4">2024</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Date</td>
                <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <td className="px-6 py-4">Additional Note</td>
                <td className="px-6 py-4">Feedback collected successfully.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bar Chart Below the Summary Table */}
        <div className="mt-4">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ViewResults;
