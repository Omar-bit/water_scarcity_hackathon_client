import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Home from './pages/Home';
import Session from './pages/Session';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext('app');
function App() {
  const [sessions, setSessions] = useState([]);
  const [userId, setUserId] = useState('');
  const getSessions = async () => {
    try {
      const res = await axios.post(`${backendUrl}/get_report_list`, {
        user_id: userId,
      });
      setSessions(res.data.reports);
    } catch (err) {
      console.log(err);
      toast.error('Error fetching sessions');
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    } else {
      const newUserId = uuidv4();
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  }, []);
  useEffect(() => {
    if (userId) {
      getSessions();
    }
  }, [userId]);
  return (
    <AppContext.Provider value={{ sessions, userId, setSessions }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/session/:sessionId' element={<Session />} />
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </AppContext.Provider>
  );
}

export default App;
