import { AdminSpeakingQuestion, AdminSpeakingQuestionResponse, SpeakingQuestionQueryParams } from "@/dataHelper/adminSpeakingQuestions.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminSpeakingQuestionApi = {  
  getSpeakingQuestion: (speakingQuestionQueryParams: SpeakingQuestionQueryParams): Promise<ApiResponse<AdminSpeakingQuestionResponse>> =>
    axiosClient.get("/admin/speaking-questions", { params: speakingQuestionQueryParams }),
    
  getSpeakingQuestionById: (speakingQuestionId: string): Promise<ApiResponse<AdminSpeakingQuestion>> =>
    axiosClient.get(`/admin/speaking-questions/${speakingQuestionId}`),
    
  createSpeakingQuestion: (speakingQuestionData: any): Promise<ApiResponse<any>> =>
    axiosClient.post("/admin/speaking-questions", speakingQuestionData),
    
  updateSpeakingQuestion: (speakingQuestionId: string, speakingQuestionData: any): Promise<ApiResponse<any>> =>
    axiosClient.put(`/admin/speaking-questions/${speakingQuestionId}`, speakingQuestionData),
    
  deleteSpeakingQuestion: (speakingQuestionId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/speaking-questions/${speakingQuestionId}`),
};