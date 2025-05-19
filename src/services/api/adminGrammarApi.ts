import { AdminGrammar, AdminGrammarResponse, GrammarCreate, GrammarDetail, GrammarQueryParams } from "@/dataHelper/adminGrammar.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminGrammarApi = {  
  getGrammar: (grammarQueryParams: GrammarQueryParams): Promise<ApiResponse<AdminGrammarResponse>> =>
    axiosClient.get("/admin/grammars", { params: grammarQueryParams }),
    
  getGrammarById: (grammarId: string): Promise<ApiResponse<AdminGrammar>> =>
    axiosClient.get(`/admin/grammars/${grammarId}`),
    
  createGrammar: (grammarData: GrammarCreate): Promise<ApiResponse<GrammarDetail>> =>
    axiosClient.post("/admin/grammars", grammarData),
    
  updateGrammar: (grammarId: string, grammarData: GrammarCreate): Promise<ApiResponse<GrammarDetail>> =>
    axiosClient.put(`/admin/grammars/${grammarId}`, grammarData),
    
  deleteGrammar: (grammarId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/grammars/${grammarId}`),
};