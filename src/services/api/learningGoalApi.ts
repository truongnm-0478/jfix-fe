import { LearningGoal, LearningGoalResponse } from "@/dataHelper/learningGoal.dataHelper";
import axiosClient from "./axiosClient";
import { ApiResponse } from "./type";

export const learningGoalApi = {  
  checkLearningGoal: (): Promise<ApiResponse<boolean>> =>
    axiosClient.get("/learning-goals/check"),
  
  createLearningGoal: (data: LearningGoal): Promise<ApiResponse<LearningGoalResponse>> =>
    axiosClient.post("/learning-goals", data),
};