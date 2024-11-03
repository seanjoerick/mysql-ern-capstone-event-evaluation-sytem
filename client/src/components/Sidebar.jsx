import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUser, 
  faCalendarAlt, 
  faEnvelope,
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; 
import trimex from  '../assets/images/trimex.png';


const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const location = useLocation();

  const toggleAccounts = () => {
    setIsAccountsOpen(prevState => !prevState);
  };

  const toggleEvents = () => { 
    setIsEventsOpen(prevState => !prevState);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#f7f7f8] h-screen fixed top-0 left-0 w-64 py-6 px-4 font-[sans-serif]"> 
      <div className="relative text-center mb-4">
        <h2 className="text-xl font-bold mb-2">Event Evaluation System</h2>
        <Link to="/">
          <img src={trimex} alt="Logo" className="w-[160px] mx-auto" />
        </Link>
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          {/* Main Navigation */}
          {authUser && authUser.role === 'admin' && ( // Render for admin
            <>
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
                  onClick={toggleEvents}
                  className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all w-full text-left ${isActive('/events') || isActive('/criteria') ? 'text-blue-600' : ''}`}>
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  <span>Events</span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
                </button>
                {isEventsOpen && (
                  <ul className="pl-6 mt-1 space-y-1">
                    <li>
                      <Link 
                        to="/events"
                        className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all ${isActive('/events') ? 'text-blue-600' : ''}`}
                      >
                        <span>Manage Events</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/criteria"
                        className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all ${isActive('/criteria') ? 'text-blue-600' : ''}`}
                      >
                        <span>Evaluation</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <hr className="border-t border-gray-300 my-4" />
              <li>
                <button
                  onClick={toggleAccounts}
                  className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all w-full text-left ${isActive('/students') || isActive('/admins') ? 'text-blue-600' : ''}`}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span>Accounts</span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
                </button>
                {isAccountsOpen && (
                  <ul className="pl-6 mt-1 space-y-1">
                    <li>
                      <Link 
                        to="/students"
                        className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all ${isActive('/students') ? 'text-blue-600' : ''}`}
                      >
                        <span>Students</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admins"
                        className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all ${isActive('/admins') ? 'text-blue-600' : ''}`}
                      >
                        <span>Admins</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
          
          {/* Render only for student */}
          {authUser && authUser.role === 'student' && (
            <>
              <li>
                <Link 
                  to="/evaluate"
                  className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActive('/evaluate') ? 'text-blue-600' : ''}`}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <span>Evaluate</span>
                </Link>
              </li>
            </>
          )}

          {/* Logout Section */}
          <hr className="border-t border-gray-300 my-4" />
          <div className="mt-5">
            <ul className="space-y-1">
              <Logout />
            </ul>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
