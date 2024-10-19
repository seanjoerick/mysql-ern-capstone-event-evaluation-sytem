import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';

export default function Manage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Manage Students</h2>
        <div className="flex items-center">
          <label className="input input-bordered flex items-center gap-2 mr-4">
            <input type="text" className="grow" placeholder="Search" />
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 w-1/5">Username</th>
              <th scope="col" className="px-6 py-4 w-1/5">First Name</th>
              <th scope="col" className="px-6 py-4 w-1/5">Last Name</th>
              <th scope="col" className="px-6 py-4 w-1/5">Email Address</th>
              <th scope="col" className="px-6 py-4 w-1/5">Year Type</th>
              <th scope="col" className="px-6 py-4 w-1/5">Course/Strand</th>
              <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Static rows for demonstration */}
            {Array.from({ length: 7 }, (_, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                  hart_hagerty
                </th>
                <td className="px-6 py-4">Hart</td>
                <td className="px-6 py-4">Hagerty</td>
                <td className="px-6 py-4">hart@example.com</td>
                <td className="px-6 py-4">Senior</td>
                <td className="px-6 py-4">IT</td>
                <td className="px-6 py-4">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Pagination Component */}
        <div className="flex justify-end">
        <Pagination />
      </div>
    </div>
  );
}
