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
  email: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface DeleteUserResponse {
  message: string;
}

export interface ProfileImageResponse {
  url: string;
}

export interface AuthError {
  message: string;
}
