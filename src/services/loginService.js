import apiService from "./apiService";

export const login = (email, password) => apiService.post('/auth/login', { email, password })