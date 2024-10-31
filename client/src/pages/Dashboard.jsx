import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUserGraduate, faCalendarCheck, faChartLine } from '@fortawesome/free-solid-svg-icons';
import useGetAdmins from '../hooks/useGetAdmin';
import useGetStudents from '../hooks/useGetStudents';
import useGetEvents from '../hooks/useGetEvents';

export default function Dashboard() {
  const { count: adminCount } = useGetAdmins();
  const { count: studentCount } = useGetStudents();
  const { completed } = useGetEvents();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Admin Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-md shadow-md flex flex-col items-center justify-center">
          <FontAwesomeIcon icon={faUserShield} className="text-3xl mb-2" />
          <h3 className="text-md font-semibold mb-1">Total Admins</h3>
          <p className="text-3xl font-bold">{adminCount}</p>
        </div>

        {/* Students Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-md shadow-md flex flex-col items-center justify-center">
          <FontAwesomeIcon icon={faUserGraduate} className="text-3xl mb-2" />
          <h3 className="text-md font-semibold mb-1">Total Students</h3>
          <p className="text-3xl font-bold">{studentCount}</p>
        </div>

        {/* Events Card */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-5 rounded-md shadow-md flex flex-col items-center justify-center">
          <FontAwesomeIcon icon={faCalendarCheck} className="text-3xl mb-2" />
          <h3 className="text-md font-semibold mb-1">Events Completed</h3>
          <p className="text-3xl font-bold">{completed}</p>
        </div>

        {/* Evaluate Card */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-5 rounded-md shadow-md flex flex-col items-center justify-center">
          <FontAwesomeIcon icon={faChartLine} className="text-3xl mb-2" />
          <h3 className="text-md font-semibold mb-1">Evaluate</h3>
          <p className="text-3xl font-bold">Assessments</p>
        </div>
      </div>
    </div>
  );
}
