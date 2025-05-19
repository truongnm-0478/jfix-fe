import { AdminSentence, AdminSentenceCreate, AdminSentenceResponse, SentenceQueryParams } from "@/dataHelper/adminSentence.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminSentenceApi = {  
  getSentence: (sentenceQueryParams: SentenceQueryParams): Promise<ApiResponse<AdminSentenceResponse>> =>
    axiosClient.get("/admin/sentences", { params: sentenceQueryParams }),
    
  getSentenceById: (sentenceId: string): Promise<ApiResponse<AdminSentence>> =>
    axiosClient.get(`/admin/sentences/${sentenceId}`),
    
  createSentence: (sentenceData: AdminSentenceCreate): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    Object.entries(sentenceData).forEach(([key, value]) => {
      if (key === 'audio' && value instanceof File) {
        formData.append('audio', value);
      }
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return axiosClient.post("/admin/sentences", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
    
  updateSentence: (sentenceId: string, sentenceData: AdminSentenceCreate): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    Object.entries(sentenceData).forEach(([key, value]) => {
      if (key === 'audio' && value instanceof File) {
        formData.append('audio', value);
      }
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return axiosClient.put(`/admin/sentences/${sentenceId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
    
  deleteSentence: (sentenceId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/sentences/${sentenceId}`),
};