import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login'; 
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';

const App = () => {
  const { authUser } = useAuthContext();
  
  return (
    <>
      <Toaster />
      <Routes>
        {/* Sidebar is the main route and redirects to / if logged in */}
        <Route path='/' element={authUser ? <Sidebar /> : <Navigate to='/login' />} /> 
        {/* Redirect to Sidebar if already authenticated on login */}
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} /> 
        {/* Redirect to Sidebar if already authenticated on signup */}
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} /> 
      </Routes>
    </>
  );
};

export default App;
