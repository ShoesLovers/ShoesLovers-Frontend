import axios, { CanceledError } from 'axios';

let url: string;

if (process.env.NODE_ENV?.trim() === 'development') {
  url = 'http://localhost:3000/';
} else {
  url = 'https://node29.cs.colman.ac.il/';
}

export { CanceledError };
const apiClient = axios.create({
  baseURL: url,
});

export default apiClient;
