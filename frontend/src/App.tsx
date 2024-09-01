

  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  import '@fontsource/roboto/700.css';
  import Dashboard from './components/Dashboard';
  
  import Signup from './components/Signup';
  import Signin from './components/Signin';


  export default function App() {
    return (
      <BrowserRouter>
        
        <Routes>
        
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard />} /> 
        
        </Routes>
      </BrowserRouter>
    );
  }
