import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sign up will go here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-2xl shadow-xl bg-base-100">
        <div className="card-body">
          <div className="text-center mb-6">
            <img 
              src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" 
              alt="Trimex Logo" 
              className="mx-auto h-20 w-auto"
              style={{ height: '100px', width: '200px' }}
            />
          </div>
          <h3 className="text-3xl font-extrabold text-center">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Year Level / Type and Course/Strand Inputs */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Year Level / Type</span>
                  </label>
                  <select
                    value={yearLevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Year Level</option>
                    <option value="College">College</option>
                    <option value="Senior">Senior</option>
                    <option value="TESDA">TESDA</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Course/Strand</span>
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Course/Strand</option>
                    <option value="Course 1">Course 1</option>
                    <option value="Course 2">Course 2</option>
                    <option value="Strand 1">Strand 1</option>
                    <option value="Strand 2">Strand 2</option>
                  </select>
                </div>
              </div>

                {/* First Name and Last Name Inputs */}
                <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="h-4 w-4 opacity-70" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input grow w-full"
                      placeholder="First Name"
                      required
                    />
                  </label>
                </div>

                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="h-4 w-4 opacity-70" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input grow w-full"
                      placeholder="Last Name"
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Username Input */}
              <div className="flex">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="h-4 w-4 opacity-70" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input grow w-full"
                      placeholder="Username"
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Email Input */}
              <div className="flex">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 opacity-70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input grow w-full"
                      placeholder="Email"
                      required
                    />
                  </label>
                </div>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input grow w-full"
                    placeholder="Password"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full py-3.5 flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-500"
              >
                Sign Up
              </button>
            </div>

            <p className="mt-3 text-center">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary"> {/* Changed to Link component */}
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
