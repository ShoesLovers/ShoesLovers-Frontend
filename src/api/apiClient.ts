import axios, { CanceledError } from 'axios';

export { CanceledError };
const apiClient = axios.create({
  baseURL: 'https://localhost:443',
});

export default apiClient;
