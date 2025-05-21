import { UpdateProfile, UserDetail, UserStats } from "@/dataHelper/user.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const userApi = {  
  getUserStats: (): Promise<ApiResponse<UserStats>> =>
    axiosClient.get("/user/stats/learned-card-count"),
  getUserDetail: (): Promise<ApiResponse<UserDetail>> =>
    axiosClient.get('/user/detail'),
  changePassword: (data: { oldPassword: string, newPassword: string, confirmPassword: string }): Promise<ApiResponse<any>> =>
    axiosClient.put('/user/change-password', data),
  updateProfile: (data: UpdateProfile): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    return axiosClient.put('/user/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};