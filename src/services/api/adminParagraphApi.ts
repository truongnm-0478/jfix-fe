import { AdminParagraph, AdminParagraphResponse, ParagraphQueryParams } from "@/dataHelper/adminParagraph.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminParagraphApi = {  
  getParagraph: (paragraphQueryParams: ParagraphQueryParams): Promise<ApiResponse<AdminParagraphResponse>> =>
    axiosClient.get("/admin/paragraphs", { params: paragraphQueryParams }),
    
  getParagraphById: (paragraphId: string): Promise<ApiResponse<AdminParagraph>> =>
    axiosClient.get(`/admin/paragraphs/${paragraphId}`),
    
  createParagraph: (paragraphData: any): Promise<ApiResponse<any>> =>
    axiosClient.post("/admin/paragraphs", paragraphData),
    
  updateParagraph: (paragraphId: string, paragraphData: any): Promise<ApiResponse<any>> =>
    axiosClient.put(`/admin/paragraphs/${paragraphId}`, paragraphData),
    
  deleteParagraph: (paragraphId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/paragraphs/${paragraphId}`),
};