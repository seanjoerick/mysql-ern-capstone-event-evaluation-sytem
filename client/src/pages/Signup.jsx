import React from 'react';

export default function Signup() {
  return (
    <div class="font-[sans-serif]">
      {/* Header Section */}
      <div class="text-center bg-gradient-to-r from-black to-gray-600 min-h-[160px] sm:p-6 p-4">
        <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Trimex Logo" class="mx-auto mb-10 h-20" />
        <h4 class="sm:text-3xl text-2xl font-bold text-white">Create your free account</h4>
      </div>

      {/* Form Section */}
      <div class="mx-4 mb-4 -mt-16">
        <form class="max-w-4xl mx-auto bg-gray-50 shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Username</label>
              <input name="name" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter name" />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email Address</label>
              <input name="email" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter email" />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">First Name</label>
              <input name="name" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter name" />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Last Name</label>
              <input name="lname" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter last name" />
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Year Level</label>
              <select name="yearleveltype" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all">
                <option value="" disabled selected>Select Year Level</option>
                <option value="tesda">TESDA</option>
                <option value="senior_high">Senior High</option>
                <option value="college">College</option>
              </select>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Course/Strand</label>
              <select name="yearleveltype" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all">
                <option value="" disabled selected>Select Year Level</option>
                <option value="tesda">TESDA</option>
                <option value="senior_high">Senior High</option>
                <option value="college">College</option>
              </select>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" type="password" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter password" />
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <div class="flex items-center">
              <input id="terms" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="terms" class="ml-2 block text-sm text-gray-800">I agree to the <a href="#" class="font-semibold">Terms of Service</a> and <a href="#" class="font-semibold">Privacy Policy</a></label>
            </div>
          </div>

          {/* Primary Button */}
          <button type="submit" class="w-full bg-gradient-to-r from-red-500 to-black text-white text-sm font-semibold rounded-md px-6 py-3 mt-8 hover:bg-red-800 transition-all">Create Account</button>

          <p class="mt-6 text-sm text-gray-600 text-center">Already have an account? <a href="#" class="font-semibold text-blue-500">Log in</a></p>
        </form>
      </div>
    </div>
  );
}
