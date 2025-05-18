import { AdminSentence, AdminSentenceResponse, SentenceQueryParams } from "@/dataHelper/adminSentence.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminSentenceApi = {  
  getSentence: (sentenceQueryParams: SentenceQueryParams): Promise<ApiResponse<AdminSentenceResponse>> =>
    axiosClient.get("/admin/sentences", { params: sentenceQueryParams }),
    
  getSentenceById: (sentenceId: string): Promise<ApiResponse<AdminSentence>> =>
    axiosClient.get(`/admin/sentences/${sentenceId}`),
    
  createSentence: (sentenceData: any): Promise<ApiResponse<any>> =>
    axiosClient.post("/admin/sentences", sentenceData),
    
  updateSentence: (sentenceId: string, sentenceData: any): Promise<ApiResponse<any>> =>
    axiosClient.put(`/admin/sentences/${sentenceId}`, sentenceData),
    
  deleteSentence: (sentenceId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/sentences/${sentenceId}`),
};