import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_AI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface SpeechToTextResponse {
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


export const aiApi = {
  speechToText: ({audio_data}: {audio_data: string}): Promise<SpeechToTextResponse> =>
    axiosClient.post('/speech-to-text', {
      audio_data,
      language: "ja-JP"
    }),
  freeTalk: (data: FreeTalkResquest): Promise<FreeTalkResponse> =>
    axiosClient.post('/conversation', data),
};
