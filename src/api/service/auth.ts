import api from '../api';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginResponse,
  LoginRequest,
} from '@/types/auth-types';

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    '/functions/v1/auth-register',
    data
  );
  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    '/functions/v1/auth-login',
    data
  );
  const token = response.data.data.token;
  if (token) {
    localStorage.setItem('token', token);
  }
  return response.data;
};
