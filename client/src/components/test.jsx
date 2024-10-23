import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      {/* Form Section */}
      <div className="w-full max-w-md mx-auto mb-4"> {/* Increased max-width */}
        <div className="text-center mb-6">
          {/* Logo with specified width */}
          <img 
            src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" 
            alt="Trimex Logo" 
            className="mx-auto mb-4 h-20 w-auto"
            style={{ height: '100px', width: '250px' }}
          />
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-10"> {/* Increased padding for height */}
          <h1 className="text-2xl font-bold text-black mb-6 text-center">Sign in to your account</h1>
          <div className="mb-4">
            <label className="text-gray-800 text-sm mb-1 block">Email Address</label>
            <input 
              name="email" 
              type="email" 
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required 
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800 text-sm mb-1 block">Password</label>
            <input 
              name="password" 
              type="password" 
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required 
            />
          </div>
          {/* Forgot Password Link Above Password Input */}
          <p className="text-sm text-gray-600 mb-2">
            <Link to="/forgot-password" className="font-semibold text-blue-500 hover:underline">Forgot Password?</Link>
          </p>
          {/* Primary Button */}
          <button 
            type="submit" 
            className="w-full bg-gray-800 text-white text-sm font-semibold rounded-md px-6 py-3 mt-4 transition-all cursor-pointer hover:bg-gray-700 flex items-center justify-center"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span> {/* DaisyUI spinner */}
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account? 
            <Link to="/signup" className="font-semibold text-blue-500 hover:underline"> Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}