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

export interface OptimizedPromptSections {
  prompt_mejorado?: string;
  'explicación_de_los_cambios'?: string;
  prompt?: string;
  [key: string]: string | undefined;
}
