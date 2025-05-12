import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_AI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface SpeechToTextResponse {
  status: string;
  text: string;
}

export const aiApi = {
  speechToText: ({audio_data}: {audio_data: string}): Promise<SpeechToTextResponse> =>
    axiosClient.post('/speech-to-text', {
      audio_data,
      language: "ja-JP"
    }),
};
