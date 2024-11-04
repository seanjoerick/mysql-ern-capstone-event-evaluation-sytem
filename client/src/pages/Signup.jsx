import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import useSignup from '../hooks/useSignup';
import trimex from '../assets/images/trimex.png';

const SignUp = () => {
  const [yearLevelType, setYearLevelType] = useState('');
  const [courses, setCourses] = useState([]);
  const [strands, setStrands] = useState([]);
  const [tesdaCourses, setTesdaCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const { signup, loading } = useSignup();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStrands = async () => {
      try {
        const response = await fetch('/api/course/strand/get');
        const data = await response.json();
        setStrands(data.strand || []);
      } catch (error) {
        console.error('Error fetching strands:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course/get');
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchTesdaCourses = async () => {
      try {
        const response = await fetch('/api/course/tesda/get');
        const data = await response.json();
        setTesdaCourses(data.courses || []);
      } catch (error) {
        console.error('Error fetching TESDA courses:', error);
      }
    };

    fetchStrands();
    fetchCourses();
    fetchTesdaCourses();
  }, []);

  const handleYearLevelChange = (e) => {
    setYearLevelType(e.target.value);
    setSelectedCourse(''); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({
      ...formData,
      yearLevelType,
      strandId: yearLevelType === 'SENIOR_HIGH' ? selectedCourse : null,
      courseId: yearLevelType === 'COLLEGE' ? parseInt(selectedCourse) : null,
      tesdaCourseId: yearLevelType === 'TESDA' ? parseInt(selectedCourse) : null,
    });
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-2xl shadow-xl bg-base-100">
        <div className="card-body">
          <div className="text-center">
            <img
              src={trimex}
              alt="Trimex Logo"
              className="mx-auto h-20 w-auto"
              style={{ height: '100px', width: '200px' }}
            />
          </div>
          <h3 className="text-3xl font-extrabold text-center">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-4">
              {/* Year Level Input */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Education Level</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    required
                    value={yearLevelType}
                    onChange={handleYearLevelChange}
                  >
                    {!yearLevelType && <option value="">Select Year Level</option>}
                    <option value="COLLEGE">College</option>
                    <option value="SENIOR_HIGH">Senior High</option>
                    <option value="TESDA">Tesda</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Course / Strand</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    required
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    {!selectedCourse && <option value="">Select Course/Strand</option>}
                    {yearLevelType === 'COLLEGE' &&
                      courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                          {course.course_name}
                        </option>
                      ))}
                    {yearLevelType === 'SENIOR_HIGH' &&
                      strands.map((strand) => (
                        <option key={strand.strand_id} value={strand.strand_id}>
                          {strand.strand_name}
                        </option>
                      ))}
                    {yearLevelType === 'TESDA' &&
                      tesdaCourses.map((tesdaCourse) => (
                        <option key={tesdaCourse.tesda_course_id} value={tesdaCourse.tesda_course_id}>
                          {tesdaCourse.course_name}
                        </option>
                      ))}
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
                      name="firstName"
                      className="input grow w-full"
                      placeholder="First Name"
                      required
                      onChange={handleInputChange}
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
                      name="lastName"
                      className="input grow w-full"
                      placeholder="Last Name"
                      required
                      onChange={handleInputChange}
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
                      name="username"
                      className="input grow w-full"
                      placeholder="Username"
                      required
                      onChange={handleInputChange}
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
                      name="email"
                      className="input grow w-full"
                      placeholder="Email"
                      required
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              {/* Password Input */}
              <div className="flex">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <FontAwesomeIcon icon={faLock} className="h-4 w-4 opacity-70" />
                    <input
                      type="password"
                      name="password"
                      className="input grow w-full"
                      placeholder="Password"
                      required
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn bg-gray-800 text-white hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-500 disabled:bg-gray-400 w-full" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>

              <p className="mt-4 text-sm text-center">
                Already have an account?{' '}
                <Link to="/login" className="link link-primary">
                  Log in here
                </Link>
              </p>
            </div>
          </form>
          {/* Back to Site Button */}
          {/* <div className="text-center mb-4">
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

export default SignUp;

