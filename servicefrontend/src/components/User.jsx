// import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {/* Add your user-specific content here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default User;
