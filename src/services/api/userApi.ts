import { UserStats } from "@/dataHelper/user.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const userApi = {  
  getUserStats: (): Promise<ApiResponse<UserStats>> =>
    axiosClient.get("/user/stats/learned-card-count"),
};