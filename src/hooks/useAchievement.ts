import { achievementApi } from "@/services/api/achievementApi";
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
