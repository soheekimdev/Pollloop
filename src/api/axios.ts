import axios from 'axios';
import { authAPI } from './auth';

export const instance = axios.create({
  baseURL: 'http://api.pollloop.store',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  config => {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
      if (tokens.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
      }
    } catch (error) {
      console.error('토큰 파싱 중  오류', error);
    }

    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,

  async error => {
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

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(new Error('서버와의 통신 중 문제가 발생했습니다.'));
  },
);
