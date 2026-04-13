import axios from "axios";


const apiService = axios.create({
  baseURL: 'http://localhost:5228/api'
});

export default apiService;  