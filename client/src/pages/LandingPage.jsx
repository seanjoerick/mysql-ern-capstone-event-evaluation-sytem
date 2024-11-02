import React from 'react';
import Header from '../components/LandingPageHeader';
import Footer from '../components/Footer'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faHeadset, faBolt, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />

      <div className="font-sans">
        <div className="grid lg:grid-cols-2 items-center lg:gap-y-6 bg-gray-500">
          <div className="max-lg:order-1 max-lg:text-center sm:p-12 p-4">
            <h2 className="text-gray-800 lg:text-5xl text-3xl font-bold lg:!leading-[56px]">Elevate Your Experience with Modern Elegance</h2>
            <p className="text-gray-800 mt-6 text-base leading-relaxed">Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim nulla officia ea sit deserunt. Eu eu quis anim aute Laboris qui Lorem ad tempor ut reprehenderit.</p>
            <button type='button' className="bg-transparent border-2 border-gray-800 mt-12 transition-all text-gray-800 font-bold text-sm rounded-md px-6 py-2.5">Get Started</button>
          </div>

          <div className="lg:h-[480px] flex items-center">
            <img src="https://readymadeui.com/team-image.webp" className="w-full h-full object-cover" alt="Dining Experience" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-4 my-12">
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faCogs} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Customization</h3>
            <p className="text-sm text-gray-600">Tailor our product to suit your needs.</p>
            <Link to="/customization" className="text-blue-600 font-bold inline-block text-sm mt-4 hover:underline">Learn more</Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faHeadset} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Support</h3>
            <p className="text-sm text-gray-600">24/7 customer support for all your inquiries.</p>
            <Link to="/support" className="text-blue-600 font-bold inline-block text-sm mt-4 hover:underline">Learn more</Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faBolt} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Performance</h3>
            <p className="text-sm text-gray-600">Experience blazing-fast performance with our product.</p>
            <Link to="/performance" className="text-blue-600 font-bold inline-block text-sm mt-4 hover:underline">Learn more</Link>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <FontAwesomeIcon icon={faLock} className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md" />
            <h3 className="text-lg font-bold mb-2 text-gray-800">Security</h3>
            <p className="text-sm text-gray-600">We prioritize your security and privacy.</p>
            <Link to="/security" className="text-blue-600 font-bold inline-block text-sm mt-4 hover:underline">Learn more</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
