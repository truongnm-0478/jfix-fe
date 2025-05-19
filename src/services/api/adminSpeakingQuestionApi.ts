import { AdminSpeakingQuestion, AdminSpeakingQuestionCreate, AdminSpeakingQuestionResponse, SpeakingQuestionQueryParams } from "@/dataHelper/adminSpeakingQuestions.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminSpeakingQuestionApi = {  
  getSpeakingQuestion: (speakingQuestionQueryParams: SpeakingQuestionQueryParams): Promise<ApiResponse<AdminSpeakingQuestionResponse>> =>
    axiosClient.get("/admin/speaking-questions", { params: speakingQuestionQueryParams }),
    
  getSpeakingQuestionById: (speakingQuestionId: string): Promise<ApiResponse<AdminSpeakingQuestion>> =>
    axiosClient.get(`/admin/speaking-questions/${speakingQuestionId}`),
    
  createSpeakingQuestion: (speakingQuestionData: AdminSpeakingQuestionCreate): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    Object.entries(speakingQuestionData).forEach(([key, value]) => {
      if (key === 'audio' && value instanceof File) {
        formData.append('audio', value);
      } 
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return axiosClient.post("/admin/speaking-questions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
    
  updateSpeakingQuestion: (speakingQuestionId: string, speakingQuestionData: any): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    Object.entries(speakingQuestionData).forEach(([key, value]) => {
      if (key === 'audio' && value instanceof File) {
        formData.append('audio', value);
      } 
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return axiosClient.put(`/admin/speaking-questions/${speakingQuestionId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
    
  deleteSpeakingQuestion: (speakingQuestionId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/speaking-questions/${speakingQuestionId}`),
};