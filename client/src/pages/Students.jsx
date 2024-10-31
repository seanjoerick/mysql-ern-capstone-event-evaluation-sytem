import React, { useState } from 'react';
import useGetStudents from '../hooks/useGetStudents';

export default function Students() {
  const { students, loading, error } = useGetStudents();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on the search term
  const filteredStudents = students.filter(student =>
    student.User?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.User?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Students</h2>
        <div className="flex items-center">
          <label className="input input-bordered flex items-center gap-2 mr-4">
            <input 
              type="text" 
              className="grow" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

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
      {filteredStudents.length === 0 && !loading && !error && (
        <div className="flex justify-center items-center h-32 text-gray-500">
          <p>No students available.</p>
        </div>
      )}

      {/* Accounts Table */}
      <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar"> {/* Increased max height for more rows */}
      {filteredStudents.length > 0 && (
         <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 w-1/4">Username</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Email Address</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Full Name</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Year Level</th>
                    <th scope="col" className="px-6 py-4 w-1/5">Strand/Course</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                        {student?.User.username}
                      </th>
                      <td className="px-6 py-4">{student?.User.email}</td>
                      <td className="px-6 py-4">
                        {`${student.first_name} ${student.last_name}`}
                      </td>
                      <td className="px-6 py-4">
                        {student.year_level_type
                        .replace(/_/g, ' ')
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')}
                      </td>
                      <td className="px-6 py-4">
                      {student.Course?.course_name?.startsWith('Bachelor of Science in') 
                    ? `BS in ${student.Course.course_name.split('Bachelor of Science in ')[1]?.split('-')[0].trim()}` 
                    : student.TesdaCourse?.course_name || 
                      student.Strand?.strand_name || 
                      'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(student?.User.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      )}
      </div>
    </div>
  );
}
