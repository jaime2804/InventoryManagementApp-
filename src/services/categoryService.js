import apiService from './apiService';



export const getCategories = () =>  apiService.get(`/category`);


export const createCategory = (category) => apiService.post(`/category`, category);


