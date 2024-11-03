import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faQuestionCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import trimex from '../assets/images/trimex.png'

const Header = () => {
  return (
    <header className="shadow-md font-sans tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[80px]">
        {/* Logo and Title Section */}
        <div className="flex items-center">
          <a href="javascript:void(0)" className="flex items-center">
            <img src={trimex} alt="Trimex logo" className="w-36" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">Event Evaluation System</h1>
              <h2 className="text-sm text-gray-600">Trimex Colleges</h2>
            </div>
          </a>
        </div>

        {/* Navigation Menu */}
        <div id="collapseMenu" className="hidden lg:block ml-auto"> {/* Added ml-auto for spacing */}
          <ul className="flex gap-x-5">
            <li>
              <Link to="/" className="hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" /> FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#007bff] text-[#333] block font-bold text-[15px]">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden">
          <button id="toggleOpen" className="flex items-center">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
