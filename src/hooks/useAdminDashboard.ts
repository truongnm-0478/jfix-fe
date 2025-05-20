import { adminDashboardApi } from "@/services/api/adminDashboardApi";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => adminDashboardApi.getDashboard(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useQuestionTypeDistribution = () => {
  return useQuery({
    queryKey: ["question-type-distribution"],
    queryFn: () => adminDashboardApi.getQuestionTypeDistribution(),
  });
};

export const useRecentUsers = () => {
  return useQuery({
    queryKey: ["recent-users"],
    queryFn: () => adminDashboardApi.getRecentUsers(),
  });
};

export const useDailyActiveUsers = () => {
  return useQuery({
    queryKey: ["daily-active-users"],
    queryFn: () => adminDashboardApi.getDailyActiveUsers(),
  });
};
