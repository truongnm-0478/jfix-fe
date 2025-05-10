import { StudyContentData } from "@/dataHelper/study.dataHelper";
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
};
