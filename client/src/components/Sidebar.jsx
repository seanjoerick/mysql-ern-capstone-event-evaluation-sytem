import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUser, 
  faCalendarAlt, 
  faFileAlt, 
  faCog, 
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const location = useLocation();

  const toggleAccounts = () => {
    setIsAccountsOpen(prevState => !prevState);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#f7f7f8] h-screen fixed top-0 left-0 w-64 py-6 px-4 font-[sans-serif]"> 
      <div className="relative text-center mb-4">
        <h2 className="text-xl font-bold mb-2">Event Evaluation System</h2>
        <Link to="/">
          <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Logo" className="w-[160px] mx-auto" />
        </Link>
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          {/* Main Navigation */}
          <li>
            <Link 
              to="/dashboard"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActive('/dashboard') ? 'text-blue-600' : ''}`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <button
              onClick={toggleAccounts} // Toggle dropdown on click
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all w-full text-left ${isActive('/manage-accounts') || isActive('/manage') || isActive('/admins') ? 'text-blue-600' : ''}`}>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>Accounts</span>
              <FontAwesomeIcon icon={faChevronDown} className="ml-auto" /> {/* Arrow icon */}
            </button>
            {isAccountsOpen && ( // Conditionally render dropdown items
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/manage"
                    className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all ${isActive('/manage') ? 'text-blue-600' : ''}`}
                  >
                    <span>Manage Students</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admins"
                    className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all ${isActive('/admins') ? 'text-blue-600' : ''}`}
                  >
                    <span>Manage Admins</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <Link 
              to="/events"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActive('/events') ? 'text-blue-600' : ''}`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>Events</span>
            </Link>
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <Link 
              to="/reports"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActive('/reports') ? 'text-blue-600' : ''}`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              <span>Reports</span>
            </Link>
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <Link 
              to="/evaluate"
              className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActive('/evaluate') ? 'text-blue-600' : ''}`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              <span>Evaluate</span>
            </Link>
          </li>
        </ul>

        <div className="mt-5">
          <hr className="border-t border-gray-300 my-4" />
          <ul className="space-y-1">
            {/* Bottom Navigation */}
            <li>
              <Link 
                to="/settings"
                className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActive('/settings') ? 'text-blue-600' : ''}`}
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                <span>Settings</span>
              </Link>
            </li>
            <Logout /> {/* Use the Logout component */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;