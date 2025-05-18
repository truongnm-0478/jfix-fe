export interface SpeechToTextResponse {
  data: {
    status: string;
    text: string;
  };
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

export interface FreeTalkResquest {
  user_id: number | string;
  theme: string;
  level: string;
  user_input: string;
}

export interface FreeTalkResponse {
  data: {
    status: string;
    user_id: number;
    response: {
      correction: {
        hasError: boolean;
        original: string;
        suggestion: string;
        explanation: string;
      };
      reply: string;
      vocabulary: {
        word: string;
        reading: string;
        meaning: string;
      }[];
      audio_reply: string;
    };
  };
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

export interface Correction {
  description?: string;
  end?: number;
  error_type?: string;
  general_error_type?: string;
  id?: string;
  replacement?: string;
  sentence?: string;
  sentence_start?: number;
  start?: number;
};

export interface GrammarCheckResponse {
  status?: string;
  original_text?: string;
  corrections?: Correction[];
  corrected_text?: string;
};