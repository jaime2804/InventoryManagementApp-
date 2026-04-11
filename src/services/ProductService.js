import axios from "axios";

const BASE_URL = 'http://localhost:5228/api';

export const getProducts = () => {
  return axios.get(`${BASE_URL}/product`);
};

export const deleteProduct = (id) => {
  return axios.delete(`${BASE_URL}/product/${id}`);
};

export const createProduct = (product) => {
  return axios.post(`${BASE_URL}/product`, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${BASE_URL}/product/${id}`, product);
};