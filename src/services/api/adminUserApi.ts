import { AdminUser, AdminUserResponse, UserQueryParams } from "@/dataHelper/adminUser.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminUserApi = {  
  getUsers: (userQueryParams: UserQueryParams): Promise<ApiResponse<AdminUserResponse>> =>
    axiosClient.get("/admin/users", { params: userQueryParams }),
  getUserById: (userId: string): Promise<ApiResponse<AdminUser>> =>
    axiosClient.get(`/admin/users/${userId}`),
  lockUser: (userId: string): Promise<ApiResponse<string>> =>
    axiosClient.patch(`/admin/users/${userId}/lock`),
  unlockUser: (userId: string): Promise<ApiResponse<string>> =>
    axiosClient.patch(`/admin/users/${userId}/unlock`),
};