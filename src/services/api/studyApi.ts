import { StudyVocabularyData } from "@/dataHelper/study.dataHelper";
import axiosClient from "./axiosClient";

export const studyApi = {  
  getStudyVocabulary: (date: string): Promise<StudyVocabularyData[]> => 
    axiosClient.get(`/study/vocabulary?date=${date}`),
};
