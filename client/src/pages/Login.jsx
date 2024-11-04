import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import useLogin from '../hooks/useLogin';
import trimex from '../assets/images/trimex.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleLogin = () => {
    navigate('/signup');
  };

  const handleBackToSite = () => {
    navigate('/');
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

          <h3 className="text-3xl font-extrabold text-center">Login</h3>
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

              {/* Password Input */}
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <FontAwesomeIcon icon={faLock} className="h-4 w-4 opacity-70" />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="grow"
                    placeholder="Password"
                    required
                  />
                </label>
              </div>
            </div>
            <p className="text-s text-gray-600 mt-2">
              <Link to="/forgot-password" className="font-semibold text-blue-500 hover:underline">Forgot Password?</Link>
            </p>
            <div className="mt-5">
              <button
                type="submit"
                className="w-full py-3.5 flex items-center justify-center bg-gray-800 text-white hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-500 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            <p className="mt-3 text-center">
              Don't have an account?{' '}
              <button 
                className="link link-primary" 
                onClick={handleLogin}
              >
                Sign up here
              </button>
            </p>
          </form>

          {/* Centered Icon Section */}
          <div className="card-body text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faBell} className="h-7 w-7 text-gray-600" />
                <span className="ml-2 text-gray-800">Stay updated with events!</span>
              </div>
            </div>
          </div>

            {/* Back to Site Button */}
            {/* <div className="text-center mb-6">
            <button
              onClick={handleBackToSite}
              className="text-blue-500 hover:underline mb-4"
            >
              Back to Site
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
