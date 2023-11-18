import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_PURCHASE;

const getStock = async (params) => {
  const response = await axios.get(API_URL + "stock", { params });
  return response.data;
};


const stockService = { getStock };

export default stockService;
