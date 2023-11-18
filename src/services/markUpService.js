import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_MARKUP;

const markUp = async (data) => {
  const response = await axios.patch(API_URL + "add", data);
  return response.data;
};


const markUpService = { markUp };

export default markUpService;
