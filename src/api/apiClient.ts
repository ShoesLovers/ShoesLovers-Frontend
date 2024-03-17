import axios, { CanceledError } from 'axios';

export { CanceledError };
const apiClient = axios.create({
  baseURL: 'https://localhost:3000',
});

export default apiClient;
