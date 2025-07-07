import type { Prompt, NewPrompt, PromptResponse } from '@/types/prompt'
import { api } from '@/api/api'

export async function getPrompts(): Promise<PromptResponse> {
  const { data } = await api.get<PromptResponse>('/prompt/')
  return data
}

export async function getPrompt(id: string): Promise<Prompt> {
  const { data } = await api.get<Prompt>(`/prompt/${id}`)
  return data
}

export async function createPrompt(promp: NewPrompt): Promise<Prompt> {
  const { data } = await api.post<Prompt>('/prompt/improve', promp)
  return data
}

export async function updatePrompt(id: string, prompt: NewPrompt): Promise<Prompt> {
  const { data } = await api.put<Prompt>(`/prompt/${id}`, prompt)
  return data
}

export async function getFavouritesPrompts(): Promise<PromptResponse> {
  const { data } = await api.get<PromptResponse>('/prompt/favorites')
  return data
}

export async function toggleFavouritePrompt(id: string, favorite: boolean): Promise<Prompt> {
  const { data } = await api.patch<Prompt>(`/prompt/${id}/favorite`, null, {
    params: { favorite }
  })
  return data
}
