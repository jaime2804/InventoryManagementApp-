import axios from "axios";


const apiService = axios.create({
  baseURL: 'http://localhost:5228/api'
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

apiService.interceptors.response.use((response) => response,
(error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
}
);

export default apiService;