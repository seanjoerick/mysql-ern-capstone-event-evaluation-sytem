import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='/signup' element={<Signup />} /> 
        <Route path='/sidebar' element={<Sidebar />} /> 
      </Routes>
    </BrowserRouter>
  );
}
  