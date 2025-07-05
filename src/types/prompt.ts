export interface Prompt {
  id: string;
  original_prompt: string;
  optimized_prompt: string;
  explanation: string;
  total_tokens: number;
  created_at: string;
  is_favorite: boolean;
}

export interface NewPrompt {
  prompt: string;
}

export interface PromptResponse {
  prompts: Prompt[];
}
