import apiService from "./apiService";




export const getProducts = () => apiService.get('/product');

export const deleteProduct = (id) => apiService.delete(`/product/${id}`);

export const createProduct = (product) => apiService.post('/product', product)


export const updateProduct = (id, product) => apiService.put(`/product/${id}`, product);