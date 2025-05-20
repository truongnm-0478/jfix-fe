import { QuestionTypeDistribution, StatsDailyActiveUsers, StatsRecentUsers, SummaryDashboard } from "@/dataHelper/adminDashboard.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const adminDashboardApi = {  
  getDashboard: (): Promise<ApiResponse<SummaryDashboard>> =>
    axiosClient.get("/admin/dashboard/stats/summary"),
  getQuestionTypeDistribution: (): Promise<ApiResponse<QuestionTypeDistribution>> =>
    axiosClient.get("/admin/dashboard/stats/question-type-distribution"),
  getRecentUsers: (): Promise<ApiResponse<StatsRecentUsers>> =>
    axiosClient.get("/admin/dashboard/stats/recent-users"),
  getDailyActiveUsers: (): Promise<ApiResponse<StatsDailyActiveUsers>> =>
    axiosClient.get("/admin/dashboard/stats/daily-active-users"),  
};