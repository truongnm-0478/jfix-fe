import { ChangePassword, ChangePasswordByToken, ChangePasswordResponse, LogoutResponse, UserData, UserLogin, UserRegister } from "@/dataHelper/auth.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const authApi = {
  login: (data: UserLogin): Promise<ApiResponse<UserData>> =>
    axiosClient.post("/auth/login", data),

  logout: (refreshToken: string): Promise<LogoutResponse> =>
    axiosClient.post("/auth/logout", { refreshToken }),

  register: (data: UserRegister): Promise<ApiResponse<UserData>> =>
    axiosClient.post("/auth/register", data),

  changePassword: (data: ChangePassword): Promise<ChangePasswordResponse> =>
    axiosClient.post("/crew/change-password", data),

  changePasswordByToken: (
    data: ChangePasswordByToken
  ): Promise<ChangePasswordResponse> =>
    axiosClient.post("/crew/change-password-token", data),

  forgotPassword: (data: { email: string }): Promise<ChangePasswordResponse> =>
    axiosClient.post("/crew/send-mail-forgot-password", data),
};
