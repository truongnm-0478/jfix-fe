import { rankingApi } from "@/services/api/rankingApi";
import { useQuery } from "@tanstack/react-query";

export const useTopStreakUsers = () => {
  return useQuery({
    queryKey: ["topStreakUsers"],
    queryFn: () => rankingApi.getTopStreakUsers(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTopCardUsers = () => {
  return useQuery({
    queryKey: ["topCardUsers"],
    queryFn: () => rankingApi.getTopCardUsers(),
    staleTime: 1000 * 60 * 5,
  });
};

