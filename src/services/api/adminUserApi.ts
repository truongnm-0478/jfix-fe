import { AdminUser, AdminUserResponse, CreateUserRequest, UserQueryParams } from "@/dataHelper/adminUser.dataHelper";
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
  createUser: (user: CreateUserRequest): Promise<ApiResponse<AdminUser>> => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("role", user.role);
    formData.append("password", user.password);
    return axiosClient.post("/admin/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};