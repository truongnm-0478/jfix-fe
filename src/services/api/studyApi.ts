import { SpeechToTextRequest, SpeechToTextResponse, StudyContentData, StudyRequest } from "@/dataHelper/study.dataHelper";
import axiosClient from "./axiosClient";

export const studyApi = {  
  getStudyVocabulary: (date: string): Promise<StudyContentData[]> => 
    axiosClient.get(`/study/vocabulary?date=${date}`),
  getStudyGrammar: (date: string): Promise<StudyContentData[]> =>
    axiosClient.get(`/study/grammar?date=${date}`),
  getStudyQuestion: (date: string): Promise<StudyContentData[]> =>
    axiosClient.get(`/study/speaking-question?date=${date}`),
  getSentence: (date: string): Promise<StudyContentData[]> =>
    axiosClient.get(`/study/sentence?date=${date}`),
  getFreeTalkTopic: (date: string): Promise<StudyContentData[]> =>
    axiosClient.get(`/study/free-talk-topic?date=${date}`),
  getParagraph: (date: string): Promise<StudyContentData[]> =>
    axiosClient.get(`/study/paragraph?date=${date}`),
  reviewVocabulary: (data: { id: number, performance: number }): Promise<StudyContentData[]> =>
    axiosClient.put('/study/vocabulary', data),
  reviewGrammar: (data: { id: number, performance: number }): Promise<StudyContentData[]> =>
    axiosClient.put('/study/grammar', data),
  speechToText: (data: SpeechToTextRequest): Promise<SpeechToTextResponse> =>
    axiosClient.post('/study/speech-to-text', data),
  reviewPronunciation: (data: StudyRequest): Promise<StudyContentData[]> =>
    axiosClient.put('/study/sentence', data),
};
