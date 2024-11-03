import React, { useEffect, useState } from 'react';
import Header from '../components/LandingPageHeader';
import Footer from '../components/Footer'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faHeadset, faBolt, faLock, faClipboardCheck, faPencilRuler, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import section from '../assets/images/section.jpg';

const LandingPage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <div className="font-sans">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-y-6 bg-gray-300 p-8 rounded-lg shadow-md">
          
        <div className="max-lg:order-1 max-lg:text-center flex flex-col items-center justify-center h-full">
            <p className="text-gray-800 text-md mb-4 text-center">
              Welcome to the Event Evaluation System, where you can provide feedback on events and help us improve future experiences.
            </p>
            {/* Centered buttons */}
            <div className="flex gap-4 mt-4 justify-center">
              <Link to="/login" className="bg-gray-800 text-white font-bold text-sm rounded-md px-6 py-2 transition-all hover:bg-gray-600 shadow">
                Login
              </Link>
              <Link to="/signup" className="bg-transparent border-2 border-gray-800 text-gray-800 font-bold text-sm rounded-md px-6 py-2 transition-all hover:bg-gray-600 hover:text-white shadow">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="lg:h-[480px] flex items-center justify-center relative">
            <img src={section} className="w-full h-full object-cover rounded-md shadow-md" alt="Dining Experience" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-70 p-6 rounded-md shadow-lg">
              <h2 className={`text-2xl font-bold mb-4 text-gray-800 ${animate ? 'animate-slide' : ''}`}>
                Event Evaluation System
              </h2>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faClipboardCheck} className="text-gray-600 mr-2" />
                <p className={`text-lg text-gray-800 ${animate ? 'animate-slide' : ''}`}>
                  Students can evaluate past events to provide valuable feedback.
                </p>
              </div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faPencilRuler} className="text-gray-600 mr-2" />
                <p className={`text-lg text-gray-800 ${animate ? 'animate-slide' : ''}`}>
                  Organizers can create tailored evaluations for each event.
                </p>
              </div>
              <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faLightbulb} className="text-gray-600 mr-2" />
                <p className={`text-lg text-gray-800 ${animate ? 'animate-slide' : ''}`}>
                  Experience an intuitive design for effortless feedback submission.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-4 my-12">
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faCogs} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md text-gray-500" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Event Evaluation</h3>
            <p className="text-sm text-gray-600">Students can evaluate past events to provide valuable feedback.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faHeadset} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md text-gray-500" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Organizer Dashboard</h3>
            <p className="text-sm text-gray-600">Organizers can create tailored evaluations for each event.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faBolt} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md text-gray-500" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">User-Friendly Interface</h3>
            <p className="text-sm text-gray-600">Experience an intuitive design for effortless feedback submission.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faLock} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md text-gray-500" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Security</h3>
            <p className="text-sm text-gray-600">We prioritize your security and privacy.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
