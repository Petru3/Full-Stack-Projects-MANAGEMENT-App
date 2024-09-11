import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // Schimbă URL-ul în funcție de serverul tău

const signUp = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

const signIn = (userData) => {
  return axios.post(`${API_URL}/signin`, userData);
};

const authService = {
  signUp,
  signIn,
};

export default authService;
