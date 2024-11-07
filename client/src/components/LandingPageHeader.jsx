import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/trimex.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px] relative">
      <div className="lg:flex lg:items-center gap-x-2 relative">
        <div className="flex items-center shrink-0">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>
          <button id="toggleOpen" className="lg:hidden ml-auto">
            <FontAwesomeIcon icon={faBars} className="w-7 h-7 text-black" />
          </button>
        </div>

        <div
          id="collapseMenu"
          className="lg:ml-14 max-lg:hidden lg:!block w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 z-50"
        >
          <button id="toggleClose" className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3">
            <FontAwesomeIcon icon={faTimes} className="w-4 fill-black" />
          </button>

          <div className="lg:flex items-center w-full gap-6 max-lg:fixed max-lg:bg-black max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <ul className="lg:flex gap-x-6 max-lg:space-y-3">
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'text-black hover:text-blue-600 block transition-all')}
                >
                  Home
                </NavLink>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'text-black hover:text-blue-600 block transition-all')}
                >
                  About
                </NavLink>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink 
                  to="/faq" 
                  className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'text-black hover:text-blue-600 block transition-all')}
                >
                  FAQ
                </NavLink>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'text-black hover:text-blue-600 block transition-all')}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
