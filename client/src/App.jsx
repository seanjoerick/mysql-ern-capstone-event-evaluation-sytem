// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';
// import { Toaster } from 'react-hot-toast';
// import { useAuthContext } from './context/AuthContext';
// import Main from './components/Main';
// import Dashboard from './pages/Dashboard';
// import Events from './pages/Events';
// import Students from './pages/Students';
// import Admin from './pages/AdminAccounts';
// import Terms from './components/Terms';
// import Evaluation from './pages/Evaluation';
// import Evaluate from './pages/Evaluate';

// const App = () => {
//   const { authUser } = useAuthContext();

//   return (
//     <>
//       <Toaster />
//       <Routes>
//         {/* Public routes */}
//         <Route path='/login' element={authUser ? <Navigate to={authUser.role === 'admin' ? '/dashboard' : '/evaluate'} /> : <Login />} />
//         <Route path='/signup' element={authUser ? <Navigate to='/evaluate' /> : <SignUp />} />
//         <Route path='/terms' element={<Terms />} />

//         {/* Protected routes that include the Sidebar */}
//         {authUser && (
//           <Route element={<Main />}>
//             {/* Admin routes */}
//             {authUser.role === 'admin' && (
//               <>
//                 <Route path='dashboard' element={<Dashboard />} />
//                 <Route path='events' element={<Events />} />
//                 <Route path='students' element={<Students />} />
//                 <Route path='admins' element={<Admin />} />
//                 <Route path='criteria' element={<Evaluation />} />
//               </>
//             )}
//             {/* Student routes */}
//             {authUser.role === 'student' && (
//               <>
//                 <Route path='evaluate' element={<Evaluate />} />
//               </>
//             )}
//           </Route>
//         )}

//         {/* Fallback to redirect to login if not authenticated */}
//         <Route path='/' element={<Navigate to='/login' />} />
//         <Route path='*' element={<Navigate to='/login' />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

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
import Terms from './components/Terms';
import Evaluation from './pages/Evaluation';
import Evaluate from './pages/Evaluate';

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={authUser ? <Navigate to='/dashboard' /> : <LandingPage />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/evaluate' /> : <SignUp />} />
        <Route path='/terms' element={<Terms />} />

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

        {/* Fallback to landing page if no match */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
};

export default App;
