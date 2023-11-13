import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_AUTH;

const register = async (userData) => {
  const response = await axios.post(API_URL + "reg", userData);
  return response;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "log", userData);
  return response;
};

const authService = { register, login };

export default authService;
