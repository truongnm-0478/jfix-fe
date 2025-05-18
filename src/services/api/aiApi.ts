import { FreeTalkResponse, FreeTalkResquest, GrammarCheckResponse, SpeechToTextResponse } from "@/dataHelper/ai.dataHelper";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_AI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const aiApi = {
  speechToText: ({audio_data}: {audio_data: string}): Promise<SpeechToTextResponse> =>
    axiosClient.post('/speech-to-text', {
      audio_data,
      language: "ja-JP"
    }),
  freeTalk: (data: FreeTalkResquest): Promise<FreeTalkResponse> =>
    axiosClient.post('/conversation', data),
  checkGrammar: async (text: string): Promise<GrammarCheckResponse> => {
    const response = await axiosClient.post('/grammar-check', { text });
    return response.data;
  }
};
