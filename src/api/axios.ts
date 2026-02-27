import axios from 'axios';
import { getState as getAuthState } from '@/store/auth.store';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAuthState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
