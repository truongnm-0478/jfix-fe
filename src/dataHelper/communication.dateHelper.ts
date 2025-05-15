export interface Message {
  theme: string;
  level: string;
  user_input: string;
}

export interface MessageProps {
  message: {
    id: string;
    sender: "bot" | "user";
    text: string;
    audio?: string;
    correction?: {
      hasError: boolean;
      original: string;
      suggestion: string;
      explanation: string;
    };
    vocabulary?: {
      word: string;
      reading: string;
      meaning: string;
    }[];
  };
}
