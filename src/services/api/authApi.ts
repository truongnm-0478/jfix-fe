import { LogoutResponse, UserData, UserLogin, UserRegister } from "@/dataHelper/auth.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const authApi = {
  login: (data: UserLogin): Promise<ApiResponse<UserData>> =>
    axiosClient.post("/auth/login", data),

  logout: (refreshToken: string): Promise<LogoutResponse> =>
    axiosClient.post("/auth/logout", { refreshToken }),

  register: (data: UserRegister): Promise<ApiResponse<UserData>> =>
    axiosClient.post("/auth/register", data),

  forgotPassword: (data: { email: string }): Promise<ApiResponse<{ message: string }>> =>
    axiosClient.post("/auth/forgot-password", data),

  resetPassword: (data: { token: string; newPassword: string; confirmPassword: string }): Promise<ApiResponse<{ message: string }>> =>
    axiosClient.post("/auth/reset-password", data),
};