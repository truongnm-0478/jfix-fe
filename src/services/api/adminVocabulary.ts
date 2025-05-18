import { AdminVocabulary, AdminVocabularyResponse, VocabularyCreate, VocabularyDetail, VocabularyQueryParams } from "@/dataHelper/adminVocubalary.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminVocabularyApi = {  
  getVocabulary: (vocabularyQueryParams: VocabularyQueryParams): Promise<ApiResponse<AdminVocabularyResponse>> =>
    axiosClient.get("/admin/vocabularies", { params: vocabularyQueryParams }),
    
  getVocabularyById: (vocabularyId: string): Promise<ApiResponse<AdminVocabulary>> =>
    axiosClient.get(`/admin/vocabularies/${vocabularyId}`),
    
  createVocabulary: async (vocabularyData: VocabularyCreate): Promise<ApiResponse<VocabularyDetail>> => {
    const formData = new FormData();
  
    Object.entries(vocabularyData).forEach(([key, value]) => {
      if (key === 'audioFile' && value instanceof File) {
        formData.append('audio', value);
      } 
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
  
    return axiosClient.post("/admin/vocabularies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  
  updateVocabulary: async (vocabularyId: string, vocabularyData: VocabularyCreate): Promise<ApiResponse<VocabularyDetail>> => {
    const formData = new FormData();
  
    Object.entries(vocabularyData).forEach(([key, value]) => {
      if (key === 'audioFile' && value instanceof File) {
        formData.append('audio', value);
      } 
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
  
    return axiosClient.put(`/admin/vocabularies/${vocabularyId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },  
    
  deleteVocabulary: (vocabularyId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/vocabularies/${vocabularyId}`),
};