
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';



export default function App() {
  return (
    <BrowserRouter>
    
        <Routes>
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
  
    </BrowserRouter>
  );
}
