import api from './axios';
import type { LoginResponse } from '@/types/auth.types';

export async function login(username: string, password: string): Promise<string> {
  const response = await api.post<LoginResponse>('/auth/login', {
    username,
    password,
  });
  return response.data.token;
}
