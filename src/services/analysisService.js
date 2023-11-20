import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_ANALYSIS;

const dynamicAnalysis = async (data) => {
  const response = await axios.post(API_URL + "dynamic_sells", data);
  return response.data;
};

const abcAnalysis = async (data) => {
  const response = await axios.post(API_URL + "abc", data);
  return response.data;
};

const xyzAnalysis = async (data) => {
  const response = await axios.post(API_URL + "xyz", data);
  return response.data;
};

const analysisService = { dynamicAnalysis, abcAnalysis, xyzAnalysis };

export default analysisService;
