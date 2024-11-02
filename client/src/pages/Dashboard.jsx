import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useGetAdmins from '../hooks/useGetAdmin';
import useGetStudents from '../hooks/useGetStudents';
import useGetEvents from '../hooks/useGetEvents';
import useEventsSummary from '../hooks/useGetEventsummary';
import useGetTopEvents from '../hooks/useGetTopEvents';
import useGetTotalEvaluations from '../hooks/useGetTotalEvaluations';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const { count: adminCount } = useGetAdmins();
    const { count: studentCount } = useGetStudents();
    const { completed } = useGetEvents();
    const { data, loading, error } = useEventsSummary();
    const { totalEvaluations, loading: totalEvaluationsLoading, error: totalEvaluationsError } = useGetTotalEvaluations();

    const [selectedYear, setSelectedYear] = useState(new Date());

    // Fetch top events based on the selected year
    const { topEvents } = useGetTopEvents(selectedYear.getFullYear());

    const barColors = [
        'rgba(75, 192, 192, 0.6)', 
        'rgba(255, 99, 132, 0.6)', 
        'rgba(255, 206, 86, 0.6)', 
        'rgba(54, 162, 235, 0.6)', 
        'rgba(153, 102, 255, 0.6)', 
        'rgba(255, 159, 64, 0.6)', 
    ];
    
    const chartData = {
        labels: topEvents.map(event => event.event_title),
        datasets: [
            {
                label: 'Average Score',
                data: topEvents.map(event => event.average_score),
                backgroundColor: barColors.slice(0, topEvents.length),
            },
        ],
    };
    
    // Prepare data for the Pie chart from total evaluations
    const pieChartData = {
        labels: totalEvaluations.map(event => event.title), 
        datasets: [
            {
                label: 'Total Evaluations',
                data: totalEvaluations.map(event => event.totalEvaluations),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(255, 206, 86, 0.6)', 
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };

    const handleYearChange = (date) => {
        if (date) {
            setSelectedYear(date);
        }
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">Dashboard</h2>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-500 text-white p-5 rounded-md shadow-md flex flex-col items-center justify-center hover:bg-blue-600 transition duration-300">
                    <h3 className="text-lg font-semibold mb-2">Total Admins</h3>
                    <p className="text-4xl font-bold">{adminCount}</p>
                </div>
                <div className="bg-green-500 text-white p-5 rounded-md shadow-md flex flex-col items-center justify-center hover:bg-green-600 transition duration-300">
                    <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                    <p className="text-4xl font-bold">{studentCount}</p>
                </div>
                <div className="bg-yellow-500 text-white p-5 rounded-md shadow-md flex flex-col items-center justify-center hover:bg-yellow-600 transition duration-300">
                    <h3 className="text-lg font-semibold mb-2">Events Completed</h3>
                    <p className="text-4xl font-bold">{completed}</p>
                </div>
            </div>

            {/* Event Summary Section */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="border border-gray-300 bg-white p-5 rounded-md shadow-sm flex flex-col w-full">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Upcoming Events</h3>
                    {loading ? (
                        <p className="text-gray-600">Loading upcoming events...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        data.upcomingEvents.length === 0 ? (
                            <p className="text-gray-600">No upcoming events available.</p>
                        ) : (
                            data.upcomingEvents.map(event => (
                                <div key={event.id} className="text-gray-600 mb-2 border-b border-gray-200 pb-2">
                                    <strong className="text-gray-800">{event.title}</strong> - {new Date(event.startDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })} - Organizers: <span className="font-semibold">{event.organizers}</span>
                                </div>
                            ))
                        )
                    )}
                </div>
                <div className="border border-gray-300 bg-white p-5 rounded-md shadow-sm flex flex-col w-full">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Completed Events</h3>
                    {loading ? (
                        <p className="text-gray-600">Loading completed events...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        data.completedEvents.length === 0 ? (
                            <p className="text-gray-600">No completed events available.</p>
                        ) : (
                            data.completedEvents.map(event => (
                                <div key={event.id} className="text-gray-600 mb-2 border-b border-gray-200 pb-2">
                                    <strong className="text-gray-800">{event.title}</strong> - {new Date(event.endDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })} - Organized by: <span className="font-semibold">{event.createdBy}</span>
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>

            {/* Year Selection */}
            <div className="flex flex-col items-start mb-8">
                <label className="text-lg font-semibold text-gray-700 mt-2 mb-2 flex items-center">
                    Select Year
                </label>
                <div className="relative">
                    <DatePicker
                        selected={selectedYear}
                        onChange={handleYearChange}
                        showYearPicker
                        dateFormat="yyyy"
                        className="border border-gray-300 p-3 rounded-md shadow-sm hover:border-blue-500 focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out pr-10" // Add padding to the right
                        minDate={new Date(2024, 0, 1)}
                        maxDate={new Date(2025, 11, 31)}
                    />
                    <span className="absolute right-3 top-3">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-full md:w-1/2" style={{ height: '400px' }}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Top Events Average Scores for {selectedYear.getFullYear()}</h3>
                    <Bar data={chartData} options={chartOptions} />
                </div>
                <div className="w-full md:w-1/2" style={{ height: '400px' }}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Highest Total Evaluations for Each Event</h3>
                    {totalEvaluationsLoading ? (
                        <p className="text-gray-600">Loading evaluations data...</p>
                    ) : totalEvaluationsError ? (
                        <p className="text-red-500">{totalEvaluationsError}</p>
                    ) : (
                        <Pie data={pieChartData} options={chartOptions} />
                    )}
                </div>
            </div>
        </div>
    );
}
