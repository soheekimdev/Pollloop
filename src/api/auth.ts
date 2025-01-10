import {
  DeleteUserResponse,
  LoginResponse,
  LogoutResponse,
  ProfileImageResponse,
  RegisterResponse,
  RequestPasswordResetResponse,
  ResetPasswordResponse,
  Tokens,
} from '@/types/auth';
import { instance } from './axios';

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await instance.post<LoginResponse>('/user/login/', { email, password });
    return response.data;
  },

  logout: async () => {
    const refreshToken = JSON.parse(localStorage.getItem('tokens') || '{}').refresh;
    const response = await instance.post<LogoutResponse>('/user/logout/', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  register: async (email: string, password: string, password2: string) => {
    const response = await instance.post<RegisterResponse>('/user/register/', {
      email,
      password,
      password2,
    });
    return response.data;
  },

  updateProfileImage: (formData: FormData) => {
    return instance.post<ProfileImageResponse>('/user/profile/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  requestPasswordReset: async (email: string) => {
    const response = await instance.post<RequestPasswordResetResponse>('/user/password-reset/', {
      email,
    });
    return response.data;
  },

  resetPassword: async (uid: string, token: string, newPassword: string) => {
    const response = await instance.post<ResetPasswordResponse>('/user/reset-password/confirm/', {
      uid,
      token,
      newPassword,
    });
    return response.data;
  },

  handleKakaoCallback: async (code: string) => {
    const response = await instance.get(`/user/oauth/kakao/callback/?code=${code}`);
    return response.data;
  },

  deleteUser: async () => {
    const response = await instance.post<DeleteUserResponse>('/user/profile/delete/');
    return response.data;
  },

  refreshToken: async () => {
    const refresh = JSON.parse(localStorage.getItem('tokens') || '{}').refresh;
    const response = await instance.post<Tokens>('/api/token/refresh/', { refresh });
    return response.data;
  },
};
