import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const { authUser } = useAuthContext();

  const updateDateTime = () => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };
    setCurrentDateTime(new Date().toLocaleString('en-US', options));
  };

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <header className='border-b font-[sans-serif] tracking-wide relative z-50'>
      <div className='flex justify-between items-center px-10 py-4 bg-gray-100 min-h-[70px]'>
        <div className='flex items-center'>
          {authUser && (
            <p className='text-sm font-semibold mr-4'>Welcome, {authUser.username}</p>
          )}
        </div>

        <p className='text-sm font-semibold'>{currentDateTime}</p>
      </div>
    </header>
  );
};

export default Header;