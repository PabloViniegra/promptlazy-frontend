import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { register as registerService, login as loginService, refresh as refreshService, me as meService, updateMe as updateMeService } from '@/services/auth'
import { useAuthStore } from '@/stores/authStore'
import type { AuthRegisterRequest, AuthLoginRequest, AuthRefreshRequest, UpdateUserRequest } from '@/types/auth'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

export function useAuth() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  const router = useRouter()

  const registerMutation = useMutation({
    mutationFn: (payload: AuthRegisterRequest) => registerService(payload),
    onSuccess: (data) => {
      authStore.setTokens(data)
      queryClient.invalidateQueries({ queryKey: ['me'] })
      toast('🎉 ¡Registro exitoso!', {
        class: 'group/toast',
        description: '¡Bienvenido a PromptLazy! Estamos encantados de tenerte aquí.',
        duration: 5000,
        style: {
          padding: '1rem 1.25rem',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-sans)',
          borderLeft: '4px solid var(--color-primary)',
          transition: 'all 0.3s ease',
          boxShadow: 'var(--shadow-md)',
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--border))',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        },
        classes: {
          title: 'font-semibold text-base text-foreground',
          description: 'text-sm text-muted-foreground mt-1',
          toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
        }
      })
      router.push('/')
    },
    onError: (error) => {
      console.error('Registration failed:', error)
      toast('❌ Error al registrar', {
        class: 'group/toast',
        description: 'No hemos podido completar tu registro. Por favor, verifica tus datos e inténtalo de nuevo.',
        duration: 6000,
        style: {
          padding: '1rem 1.25rem',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-sans)',
          borderLeft: '4px solid hsl(var(--destructive))',
          transition: 'all 0.3s ease',
          boxShadow: 'var(--shadow-md)',
          background: 'hsl(var(--destructive)/0.03)',
          color: 'hsl(var(--destructive))',
          border: '1px solid hsl(var(--destructive)/0.1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        },
        classes: {
          title: 'font-semibold text-base flex items-center gap-2',
          description: 'text-sm text-muted-foreground/90 mt-1',
          toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
        }
      })
    }
  })

  const loginMutation = useMutation({
    mutationFn: (payload: AuthLoginRequest) => loginService(payload),
    onSuccess: (data) => {
      authStore.setTokens(data)
      queryClient.invalidateQueries({ queryKey: ['me'] })
      toast('👋 ¡Bienvenido de nuevo!', {
        class: 'group/toast',
        description: 'Inicio de sesión exitoso. Redirigiendo a tu panel...',
        duration: 3000,
        style: {
          padding: '1rem 1.25rem',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-sans)',
          borderLeft: '4px solid hsl(var(--primary))',
          transition: 'all 0.3s ease',
          boxShadow: 'var(--shadow-md)',
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--border))',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        },
        classes: {
          title: 'font-semibold text-base text-foreground',
          description: 'text-sm text-muted-foreground mt-1',
          toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
        }
      })
      router.push('/')
    },
    onError: (error) => {
      console.error('Login failed:', error)
      toast('🔒 Error de autenticación', {
        class: 'group/toast',
        description: 'Las credenciales proporcionadas no son válidas. Por favor, verifica e inténtalo de nuevo.',
        duration: 6000,
        style: {
          padding: '1rem 1.25rem',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-sans)',
          borderLeft: '4px solid hsl(var(--destructive))',
          transition: 'all 0.3s ease',
          boxShadow: 'var(--shadow-md)',
          background: 'hsl(var(--destructive)/0.03)',
          color: 'hsl(var(--destructive))',
          border: '1px solid hsl(var(--destructive)/0.1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        },
        classes: {
          title: 'font-semibold text-base flex items-center gap-2',
          description: 'text-sm text-muted-foreground/90 mt-1',
          toast: 'group-[.toaster]:animate-in group-[.toaster]:fade-in group-[.toaster]:slide-in-from-bottom-2 group-[.toaster]:duration-300',
        },
        action: {
          label: '¿Olvidaste tu contraseña?',
          onClick: () => router.push('/forgot-password'),
          style: {
            background: 'hsl(var(--destructive)/0.1)',
            color: 'hsl(var(--destructive))',
            border: '1px solid hsl(var(--destructive)/0.2)',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            marginTop: '0.5rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            ':hover': {
              background: 'hsl(var(--destructive)/0.2)'
            }
          }
        }
      })
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
