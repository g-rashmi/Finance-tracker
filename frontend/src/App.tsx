
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Chat from './components/Chat';



export default function App() {
  return (
    <BrowserRouter>
    
        <Routes>
      
          <Route path="/" element={<Dashboard/>} />
      <Route path="/chat" element={<Chat/>}></Route>
        </Routes>
  
    </BrowserRouter>
  );
}
