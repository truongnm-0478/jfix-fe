import { AdminFreeTopic, AdminFreeTopicResponse, FreeTopicCreate, FreeTopicDetail, FreeTopicQueryParams } from "@/dataHelper/adminFreeTopic.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminFreeTopicApi = {  
  getFreeTopic: (freeTopicQueryParams: FreeTopicQueryParams): Promise<ApiResponse<AdminFreeTopicResponse>> =>
    axiosClient.get("/admin/free-talk-topics", { params: freeTopicQueryParams }),
    
  getFreeTopicById: (freeTopicId: string): Promise<ApiResponse<AdminFreeTopic>> => 
    axiosClient.get(`/admin/free-talk-topics/${freeTopicId}`),
    
  createFreeTopic: (freeTopicData: FreeTopicCreate): Promise<ApiResponse<FreeTopicDetail>> => {
    const formData = new FormData();
    formData.append("japaneseText", freeTopicData?.japaneseText || "");
    formData.append("vietnameseText", freeTopicData?.vietnameseText || "");
    formData.append("level", freeTopicData?.level || "");
    return axiosClient.post("/admin/free-talk-topics", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  
  updateFreeTopic: (freeTopicId: string, freeTopicData: FreeTopicCreate): Promise<ApiResponse<FreeTopicDetail>> => {
    const formData = new FormData();
    formData.append("japaneseText", freeTopicData?.japaneseText || "");
    formData.append("vietnameseText", freeTopicData?.vietnameseText || "");
    formData.append("level", freeTopicData?.level || "");
    return axiosClient.put(`/admin/free-talk-topics/${freeTopicId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
    
  deleteFreeTopic: (freeTopicId: string): Promise<ApiResponse<any>> =>
    axiosClient.delete(`/admin/free-talk-topics/${freeTopicId}`),
};