import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import useLogout from '../hooks/useLogout';

const Logout = () => {
  const { logout, loading } = useLogout();

  const handleLogout = () => {
    if (!loading) {
      logout();
    }
  };

  return (
    <li>
      <a 
        onClick={handleLogout}
        className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all cursor-pointer"
      >
        {loading ? (
          <span className="loader"></span> 
        ) : (
          <>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            <span>Logout</span>
          </>
        )}
      </a>
    </li>
  );
};

export default Logout;
