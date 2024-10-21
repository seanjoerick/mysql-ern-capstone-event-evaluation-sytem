import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import useGetStudents from '../hooks/useGetStudents';

export default function Students() {
  const { students, setStudents, count, loading, error } = useGetStudents();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter students based on the search term
  const filteredStudents = students.filter(student =>
    student.User?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.User?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total pages based on filtered results
  const totalPages = Math.max(Math.ceil(filteredStudents.length / itemsPerPage), 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the displayed students based on the current page
  const displayedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">List of Students</h2>
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

      {/* Accounts Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {filteredStudents.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <span className="text-gray-500">No students available</span>
              </div>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 w-1/4">Username</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Email Address</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Full Name</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Tesda/Course</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Role</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.map((student, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                        {student?.User.username}
                      </th>
                      <td className="px-6 py-4">{student?.User.email}</td>
                      <td className="px-6 py-4">
                        {`${student.first_name} ${student.last_name}`}
                      </td>
                      <td className="px-6 py-4">
                        {student.TesdaCourse?.course_name || student.Course?.course_name || student.Strand?.strand_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {student?.User.role.charAt(0).toUpperCase() + student?.User.role.slice(1)}
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
          </>
        )}
      </div>

      {/* Render Pagination only if there are filtered students */}
      {filteredStudents.length > 0 && (
        <div className="flex justify-end">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      )}
    </div>
  );
}
