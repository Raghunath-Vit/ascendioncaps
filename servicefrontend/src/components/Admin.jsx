// import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add your admin-specific content here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;
