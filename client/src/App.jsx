import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login'; 
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Main from './components/Main'; 
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Reports from './pages/Reports';
import Students from './pages/Students';
import Admin from './pages/AdminAccounts';
import Settings from './pages/Settings';
import EventList from './pages/EventList';
import Terms from './components/Terms'; 

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        <Route path='/terms' element={<Terms />} />
        
        {/* Protected routes that include the Sidebar */}
        {authUser && (
          <Route path='/' element={<Main />}>
            {/* Child routes will render inside MainLayout */}
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='events' element={<Events />} />
            <Route path='reports' element={<Reports />} />
            <Route path='students' element={<Students />} />
            <Route path='admins' element={<Admin />} />
            <Route path='criteria' element={<EventList />} /> 
            <Route path='settings' element={<Settings />} /> 
            {/* Add other protected routes here */}
          </Route>
        )}
        
        {/* Fallback to login if not authenticated */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
};

export default App;
