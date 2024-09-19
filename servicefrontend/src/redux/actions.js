import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/auth/login', { email, password });
    const { token } = res.data;
    const decodedToken = jwtDecode(token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user: decodedToken,
      },
    });

    localStorage.setItem('jwtToken', token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => {
  localStorage.removeItem('jwtToken');
  return {
    type: LOGOUT,
  };
};
