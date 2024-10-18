import { useState } from 'react'; // Import useState
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUser, 
  faCalendarAlt, 
  faFileAlt, 
  faCog, 
  faSignOutAlt, 
  faChevronDown // Import the chevron down icon for the dropdown
} from '@fortawesome/free-solid-svg-icons';

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
        <a href="javascript:void(0)">
          <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Logo" className="w-[160px] mx-auto" />
        </a>
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          {/* Main Navigation */}
          <li>
            <a href="javascript:void(0)"
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a href="javascript:void(0)"
              onClick={toggleAccounts} // Toggle dropdown on click
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>Accounts</span>
              <FontAwesomeIcon icon={faChevronDown} className="ml-auto" /> {/* Arrow icon */}
            </a>
            {isAccountsOpen && ( // Conditionally render dropdown items
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <a href="javascript:void(0)"
                    className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all">
                    <span>Manage Accounts</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)"
                    className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-2 transition-all">
                    <span>Accounts</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <a href="javascript:void(0)"
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              <span>Events</span>
            </a>
          </li>

          <hr className="border-t border-gray-300 my-4" />

          <li>
            <a href="javascript:void(0)"
              className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              <span>Reports</span>
            </a>
          </li>
        </ul>

        <div className="mt-5">
          <hr className="border-t border-gray-300 my-4" />
          <ul className="space-y-1">
            {/* Bottom Navigation */}
            <li>
              <a href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
