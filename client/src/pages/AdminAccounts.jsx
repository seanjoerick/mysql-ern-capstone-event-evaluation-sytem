import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useGetAdmins from '../hooks/useGetAdmin'; 
import AdminModal from '../components/AdminModal';
import EditAdminModal from '../components/AdminEditModal';
import { toast } from 'react-hot-toast';

export default function AdminAccounts() {
  const { admins, setAdmins, loading, error } = useGetAdmins();
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showEditAccountModal, setShowEditAccountModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

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
      
      const formattedAccount = {
        ...newAccount,
        role: newAccount.role || 'admin',
        created_at: new Date().toISOString() 
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

  const handleUpdateAdmin = async (updatedAdmin) => {
    try {
      const res = await fetch(`/api/user/update/${updatedAdmin.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAdmin),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setAdmins(prevAdmins => prevAdmins.map(admin => admin.user_id === updatedAdmin.user_id ? updatedAdmin : admin));
      toast.success(data.message);
      setShowEditAccountModal(false);
    } catch (error) {
      toast.error(`${error.message}`);
      console.error('Error updating event:', error);
      setShowEditAccountModal(false);
    }
  };



  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Manage Admin</h2>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setShowAddAccountModal(true)}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> ACCOUNT 
        </button>
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
      {admins.length === 0 && !loading && !error && (
        <div className="flex justify-center items-center h-32 text-gray-500">
          <p>No admin available.</p>
        </div>
      )}


        {/* Accounts Table */}
        <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar"> {/* Increased max height for more rows */}
      {admins.length > 0 && (
         <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 w-1/4">Username</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Email Address</th>
                    <th scope="col" className="px-6 py-4 w-1/4">Created</th>
                    <th scope="col" className="px-6 py-4 w-1/5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                        {admin.username}
                      </th>
                      <td className="px-6 py-4">{admin.email}</td>
                      <td className="px-6 py-4">
                        {new Date(admin.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2"
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setShowEditAccountModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      )}
      </div>

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <AdminModal 
          onClose={() => setShowAddAccountModal(false)} 
          onAddAccount={handleAddAccount} 
        />
      )}

      {/* Edit Account Modal */}
      {showEditAccountModal && (
        <EditAdminModal
          admin={selectedAdmin}
          onClose={() => setShowEditAccountModal(false)}
          onUpdateAdmin={handleUpdateAdmin}
        />
      )}
    </div>
  );
}
