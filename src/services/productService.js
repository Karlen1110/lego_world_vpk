import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_PURCHASE;

const getProducts = async (params) => {
  const response = await axios.get(API_URL + "products", { params });
  return response.data;
};

const addToCart = async (data) => {
  const response = await axios.post(API_URL + "cart", data);
  return response.data;
};

const getCart = async (params) => {
  const response = await axios.get(API_URL + "cart", { params });
  return response.data;
};

const deleteFromCart = async (id) => {
  const response = await axios.delete(API_URL + `cart/${id}`);
  return response.data;
};

const purchase = async (data) => {
  const response = await axios.post(API_URL + "purchase", data);
  return response.data;
};

const productService = { getProducts, addToCart, getCart, deleteFromCart, purchase };

export default productService;
