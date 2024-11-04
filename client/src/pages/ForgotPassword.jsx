import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import trimex from '../assets/images/trimex.png';
import useForgotPassword from '../hooks/useForgotPassword';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword, loading } = useForgotPassword(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Attempt to reset the password
     const success = await forgotPassword(email);
    
     // If successful, navigate to the login page
     if (success) {
       navigate('/login');
     }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          {/* Logo Section */}
          <div className="text-center mb-6">
            <img 
              src={trimex}
              alt="Trimex Logo" 
              className="mx-auto h-20 w-auto"
              style={{ height: '100px', width: '200px' }}
            />
          </div>

          <h3 className="text-3xl font-extrabold text-center">Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 opacity-70" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="grow"
                    placeholder="Email Address"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="w-full py-3.5 flex items-center justify-center bg-gray-800 text-white hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-500 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>

          {/* Back to Site Button */}
          <div className="text-center mt-3 mb-6">
            <button
              onClick={handleBackToLogin}
              className="text-blue-500 hover:underline mb-4"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
