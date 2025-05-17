import { AdminVocabulary, AdminVocabularyResponse, VocabularyQueryParams } from "@/dataHelper/adminVocubalary.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminVocabularyApi = {  
  getVocabulary: (vocabularyQueryParams: VocabularyQueryParams): Promise<ApiResponse<AdminVocabularyResponse>> =>
    axiosClient.get("/admin/vocabularies", { params: vocabularyQueryParams }),
    
  getVocabularyById: (vocabularyId: string): Promise<ApiResponse<AdminVocabulary>> =>
    axiosClient.get(`/admin/vocabularies/${vocabularyId}`),
    
  createVocabulary: (vocabularyData: any): Promise<ApiResponse<any>> =>
    axiosClient.post("/admin/vocabularies", vocabularyData),
    
  updateVocabulary: (vocabularyId: string, vocabularyData: any): Promise<ApiResponse<any>> =>
    axiosClient.put(`/admin/vocabularies/${vocabularyId}`, vocabularyData),
    
  deleteVocabulary: (vocabularyId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/vocabularies/${vocabularyId}`),
};