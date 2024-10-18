import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="font-[sans-serif]">
      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-black to-gray-600 min-h-[160px] sm:p-6 p-4">
        <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Trimex Logo" className="mx-auto mb-10 h-20" />
      </div>

      {/* Form Section */}
      <div className="mx-4 mb-4 -mt-16">
        <form className="max-w-4xl mx-auto bg-gray-50 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md mt-6">
    
          <h1 className="sm:text-1xl text-2xl font-bold text-black mb-6 text-center">Create an account</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Username</label>
              <input name="name" type="text" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter name" />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
              <input name="email" type="text" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter email" />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">First Name</label>
              <input name="first_name" type="text" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter first name" />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
              <input name="last_name" type="text" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter last name" />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Year Level</label>
              <select name="yearleveltype" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all">
                <option value="" disabled selected>Select Year Level</option>
                <option value="tesda">TESDA</option>
                <option value="senior_high">Senior High</option>
                <option value="college">College</option>
              </select>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Course/Strand</label>
              <select name="course_strand" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all">
                <option value="" disabled selected>Select Course/Strand</option>
                <option value="tesda">TESDA</option>
                <option value="senior_high">Senior High</option>
                <option value="college">College</option>
              </select>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" type="password" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter password" />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <div className="flex items-center">
              <input id="terms" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-800">I agree to the <a href="#" className="font-semibold">Terms of Service</a> and <a href="#" className="font-semibold">Privacy Policy</a></label>
            </div>
          </div>

          {/* Primary Button */}
          <button type="submit" className="w-full bg-gray-800 text-white text-sm font-semibold rounded-md px-6 py-3 mt-8 transition-all cursor-pointer hover:text-gray-400">
            Create Account
          </button>

          <p className="mt-6 text-sm text-gray-600 text-center">
             Already have an account? 
            <Link to="/login" className="font-semibold text-blue-500"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
