import axios from 'axios';
import { clearPublisherSession, getPublisherToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://storegram-backend-39ki.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getPublisherToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (typeof window !== 'undefined' && status === 401) {
      clearPublisherSession();

      const isPublisherRoute = window.location.pathname.startsWith('/publisher');
      if (isPublisherRoute) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
