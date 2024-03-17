import axios, { CanceledError } from 'axios';

export { CanceledError };
const apiClient = axios.create({
  baseURL: 'https://193.106.55.189',
});

export default apiClient;
