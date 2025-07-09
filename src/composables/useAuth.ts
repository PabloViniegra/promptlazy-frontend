import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { register as registerService, login as loginService, refresh as refreshService, me as meService, updateMe as updateMeService } from '@/services/auth'
import { useAuthStore } from '@/stores/authStore'
import type { AuthRegisterRequest, AuthLoginRequest, AuthRefreshRequest, UpdateUserRequest } from '@/types/auth'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { ToastCredentialsError, ToastCredentialsSuccess, ToastRegisterError, ToastRegisterSuccess } from '@/utils/toaster'

export function useAuth() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  const router = useRouter()

  const registerMutation = useMutation({
    mutationFn: (payload: AuthRegisterRequest) => registerService(payload),
    onSuccess: (data) => {
      authStore.setTokens(data)
      queryClient.invalidateQueries({ queryKey: ['me'] })
      toast('🎉 ¡Registro exitoso!', ToastRegisterSuccess)
      router.push('/')
    },
    onError: (error) => {
      console.error('Registration failed:', error)
      toast('❌ Error al registrar', ToastRegisterError)
    }
  })

  const loginMutation = useMutation({
    mutationFn: (payload: AuthLoginRequest) => loginService(payload),
    onSuccess: (data) => {
      authStore.setTokens(data)
      queryClient.invalidateQueries({ queryKey: ['me'] })
      toast('👋 ¡Bienvenido de nuevo!', ToastCredentialsSuccess)
      router.push('/')
    },
    onError: (error) => {
      console.error('Login failed:', error)
      toast('🔒 Error de autenticación', ToastCredentialsError)
    }
  })

  const refreshMutation = useMutation({
    mutationFn: (payload: AuthRefreshRequest) => refreshService(payload),
    onSuccess: (data) => {
      authStore.setTokens(data)
    },
    onError: (error) => {
      console.error('Token refresh failed:', error)
      authStore.clearAuth()
    }
  })

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => meService(),
    enabled: !!authStore.accessToken
  })

  watch(meQuery.data, (data) => {
    if (data) {
      authStore.user = data
    }
  })

  watch(meQuery.isError, (isError) => {
    if (isError) {
      console.error(`Failed to fetch user data: ${meQuery.error}`)
      authStore.clearAuth()
    }
  })

  const updateMeMutation = useMutation({
    mutationFn: (data: UpdateUserRequest) => updateMeService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      router.push('/')
    },
    onError: (error) => {
      console.error('Update user failed:', error)
    }
  })

  return {
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    login: loginMutation.mutate,
    isLoging: loginMutation.isPending,
    refresh: refreshMutation.mutate,
    isRefreshing: refreshMutation.isPending,
    me: meQuery.data,
    isLoadingUser: meQuery.isLoading || meQuery.isFetching || meQuery.isPending,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    logout: () => {
      authStore.logout()
      router.push('/access')
    },
    updateMe: updateMeMutation.mutate,
    isUpdatingMe: updateMeMutation.isPending,
  }
}
