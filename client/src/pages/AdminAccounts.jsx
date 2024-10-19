import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import useGetAdmins from '../hooks/useGetAdmin'; 
import AdminModal from '../components/AdminModal';
import { toast } from 'react-hot-toast';

export default function AdminAccounts() {
  const { admins, setAdmins, loading } = useGetAdmins();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  // Filter admins based on the search term
  const filteredAdmins = admins.filter(admin =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total pages based on filtered results
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the displayed admins based on the current page
  const displayedAdmins = filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddAccount = async (newAccount) => {
    try {
      const res = await fetch('/api/user/create', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAccount),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(data.message);
// Make sure that the new admin has the same structure as the others
const formattedAccount = {
  ...newAccount,
  role: newAccount.role || 'admin', // Set a default role if not present
  created_at: new Date().toISOString() // Set current time for created_at
};

// Update the admins list with the new admin
setAdmins((prevAdmins) => [...prevAdmins, formattedAccount]);

      setShowAddAccountModal(false);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error adding account:', error);
      setShowAddAccountModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Manage Admin</h2>
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
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => setShowAddAccountModal(true)}
          >
            + ADD ACCOUNTS
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/5">Username</th>
                <th scope="col" className="px-6 py-4 w-1/5">Email Address</th>
                <th scope="col" className="px-6 py-4 w-1/5">Role</th>
                <th scope="col" className="px-6 py-4 w-1/5">Created</th>
                <th scope="col" className="px-6 py-4 w-1/5 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedAdmins.map((admin, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                    {admin.username}
                  </th>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">{admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}</td>
                  <td className="px-6 py-4">
                    {new Date(admin.created_at).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                    <div className="flex justify-center">
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-end">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>

       {/* Add Account Modal */}
       {showAddAccountModal && (
        <AdminModal 
          onClose={() => setShowAddAccountModal(false)} 
          onAddAccount={handleAddAccount} 
        />
      )}

    </div>
  );
}
