import { useState } from 'react'; // Import useState
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUser, 
  faCalendarAlt, 
  faFileAlt, 
  faCog, 
  faChevronDown // Import the chevron down icon for the dropdown
} from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  const [isAccountsOpen, setIsAccountsOpen] = useState(false); // State for dropdown visibility

  const toggleAccounts = () => {
    setIsAccountsOpen(!isAccountsOpen); // Toggle the dropdown
  };

  return (
    <nav className="bg-[#f7f7f8] h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif]">
      <div className="relative text-center mb-4">
        <h2 className="text-xl font-bold mb-2">Event Evaluation System</h2>
        <hr className="border-t border-gray-300 my-4" />
        <Link to="/">
          <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Logo" className="w-[160px] mx-auto" />
        </Link>
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          {/* Main Navigation */}
          <li>
            <Link to="/dashboard"
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <a href="#" // Keep as an anchor since this is a toggle
              onClick={toggleAccounts} // Toggle dropdown on click
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>Accounts</span>
              <FontAwesomeIcon icon={faChevronDown} className="ml-auto" /> {/* Arrow icon */}
            </a>
            {isAccountsOpen && ( // Conditionally render dropdown items
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <Link to="/manage-accounts"
                    className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all">
                    <span>Manage Accounts</span>
                  </Link>
                </li>
                <li>
                  <Link to="/accounts"
                    className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all">
                    <span>Accounts</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <Link to="/events"
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>Events</span>
            </Link>
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <Link to="/reports"
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              <span>Reports</span>
            </Link>
          </li>
        </ul>

        <div className="mt-5">
          <hr className="border-t border-gray-300 my-4" />
          <ul className="space-y-1">
            {/* Bottom Navigation */}
            <li>
              <Link to="/settings"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
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
