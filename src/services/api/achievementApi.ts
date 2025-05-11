import { Achievement } from "@/dataHelper/achievement.dataHelper";
import axiosClient from "./axiosClient";

export const achievementApi = {  
  getAchievement: (): Promise<Achievement[]> => 
    axiosClient.get('/achievements'),
  calculateAchievements: (): Promise<Achievement[]> =>
    axiosClient.post('/achievements/calculate'),
};
