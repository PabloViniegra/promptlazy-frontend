import MockAdapter from 'axios-mock-adapter'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import type { AuthFullResponse, AuthPartialResponse, AuthLoginRequest, AuthRefreshRequest, AuthRegisterRequest, Me, UpdateUserRequest } from '../../src/types/auth'
import { api } from '../../src/api/api'
import { register, login, refresh, me, updateMe } from '../../src/services/auth'

describe('Auth Service', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.restore()
  })

  describe('register', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
      const mockRequest: AuthRegisterRequest = {
        email: 'test@example.com',
        username: 'testuser',
        full_name: 'Test User',
        password: 'password123'
      }

      const mockResponse: AuthFullResponse = {
        access_token: 'access_token_123',
        refresh_token: 'refresh_token_123',
        token_type: 'Bearer'
      }

      mock.onPost('/auth/register', mockRequest).reply(200, mockResponse)

      const response = await register(mockRequest)
      expect(response).toEqual(mockResponse)
    })

    it('debería manejar errores de registro', async () => {
      const mockRequest: AuthRegisterRequest = {
        email: 'invalid-email',
        username: 'testuser',
        full_name: 'Test User',
        password: 'short'
      }

      mock.onPost('/auth/register').reply(400, { detail: 'Invalid email or password' })

      await expect(register(mockRequest)).rejects.toThrow()
    })
  })

  describe('login', () => {
    it('debería iniciar sesión correctamente', async () => {
      const mockRequest: AuthLoginRequest = {
        email: 'testuser@email.com',
        password: 'password123'
      }

      const mockResponse: AuthFullResponse = {
        access_token: 'access_token_123',
        refresh_token: 'refresh_token_123',
        token_type: 'Bearer'
      }

      mock.onPost('/auth/login', mockRequest).reply(200, mockResponse)

      const response = await login(mockRequest)
      expect(response).toEqual(mockResponse)
    })

    it('debería manejar credenciales inválidas', async () => {
      const mockRequest: AuthLoginRequest = {
        email: 'wronguser@email.com',
        password: 'wrongpass'
      }

      mock.onPost('/auth/login').reply(401, { detail: 'Incorrect username or password' })

      await expect(login(mockRequest)).rejects.toThrow()
    })
  })

  describe('refresh', () => {
    it('debería refrescar el token correctamente', async () => {
      const mockRequest: AuthRefreshRequest = {
        refresh_token: 'refresh_token_123'
      }

      const mockResponse: AuthPartialResponse = {
        access_token: 'new_access_token_123',
        token_type: 'Bearer'
      }

      mock.onPost('/auth/refresh', mockRequest).reply(200, mockResponse)

      const response = await refresh(mockRequest)
      expect(response).toEqual(mockResponse)
    })

    it('debería manejar tokens de refresco inválidos', async () => {
      const mockRequest: AuthRefreshRequest = {
        refresh_token: 'invalid_token'
      }

      mock.onPost('/auth/refresh').reply(401, { detail: 'Invalid refresh token' })

      await expect(refresh(mockRequest)).rejects.toThrow()
    })
  })

  describe('me', () => {
    it('debería obtener la información del usuario actual', async () => {
      const mockResponse: Me = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        full_name: 'Test User'
      }

      mock.onGet('/auth/me').reply(200, mockResponse)

      const response = await me()
      expect(response).toEqual(mockResponse)
    })

    it('debería manejar la falta de autenticación', async () => {
      mock.onGet('/auth/me').reply(401, { detail: 'Not authenticated' })

      await expect(me()).rejects.toThrow()
    })
  })

  describe('updateMe', () => {
    it('debería actualizar la información del usuario correctamente', async () => {
      const updateData: UpdateUserRequest = {
        email: 'updated@example.com',
        username: 'updateduser',
        full_name: 'Updated User'
      }

      const successMessage = 'User updated successfully'

      mock.onPut('/auth/me', updateData).reply(200, successMessage)

      const response = await updateMe(updateData)
      expect(response).toBe(successMessage)
    })

    it('debería manejar errores de validación', async () => {
      const invalidUpdateData = {
        email: 'invalid-email',
        username: '',
        full_name: ''
      }

      mock.onPut('/auth/me').reply(422, { detail: 'Validation error' })

      await expect(updateMe(invalidUpdateData as UpdateUserRequest)).rejects.toThrow()
    })
  })
})
