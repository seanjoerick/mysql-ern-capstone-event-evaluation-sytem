import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About'; 
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
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
import InfoSection from './components/InfoSection';
import { Link } from 'react-router-dom';

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route 
          path='/' 
          element={
            authUser 
              ? (authUser.role === 'student' ? <Navigate to='/evaluate' /> : <Navigate to='/dashboard' />) 
              : <LandingPage 
                  content={
                    <div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-[80px] text-gray-900">
                        Event Evaluation System
                      </h2>
                      <p className="text-base text-gray-600">
                        The Event Evaluation System is managed by organizers, while students are responsible for submitting evaluations.
                      </p>
                      <InfoSection />
                      {/* Centering the buttons */}
                      <div className="mt-14 flex justify-center gap-4"> 
                        <Link to="/login">
                          <button type="button" className="px-6 py-3.5 rounded-md text-white bg-gray-900 hover:bg-gray-500 transition-all">
                            Login
                          </button>
                        </Link>
                        <Link to="/signup">
                          <button type="button" className="bg-transparent hover:bg-gray-900 border border-gray-600 px-6 py-3.5 rounded-md text-gray-600 hover:text-white transition-all">
                            Sign Up
                          </button>
                        </Link>
                      </div>
                    </div>
                  } 
                />} 
        />
        
        <Route 
          path='/login' 
          element={
            authUser 
              ? <Navigate to={authUser.role === 'student' ? '/evaluate' : '/dashboard'} /> 
              : <Login />
          } 
        />
        <Route 
          path='/signup' 
          element={
            authUser 
              ? <Navigate to={authUser.role === 'student' ? '/evaluate' : '/dashboard'} /> 
              : <SignUp />
          } 
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* Routes for About, FAQ, and Contact */}
        <Route path='/about' element={<LandingPage content={<About />} />} />
        <Route path='/faq' element={<LandingPage content={<FAQ />} />} />
        <Route path='/contact' element={<LandingPage content={<Contact />} />} />

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
