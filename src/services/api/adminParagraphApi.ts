import { AdminParagraph, AdminParagraphCreate, AdminParagraphResponse, ParagraphQueryParams } from "@/dataHelper/adminParagraph.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminParagraphApi = {  
  getParagraph: (paragraphQueryParams: ParagraphQueryParams): Promise<ApiResponse<AdminParagraphResponse>> =>
    axiosClient.get("/admin/paragraphs", { params: paragraphQueryParams }),
    
  getParagraphById: (paragraphId: string): Promise<ApiResponse<AdminParagraph>> =>
    axiosClient.get(`/admin/paragraphs/${paragraphId}`),
    
  createParagraph: (paragraphData: AdminParagraphCreate): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    Object.entries(paragraphData).forEach(([key, value]) => {
      if (key === 'audio' && value instanceof File) {
        formData.append('audio', value);
      }
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return axiosClient.post("/admin/paragraphs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
    
  updateParagraph: (paragraphId: string, paragraphData: AdminParagraphCreate): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    Object.entries(paragraphData).forEach(([key, value]) => {
      if (key === 'audio' && value instanceof File) {
        formData.append('audio', value);
      }
      else if (key !== 'audioFile' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return axiosClient.put(`/admin/paragraphs/${paragraphId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
    
  deleteParagraph: (paragraphId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/paragraphs/${paragraphId}`),
};