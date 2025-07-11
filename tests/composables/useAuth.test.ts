import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { useAuth } from '../../src/composables/useAuth'
import { useAuthStore } from '../../src/stores/authStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { toast } from 'vue-sonner'
import type { ComponentPublicInstance } from 'vue'

// Define the shape of our test component's instance
type TestComponentInstance = ComponentPublicInstance & {
  isLoadingUser: boolean
  me: unknown
  [key: string]: unknown
}

// Create a test component that uses the useAuth composable
const TestComponent = {
  template: '<div></div>',
  setup() {
    return {
      ...useAuth()
    }
  }
}

// Helper function to mount the test component with all required plugins
const mountTestComponent = () => {
  // Create a new Pinia instance
  const pinia = createPinia()
  setActivePinia(pinia)
  
  // Create a new QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  
  // Mount the component with required plugins
  const wrapper = mount(TestComponent, {
    global: {
      plugins: [
        pinia,
        [VueQueryPlugin, { queryClient }]
      ]
    }
  })
  
  return {
    wrapper,
    queryClient,
    authStore: useAuthStore()
  }
}

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      go: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
    })),
    useRoute: vi.fn(() => ({})),
    createRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      go: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
      currentRoute: { value: {} },
    })),
    createWebHistory: vi.fn(),
  }
})

interface ToastOptions {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
  icon?: unknown
  className?: string
  style?: Record<string, string>
}

type ToastFunction = (message: string, options?: ToastOptions) => void

vi.mock('vue-sonner', () => ({
  toast: {
    success: vi.fn() as ToastFunction,
    error: vi.fn() as ToastFunction,
  },
}))

describe('useAuth', () => {
  let mockAxios: MockAdapter
  let wrapper: ReturnType<typeof mountTestComponent>

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    vi.clearAllMocks()
    
    // Mount the test component before each test
    wrapper = mountTestComponent()
  })

  afterEach(() => {
    mockAxios.reset()
    vi.clearAllMocks()
    
    // Clear the query client after each test
    wrapper.queryClient.clear()
    
    // Clean up the wrapper
    wrapper.wrapper.unmount()
  })

  describe('register', () => {
    it('should register a new user and redirect to home', async () => {
      const mockResponse = {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        user: { id: 1, email: 'test@example.com' }
      }

      mockAxios.onPost('/auth/register').reply(200, mockResponse)

      const authStore = useAuthStore()
      const router = useRouter()
      const { register } = useAuth()

      await register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      })

      expect(authStore.accessToken).toBe('test-access-token')
      expect(authStore.refreshToken).toBe('test-refresh-token')
      expect(router.push).toHaveBeenCalledWith('/')
    })

    it('should handle registration error', async () => {
      mockAxios.onPost('/auth/register').reply(400, { error: 'Registration failed' })

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const { register } = useAuth()

      await register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      })

      expect(consoleSpy).toHaveBeenCalledWith('Registration failed:', expect.any(Error))
      expect(toast.error).toHaveBeenCalledWith('❌ Error al registrar', expect.any(Object))

      consoleSpy.mockRestore()
    })
  })

  describe('login', () => {
    it('should login a user and redirect to home', async () => {
      const mockResponse = {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        user: { id: 1, email: 'test@example.com' }
      }

      mockAxios.onPost('/auth/login').reply(200, mockResponse)

      const authStore = useAuthStore()
      const router = useRouter()
      const { login } = useAuth()

      await login({
        email: 'test@example.com',
        password: 'password123'
      })

      expect(authStore.accessToken).toBe('test-access-token')
      expect(authStore.refreshToken).toBe('test-refresh-token')
      expect(router.push).toHaveBeenCalledWith('/')
      expect(toast.success).toHaveBeenCalledWith('👋 ¡Bienvenido de nuevo!', expect.any(Object))
    })
  })

  describe('refresh', () => {
    it('should refresh the access token', async () => {
      const mockResponse = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token'
      }

      mockAxios.onPost('/auth/refresh').reply(200, mockResponse)

      const authStore = useAuthStore()
      const { refresh } = useAuth()
      await refresh({ refresh_token: 'old-refresh-token' })
      expect(authStore.accessToken).toBe('new-access-token')
      expect(authStore.refreshToken).toBe('new-refresh-token')
    })

    it('should clear auth on refresh error', async () => {
      mockAxios.onPost('/auth/refresh').reply(401)

      const authStore = useAuthStore()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const { refresh } = useAuth()

      authStore.setTokens({
        access_token: 'old-access-token',
        refresh_token: 'old-refresh-token'
      })
      await refresh({ refresh_token: 'invalid-refresh-token' })
      expect(authStore.accessToken).toBeNull()
      expect(authStore.refreshToken).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Token refresh failed:', expect.any(Error))

      consoleSpy.mockRestore()
      consoleSpy.mockRestore()
    })
  })

  describe('me', () => {
    let authStore: ReturnType<typeof useAuthStore>

    beforeEach(() => {
      authStore = useAuthStore()
      authStore.setTokens({
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token'
      })
    })

    it('should fetch user data when authenticated', async () => {
      // Arrange
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' }
      mockAxios.onGet('/auth/me').reply(200, mockUser)
      
      // Set up auth store with tokens
      wrapper.authStore.setTokens({
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token'
      })

      // Act - The query should run automatically when the component mounts
      // and the tokens are set
      await flushPromises()

      // Assert
      const vm = wrapper.wrapper.vm as unknown as TestComponentInstance
      expect(vm.isLoadingUser).toBe(false)
      expect(vm.me).toEqual(mockUser)
      expect(wrapper.authStore.user).toEqual(mockUser)
    })

    it('should clear auth on me query error', async () => {
      mockAxios.onGet('/auth/me').reply(401)

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      authStore.setTokens({
        access_token: 'expired-access-token',
        refresh_token: 'refresh-token'
      })

      const { isLoadingUser } = useAuth()
      await flushPromises()

      expect(isLoadingUser.value).toBe(false)
      expect(authStore.accessToken).toBeNull()
      expect(authStore.refreshToken).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch user data:', expect.any(Error))

      consoleSpy.mockRestore()
    })
  })

  describe('logout', () => {
    it('should clear auth and redirect to access page', async () => {
      const authStore = useAuthStore()
      const router = useRouter()

      authStore.setTokens({
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token'
      })

      const { logout } = useAuth()

      logout()

      expect(authStore.accessToken).toBeNull()
      expect(authStore.refreshToken).toBeNull()
      expect(router.push).toHaveBeenCalledWith('/access')
    })
  })

  describe('updateMe', () => {
    it('should update user data and redirect to home', async () => {
      const updatedUser = { name: 'Updated Name', email: 'updated@example.com' }
      mockAxios.onPut('/auth/me').reply(200, updatedUser)

      const router = useRouter()
      const { updateMe } = useAuth()

      await updateMe(updatedUser)

      expect(router.push).toHaveBeenCalledWith('/')
    })

    it('should handle update error', async () => {
      mockAxios.onPut('/auth/me').reply(400, { error: 'Update failed' })

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const { updateMe } = useAuth()

      await updateMe({ name: 'Test User', email: 'test@example.com' })

      expect(consoleSpy).toHaveBeenCalledWith('Update user failed:', expect.any(Error))

      consoleSpy.mockRestore()
    })
  })
})
