import axios from 'axios';
import { authAPI } from './auth';

export const instance = axios.create({
  baseURL: 'http://3.38.227.106/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
  if (tokens.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

instance.interceptors.response.use(
  response => response,

  async error => {
    if (!error.response || !error.config) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokenResponse = await authAPI.refreshToken();
        const { access, refresh } = tokenResponse;

        const tokens = { access, refresh };
        localStorage.setItem('tokens', JSON.stringify(tokens));
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return instance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
  },
);
