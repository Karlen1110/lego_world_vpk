import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_SALES;

const genOrders = async (data) => {
  const response = await axios.post(API_URL + "gen_orders", data);
  return response.data;
};

const infoData = async (data) => {
  const response = await axios.post(API_URL + "info_data", data);
  return response.data;
};

const salesService = { genOrders, infoData };

export default salesService;
