import apiService from "./apiService";


export const getMovements = () => apiService.get('/movements');

export const createMovement = (movements) => apiService.post('/movements', movements);