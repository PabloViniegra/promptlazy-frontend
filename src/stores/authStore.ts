import { defineStore } from 'pinia'
import { login, register, refresh, me } from '@/services/auth'
import { ref, computed } from 'vue'
import type {
  Me,
  AuthFullResponse,
  AuthPartialResponse,
  AuthRegisterRequest,
  AuthLoginRequest,
} from '@/types/auth'
import { api } from '@/api/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const accessToken = ref<string | null>(localStorage.getItem('access_token') || null)
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token') || null)
  const user = ref<Me | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value)

  // Actions
  function setTokens(tokens: AuthFullResponse | AuthPartialResponse) {
    accessToken.value = tokens.access_token
    api.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`
    localStorage.setItem('access_token', tokens.access_token)
    if ('refresh_token' in tokens && tokens.refresh_token) {
      refreshToken.value = tokens.refresh_token
      localStorage.setItem('refresh_token', tokens.refresh_token)
    }
  }

  function clearAuth() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    delete api.defaults.headers.common['Authorization']
  }
  async function fetchMe() {
    try {
      const userResponse = await me()
      user.value = userResponse
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      clearAuth()
    }
  }
  async function registerUser(payload: AuthRegisterRequest) {
    const tokens = await register(payload)
    setTokens(tokens)
    await fetchMe()
  }
  async function loginUser(payload: AuthLoginRequest) {
    const tokens = await login(payload)
    setTokens(tokens)
    await fetchMe()
  }
  async function refreshTokenAction() {
    if (!refreshToken.value) throw new Error('No refresh tokern available')
    const partial = await refresh({ refresh_token: refreshToken.value })
    setTokens(partial)
  }
  async function logout() {
    clearAuth()
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    setTokens,
    clearAuth,
    fetchMe,
    registerUser,
    loginUser,
    refreshTokenAction,
    logout,
  }
})
