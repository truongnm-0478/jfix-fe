import { achievementApi } from "@/services/api/achievementApi";
import { learningGoalApi } from "@/services/api/learningGoalApi";
import { userApi } from "@/services/api/userApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAchievement = () => {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: () => achievementApi.getAchievement(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCalculateAchievement = () => {
  return useMutation({
    mutationFn: () => achievementApi.calculateAchievements()
  });
};

export const useAllAchievement = () => {
  return useQuery({
    queryKey: ["all-achievements"],
    queryFn: async () => {
      const [
        achievements,
        heatmapData,
        errorRateData,
        errorImprovement,
        totalCardsResponse,
        cardsByDifficulty
      ] = await Promise.all([
        achievementApi.getAchievement(),
        achievementApi.getAchievementHeatmap(),
        achievementApi.getAchievementErrorRate(),
        achievementApi.getAchievementErrorImprovement(),
        achievementApi.getAchievementTotalCards(),
        achievementApi.getAchievementCardsByDifficulty()
      ]);

      return {
        achievements,
        heatmapData,
        errorRateData,
        errorImprovement,
        totalCards: totalCardsResponse.total,
        cardsByDifficulty
      };
    }
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ["userStats"],
    queryFn: () => userApi.getUserStats(),
  });
};

export const useLearningGoal = () => {
  return useQuery({
    queryKey: ["learningGoal"],
    queryFn: () => learningGoalApi.getLearningGoal(),
  });
};