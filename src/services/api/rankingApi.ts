import { UserCardCount, UserStreak } from "@/dataHelper/user.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const rankingApi = {  
  getTopStreakUsers: (): Promise<ApiResponse<UserStreak[]>> =>
    axiosClient.get("/ranking/top-streak-users"),
  getTopCardUsers: (): Promise<ApiResponse<UserCardCount[]>> =>
    axiosClient.get("/ranking/top-cards-users"),
};