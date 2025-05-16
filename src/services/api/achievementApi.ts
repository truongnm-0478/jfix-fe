import { Achievement, AchievementCardsByDifficulty, AchievementErrorImprovement, AchievementErrorRate, AchievementHeatmap } from "@/dataHelper/achievement.dataHelper";
import axiosClient from "./axiosClient";

interface TotalCardsResponse {
  total: number;
}

export const achievementApi = {  
  getAchievement: (): Promise<Achievement[]> => 
    axiosClient.get('/achievements'),
  calculateAchievements: (): Promise<Achievement[]> =>
    axiosClient.post('/achievements/calculate'),
  getAchievementHeatmap: (): Promise<AchievementHeatmap[]> =>
    axiosClient.get('/achievements/study-heatmap'),
  getAchievementErrorRate: (): Promise<AchievementErrorRate> =>
    axiosClient.get('/achievements/error-rate'),
  getAchievementErrorImprovement: (): Promise<AchievementErrorImprovement[]> =>
    axiosClient.get('/achievements/error-improvement'),
  getAchievementTotalCards: (): Promise<TotalCardsResponse> =>
    axiosClient.get('/achievements/total-learned-cards'),
  getAchievementCardsByDifficulty: (): Promise<AchievementCardsByDifficulty[]> =>
    axiosClient.get('/achievements/cards-by-difficulty'),
};
