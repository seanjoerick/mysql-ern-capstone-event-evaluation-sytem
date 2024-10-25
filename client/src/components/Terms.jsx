import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate(); 
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = (e) => {
    e.preventDefault();
    if (isChecked) {
      navigate('/signup'); 
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-lg shadow-xl bg-base-100">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <img 
              src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" 
              alt="Trimex Logo" 
              className="rounded-full h-16 w-16" 
            />
          </div>

          <h2 className="text-xl font-bold text-center mb-4">Terms and Conditions</h2>
          <p className="mb-4 text-center">
            Welcome to the Event Evaluation System of Trimex Colleges. By signing up, you agree to the following terms and conditions:
          </p>
          <ul className="mb-4 list-disc list-inside text-left">
            <li>All data provided must be accurate and up-to-date.</li>
            <li>Your participation in the event evaluation is voluntary.</li>
            <li>Trimex Colleges respects your privacy and is committed to complying with Philippine data protection laws.</li>
            <li>The information collected will only be used for evaluation purposes and will not be shared with third parties without your consent.</li>
            <li>Any misconduct or inappropriate behavior during the evaluation process may result in consequences as per school policies.</li>
            <li>By using this system, you acknowledge that you have read and understood these terms and conditions.</li>
          </ul>
          <p className="mb-4 text-center">
            Trimex Colleges is committed to adhering to Philippine laws and regulations regarding data privacy and protection, including the Data Privacy Act of 2012 (Republic Act No. 10173).
          </p>

          {/* Checkbox for acceptance */}
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="accept-terms" 
              checked={isChecked} 
              onChange={() => setIsChecked(!isChecked)} 
              className="mr-2" 
            />
            <label htmlFor="accept-terms">I have read and accept the terms and conditions.</label>
          </div>

          {/* Form to prevent submission issues */}
          <form onSubmit={handleAccept}>
            <div className="flex justify-end mt-4">
              <button 
                type="button" // Change to type "button"
                onClick={handleCancel} 
                className="btn border-gray-300 bg-white text-gray-800 hover:bg-gray-500 mr-2"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={!isChecked} 
                className={`btn ${isChecked ? 'border-gray-700 bg-gray-700 text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} 
              >
                Accept
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terms;
