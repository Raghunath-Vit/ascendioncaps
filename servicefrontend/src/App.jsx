import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken } from './utils/jwtDecode';
import {  Routes, Route, useLocation} from 'react-router-dom';
import { LOGIN_SUCCESS } from './redux/actions';
import Admin from './components/Admin';
import Worker from './components/Worker';
import User from './components/User';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CreateCategory from './components/CreateCategory';
import CreateService from './components/CreateService';
import ViewUsers from './components/ViewUsers';
import Works from './components/Works';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = decodeToken(token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user: decoded,
        },
      });
    }
  }, [dispatch]);

  return (
    <>
    {location.pathname !== '/login' && <Navbar />}
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/worker" element={<Worker />} />
        <Route path="/user" element={<User />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/create-service" element={<CreateService />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/works" element={<Works />} />
      </Routes>

    </>
  );
};

export default App;
