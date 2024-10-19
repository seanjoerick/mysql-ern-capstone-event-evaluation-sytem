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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[sans-serif]">
      {/* Form Section */}
      <div className="mx-4 mb-4">
        <div className="text-center mb-6">
          {/* Logo with wider width */}
          <img 
            src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" 
            alt="Trimex Logo" 
            className="mx-auto mb-4 h-20 w-auto"
            style={{ height: '100px', width: '250px' }}
          />
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-50 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <h1 className="sm:text-1xl text-2xl font-bold text-black mb-6 text-center">Sign in to your account</h1>
          <div className="mb-6">
            <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
            <input 
              name="email" 
              type="email" 
              className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required 
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input 
              name="password" 
              type="password" 
              className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required 
            />
          </div>
          {/* Forgot Password Link Above Password Input */}
          <p className="text-sm text-gray-600 mb-2">
            <Link to="/forgot-password" className="font-semibold text-blue-500">Forgot Password?</Link>
          </p>
          {/* Primary Button */}
          <button 
            type="submit" 
            className="w-full bg-gray-800 text-white text-sm font-semibold rounded-md px-6 py-3 mt-4 transition-all cursor-pointer hover:text-gray-400 flex items-center justify-center"
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
            <Link to="/signup" className="font-semibold text-blue-500"> Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
