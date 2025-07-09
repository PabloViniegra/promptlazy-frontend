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
  entrada_inicial?: string;
  entrada_mejorada?: string;
  salida_deseada?: string;

  [key: string]: string | undefined;
}


export interface UserPrompt {
  id: string;
  original_prompt: string;
  optimized_prompt: string;
  explanation: string;
  total_tokens: number;
  created_at: string;
  is_favorite: boolean;
  user_id?: string;
  title?: string;
  user?: {
    username: string;
  };
}
