import {
  ChangePasswordResponse,
  DeleteUserResponse,
  FileUploadResponse,
  KakaoLoginResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  RequestPasswordResetResponse,
  ResetPasswordResponse,
  Tokens,
  UpdateUserProfileResponse,
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

  requestPasswordReset: async (email: string) => {
    const response = await instance.post<RequestPasswordResetResponse>('/user/password-reset/', {
      email,
    });
    return response.data;
  },

  resetPassword: async (
    uuid: string,
    token: string,
    new_password: string,
    new_password2: string,
  ) => {
    const response = await instance.post<ResetPasswordResponse>('/user/password-reset/confirm/', {
      uuid,
      token,
      new_password,
      new_password2,
    });
    return response.data;
  },

  changePassword: async (
    refresh_token: string,
    password: string,
    new_password: string,
    new_password2: string,
  ) => {
    const response = await instance.post<ChangePasswordResponse>('/user/profile/password-reset/', {
      refresh_token,
      password,
      new_password,
      new_password2,
    });
    return response.data;
  },

  handleKakaoCallback: async (code: string) => {
    const response = await instance.get<KakaoLoginResponse>('/user/oauth/kakao/callback/', {
      params: { code },
    });
    console.log('카카오 응답:', response);
    return response.data;
  },

  deleteUser: async ({ email, confirm }: { email: string; confirm: boolean }) => {
    const response = await instance.post<DeleteUserResponse>('/user/profile/delete/', {
      email,
      confirm,
    });
    console.log('Response:', response);
    return response;
  },

  inputFile: async (formData: FormData) => {
    const response = await instance.post<FileUploadResponse>('/inputfile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateUserProfile: async (email: string, profile: string) => {
    const response = await instance.post<UpdateUserProfileResponse>('/user/profile/', {
      email,
      profile,
    });
    return response.data;
  },

  refreshToken: async () => {
    const refresh = JSON.parse(localStorage.getItem('tokens') || '{}').refresh;
    const response = await instance.post<Tokens>('/api/token/refresh/', { refresh });
    return response.data;
  },
};
