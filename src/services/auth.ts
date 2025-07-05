import { api } from '@/api/api'
import type { AuthFullResponse, AuthPartialResponse, AuthLoginRequest, AuthRefreshRequest, AuthRegisterRequest, Me } from '@/types/auth'

export async function register(data: AuthRegisterRequest): Promise<AuthFullResponse> {
  const response = await api.post<AuthFullResponse>('/auth/register', data)
  return response.data
}

export async function login(data: AuthLoginRequest): Promise<AuthFullResponse> {
  const response = await api.post<AuthFullResponse>('/auth/login', data)
  return response.data
}

export async function refresh(data: AuthRefreshRequest): Promise<AuthPartialResponse> {
  const response = await api.post<AuthPartialResponse>('/auth/refresh', data)
  return response.data
}

export async function me(): Promise<Me> {
  const response = await api.get<Me>('/auth/me')
  return response.data
}
