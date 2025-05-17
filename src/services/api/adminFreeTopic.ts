import { AdminFreeTopic, AdminFreeTopicResponse, FreeTopicQueryParams } from "@/dataHelper/adminFreeTopic.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminFreeTopicApi = {  
  getFreeTopic: (freeTopicQueryParams: FreeTopicQueryParams): Promise<ApiResponse<AdminFreeTopicResponse>> =>
    axiosClient.get("/admin/free-talk-topics", { params: freeTopicQueryParams }),
    
  getFreeTopicById: (freeTopicId: string): Promise<ApiResponse<AdminFreeTopic>> =>
    axiosClient.get(`/admin/free-talk-topics/${freeTopicId}`),
    
  createFreeTopic: (freeTopicData: any): Promise<ApiResponse<any>> =>
    axiosClient.post("/admin/free-talk-topics", freeTopicData),
    
  updateFreeTopic: (freeTopicId: string, freeTopicData: any): Promise<ApiResponse<any>> =>
    axiosClient.put(`/admin/free-talk-topics/${freeTopicId}`, freeTopicData),
    
  deleteFreeTopic: (freeTopicId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/free-talk-topics/${freeTopicId}`),
};