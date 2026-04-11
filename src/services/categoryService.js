import axios from 'axios';

const BASE_URL = 'http://localhost:5228/api';

export const getCategories = () => {
  return axios.get(`${BASE_URL}/category`);
};

export const createCategory = (category) => {
  return axios.post(`${BASE_URL}/category`, category);
};

