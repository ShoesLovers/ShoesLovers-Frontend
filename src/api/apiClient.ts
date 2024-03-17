import axios, { CanceledError } from 'axios';

let url: string;

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3000';
} else {
  url = 'https://193.106.55.189';
}

export { CanceledError };
const apiClient = axios.create({
  baseURL: url,
});

export default apiClient;
