import MockAdapter from 'axios-mock-adapter'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { Prompt, NewPrompt, PromptResponse } from '../../src/types/prompt'
import { api } from '../../src/api/api'
import { createPrompt, getPrompts, getPrompt, updatePrompt, deletePrompt, getFavouritesPrompts, toggleFavouritePrompt } from '../../src/services/prompt'

describe('Prompt Service', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.restore()
  })

  it('getPrompts debería devolver PromptResponse', async () => {
    const fake: PromptResponse = {
      prompts: [
      {
        id: '1',
        original_prompt: 'foo',
        optimized_prompt: 'bar',
        explanation: 'explica',
        total_tokens: 10,
        created_at: '2025-07-09T12:00:00Z',
        is_favorite: false
      }
    ]}

    mock.onGet('/prompt/').reply(200, fake)

    const data = await getPrompts()
    expect(data).toEqual(fake)
  })

  it('getPrompt(id) debería devolver un Prompt', async () => {
    const fake: Prompt = {
      id: '42',
      original_prompt: '¿Hola?',
      optimized_prompt: '¡Hola!',
      explanation: 'saludo',
      total_tokens: 5,
      created_at: '2025-07-09T12:01:00Z',
      is_favorite: true,
    }

    mock.onGet(`/prompt/${fake.id}`).reply(200, fake)

    const data = await getPrompt(fake.id)
    expect(data).toEqual(fake)
  })

  it('createPrompt debería hacer POST y devolver el nuevo Prompt', async () => {
    const input: NewPrompt = { prompt: 'test' }
    const fake: Prompt = {
      id: 'new',
      original_prompt: 'test',
      optimized_prompt: 'TEST',
      explanation: 'mayúsculas',
      total_tokens: 4,
      created_at: '2025-07-09T12:02:00Z',
      is_favorite: false,
    }

    mock.onPost('/prompt/improve', input).reply(201, fake)

    const data = await createPrompt(input)
    expect(data).toEqual(fake)
  })

  it('updatePrompt debería hacer PUT y devolver el Prompt actualizado', async () => {
    const id = 'upd'
    const input: NewPrompt = { prompt: 'update!' }
    const fake: Prompt = {
      id,
      original_prompt: 'update!',
      optimized_prompt: 'UPDATE!',
      explanation: 'caps',
      total_tokens: 7,
      created_at: '2025-07-09T12:03:00Z',
      is_favorite: false,
    }

    mock.onPut(`/prompt/${id}`, input).reply(200, fake)

    const data = await updatePrompt(id, input)
    expect(data).toEqual(fake)
  })

  it('getFavouritesPrompts debería devolver PromptResponse de favoritos', async () => {
    const fake: PromptResponse = {
      prompts: [
      {
        id: 'fav1',
        original_prompt: 'hola',
        optimized_prompt: '¡hola!',
        explanation: 'saludo',
        total_tokens: 3,
        created_at: '2025-07-09T12:04:00Z',
        is_favorite: true,
      },
    ]
    }

    mock.onGet('/prompt/favorites').reply(200, fake)

    const data = await getFavouritesPrompts()
    expect(data).toEqual(fake)
  })

  it('deletePrompt debería hacer DELETE sin error', async () => {
    const id = 'del-1'
    mock.onDelete(`/prompt/${id}`).reply(204)

    await expect(deletePrompt(id)).resolves.toBeUndefined()
  })

  it('toggleFavouritePrompt debería hacer PATCH y devolver Prompt toggled', async () => {
    const id = 'tog'
    const fake: Prompt = {
      id,
      original_prompt: 'x',
      optimized_prompt: 'X',
      explanation: '',
      total_tokens: 1,
      created_at: '2025-07-09T12:05:00Z',
      is_favorite: true,
    }

    mock
      .onPatch(`/prompt/${id}/favorite`, undefined, { params: { favorite: true } })
      .reply(200, fake)

    const data = await toggleFavouritePrompt(id, true)
    expect(data).toEqual(fake)
  })

  it('getPrompts debería manejar respuestas vacías', async () => {
    const emptyResponse: PromptResponse = { prompts: [] }
    mock.onGet('/prompt/').reply(200, emptyResponse)

    const data = await getPrompts()
    expect(data).toEqual(emptyResponse)
    expect(data.prompts).toHaveLength(0)
  })

  it('getPrompts debería manejar errores de red', async () => {
    mock.onGet('/prompt/').networkError()

    await expect(getPrompts()).rejects.toThrow()
  })

  it('getPrompt debería manejar 404 cuando el prompt no existe', async () => {
    const nonExistentId = 'non-existent-id'
    mock.onGet(`/prompt/${nonExistentId}`).reply(404)

    await expect(getPrompt(nonExistentId)).rejects.toThrow()
  })

  it('createPrompt debería validar el input', async () => {
    const invalidInput = { prompt: '' } as NewPrompt
    mock.onPost('/prompt/improve', invalidInput).reply(400)

    await expect(createPrompt(invalidInput)).rejects.toThrow()
  })

  it('updatePrompt debería manejar error al actualizar un prompt inexistente', async () => {
    const nonExistentId = 'non-existent-id'
    const input = { prompt: 'test' }
    mock.onPut(`/prompt/${nonExistentId}`, input).reply(404)

    await expect(updatePrompt(nonExistentId, input)).rejects.toThrow()
  })

  it('deletePrompt debería manejar error al eliminar un prompt inexistente', async () => {
    const nonExistentId = 'non-existent-id'
    mock.onDelete(`/prompt/${nonExistentId}`).reply(404)

    await expect(deletePrompt(nonExistentId)).rejects.toThrow()
  })

  it('getFavouritesPrompts debería manejar cuando no hay favoritos', async () => {
    const emptyFavorites: PromptResponse = { prompts: [] }
    mock.onGet('/prompt/favorites').reply(200, emptyFavorites)

    const data = await getFavouritesPrompts()
    expect(data.prompts).toHaveLength(0)
  })

  it('toggleFavouritePrompt debería manejar error al cambiar favorito de un prompt inexistente', async () => {
    const nonExistentId = 'non-existent-id'
    mock.onPatch(`/prompt/${nonExistentId}/favorite`).reply(404)

    await expect(toggleFavouritePrompt(nonExistentId, true)).rejects.toThrow()
  })

  it('debería manejar timeouts en las peticiones', async () => {
    vi.spyOn(api, 'request').mockImplementation(() => {
      return new Promise((_, reject) => {
        setTimeout(() => {
          const error = new Error('timeout of 5000ms exceeded') as Error & { code?: string }
          error.code = 'ECONNABORTED'
          reject(error)
        }, 100)
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    await expect(getPrompts()).rejects.toThrow()
  })
})
