import React from 'react';
import InfoSection from '../components/InfoSection';
import logo from '../assets/images/trimex.png';

const About = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Centered Logo */}
      <img 
        src={logo} 
        alt="Trimex Logo" 
        className="w-32 h-32 rounded-full mb-6" // Adjust the size as needed
      />
      
      {/* Description of the Event Evaluation System */}
      <h2 className="text-3xl font-semibold mb-6 text-center">What is Event Evaluation System?</h2>
      <p className="text-base text-gray-600 text-center mb-4">
        The Event Evaluation System is an online platform designed to facilitate the assessment and feedback collection for events. 
        It allows participants, particularly students, to provide insights about their experiences during events, which can be used to enhance future planning and execution.
      </p>
      
      <InfoSection />
    </div>
  );
};

export default About;
