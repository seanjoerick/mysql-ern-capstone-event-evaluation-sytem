import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Main from './components/Main';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Students from './pages/Students';
import Admin from './pages/AdminAccounts';
import Evaluation from './pages/Evaluation';
import Evaluate from './pages/Evaluate';
import ForgotPassword from './pages/ForgotPassword';
const App = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={authUser ? (authUser.role === 'student' ? <Navigate to='/evaluate' /> : <Navigate to='/dashboard' />) : <LandingPage />} />
        <Route path='/login' element={authUser ? <Navigate to={authUser.role === 'student' ? '/evaluate' : '/dashboard'} /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to={authUser.role === 'student' ? '/evaluate' : '/dashboard'} /> : <SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* Protected routes with Sidebar */}
        {authUser && (
          <Route path='/' element={<Main />}>
            {/* Admin-only routes */}
            {authUser.role === 'admin' && (
              <>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='events' element={<Events />} />
                <Route path='students' element={<Students />} />
                <Route path='admins' element={<Admin />} />
                <Route path='criteria' element={<Evaluation />} />
              </>
            )}

            {/* Student-only routes */}
            {authUser.role === 'student' && (
              <Route path='evaluate' element={<Evaluate />} />
            )}
          </Route>
        )}

        {/* Redirect all other paths */}
        <Route path='*' element={<Navigate to={authUser ? (authUser.role === 'student' ? '/evaluate' : '/dashboard') : '/login'} />} />
      </Routes>
    </>
  );
};

export default App;
