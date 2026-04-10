import axios from "axios";

const BASE_URL = 'http://localhost:5228/api';

export const getProducts = () => {
  return axios.get(`${BASE_URL}/product`);
};

export const getCategories = () => {
  return axios.get(`${BASE_URL}/category`);
};