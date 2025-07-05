export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  content: string
  role: MessageRole
  timestamp: Date
}

export interface SendMessageParams {
  content: string
  onSuccess?: (optimizedPrompt: string) => void
  onError?: (error: Error) => void
}
