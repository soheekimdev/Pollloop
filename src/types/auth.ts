export interface User {
  email: string;
  profileImage: string | null;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  message: string;
  email: string;
  access: string;
  refresh: string;
  profileImage: string | null;
}

export interface LogoutResponse {
  message: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
  access: string;
  refresh: string;
}

export interface RequestPasswordResetResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface DeleteUserResponse {
  message: string;
  deletion_date: string;
}
export interface AuthError {
  message: string;
}

export interface FileUploadResponse {
  file_url: string;
}

export interface UpdateUserProfileResponse {
  id: string;
  email: string;
  uuid: string;
  profile: string;
}
export interface KakaoLoginResponse {
  user: {
    id: number;
    email: string;
    profile: string;
    uuid: string;
  };
  access_token: string;
  refresh_token: string;
}
